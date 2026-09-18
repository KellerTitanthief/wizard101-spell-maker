let cardSchool = "Balance";
let cardRank = "0";
let cardName = "Spell";
let pipCount = 0;

const schools = [
    { name: "fire", color: "rgb(165, 24, 24)" },
    { name: "ice", color: "rgb(5, 126, 219)" },
    { name: "storm", color: "rgb(123, 37, 140)" },
    { name: "life", color: "rgb(3, 178, 88)" },
    { name: "myth", color: "blue" },
    { name: "death", color: "rgb(74, 74, 71)" },
    { name: "balance", color: "rgb(173, 156, 148)" },
];

const schools2 = [
    { name: "sun", color: "rgb(192, 145, 0)" },
    { name: "star", color: "rgb(181, 191, 117)" },
    { name: "moon", color: "rgb(143, 170, 184)" },
    { name: "shadow", color: "rgb(57, 57, 66)" },
];

const others = [
    { name: "gardening", color: "rgb(49, 121, 41)" },
    { name: "castle", color: "rgb(87, 83, 84)" },
    { name: "reagent", color: "rgb(57, 61, 16)" },
    { name: "fishing", color: "rgb(51, 87, 137)" },
    { name: "spellement", color: "rgb(90, 65, 8)" },
    { name: "snack", color: "rgb(22, 67, 59)" },
    { name: "beastmoon", color: "rgb(0, 170, 178)" },
    { name: "item", color: "rgb(140, 140, 222)" },
    { name: "treasure", color: "rgb(244, 231, 96)" },
];

const bankIcons = [
    { name: "disabled", },
    { name: "universal", },
    { name: "fist", },
    { name: "hand", },
    { name: "manipulation", },
    { name: "storm", },
    { name: "fire", },
    { name: "ice", },
    { name: "death", },
    { name: "life", },
    { name: "myth", },
    { name: "balance", },
    { name: "sun", },
    { name: "star", },
    { name: "moon", },
    { name: "shadow", },
    { name: "gardening", },
    { name: "fish", },
    { name: "friend", },
    { name: "caster", },
    { name: "selectfriend", },
    { name: "friends", },
    { name: "friends2", },
    { name: "enemy", },
    { name: "selectenemy", },
    { name: "enemies", },
    { name: "enemies2", },
    { name: "heal", },
    { name: "afterlife", },
    { name: "steal", },
    { name: "drainordmg", },
    { name: "charm", },
    { name: "protectedcharm", },
    { name: "curse", },
    { name: "protectedcurse", },
    { name: "ward", },
    { name: "protectedward", },
    { name: "jinx", },
    { name: "protectedjinx", },
    { name: "absorb", },
    { name: "outgoing", },
    { name: "incoming", },
    { name: "pip", },
    { name: "powerpip", },
    { name: "stormpip", },
    { name: "stormpip2" },
    { name: "firepip", },
    { name: "firepip2", },
    { name: "icepip", },
    { name: "icepip2" },
    { name: "deathpip", },
    { name: "deathpip2" },
    { name: "lifepip", },
    { name: "lifepip2" },
    { name: "mythpip", },
    { name: "mythpip2" },
    { name: "balancepip", },
    { name: "balancepip2" },
    { name: "shadowpip", },
    { name: "shadowpip2" },
    { name: "pact", },
    { name: "creature", },
    { name: "shadowminion", },
    { name: "dot", },
    { name: "protecteddot", },
    { name: "hot", },
    { name: "protectedhot", },
    { name: "bomb", },
    { name: "protectedbomb", },
    { name: "dispel", },
    { name: "stun", },
    { name: "stunresist", },
    { name: "threat", },
    { name: "round", },
    { name: "minion", },
    { name: "aura", },
    { name: "harmfulaura", },
    { name: "elemental", },
    { name: "spiritual", },
    { name: "chromaticcaster", },
    { name: "chromatictarget", },
    { name: "pacify", },
    { name: "pierce", },
    { name: "resist", },
    { name: "criticalblock", },
    { name: "critical", },
    { name: "pipconversion", },
    { name: "random", },
    { name: "flatresist", },
    { name: "speed", },
    { name: "agility", },
    { name: "fishingluck", },
    { name: "health", },
    { name: "mana", },
    { name: "energy", },
    { name: "hoe", },
    { name: "growing", },
    { name: "pests", },
    { name: "soil", },
    { name: "happiness", },
    { name: "intellect", },
    { name: "strength", },
    { name: "will", },
    { name: "power", },
    { name: "accuracy", },
    { name: "polymorph", },
    { name: "enchant", },
    { name: "mutation", },
    { name: "pvponly" },
    { name: "nopvp" },
    { name: "pvplevel" },
];

