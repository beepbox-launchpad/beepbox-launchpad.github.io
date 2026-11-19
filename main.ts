import { createMods, method, sorterValues } from "./createMods";
import { searchForMods } from "./searching";
import { HTML } from "./imperative-html/elements-strict";
import { setTheme, _themeStyleElement } from "./themes"
import { preferencesPrompt, setPromptOpacity, currentView, switchView } from "./preferences";
const { select, option, div } = HTML;

//create sortbar
const sorter: HTMLSelectElement = select({ class: "sort", id: "sorter" });
const header: HTMLDivElement = document.getElementById("sortContainer") as HTMLDivElement;
header.appendChild(buildOptions(sorter, sorterValues.slice()));
sorter.value = "1";
sorter.addEventListener("change", () => recreateMods());

const reverseButton = div({ class: "reverseButton down", id: "reverseButton" });
header.append(reverseButton);
reverseButton.addEventListener("click", () => {
    if (reverseButton.classList.contains("down")) {
        reverseButton.classList.remove("down");
        reverseButton.classList.add("up");
    } else {
        reverseButton.classList.remove("up");
        reverseButton.classList.add("down");
    }
    recreateMods();
});

createMods("date", false);
const promptContainer: HTMLDivElement = document.getElementById("prompt") as HTMLDivElement;
promptContainer.appendChild(preferencesPrompt);

const promptOpacitySlider: HTMLInputElement = document.getElementById("promptOpacitySlider") as HTMLInputElement;
const themeSelect: HTMLSelectElement = document.getElementById("themeSelect") as HTMLSelectElement;
const viewSelect: HTMLInputElement = document.getElementById("setViewSelect") as HTMLInputElement;
const searchbar: HTMLInputElement = document.getElementById("searchbar") as HTMLInputElement;


const opacity: string | null = window.localStorage.getItem("promptOpacity");
if (opacity != null) {
    setPromptOpacity(opacity);
    promptOpacitySlider.value = opacity;
} 

const view: string | null = window.localStorage.getItem("setView");
if (view != null) {
    viewSelect.value = view;
} else {
    viewSelect.value = "previous";
    window.localStorage.setItem("setView", "previous");
}

const urlThing = String(window.location.hash);
const urlThing2 = urlThing.substring(3);

if (urlThing2.length > 0) {
    searchbar.value = decodeURIComponent(urlThing2);
    searchForMods(urlThing2);
    if (currentView == 2) {
        switchView(2);
    }
}

(window as any).searchForMod = () => {
    searchForMods(searchbar.value);
    if (currentView == 2) {
        switchView(2);
    }
};

function recreateMods(): void {
    promptContainer.innerHTML = "";
    document.getElementById("modContainer")!.innerHTML = "";

    createMods(sorterValues[parseInt(sorter.value + "")] as method, reverseButton.classList.contains("up"));
    promptContainer.appendChild(preferencesPrompt);

    const opacity: string | null = window.localStorage.getItem("promptOpacity");
    if (opacity != null) {
        setPromptOpacity(opacity);
        promptOpacitySlider.value = opacity;
    } 

    const view: string | null = window.localStorage.getItem("setView");
    if (view != null) {
        viewSelect.value = view;
    } else {
        viewSelect.value = "previous";
        window.localStorage.setItem("setView", "previous");
    }

    searchForMods(searchbar.value);

    if (currentView == 2) {
        switchView(2);
    }
}

(window as any).switchView = switchView;
(window as any).surpriseMod = () => {
    searchForMods(searchbar.value + " #surprise");
}

export function buildOptions(menu: HTMLSelectElement, items: any[]) {
    for (let index: number = 0; index < items.length; index++) {
        menu.appendChild(option({ value: index }, items[index]));
    }
    return menu;
}
const colorTheme: string | null = window.localStorage.getItem("colorTheme");
if (colorTheme != null) {
    themeSelect.value = colorTheme;
    setTheme(colorTheme);
} else {
    themeSelect.value = "dark";
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