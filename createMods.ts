import { HTML } from "./imperative-html/elements-strict";
import { calculateNewUpdate } from "./lastUpdate";
import { Mod, Mods as ModsList, altVersion, mods } from "./mods";

const { div, a, button, h2, input } = HTML;

export let favoritesList = new Array();
var storedfavoritesList = localStorage.getItem("favoritesList");
if (storedfavoritesList != null) {
    favoritesList = JSON.parse(storedfavoritesList);
}

export function createMods(method: method, isReversed: boolean) {
    const promptContainer: HTMLDivElement = document.getElementById("prompt") as HTMLDivElement;
    const modContainer: HTMLDivElement = document.getElementById("modContainer") as HTMLDivElement;

    let Mods: Mod[] = ModsList.slice();
    Mods = sortMods(Mods, method, isReversed);
    for (let modNumber in Mods) {
        const modInfo: Mod = Mods[modNumber];
        const modName: string = modInfo.displayName != undefined ? modInfo.displayName : modInfo.id;
        const modDividerImage: string = modInfo.aa == true ? "modDividerImage AA" : "modDividerImage";
        const fontSize: string = modInfo.fontSize == undefined ? "inherit" : modInfo.fontSize;

        let modFavoritesList: mods[] = new Array();
        let modstoredfavoritesList = localStorage.getItem("favoritesList");
        if (modstoredfavoritesList != null) {
            modFavoritesList = JSON.parse(modstoredfavoritesList);
        }

        const updateButton: HTMLButtonElement | "" = modInfo.patchNotes == "" ? "" :
            button({ class: "updateText", id: modInfo.id + "Update", onclick: "goToWebsite('" + modInfo.patchNotes + "')" },
                div({ style: "pointer-events: none;" }, "New Update")
            );
        if (updateButton) {
            updateButton.style.display = calculateNewUpdate(modInfo.id as mods);
        }

        const favoriteButton: HTMLInputElement = input({type:"checkbox", class: "favoriteButton" });
        favoriteButton.checked = Boolean(modFavoritesList.indexOf(modInfo.id as mods) != -1);
        favoriteButton.onclick = () => favoriteBeepmod(modInfo.id as mods)

        const versionText: HTMLDivElement = div({ class: "versionText" },
            div({ style: "margin-top: 2px;" }, modInfo.version)
        );

        const mod: HTMLDivElement = div({ class: "modDivider", id: modInfo.id },
            div({ class: modDividerImage, style: "background-image: url(" + modInfo.image + ") !important;" },
                div({ class: "modDividerGradient" })
            ),
            div({ style: "display: flex;flex-direction: row;/*! width: 100%; */margin-right: 16px;margin-right: 16px;gap: 5px;" },
                div({ style: "text-align: center;/*! width: 100%; */ font-weight: bold; font-size: " + fontSize + "; flex: 3;" }, modName),
                button({ class: "playButton", onclick: "goToWebsite('" + modInfo.website + "')" }, "▶"),
                button({ class: "descButton", onclick: "goToWebsite(`" + modInfo.id + "Prompt`, true)" }, "≡")
            ),
            updateButton,
            favoriteButton,
            versionText
        );

        
            
        modContainer.appendChild(mod);

        const altVersions: altVersion[] = modInfo.alternateVersions || [];

        const alternateVersionTitle: HTMLDivElement | "" = altVersions.length > 0 ?
            div({ class: "promptTitle" },
                h2({ class: modInfo.id + "Title", style: "margin-bottom: 0.5em;" }, "Alternate " + modInfo.id + " Versions:")
            )
            : "";
        let alternateVersions: HTMLDivElement | "" = "";
        if (altVersions.length > 0) {
            const altVersionList: HTMLDivElement[] = [];
            for (let i = 0; i < altVersions.length; i++) {
                altVersionList.push(
                    div({ style: "margin-bottom: 0.5em;" },
                        a({ href: altVersions[i].link, target: "_blank" }, altVersions[i].name)
                    )
                );
            }
            alternateVersions = div({ style: "display: flex; flex-direction: column; align-items: center; margin-bottom: 0.5em;" },
                div( ...altVersionList)
            )
        }
        const testingWarning: HTMLDivElement | "" = modInfo.hasTestingVersion ? div({style: "margin-bottom: 0.5em; font-size: 10px;"}, "Experimental and Testing sites are more likely prone to crashes, issues, and song corruptions, so use with caution.") : "";

        const prompt: HTMLDivElement = div({id: modInfo.id + "Prompt", style: "flex-direction: column;  display: none;" },
            div({ class: "promptTitle" },
                h2({ class: modInfo.id + "Title", style: "margin-bottom: 0.5em;" }, modInfo.id + ":")
            ),
            div({ style: "margin-bottom: 0.5em;" },
                ...parseForUrls(modInfo.description + "")
            ),
            div({style:"margin-bottom: 0.5em;"},
                "You can find " + modInfo.id + "'s ",
                a({href: modInfo.wiki, target: "_blank"}, "Wiki Page"),
                " here. Which contains extensive information about the website."
            ),
            alternateVersionTitle,
            alternateVersions,
            testingWarning,
            button({class:"cancelButton", onclick:"closePrompt(`" + modInfo.id + "Prompt`)"})
        );

        promptContainer.appendChild(prompt);

        if (updateButton != "") { //gets the right spacing between the version text and update button
            updateButton.style.right = versionText.getBoundingClientRect().width + 5 + "px";
        }
    }

    //make special case "mods"
    modContainer.append(div({ id: "comingSoon" }, div({ style: "text-align: center;width: 100%;margin-bottom: 10px;" }, "Coming Soon!")));
    modContainer.append(div({ id: "noResults", style: "display:none; text-align: center;width: 100%; margin-bottom: 10px; font-size: 32px;" }, "No results found"));
    modContainer.append(div({ id: "noFavorites", style: "display:none; text-align: center;width: 100%; margin-bottom: 10px; font-size: 32px;" }, "You haven't favorited anything!"));
}

