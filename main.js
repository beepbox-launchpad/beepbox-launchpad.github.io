import { createMods, getMods } from "./createMods.js";
import { searchForMod } from "./searching.js";
import { HTML } from "./imperative-html/elements-strict.js";
import { setTheme, _themeStyleElement } from "./themes.js"
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

        function switchView(view) {
            switch(view) {
                case 1: // default
                for (let i = 0; i < setList.length; i++) {
                    if (!setList[i].includes("#")) {
                        document.getElementById(String(setList[i])).style.display = "";
                    }
                }

                document.getElementById("modsListButton").style.filter = "brightness(150%)";
                document.getElementById("favoritesListButton").style.filter = "";
                document.getElementById("comingSoon").style.display = "";
                break;
                case 2: // favorites
                if (favoritesList.length > 0) {
                    for (let i = 0; i < setList.length; i++) {
                        if (!setList[i].includes("#")) {
                            for (var k = 0; k < favoritesList.length; k++) {
                                if (favoritesList.includes(setList[i])) {
                                    document.getElementById(String(setList[i])).style.display = "";
                                    //console.log("setList["+i+"]: "+ setList[i]+"; setList["+k+"]: "+ favoritesList[k]+"; Favorited");
                                } else {
                                    document.getElementById(String(setList[i])).style.display = "none";
                                    //console.log("setList["+i+"]: "+ setList[i]+"; setList["+k+"]: "+ favoritesList[k]+"; Not Favorited");
                                }

                            }
                        }
                    }
                    document.getElementById("noFavorites").style.display = "none";
                } else {
                    for (let i = 0; i < setList.length; i++) {
                        if (!setList[i].includes("#")) {
                        document.getElementById(String(setList[i])).style.display = "none";
                        }
                    }
                    document.getElementById("noFavorites").style.display = "";
                }
                document.getElementById("modsListButton").style.filter = "";
                document.getElementById("favoritesListButton").style.filter = "brightness(150%)";
                document.getElementById("comingSoon").style.display = "none";
                break;
            }

            window.localStorage.setItem("previousView", view);
        }

function recreateMods() {
    document.getElementById("prompt").innerHTML = "";
    document.getElementById("modContainer").innerHTML = "";

    createMods(Mods, sorterValues[document.getElementById("sorter").value], document.getElementById("reverseButton").classList.contains("up"));
    searchForMod(document.getElementById("searchbar").value);
}

window.switchView = switchView;

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
window.setTheme = setTheme;

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