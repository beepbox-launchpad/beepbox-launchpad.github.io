import { HTML, SVG } from "./imperative-html/elements-strict.js";

const { div, a, button, h2 } = HTML;

export async function createMods() {
    const promptContainer = document.getElementById("prompt");
    const modContainer = document.getElementById("modContainer");
    const Mods = await getMods();
    for (let modNumber in Mods) {
        const modInfo = Mods[modNumber];

        const updateButton = modInfo.patchNotes == "" ? "" :
            button({ class: "updateText", id: modInfo.name + "Update", onclick: "goToWebsite('" + modInfo.patchNotes + "')" },
                div({ style: "pointer-events: none;" }, "New Update")
            );
        if (updateButton) {
            updateButton.style.display = calculateNewUpdate(modInfo.name);
        }

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

    //make special case "mods"
    modContainer.append(div({ id: "comingSoon" }, div({ style: "text-align: center;width: 100%;margin-bottom: 10px;" }, "Coming Soon!")));
    modContainer.append(div({ id: "noResults", style: "display:none; text-align: center;width: 100%; margin-bottom: 10px; font-size: 32px;" }, "No results found"));
}

async function getMods() {
    let response = await fetch("./mods.json");
    return await response.json();
}

function parseForUrls(text) {
    let urls = (text).match(/< ?a href\=\"(\w|\s|:|\/|\.|\@|\\|\"|\=|\=)+>(\w| )+<\/a>/gi);
    if (urls == null) return [text];

    let textList = (text).split(/< ?a href\=\"(\w|\s|:|\/|\.|\@|\\|\"|\=|\=)+>(\w| )+<\/a>/gi);

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

function calculateNewUpdate(mod) {
    // - Update Times - //
    var time = new Date();
    var day = time.getDate();
    var month = time.getMonth() + 1;
    var year = time.getYear() + 1900;

    // PN stands for Patch Notes

    // ((month < [NextMonth] ? day <= 31 : day <= [setDay]) && month <= [NextMonth] && year == 2025); Template For when the date crosses months
    // (day <= [setDay] && month <= [setMonth] && year == 2025); Template for Same Month updates

    // Make sure to set the date to 3 days after the update happens 

    switch (mod) {
        case "AbyssBox": {
            var abyssboxPN = false;
            return abyssboxPN ? "unset" : "none";
        }
        case "Slarmoo's Box": {
            var slarmoosBoxPN = (day <= 20 && month <= 2 && year == 2025);
            return slarmoosBoxPN ? "unset" : "none";
        }
        case "UltraBox": {
            var ultraboxPN = (day <= 20 && month <= 2 && year == 2025);
            return ultraboxPN ? "unset" : "none";
        }
        case "BeepBox": {
            var beepBoxPN = false;
            return beepBoxPN ? "unset" : "none";
        }
        case "JummBox": {
            var jummBoxPN = false;
            return jummBoxPN ? "unset" : "none";
        }
    }
    return "none";
}