export const sorterValues = ["name", "date", "order added"] as const;
export type method = typeof sorterValues[number];

function sortMods(Mods: Mod[], method: method, isReversed: boolean): Mod[] {
    let sortedMods: Mod[] = [];
    switch (method) {
        case "name": {
            sortedMods = Mods.sort((modA, modB) => +(modA.id.toLowerCase() > modB.id.toLowerCase()) * 2 - 1);
            break;
        }
        case "date": {
            sortedMods = Mods.sort((modA, modB) => { 
                return +(modA.date.year + modA.date.month / 12 + modA.date.day / 12 / 31 >
                    modB.date.year + modB.date.month / 12 + modB.date.day / 12 / 31) * 2 - 1
            });
            break;
        }
        case "order added": {
            sortedMods = Mods;
            break;
        }
    }
    return isReversed ? sortedMods.reverse() : sortedMods;
}

function parseForUrls(text: string): (string | HTMLAnchorElement)[] {
    const regex1 = /< ?a href\=\"[\w\s:\/\.\@\\\+\=\"]+>(\w| )+<\/a>/gi;
    let urls: string[]  | null = text.match(regex1);
    if (urls == null) return [text];

    let textList: string[] = text.split(regex1);

    urls = urls.filter(match => match.length > 2);
    textList = textList.filter(match => (match.length > 2 || match.includes(",")));

    let parsed: (string | HTMLAnchorElement)[] = [];
    for (let i = 0; i < textList.length; i++) {
        parsed.push(textList[i]);
        if (urls[i]) {
            let url: string = urls[i].match(/https?:\/\/(\w|\.|\/|\@)+/i)![0];
            let link: string = urls[i].match(/>(\w| )+</i)![0].replace(">", "").replace("<", "");
            parsed.push(a({ href: url, target: "_blank" }, link));
        }
    }

    return parsed;
}

function favoriteBeepmod(modName: mods) {
    const index: number = favoritesList.indexOf(modName);
    if (index > -1) {
        favoritesList.splice(index, 1);
    } else {
        favoritesList.push(modName);
    }
    window.localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
}