const restrictIcons = [
    { name: "universal" },
    { name: "disabled" },
    { name: "pvponly" },
    { name: "nopvp" },
    { name: "onecopy" },
    { name: "pvplevel" },
]

const presetImages = [
    { name: "deathblade", },
    { name: "fireblade", },
    { name: "stormblade", },
    { name: "iceblade", },
    { name: "lifeblade", },
    { name: "balanceblade", },
    { name: "mythblade", },
    { name: "stormshield", },
    { name: "snowshield", },
    { name: "fireshield", },
    { name: "skeletalpirate", },
    { name: "strangle", },
    { name: "deathspear", },
    { name: "stormspear", },
    { name: "lifespear", },
    { name: "mythspear", },
    { name: "icespear", },
    { name: "balancespear", },
    { name: "firespear", },
    { name: "lightningstrike", },
    { name: "weakness", },
    { name: "precision", },
    { name: "blackmantle", },
    { name: "bladestorm", },
    { name: "spiritarmor", },
    { name: "guidinglight", },
    { name: "snowserpent", },
    { name: "primordial", },
    { name: "ghoul", },
    { name: "vampire", },
    { name: "banshee", },
    { name: "dryad", },
    { name: "sprite", },
    { name: "pixie", },
    { name: "triton", },
    { name: "unicorn", },
    { name: "goldskeleton" },
    { name: "bloodbat" },
    { name: "jacquesscratches" },
    { name: "meowiarty" },
    { name: "catmime" },
    { name: "catburglar" },
    { name: "krokankhamun" },
    { name: "nirini" },
    { name: "cyclops" },
    { name: "heckhound" },
    { name: "heckhound2" },
    { name: "humongofrog" },
    { name: "ninjapig" },
    { name: "stormshark" },
    { name: "thundersnake" },
    { name: "lightningbats" },
    { name: "gobbler" },
    { name: "troll" },
    { name: "troll2" },
    { name: "lostsoul" },
    { name: "stormzilla" },
    { name: "wraith" },
    { name: "goatmonk" },
    { name: "malistaire" },
    { name: "sliver" },
    { name: "halston" },
    { name: "iceambrose" },
    { name: "alhazred" },
    { name: "dalia" },
    { name: "lydia1" },
    { name: "lydia2" },
    { name: "grandmotherraven" },
    { name: "draconian" },
    { name: "sherlock" },
    { name: "dworgyn" },
    { name: "diego" },
    { name: "harold" },
    { name: "boy" },
];

// For the circles and stuff
const container = document.getElementById("circle-container");
const container2 = document.getElementById("circle-container2");
const container3 = document.getElementById("circle-container3");
const displayCard = document.getElementById("display-card");
const card = document.getElementById("card-frame");
const cardSpiral = document.getElementById("card-spiral");

// I don't remember
const nameInput = document.getElementById("name-input");
const nameplate = document.getElementById("nameplate");

// Slider variables
const artInput = document.getElementById("art-input");
const userImage = document.getElementById("user-image");
const xSlider = document.getElementById("art-x");
const ySlider = document.getElementById("art-y");
const scaleSlider = document.getElementById("art-scale");
const rotateSlider = document.getElementById("art-rotate");
const mirror = document.getElementById("mirror");
let mirrored = false;

