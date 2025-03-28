import { HTML, SVG } from "./node_modules/imperative-html/dist/esm/elements-strict.js";

const { div, a, button, h2 } = HTML;

const promptContainer = document.getElementById("prompt");
const modContainer = document.getElementById("modContainer");

async function getMods() {
    let response = await fetch("./mods.json");
    return await response.json();
}


async function createMods() {
    const Mods = await getMods();
    console.log(Mods);
    for (let modNumber in Mods) {
        const modInfo = Mods[modNumber];

        const updateButton = modInfo.patchNotes == "" ? "" :
            button({ class: "updateText", id: modInfo.name + "Update", onclick: "goToWebsite('" + modInfo.patchNotes + "')" },
                div({ style: "pointer-events: none;" }, "New Update")
            );

        const mod = div({ class: "modDivider", id: modInfo.name },
            div({ class: "modDividerImage", style: "background-image: url(" + modInfo.image + ") !important;" },
                div({ class: "modDividerGradient" })
            ),
            div({ style: "display: flex;flex-direction: row;/*! width: 100%; */margin-right: 16px;margin-right: 16px;gap: 5px;" },
                div({ style: "text-align: center;/*! width: 100%; */ font-weight: bold;flex: 3;" }, modInfo.name),
                button({ class: "playButton", onclick: "goToWebsite('" + modInfo.website + "')" }, "▶"),
                button({ class: "descButton", onclick: "goToWebsite(`" + modInfo.name + "Prompt`, true)" }, "≡")
            ),
            updateButton,
            div({ class: "versionText" },
                div({ style: "margin-top: 2px;" }, modInfo.version)
            )
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
    }
}

function parseForUrls(text) {
    let urls = (text).match(/< ?a href\=\"(\w|\s|:|\/|\.|\@|\\|\"|\=|\=)+>(\w| )+<\/a>/gi);
    if (urls == null) return [text];

    let textList = (text).split(/< ?a href\=\"(\w|\s|:|\/|\.|\@|\\|\"|\=|\=)+>(\w| )+<\/a>/gi);
    console.log(urls);

    urls = urls.filter(match => match.length > 2);
    textList = textList.filter(match => (match.length > 2 || match.includes(",")));
    console.log(urls);
    console.log(textList);

    let parsed = [];
    for (let i = 0; i < textList.length; i++) {
        parsed.push(textList[i]);
        if (urls[i]) {
            let url = urls[i].match(/https?:\/\/(\w|\.|\/|\@)+/i)[0];
            let link = urls[i].match(/>(\w| )+</i)[0].replace(">", "").replace("<", "");
            console.log(url, link);
            parsed.push(a({ href: url, target: "_blank" }, link));
        }
        console.log(parsed);
    }


    return parsed;
}

createMods();

console.log("here");