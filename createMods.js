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
        const mod = div({ class: "modDivider", id: modInfo.name },
            div({ class: "modDividerImage", style: "background-image: url(" + modInfo.image +") !important;" },
                div({ class: "modDividerGradient" })
            ),
            div({ style: "display: flex;flex-direction: row;/*! width: 100%; */margin-right: 16px;margin-right: 16px;gap: 5px;" },
                div({style:"text-align: center;/*! width: 100%; */ font-weight: bold;flex: 3;"}, modInfo.name),
                button({class:"playButton", onclick:"goToWebsite('" + modInfo.website + "')"}, "▶"),
                button({class:"descButton", onclick:"goToWebsite('" + modInfo.name + "Prompt', true)"}, "≡")
            ),
            button({class:"updateText", id: modInfo.name + "Update", onclick:"goToWebsite('" + modInfo.patchNotes + "')"},
                div({style:"pointer-events: none;"}, "New Update")
            ),
            div({class: "versionText"},
                div({style:"margin-top: 2px;"}, modInfo.version)
            )
        )
        modContainer.appendChild(mod);

        const alternateVersionTitle = modInfo.alternateVersions.length > 0 ?
            div({ class: "promptTitle" },
                h2({ class: "BeepBoxTitle", style: "margin-bottom: 0.5em;" }, "Alternate " + modInfo.name + "Versions:")
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

        const prompt = div({id: modInfo.name + "Prompt", style: "flex-direction: column;  display: none;" },
            div({ class: "promptTitle" },
                h2({ class: modInfo.name + "Title", style: "margin-bottom: 0.5em;" }, modInfo.name + ":")
            ),
            div({ style: "margin-bottom: 0.5em;" },
                modInfo.description
            ),
            div({style:"margin-bottom: 0.5em;"},
                "You can find " + modInfo.name + "'s ",
                a({href: modInfo.wiki, target: "_blank"}, "Wiki Page"),
                " here. Which contains extensive information about the website."
            ),
            alternateVersionTitle,
            alternateVersions,
            button({class:"cancelButton", onclick:"closePrompt('" + modInfo.name + "Prompt')"})
        );

        promptContainer.appendChild(prompt);
    }
}

createMods();

console.log("here");