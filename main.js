import { createMods, getMods } from "./createMods.js";
import { searchForMod } from "./searching.js";
import { HTML } from "./imperative-html/elements-strict.js";
const { select, option, div } = HTML;

const sorterValues = ["name", "date", "relevant"];

createSortbar();

const Mods = await getMods();

createMods(Mods, "relevant", false);

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
    searchForMod(document.getElementById("searchbar").value);
}

export function buildOptions(menu, items) {
    for (let index = 0; index < items.length; index++) {
        menu.appendChild(option({ value: index }, items[index]));
    }
    return menu;
}