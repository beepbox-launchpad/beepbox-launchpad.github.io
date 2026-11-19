import { HTML } from "./imperative-html/elements-strict";
// import { mods } from "./mods.js";
import { favoritesList } from "./createMods";
import { searchForMods, setAndReturnTagsList } from "./searching";
import { setTheme } from "./themes";
const { select, option, div, h2, button, input } = HTML;

export let currentView: number = 1;

export function changeCurrentViewNum(value: number) {
    currentView = value;
}  

export function setPreferedTab(value: "previous" | "mods" | "favs") {
    window.localStorage.setItem("setView", value);
}

export function setPromptOpacity(value: string) {
    window.localStorage.setItem("promptOpacity", value);
    document.getElementById("promptContainerBG")!.style.opacity = window.localStorage.getItem("promptOpacity")!;
}

const setList: string[] = setAndReturnTagsList();

export function switchView(view: number) {
    switch(view) {
        case 1: // default
            const search: string = (document.getElementById("searchbar") as HTMLInputElement).value;
            if (search != "") {
                searchForMods(search);
            } else {
                for (let i = 0; i < setList.length; i++) {
                    if (!setList[i].includes("#")) {
                        document.getElementById(String(setList[i]))!.style.display = "";
                    }
                }
            }

            document.getElementById("modsListButton")!.style.filter = "brightness(150%)";
            document.getElementById("favoritesListButton")!.style.filter = "";
            document.getElementById("comingSoon")!.style.display = "flex";
            document.getElementById("noFavorites")!.style.display = "none";
            break;
        case 2: // favorites
            if (favoritesList.length > 0) {
                for (let i = 0; i < setList.length; i++) {
                    if (!setList[i].includes("#")) {
                        for (let k: number = 0; k < favoritesList.length; k++) {
                            if (favoritesList.includes(setList[i])) {
                                document.getElementById(String(setList[i]))!.style.display = "";
                                //console.log("setList["+i+"]: "+ setList[i]+"; setList["+k+"]: "+ favoritesList[k]+"; Favorited");
                            } else {
                                document.getElementById(String(setList[i]))!.style.display = "none";
                                //console.log("setList["+i+"]: "+ setList[i]+"; setList["+k+"]: "+ favoritesList[k]+"; Not Favorited");
                            }
                            
                        }
                    }
                }
                document.getElementById("noFavorites")!.style.display = "none";
            } else {
                for (let i = 0; i < setList.length; i++) {
                    if (!setList[i].includes("#")) {
                    document.getElementById(String(setList[i]))!.style.display = "none";
                    }
                }
                document.getElementById("noFavorites")!.style.display = "";
            }
            document.getElementById("modsListButton")!.style.filter = "";
            document.getElementById("favoritesListButton")!.style.filter = "brightness(150%)";
            document.getElementById("comingSoon")!.style.display = "none";
            break;
    }

    window.localStorage.setItem("previousView", String(view));
    changeCurrentViewNum(view);
}

const setViewSelect: HTMLSelectElement = select({class:"selectRow", id:"setViewSelect", style:"width: 128px;", value:"previous" },
    option({value:"previous"}, "Previous"),
    option({value:"mods"}, "Mods"),
    option({value:"favs"}, "Favorites")
);
setViewSelect.onchange = (event) => setPreferedTab((event.target as HTMLSelectElement).value as "previous" | "mods" | "favs");

const setThemeSelect: HTMLSelectElement = select({class:"selectRow", id:"themeSelect", style:"width: 128px;", value:"dark" },
    option({value:"dark"}, "Dark"),
    option({value:"light"}, "Light"),
    option({value:"midnight"}, "Midnight"),
    option({value:"beepbox"}, "BeepBox"),
    option({value:"jummbox"}, "JummBox"),
    option({value:"abyssbox"}, "AbyssBox"),
    option({value:"slarmoosbox"}, "SlarmoosBox"),
);
setThemeSelect.onchange = (event) => setTheme((event.target as HTMLSelectElement).value);

const promptOpacitySlider: HTMLInputElement = input({ id: "promptOpacitySlider", style: "width: 128px;align-self: center;", type: "range", min: "0", max: "1", step: "0.1", value: 0.2 });
promptOpacitySlider.onchange = (event) => setPromptOpacity((event.target as HTMLInputElement).value);

export const preferencesPrompt: HTMLDivElement = div({class:"preferences", id:"preferencesPrompt", style:"display: none; flex-direction: column;"},
    div({class:"promptTitle"},
        h2({class:"BeepBoxTitle", style:"margin-bottom: 0.5em;"}, "Preferences:")
    ),
    div({style:"margin-bottom: 0.5em;display: flex;flex-direction: column;gap: 15px;"},
        div({style:"display: flex;flex-direction: column;"},
            "Starting Tab:",
            div({class:"selectContainer", style:"align-self: center; position: relative;"},
                setViewSelect,
            )
        ),
        div({style:"display: flex;flex-direction: column;"},
            "Unfocused Prompt Opacity:",
            promptOpacitySlider
        ),
        div({style:"display: flex;flex-direction: column;"},
            "Theme:",
            div({class:"selectContainer", style:"align-self: center; position: relative;"},
                setThemeSelect
            )
        )
    ),
    button({class:"cancelButton", onclick:"closePrompt(`preferencesPrompt`)"})
);