// Icon Bank variables
const iconBank = document.getElementById("icon-bank");
const targetSelect = document.getElementById("target-select");
const iconSchool = document.getElementById("school");
const iconType = document.getElementById("type");
const restrictionBank = document.getElementById("restriction-bank");
const centralRestrict = document.getElementById("central-restrict");
const rightRestrict = document.getElementById("right-restrict");

// Description colour
const swatchBlack = document.getElementById("swatch-black");
const swatchPurple = document.getElementById("swatch-purple");
const swatchWhite = document.getElementById("swatch-white");
const customColorPicker = document.getElementById("custom-color-picker");

// Image bank variables
const presetBank = document.getElementById("preset-image-bank");

// Weaving variables
const weavingSelect = document.getElementById("weaving-select");
const weavingDisplay = document.getElementById("weaving-display");

// Helper functions
function fitTextToBox(element, maxSize, minSize = 40) {
    let low = minSize;
    let high = maxSize;
    let best = minSize;

    // Binary search
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        element.style.fontSize = mid + "%";

        const fits = element.scrollWidth <= element.clientWidth &&
                     element.scrollHeight <= element.clientHeight;

        if (fits) {
            best = mid;      // this size works — try something bigger
            low = mid + 1;
        } else {
            high = mid - 1;  // too big — try something smaller
        }
    }

    element.style.fontSize = best + "%";
}

function updateImageTransform() {
    const xOffset = xSlider.value - 50;
    const yOffset = (ySlider.value - 50) * -1;
    const scale = scaleSlider.value / 100;
    const rotate = rotateSlider.value

    const mirrorScale = mirrored ? -1 : 1;
    userImage.style.transform = `translate(${xOffset}%, ${yOffset}%) scaleX(${mirrorScale}) scale(${scale}) rotate(${rotate}deg)`;
}

function accuracyRecolour() {
    if (cardSchool === "gardening" || cardSchool === "fishing") {
        accuracyplate.style.color = "black";
        accuracyplate.style.textShadow = "1px 1px black";
    } else {
        accuracyplate.style.color = "yellow";
        accuracyplate.style.textShadow = "2px 2px black";
    }
};

function spiralResize() {
    if (cardSchool === "snack" || cardSchool === "reagent") {
        cardSpiral.style.height = "110%";
        cardSpiral.style.width = "110%";
        cardSpiral.style.top = "-15%"
    } else {
        cardSpiral.style.height = "100%"
        cardSpiral.style.width = "90%";
        cardSpiral.style.top = "-13%"
    }
}

nameInput.addEventListener("input", function() {
    nameplate.textContent = nameInput.value;
    cardName = nameInput.value;
    fitTextToBox(nameplate, 113);
});

// Text related functions
const accuracyInput = document.getElementById("accuracy-input");
const accuracyplate = document.getElementById("accuracy");

accuracyInput.addEventListener("input", function() {
    accuracyplate.textContent = accuracyInput.value;
    accuracyRecolour();
    fitTextToBox(accuracyplate, 113);
});

const rankInput = document.getElementById("rank-input");
const rankplate = document.getElementById("rank");

rankInput.addEventListener("input", function() {
    rankplate.textContent = rankInput.value;
    cardRank = rankInput.value
});

const descInput = document.getElementById("description-input");
const description = document.getElementById("description");

descInput.addEventListener("input", function() {
    description.innerHTML = descInput.innerHTML;
    fitTextToBox(description, 113);
});

function circleMaker(school, place) {
    const circle = document.createElement("span");
    circle.className = "circle";
    circle.id = `${school.name}-circle`;
    circle.style.backgroundColor = school.color
    circle.title = `${school.name}`

    circle.addEventListener("click", function() {
        displayCard.src = `SpellBack/${school.name}.png`
        displayCard.alt = `${school.name} card`
        cardSchool = school.name
        accuracyRecolour();
        spiralResize();
    });

    place.appendChild(circle);
};

// Circle maker functions
schools.forEach(function(school) {
    circleMaker(school, container);
});

schools2.forEach(function(school) {
    circleMaker(school, container2);
});

