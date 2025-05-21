import { HTML } from "./imperative-html/elements-strict.js";
import { searchForMod } from "./searching.js";
const { select, option, div, h2, button, input } = HTML;

export let currentView = 1;

export function changeCurrentViewNum(value) {
    currentView = value;
}  

export function setPreferedTab(value) {
    window.localStorage.setItem("setView", value);
}

export function setPromptOpacity(value) {
    window.localStorage.setItem("promptOpacity", value);
    document.getElementById("promptContainerBG").style.opacity = Number(window.localStorage.getItem("promptOpacity"));
}

export function switchView(view) {
    switch(view) {
        case 1: // default
        searchForMod(document.getElementById("searchbar").value);
        // for (let i = 0; i < setList.length; i++) {
        //     if (!setList[i].includes("#")) {
        //         document.getElementById(String(setList[i])).style.display = "";
        //     }
        // }

        document.getElementById("modsListButton").style.filter = "brightness(150%)";
        document.getElementById("favoritesListButton").style.filter = "";
        document.getElementById("comingSoon").style.display = "";
        break;
        case 2: // favorites
        if (favoritesList.length > 0) {
            searchForMod(document.getElementById("searchbar").value, favoritesList);
            // for (let i = 0; i < setList.length; i++) {
            //     if (!setList[i].includes("#")) {
            //         for (var k = 0; k < favoritesList.length; k++) {

            //             if (favoritesList.includes(setList[i])) {
            //                 // document.getElementById(String(setList[i])).style.display = "";
            //                 //console.log("setList["+i+"]: "+ setList[i]+"; setList["+k+"]: "+ favoritesList[k]+"; Favorited");
            //             } else {
            //                 // document.getElementById(String(setList[i])).style.display = "none";
            //                 //console.log("setList["+i+"]: "+ setList[i]+"; setList["+k+"]: "+ favoritesList[k]+"; Not Favorited");
            //             }
                        
            //         }
            //     }
            // }
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
    changeCurrentViewNum(view);
}

const setViewSelect = select({class:"selectRow", id:"setViewSelect", style:"width: 128px;", value:"previous", onchange:"setPreferedTab(value)"},
    option({value:"previous"}, "Previous"),
    option({value:"mods"}, "Mods"),
    option({value:"favs"}, "Favorites")
);

const setThemeSelect = select({class:"selectRow", id:"themeSelect", style:"width: 128px;", value:"dark", onchange:"setTheme(value)"},
    option({value:"dark"}, "Dark"),
    option({value:"light"}, "Light"),
    option({value:"midnight"}, "Midnight"),
    option({value:"beepbox"}, "BeepBox"),
    option({value:"jummbox"}, "JummBox"),
    option({value:"abyssbox"}, "AbyssBox"),
    option({value:"slarmoosbox"}, "SlarmoosBox"),
);

const promptOpacitySlider = input({id:"promptOpacitySlider", style:"width: 128px;align-self: center;", type:"range", min:"0", max:"1", step:"0.1", value:0.2, onchange:"setPromptOpacity(value)"});

export const preferencesPrompt = div({class:"preferences", id:"preferencesPrompt", style:"display: none; flex-direction: column;"},
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

