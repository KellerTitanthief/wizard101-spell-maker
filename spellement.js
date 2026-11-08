// ===== Spellement paths =====
// Needs script.js loaded first (uses captureCard() from it) and html2canvas.
(function () {
    const IMG_DIR = "OtherImages/";           // change if your arrow images live elsewhere
    const NUM_COLS = 5;
    const MAX_SLOTS = 3;

    // Column centres / panel geometry measured from the 928x644 background (as % of the image)
    const COL_CENTERS = [126, 303, 480.5, 658, 834].map(x => x / 928 * 100);
    const COL_WIDTH = 129 / 928 * 100;
    const COL_TOP = 62 / 644 * 100;
    const COL_HEIGHT = 555 / 644 * 100;

    // Arrow images: pixel sizes of the slices that must NOT stretch (top, right, bottom, left),
    // plus where the arrow's shaft sits so it can be lined up with the cards.
    const ARROWS = {
        straight: { file: "spellementarrow", slice: [0, 50, 0, 0] },
        up:       { file: "spellementarrowup", slice: [100, 48, 40, 80], tip: 46, stub: 24 },
        down:     { file: "spellementarrowdown", slice: [40, 48, 100, 80], tip: 47, stub: 24 },
    };
    const SHAFT = 48;      // shaft thickness in the source images
    const STRAIGHT_H = 93; // straight arrow image height

    const container = document.getElementById("spellement-container");
    const bgImg = document.getElementById("display-spellement-back");
    if (!container || !bgImg) return;

    // ---------- State ----------
    const counts = [1, 3, 3, 3, 3];                                   // slots per column
    const slots = Array.from({ length: NUM_COLS }, () => Array(MAX_SLOTS).fill(null)); // card canvases
    let hover = null;                                                 // {col,row}
    let busy = false;

    // ---------- Build DOM ----------
    const controls = document.createElement("div");
    controls.className = "sp-controls";
    const selects = [];   // selects[c - 1] belongs to tier c + 1
    // Setting a tier to 0 slots also zeroes every tier after it, and locks their dropdowns
    function syncSelects() {
        for (let c = 1; c < NUM_COLS; c++) {
            selects[c - 1].value = counts[c];
            selects[c - 1].disabled = counts[c - 1] === 0;
        }
    }
    for (let c = 1; c < NUM_COLS; c++) {   // tier 1 is always a single slot, so no dropdown
        const label = document.createElement("label");
        label.textContent = `Tier ${c + 1} slots `;
        const sel = document.createElement("select");
        for (let n = 0; n <= MAX_SLOTS; n++) sel.add(new Option(n, n));
        sel.addEventListener("change", () => {
            counts[c] = Number(sel.value);
            if (counts[c] === 0) for (let k = c + 1; k < NUM_COLS; k++) counts[k] = 0;
            for (let k = c; k < NUM_COLS; k++) {
                for (let r = counts[k]; r < MAX_SLOTS; r++) slots[k][r] = null;
            }
            hover = null;
            syncSelects();
            render();
        });
        label.appendChild(sel);
        controls.appendChild(label);
        selects.push(sel);
    }
    syncSelects();
    const dlBtn = document.createElement("button");
    dlBtn.textContent = "Download spellements";
    dlBtn.addEventListener("click", downloadStage);
    controls.appendChild(dlBtn);

    const stage = document.createElement("div");
    stage.className = "sp-stage";
    container.insertBefore(controls, container.firstChild);
    container.insertBefore(stage, controls.nextSibling);
    stage.appendChild(bgImg);

    const arrowCanvas = document.createElement("canvas");
    arrowCanvas.className = "sp-arrows";
    stage.appendChild(arrowCanvas);

    const colEls = [];
    for (let c = 0; c < NUM_COLS; c++) {
        const col = document.createElement("div");
        col.className = "sp-col";
        col.style.left = (COL_CENTERS[c] - COL_WIDTH / 2) + "%";
        col.style.width = COL_WIDTH + "%";
        col.style.top = COL_TOP + "%";
        col.style.height = COL_HEIGHT + "%";
        stage.appendChild(col);
        colEls.push(col);
    }

    // ---------- Arrow images ----------
    const imgs = {};
    for (const [key, a] of Object.entries(ARROWS)) {
        imgs[key] = {};
        for (const [state, suffix] of [["off", "inactive"], ["on", ""]]) {
            const im = new Image();
            im.onload = drawArrows;
            im.src = `${IMG_DIR}${a.file}${suffix}.png`;
            imgs[key][state] = im;
        }
    }

    // ---------- Rendering slots ----------
    function render() {
        colEls.forEach((colEl, c) => {
            colEl.innerHTML = "";
            for (let r = 0; r < counts[c]; r++) {
                const slot = document.createElement("div");
                slot.className = "sp-slot";
                const data = slots[c][r];
                if (data) {
                    const im = document.createElement("canvas");
                    im.width = data.width;
                    im.height = data.height;
                    im.getContext("2d").drawImage(data, 0, 0);
                    slot.appendChild(im);
                    const x = document.createElement("button");
                    x.className = "sp-clear";
                    x.textContent = "×";
                    x.title = "Remove card";
                    x.setAttribute("data-html2canvas-ignore", "true");
                    x.addEventListener("click", e => {
                        e.stopPropagation();
                        slots[c][r] = null;
                        hover = null;
                        render();
                    });
                    slot.appendChild(x);
                } else {
                    slot.classList.add("empty");
                    slot.title = "Click to place your current card here";
                    slot.addEventListener("click", () => fillSlot(c, r));
                }
                slot.addEventListener("pointerenter", () => { hover = { c, r }; drawArrows(); });
                slot.addEventListener("pointerleave", () => { hover = null; drawArrows(); });
                colEl.appendChild(slot);
            }
        });
        drawArrows();
    }

    async function fillSlot(c, r) {
        if (busy) return;
        busy = true;
        try {
            const cv = await captureCard();
            stage.style.setProperty("--card-aspect", cv.width / cv.height);
            slots[c][r] = cv;
            render();
        } finally {
            busy = false;
        }
    }

    // ---------- Connections ----------
    // Every card in a tier gets a parent in the previous tier: the card closest to it vertically.
    // A single card therefore fans out to everything in the next tier, and equal tiers line up
    // row-to-row. If two cards are equally close (e.g. 2 slots feeding 1), BOTH connect, one with a
    // down-elbow and one with an up-elbow, which merge into a single arrowhead.
    function getEdges(rects) {
        const edges = [];
        const has = new Set();
        const add = (fc, fr, tr) => {
            const key = fc + "-" + fr + "-" + tr;
            if (!has.has(key)) { has.add(key); edges.push({ fc, fr, tc: fc + 1, tr }); }
        };
        for (let c = 0; c < NUM_COLS - 1; c++) {
            const srcs = rects[c], dsts = rects[c + 1];
            // 1) every card gets its closest card(s) in the previous tier as parent
            dsts.forEach((d, j) => {
                const dists = srcs.map(s => Math.abs(s.cy - d.cy));
                const best = Math.min(...dists);
                dists.forEach((dist, i) => { if (dist <= best + 2) add(c, i, j); });
            });
            // 2) any card left without a child connects to its closest card(s) in the next tier
            srcs.forEach((s, i) => {
                if (edges.some(e => e.fc === c && e.fr === i)) return;
                const dists = dsts.map(d => Math.abs(s.cy - d.cy));
                const best = Math.min(...dists);
                dists.forEach((dist, j) => { if (dist <= best + 2) add(c, i, j); });
            });
        }
        return edges;
    }

    // All edges leading back from the hovered card to the first tier
    function pathFor(node, edges) {
        const active = new Set();
        const stack = [node];
        while (stack.length) {
            const n = stack.pop();
            edges.forEach((e, idx) => {
                if (e.tc === n.c && e.tr === n.r && !active.has(idx)) {
                    active.add(idx);
                    stack.push({ c: e.fc, r: e.fr });
                }
            });
        }
        return active;
    }

    // ---------- Drawing arrows (canvas, so html2canvas can capture them) ----------
    function nineSlice(ctx, img, slice, dx, dy, dw, dh, s) {
        const sw = img.naturalWidth, sh = img.naturalHeight;
        const [t, r, b, l] = slice;
        const sx = [0, l, sw - r, sw];
        const sy = [0, t, sh - b, sh];
        const ddx = [0, l * s, dw - r * s, dw];
        const ddy = [0, t * s, dh - b * s, dh];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const w = sx[i + 1] - sx[i], h = sy[j + 1] - sy[j];
                const w2 = ddx[i + 1] - ddx[i], h2 = ddy[j + 1] - ddy[j];
                if (w <= 0 || h <= 0 || w2 <= 0 || h2 <= 0) continue;
                ctx.drawImage(img, sx[i], sy[j], w, h, dx + ddx[i], dy + ddy[j], w2, h2);
            }
        }
    }

    function slotRects() {
        const sr = stage.getBoundingClientRect();
        return colEls.map(colEl => Array.from(colEl.children).map(el => {
            const b = el.getBoundingClientRect();
            return {
                left: b.left - sr.left, right: b.right - sr.left,
                top: b.top - sr.top, bottom: b.bottom - sr.top,
                cx: (b.left + b.right) / 2 - sr.left, cy: (b.top + b.bottom) / 2 - sr.top,
            };
        }));
    }

    function drawArrows() {
        const W = stage.clientWidth, H = stage.clientHeight;
        const q = Math.max(window.devicePixelRatio || 1, 2);
        if (arrowCanvas.width !== Math.round(W * q) || arrowCanvas.height !== Math.round(H * q)) {
            arrowCanvas.width = Math.round(W * q);
            arrowCanvas.height = Math.round(H * q);
            arrowCanvas.style.width = W + "px";
            arrowCanvas.style.height = H + "px";
        }
        const ctx = arrowCanvas.getContext("2d");
        ctx.setTransform(q, 0, 0, q, 0, 0);
        ctx.clearRect(0, 0, W, H);

        const rects = slotRects();
        const edges = getEdges(rects);
        const active = hover ? pathFor(hover, edges) : new Set();

        // inactive first, glowing ones on top
        const order = edges.map((e, i) => i).sort((a, b) => active.has(a) - active.has(b));
        for (const idx of order) {
            const e = edges[idx];
            const src = rects[e.fc][e.fr], dst = rects[e.tc][e.tr];
            if (!src || !dst) continue;
            const on = active.has(idx);
            const sE = (dst.left - src.left) / 190;   // scale used by the elbow arrows
            let kind = "straight";
            if (src.cy - dst.cy >= 94 * sE) kind = "up";
            else if (dst.cy - src.cy >= 94 * sE) kind = "down";
            const s = sE;

            const A = ARROWS[kind];
            const img = imgs[kind][on ? "on" : "off"];
            if (!img.complete || !img.naturalWidth) continue;

            let x, y, w, h;
            if (kind === "straight") {
                // aim at the middle of the target card when the source card reaches that high/low
                const lo = Math.max(src.top, dst.top), hi = Math.min(src.bottom, dst.bottom);
                const inside = dst.cy > src.top + 10 && dst.cy < src.bottom - 10;
                const cy = inside ? dst.cy : (hi > lo ? (lo + hi) / 2 : dst.cy);
                // same scale as the elbows, natural proportions, tail tucked behind the source card
                w = 178 * s; h = STRAIGHT_H * s;
                x = dst.left - w; y = cy - h / 2;
            } else if (kind === "up") {
                // stub runs up from behind the source card, shaft ends at the target's middle
                x = src.left; w = dst.left - x;
                y = dst.cy - A.tip * s; h = src.cy - y;
            } else {
                x = src.left; w = dst.left - x;
                y = src.cy;             h = dst.cy + A.tip * s - y;
            }

            ctx.save();
            if (on) {
                ctx.shadowColor = "rgba(255, 235, 60, 1)";
                ctx.shadowBlur = 14 * q;
                // shadowBlur ignores the transform, so draw in device pixels
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(q, q);
            }
            const paint = () => kind === "straight"
                ? ctx.drawImage(img, x, y, w, h)
                : nineSlice(ctx, img, A.slice, x, y, w, h, s);
            paint();
            if (on) paint(); // second pass = stronger glow
            ctx.restore();
        }
    }

    new ResizeObserver(drawArrows).observe(stage);
    bgImg.addEventListener("load", drawArrows);

    // ---------- Download ----------
    async function downloadStage() {
        hover = null;
        drawArrows();
        const scale = Math.min(4, Math.max(1, (bgImg.naturalWidth || stage.clientWidth) / stage.clientWidth));
        let canvas;
        try {
          canvas = await html2canvas(stage, {
            backgroundColor: null,
            scale,
            onclone: doc => {
                const st = doc.querySelector(".sp-stage");
                if (st) st.classList.add("exporting");
            },
          });
          var url = canvas.toDataURL("image/png");
        } catch (err) {
            console.error(err);
            alert("Couldn't export the image. If you opened index.html straight from disk (file://), the browser blocks this - run the page from a local server instead (e.g. VS Code Live Server, or 'python -m http.server').");
            return;
        }
        const link = document.createElement("a");
        link.download = "spellements.png";
        link.href = url;
        link.click();
    }

    render();
})();