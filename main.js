import { createMods } from "./createMods.js";
import { searchForMod } from "./searching.js";
import { HTML } from "./imperative-html/elements-strict.js";
const { select, option } = HTML;

const sorterValues = ["name", "date", "relevant"];

createSortbar();

await createMods("relevant");

var urlThing = String(window.location.hash);
var urlThing2 = urlThing.substring(3);

if (window.location != (location.pathname + "/#s=" || location.pathname)) {
    document.getElementById("searchbar").value = urlThing2;
    searchForMod(urlThing2);
}

window.searchForMod = searchForMod;

function createSortbar() {
    
    const sorter = select({ class: "sort", id:"sorter" });
    document.getElementById("header").appendChild(buildOptions(sorter, sorterValues));
    sorter.value = 2;
    sorter.addEventListener("change", () => recreateMods());
    
}

function recreateMods() {
    document.getElementById("prompt").innerHTML = "";
    document.getElementById("modContainer").innerHTML = "";

    createMods(sorterValues[document.getElementById("sorter").value]);
}

export function buildOptions(menu, items) {
    for (let index = 0; index < items.length; index++) {
        menu.appendChild(option({ value: index }, items[index]));
    }
    return menu;
}