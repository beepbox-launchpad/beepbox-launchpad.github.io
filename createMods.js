import { HTML } from "./imperative-html/elements-strict.js";
import { calculateNewUpdate } from "./lastUpdate.js";

const { div, a, button, h2, input } = HTML;

export function createMods(ModsList, method, isReversed) {
    const promptContainer = document.getElementById("prompt");
    const modContainer = document.getElementById("modContainer");

    let Mods = ModsList.slice();
    Mods = sortMods(Mods, method, isReversed);
    for (let modNumber in Mods) {
        const modInfo = Mods[modNumber];
        const modName = modInfo.displayName != ("" || undefined) ? modInfo.displayName : modInfo.name;
        const modDividerImage = modInfo.aa == "true" ? "modDividerImage AA" : "modDividerImage";
        const fontSize = modInfo.fontSize == ("" || undefined) ? "inherit" : modInfo.fontSize;
        var modFavoritesList = new Array();
        var modstoredfavoritesList = localStorage.getItem("favoritesList");
        if (modstoredfavoritesList != null) {
            modFavoritesList = JSON.parse(modstoredfavoritesList);
        }

        const updateButton = modInfo.patchNotes == "" ? "" :
            button({ class: "updateText", id: modInfo.name + "Update", onclick: "goToWebsite('" + modInfo.patchNotes + "')" },
                div({ style: "pointer-events: none;" }, "New Update")
            );
        if (updateButton) {
            updateButton.style.display = calculateNewUpdate(modInfo.name);
        }

        const favoriteButton = input({type:"checkbox", class: "favoriteButton", onclick: "favoriteBeepmod('" + modInfo.name + "')" });
        favoriteButton.checked = Boolean(modFavoritesList.indexOf(modInfo.name) != -1);

        const versionText = div({ class: "versionText" },
            div({ style: "margin-top: 2px;" }, modInfo.version)
        );

        const mod = div({ class: "modDivider", id: modInfo.name },
            div({ class: modDividerImage, style: "background-image: url(" + modInfo.image + ") !important;" },
                div({ class: "modDividerGradient" })
            ),
            div({ style: "display: flex;flex-direction: row;/*! width: 100%; */margin-right: 16px;margin-right: 16px;gap: 5px;" },
                div({ style: "text-align: center;/*! width: 100%; */ font-weight: bold; font-size: " + fontSize + "; flex: 3;" }, modName),
                button({ class: "playButton", onclick: "goToWebsite('" + modInfo.website + "')" }, "▶"),
                button({ class: "descButton", onclick: "goToWebsite(`" + modInfo.name + "Prompt`, true)" }, "≡")
            ),
            updateButton,
            favoriteButton,
            versionText
        );

        
            
        modContainer.appendChild(mod);

        const alternateVersionTitle = modInfo.alternateVersions.length > 0 ?
            div({ class: "promptTitle" },
                h2({ class: modInfo.name + "Title", style: "margin-bottom: 0.5em;" }, "Alternate " + modInfo.name + " Versions:")
            )
            : "";
        let alternateVersions = "";
        if (modInfo.alternateVersions.length > 0) {
            const altVersionList = [];
            for (let i = 0; i < modInfo.alternateVersions.length; i++) {
                altVersionList.push(
                    div({ style: "margin-bottom: 0.5em;" },
                        a({ href: modInfo.alternateVersions[i].link, target: "_blank" }, modInfo.alternateVersions[i].name)
                    )
                );
            }
            alternateVersions = div({ style: "display: flex; flex-direction: column; align-items: center; margin-bottom: 0.5em;" },
                div( ...altVersionList)
            )
        }
        const testingWarning = modInfo.hasTestingVersion ? div({style: "margin-bottom: 0.5em; font-size: 10px;"}, "Experimental and Testing sites are more likely prone to crashes and issues, so use with caution.") : "";

        const prompt = div({id: modInfo.name + "Prompt", style: "flex-direction: column;  display: none;" },
            div({ class: "promptTitle" },
                h2({ class: modInfo.name + "Title", style: "margin-bottom: 0.5em;" }, modInfo.name + ":")
            ),
            div({ style: "margin-bottom: 0.5em;" },
                ...parseForUrls(modInfo.description + "")
            ),
            div({style:"margin-bottom: 0.5em;"},
                "You can find " + modInfo.name + "'s ",
                a({href: modInfo.wiki, target: "_blank"}, "Wiki Page"),
                " here. Which contains extensive information about the website."
            ),
            alternateVersionTitle,
            alternateVersions,
            testingWarning,
            button({class:"cancelButton", onclick:"closePrompt(`" + modInfo.name + "Prompt`)"})
        );

        promptContainer.appendChild(prompt);

        if (updateButton != "") { //gets the right spacing between the version text and update button
            updateButton.style.right = versionText.getBoundingClientRect().width + 5 + "px";
            console.log(versionText, versionText.getBoundingClientRect())
        }
    }

    //make special case "mods"
    modContainer.append(div({ id: "comingSoon" }, div({ style: "text-align: center;width: 100%;margin-bottom: 10px;" }, "Coming Soon!")));
    modContainer.append(div({ id: "noResults", style: "display:none; text-align: center;width: 100%; margin-bottom: 10px; font-size: 32px;" }, "No results found"));
    modContainer.append(div({ id: "noFavorites", style: "display:none; text-align: center;width: 100%; margin-bottom: 10px; font-size: 32px;" }, "You haven't favorited anything!"));
}

export async function getMods() {
    let response = await fetch("./mods.json");
    return await response.json();
}

function sortMods(Mods, method, isReversed) { //add reverse button later
    let sortedMods = [];
    switch (method) {
        case "name": {
            sortedMods = Mods.sort((modA, modB) => +(modA.name.toLowerCase() > modB.name.toLowerCase()) * 2 - 1);
            break;
        }
        case "date": {
            sortedMods = Mods.sort((modA, modB) => { 
                return +(modA.date.year + modA.date.month / 12 + modA.date.day / 12 / 31 >
                    modB.date.year + modB.date.month / 12 + modB.date.day / 12 / 31) * 2 - 1
            });
            break;
        }
        case "relevant": {
            sortedMods = Mods;
            break;
        }
    }
    return isReversed ? sortedMods.reverse() : sortedMods;
}

function parseForUrls(text) {
    const regex1 = /< ?a href\=\"[\w\s:\/\.\@\\\+\=\"]+>(\w| )+<\/a>/gi;
    let urls = (text).match(regex1);
    if (urls == null) return [text];

    let textList = (text).split(regex1);

    urls = urls.filter(match => match.length > 2);
    textList = textList.filter(match => (match.length > 2 || match.includes(",")));

    let parsed = [];
    for (let i = 0; i < textList.length; i++) {
        parsed.push(textList[i]);
        if (urls[i]) {
            let url = urls[i].match(/https?:\/\/(\w|\.|\/|\@)+/i)[0];
            let link = urls[i].match(/>(\w| )+</i)[0].replace(">", "").replace("<", "");
            parsed.push(a({ href: url, target: "_blank" }, link));
        }
    }

    return parsed;
}