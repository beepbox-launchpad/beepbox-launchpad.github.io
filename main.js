import { createMods, getMods } from "./createMods.js";
import { searchForMod } from "./searching.js";
import { HTML } from "./imperative-html/elements-strict.js";
import { setTheme, _themeStyleElement } from "./themes.js"
import { preferencesPrompt, setPreferedTab, setPromptOpacity, currentView, switchView } from "./preferences.js";
const { select, option, div } = HTML;

const sorterValues = ["name", "date", "relevant"];

createSortbar();

const Mods = await getMods();
window.Mods = Mods;

createMods(Mods, "relevant", false);
document.getElementById("prompt").appendChild(preferencesPrompt);

if (window.localStorage.getItem("promptOpacity") != null) {
    setPromptOpacity(Number(window.localStorage.getItem("promptOpacity")));
    document.getElementById("promptOpacitySlider").value = Number(window.localStorage.getItem("promptOpacity"));
} 

if (window.localStorage.getItem("setView") != null) {
    document.getElementById("setViewSelect").value = window.localStorage.getItem("setView");
} else {
    document.getElementById("setViewSelect").value = "previous";
    window.localStorage.setItem("setView", "previous");
}

var urlThing = String(window.location.hash);
var urlThing2 = urlThing.substring(3);

if (window.location != (location.pathname + "/#s=" || location.pathname)) {
    document.getElementById("searchbar").value = urlThing2;
    searchForMod(urlThing2);
}

window.searchForMod = searchForMod;

function createSortbar() {
    
    const sorter = select({ class: "sort", id: "sorter" });
    const header = document.getElementById("header");
    header.appendChild(buildOptions(sorter, sorterValues));
    sorter.value = 2;
    sorter.addEventListener("change", () => recreateMods());

    const reverseButton = div({ class: "reverseButton down", id: "reverseButton" });
    header.append(reverseButton);
    reverseButton.addEventListener("click", () => {
        if (document.getElementById("reverseButton").classList.contains("down")) {
            reverseButton.classList.remove("down");
            reverseButton.classList.add("up");
        } else {
            reverseButton.classList.remove("up");
            reverseButton.classList.add("down");
        }
        recreateMods();
    });
}

function recreateMods() {
    document.getElementById("prompt").innerHTML = "";
    document.getElementById("modContainer").innerHTML = "";

    createMods(Mods, sorterValues[document.getElementById("sorter").value], document.getElementById("reverseButton").classList.contains("up"));
    document.getElementById("prompt").appendChild(preferencesPrompt);

    if (window.localStorage.getItem("promptOpacity") != null) {
    setPromptOpacity(Number(window.localStorage.getItem("promptOpacity")));
    document.getElementById("promptOpacitySlider").value = Number(window.localStorage.getItem("promptOpacity"));
    } 

    if (window.localStorage.getItem("setView") != null) {
        document.getElementById("setViewSelect").value = window.localStorage.getItem("setView");
    } else {
        document.getElementById("setViewSelect").value = "previous";
        window.localStorage.setItem("setView", "previous");
    }

    searchForMod(document.getElementById("searchbar").value);

    if (currentView == 2) {
        switchView(2);
        // console.log("switching view: "+currentView)
    }
}

window.switchView = switchView;
window.setPromptOpacity = setPromptOpacity;
window.setPreferedTab = setPreferedTab;
window.setTheme = setTheme;

export function buildOptions(menu, items) {
    for (let index = 0; index < items.length; index++) {
        menu.appendChild(option({ value: index }, items[index]));
    }
    return menu;
}

if (window.localStorage.getItem("colorTheme") != null) {
    document.getElementById("themeSelect").value = window.localStorage.getItem("colorTheme");
    setTheme(window.localStorage.getItem("colorTheme"));
} else {
    document.getElementById("themeSelect").value = "dark";
    window.localStorage.setItem("colorTheme", "dark");
}

if (window.localStorage.getItem("setView") != null) {
    if (window.localStorage.getItem("setView") == "previous") {
        if (window.localStorage.getItem("previousView") != null) {
            switchView(Number(window.localStorage.getItem("previousView")));
        } else {
            switchView(1);
        }
    } else if (window.localStorage.getItem("setView") == "mods") {
        switchView(1);
    } else if (window.localStorage.getItem("setView") == "favs") {
        switchView(2);
    }
} else {
    window.localStorage.setItem("setView", "previous");
    switchView(1);
}