others.forEach(function(school) {
    circleMaker(school, container3);
});

// Card download function
async function renderDiagonal(diagonal) {
    const style = getComputedStyle(diagonal);
    const background = style.backgroundImage;

    const match = background.match(/url\(["']?(.*?)["']?\)/);

    if (!match) {
        return null;
    }

    const image = new Image();

    image.src = new URL(match[1], document.baseURI).href;

    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
    });

    const width = diagonal.offsetWidth;
    const height = diagonal.offsetHeight;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    // Recreate background-size: cover
    const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight
    );

    const imageWidth = image.naturalWidth * scale;
    const imageHeight = image.naturalHeight * scale;

    const x = (width - imageWidth) / 2;
    const y = (height - imageHeight) / 2;

    // Recreate the CSS polygon
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width * 0.9, 0);
    ctx.lineTo(0, height * 1.1);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
        image,
        x,
        y,
        imageWidth,
        imageHeight
    );

    return canvas.toDataURL("image/png");
}


async function downloadCard() {
    const card = document.getElementById("card-frame");
    const diagonal = document.getElementById("diagonal");

    let diagonalImage = null;

    if (diagonal) {
        diagonalImage = await renderDiagonal(diagonal);
    }

    const canvas = await html2canvas(card, {
        backgroundColor: null,
        scale: 1,

        onclone: function(clonedDoc) {
            const clonedImage =
                clonedDoc.getElementById("display-card");

            clonedImage.style.borderColor = "transparent";
            clonedImage.style.borderRadius = "0";

            if (diagonalImage) {
                const clonedDiagonal =
                    clonedDoc.getElementById("diagonal");

                clonedDiagonal.style.clipPath = "none";
                clonedDiagonal.style.backgroundImage =
                    `url("${diagonalImage}")`;

                clonedDiagonal.style.backgroundSize = "100% 100%";
                clonedDiagonal.style.backgroundPosition = "0 0";
            }
        }
    });

    const link = document.createElement("a");

    link.download = `${cardRank}${cardSchool}${cardName}.png`;
    link.href = canvas.toDataURL("image/png");

    link.click();
}

card.addEventListener("click", downloadCard);

// Slider function
function artReset() {
    xSlider.value = 50;
    ySlider.value = 50;
    scaleSlider.value = 100;
    rotateSlider.value = 0;
    mirrored = false;
    userImage.style.transform = `scaleX(1)`;
};

artInput.addEventListener("change", function() {
    const file = artInput.files[0];
    if (file) {
        userImage.style.backgroundImage = `url("${URL.createObjectURL(file)}")`;
        artReset();
        updateImageTransform();
    }
});

function mirrorImage() {
    if (mirrored == false)
    {
        userImage.style.transform += `scaleX(-1)`;
        mirrored = true;
    } else {
        userImage.style.transform += `scaleX(1)`;
        mirrored = false;
    }
}

mirror.addEventListener("click", mirrorImage);
xSlider.addEventListener("input", updateImageTransform);
ySlider.addEventListener("input", updateImageTransform);
scaleSlider.addEventListener("input", updateImageTransform);
rotateSlider.addEventListener("input", updateImageTransform);

// Icon bank functions
function handleBankIconClick(icon) {
    const target = targetSelect.value;

    if (target === "description") {
        descInput.focus();
        document.execCommand("insertHTML", false, `<img src="icons/${icon.name}.png" class="inline-icon">`);
        description.innerHTML = descInput.innerHTML;
    } else if (target === "school") {
        iconSchool.style.backgroundImage = icon.name === "disabled" ? "none" : `url("icons/${icon.name}.png")`;
    } else if (target === "pip") {
        if (icon.name === "disabled" && pipCount > 0)
        {
            let pip = document.getElementById(`pip${pipCount}`);
            pip.style.backgroundImage = "none";
            pipCount -= 1;
        } else if (pipCount < 3) {
            pipCount += 1;
            let pip = document.getElementById(`pip${pipCount}`);
            console.log(pip);
            pip.style.backgroundImage = `url("icons/${icon.name}.png")`;
        }
    } else if (target === "image") {
        userImage.style.backgroundImage = `url("icons/${icon.name}.png")`;
        artReset();
        updateImageTransform();
    } 
    else if (target === "type") {
        iconType.style.backgroundImage = icon.name === "disabled" ? "none" : `url("icons/${icon.name}.png")`;
    };
};

function bankIconMaker(icon, place) {
    const iconEl = document.createElement("img");
    iconEl.src = `icons/${icon.name}.png`;
    iconEl.className = "bank-icon";
    iconEl.title = icon.name;

    iconEl.addEventListener("mousedown", function(e) {
        e.preventDefault();
    });

    iconEl.addEventListener("click", function() {
        handleBankIconClick(icon);
    });

    place.appendChild(iconEl);
};

bankIcons.forEach(function(icon) {
    bankIconMaker(icon, iconBank);
});

// Description colour changer
const swatches = [swatchBlack, swatchPurple, swatchWhite];

swatches.forEach(function(swatch) {
    swatch.addEventListener("mousedown", function(e) {
        e.preventDefault();
    });
});

function applyDescriptionColor(color) {
    descInput.focus();
    document.execCommand("foreColor", false, color);
}

swatchBlack.addEventListener("click", function() {
    applyDescriptionColor("black");
});

swatchPurple.addEventListener("click", function() {
    applyDescriptionColor("rgb(105, 24, 64)");
});

swatchWhite.addEventListener("click", function() {
    customColorPicker.click();
});

customColorPicker.addEventListener("input", function() {
    applyDescriptionColor(customColorPicker.value);
});

// Image bank scripts
function presetImageMaker(preset, place) {
    const thumb = document.createElement("img");
    thumb.src = `SpellImages/${preset.name}.png`;
    thumb.className = "preset-thumb";
    thumb.title = preset.name;

    thumb.addEventListener("click", function() {
        userImage.style.backgroundImage = `url("SpellImages/${preset.name}.png")`;
        artReset();
        updateImageTransform();
    });

    place.appendChild(thumb);
}

presetImages.forEach(function(preset) {
    presetImageMaker(preset, presetBank);
});

// Weaving related functions
function handleWeaving() {
    const selected = weavingSelect.selectedOptions[0];
    const text = selected.text.toLowerCase();
    const target = weavingSelect.value;
    weavingDisplay.innerHTML = "";
    if (target === "no-weaving") {
        return;
    }
    const reframe = document.createElement("div");
    reframe.id = "diagonal";
    reframe.className = "diagonal";
    reframe.style.backgroundImage = `url("SpellBack/${text}.png")`;
    weavingDisplay.appendChild(reframe);
};

weavingSelect.addEventListener("change", handleWeaving)

// Restriction bank icons
function handleRestrictionIconClick(icon) {
    if (icon.name === "universal") {
        centralRestrict.style.backgroundImage = "none";
        rightRestrict.style.backgroundImage = "none";
    } else if (icon.name === "disabled" || icon.name === "pvponly" || icon.name === "nopvp") {
        centralRestrict.style.backgroundImage = `url("icons/${icon.name}.png")`;
    } else if (icon.name === "onecopy" || icon.name === "pvplevel") {
        rightRestrict.style.backgroundImage = `url("icons/${icon.name}.png")`;
    }
    // centralRestrict.style.backgroundImage = icon.name === "universal" ? "none" : `url("icons/${icon.name}.png")`;
};

function restrictedIconMaker(icon, place) {
    const iconEl = document.createElement("img");
    iconEl.src = `icons/${icon.name}.png`;
    iconEl.className = "restricted-icon";
    iconEl.title = icon.name;

    iconEl.addEventListener("mousedown", function(e) {
        e.preventDefault();
    });

    iconEl.addEventListener("click", function() {
        handleRestrictionIconClick(icon);
    });

    place.appendChild(iconEl);
};

restrictIcons.forEach(function(icon) {
    restrictedIconMaker(icon, restrictionBank);
});