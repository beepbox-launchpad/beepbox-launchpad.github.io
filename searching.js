import { currentView, switchView } from "./preferences.js";

const modList = [];

const modTags = {
    "all": ["#active", "#discontinued", "#hiatus",
        "#samples", "#modulation", "#songPlayer", "#jokeMod", "#microtonal", "#offline",
        "#2012", "#2017", "#2018", "#2019", "#2020", "#2021", "#2022", "#2023", "#2024", "#2025"], //contains any possible tag

    "UltraBox": ["#active", "#samples", "#modulation", "#songPlayer", "#offline", "#2023"],
    "SlarmoosBox": ["#active", "#samples", "#modulation", "#songPlayer", "#offline", "#2024"],
    "AbyssBox": ["#active", "#samples", "#modulation", "#songPlayer", "#2024"],
    "BeepBox": ["#active", "#songPlayer", "#offline", "#2012"],
    "JummBox": ["#active", "#modulation", "#offline", "#songPlayer", "#2019"],
    "ModBox": ["#discontinued", "#2017"],
    "Sandbox": ["#discontinued", "#2017"],
    "GoldBox": ["#discontinued", "#songPlayer", "#modulation", "#2021"],
    "HaileyBox": ["#discontinued", "#2017"],
    "BruceBox": ["#discontinued", "#2017"],
    "NerdBox": ["#discontinued", "#2018"],
    "ZefBox": ["#discontinued", "#2018"],
    "ShitBox": ["#discontinued", "#jokeMod", "#2019"],
    "WideBox": ["#discontinued", "#2019"],
    "BlackBox": ["#discontinued", "#2019"],
    "BassBox": ["#discontinued", "#jokeMod", "#2020"],
    "SliderBox": ["#discontinued", "#2020"],
    "BeepBox1Bar": ["#discontinued", "#2020"],
    "BluBox": ["#discontinued", "#modulation", "#2020"], //song player option exists, but takes you to a 404 page
    "SynthBox": ["#discontinued", "#modulation", "#2020"], //song player option exists, but takes you to a black page
    "CardboardBox": ["#discontinued", "#modulation", "#2020"], //song player option exists, but takes you to a 404 page
    "JummBox11edo": ["#discontinued", "#modulation", "#microtonal", "#2020"], //song player option exists, but takes you to a 404 page
    "Wackybox": ["#discontinued", "#jokeMod", "#2021"], //song player option exists, but takes you to a 404 page
    "TodBox": ["#discontinued", "#songPlayer", "#2021"],
    "WeebBox": ["#discontinued", "#songPlayer", "#modulation", "#2021"],
    "NintariBox": ["#discontinued", "#samples", "#modulation", "#2021"],
    "MicroBox": ["#discontinued", "#songPlayer", "#modulation", "#2021"],
    "PaandorasBox": ["#discontinued", "#samples", "#modulation", "#2021"],
    "BlockBox": ["#discontinued", "#samples", "#modulation", "#2021"], //song player option exists, but takes you to a 404 page
    "FoxBox": ["#discontinued", "#2022"], //song player option exists, but takes you to a 404 page
    "MarioPaintBox": ["#discontinued", "#samples", "#songPlayer", "#modulation", "#2023"], 
    "TETBox": ["#discontinued", "#microtonal", "#2023"], //song player option exists, but takes you to a black page
    "Midbox": ["#active", "#songPlayer", "#modulation", "#2023"],
    "Dogebox2": ["#active", "#songPlayer", "#modulation", "#2023"],
    "Nepbox": ["#discontinued", "#songPlayer", "#2024"], //I can't find a button to go to the song player, but if you change the url you can get there
    "Unbox": ["#active", "#songPlayer", "#samples", "#modulation", "#2024"],
    "shitbox4": ["#active", "#songPlayer", "#jokeMod", "#2024"],
    "BariBox": ["#discontinued", "#samples", "#modulation", "#songPlayer", "#2024"],
    "BoxBeep": ["#discontinued", "#songPlayer", "#jokeMod", "#2024"],
    "AestheticBox": ["#discontinued", "#2024"], //song player option exists, but takes you to a 404 page
    "BirdBox": ["#discontinued", "#songPlayer", "#jokeMod", "#2024"], //song player option exists, but takes you to a 404 page
    "AwesomeBox": ["#hiatus", "#songPlayer", "#modulation", "#2024"],
    "VoxBox": ["#discontinued", "#samples", "#songPlayer", "#modulation", "#2024"],
    "Box": ["#discontinued", "#jokeMod", "#2024"],
    "DinoBox": ["#discontinued", "#songPlayer", "#2024"],
    "AxoBox": ["#discontinued", "#samples", "#songPlayer", "#modulation", "#2024"],
    "EdoBox": ["#active", "#songPlayer", "#modulation", "#microtonal", "#offline", "#2024"],
    "LemmBox": ["#hiatus", "#samples", "#songPlayer", "#modulation", "#2025"],
    "BonBox": ["#discontinued", "#songPlayer", "#jokeMod", "#2025"],
    "LunariisBox": ["#hiatus", "#samples", "#songPlayer", "#modulation", "#2025"],
    "RolyBox": ["#active", "#samples", "#songPlayer", "#modulation", "#2025"],
    "JukeBox": ["#active", "#samples", "#songPlayer", "#modulation", "#2025"],
    "DsQuickBoxMod": ["#active", "#samples", "#songPlayer", "#modulation", "#2025"],
    "BloxBox": ["#active", "#songPlayer", "#2025"],
    "BulbBox": ["#active", "#samples", "#modulation", "#songPlayer", "#2025"]
}

export function setAndReturnTagsList() {
    for (const mod in window.Mods) {
        modList.push(window.Mods[mod].id);
    }

    const setList = modTags.all.concat(["#before:", "#after:", "#children:", "#descendants:"]).concat(modList);

    for (let i = 0; i < setList.length; i++) {
        var tag = new Option();
        tag.value = setList[i]
        document.getElementById("tags").appendChild(tag);
    }

    return setList;
}

export function searchForMods(result, fromMods = modList) {
    //split on spaces for multiple filters to be allowed

    const filterStrings = result.split(/\s/i);
    const filters = [];
    for (let i = 0; i < filterStrings.length; i++) {
        let notFlag = false;
        let filterString = filterStrings[i];
        if (filterString[0] == "!" || filterString[0] == "-") {
            notFlag = true;
            filterString = filterString.replace(/\!|\-/, "");
        }
        if (filterString.toLowerCase().indexOf("#before:") > -1) {
            let date = filterString.toLowerCase().split(":")[1].replace(" ", "").replace("#", ""); //get it into just a date
            if (date.length == 0) { //there may have been a space, check if next string is the date
                date = parseInt(filterStrings[i + 1]);
                if (Number.isNaN(date)) {
                    date = "9999";
                } else {
                    date += "";
                    i++; //increment past the used date
                }
            }
            filters.push((mods) => filterBefore(mods, date)); //Add the filter function to the list of filters

        } else if (filterString.toLowerCase().indexOf("#after:") > -1) {
            let date = filterString.toLowerCase().split(":")[1].replace(" ", "").replace("#", ""); //get it into just a date
            if (date.length == 0) { //there may have been a space, check if next string is the date
                date = parseInt(filterStrings[i + 1]);
                if (Number.isNaN(date)) {
                    date = "0000";
                } else {
                    date += "";
                    i++; //increment past the used date
                }
            }
            filters.push((mods) => filterAfter(mods, date)); //Add the filter function to the list of filters

        } else if (filterString.toLowerCase().indexOf("#children:") > -1) {
            let fork = filterString.toLowerCase().split(":")[1].replace(" ", "").replace("#", ""); //get it into just a fork
            if (fork.length == 0) { //there may have been a space, check if next string is the fork
                if (i+1 < filterStrings.length && filterStrings[i + 1].indexOf("#") > -1) {
                    fork = filterStrings[i + 1];
                    i++
                } else {
                    fork = "beepbox";
                }
            }
            filters.push((mods) => filterChildren(mods, fork.replace(" ", "").replaceAll("'", ""))); //Add the filter function to the list of filters
        } else if (filterString.toLowerCase().indexOf("#descendants:") > -1) {
            let fork = filterString.toLowerCase().split(":")[1].replace(" ", "").replace("#", ""); //get it into just a fork
            if (fork.length == 0) { //there may have been a space, check if next string is the fork
                if (i + 1 < filterStrings.length && filterStrings[i + 1].indexOf("#") > -1) {
                    fork = filterStrings[i + 1];
                    i++
                } else {
                    fork = "beepbox";
                }
            }
            filters.push((mods) => filterDescendants(mods, fork.replace(" ", "").replaceAll("'", ""))); //Add the filter function to the list of filters
        } else if (filterString[0] == "#") {
            filters.push((mods) => filterTag(mods, filterString));
        } else if (filterString != "") {
            filters.push((mods) => filterPhrase(mods, filterString));
        }
        if (notFlag) {
            filters.push((mods, oldMods) => filterNot(mods, oldMods));
        }
    }

    let mods = fromMods.slice();
    let oldMods = [];
    for (let i = 0; i < filters.length; i++) {
        oldMods.push(mods.slice());
        mods = filters[i](mods, oldMods[oldMods.length - 2]);
    }
    renderFilters(mods);

    if (result.length == 0) {
        window.history.replaceState(null, "", location.pathname);

        if (currentView == 2) {
            switchView(2);
            // console.log("switching view: " + currentView)
        }
    }
}

function filterNot(mods, prevMods = modList) {
    const foundMods = [];

    for (const mod of prevMods) {
        if (mods.indexOf(mod) <= -1) {
            foundMods.push(mod)
        }
    }

    return foundMods;
}

function filterBefore(mods, date) {

    const foundMods = [];

    for (let i = 0; i < mods.length; i++) { //for every mod..
        for (let j = 0; j < modTags[mods[i]].length; j++) { //for every tag in that mod..
            let dateTag = parseInt(modTags[mods[i]][j].toLowerCase().replace("#", "")); 
            if (!Number.isNaN(dateTag) && dateTag <= date) { //check if tag is a date and push mod to found mods if date is less than the filtered one
                foundMods.push(mods[i]);
                break;
            } 
        }
    }

    return foundMods;
}

function filterAfter(mods, date) {

    const foundMods = [];

    for (let i = 0; i < mods.length; i++) { //for every mod..
        for (let j = 0; j < modTags[mods[i]].length; j++) { //for every tag in that mod..
            let dateTag = parseInt(modTags[mods[i]][j].toLowerCase().replace("#", ""));
            if (!Number.isNaN(dateTag) && dateTag >= date) { //check if tag is a date and push mod to found mods if date is greater than the filtered one
                foundMods.push(mods[i]);
                break;
            }
        }
    }

    return foundMods;
}

function filterDescendants(mods, forked) {
    const foundMods = [];

    for (const index in window.Mods) {
        const Mod = window.Mods[index];
        for (let i = 0; i < mods.length; i++) {
            if (Mod.id == mods[i]) {
                if (Mod.id.toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) { //is the mod
                    foundMods.push(mods[i]);
                    break;
                }
                for (let j = 0; j < Mod.tree.length; j++) {
                    if (Mod.tree[j].toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) {
                        foundMods.push(mods[i]);
                        break;
                    }
                }
                break;
            }
        }
    }

    return foundMods;
}

function filterChildren(mods, forked) {
    const foundMods = [];

    for (const index in window.Mods) {
        const Mod = window.Mods[index];
        for (let i = 0; i < mods.length; i++) {
            if (Mod.id == mods[i]) {
                if (Mod.id.toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) { //is the mod
                    foundMods.push(mods[i]);
                    break;
                }
                const lastIndex = Mod.tree.length - 1;
                if (lastIndex >= 0 && Mod.tree[lastIndex].toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) {
                    foundMods.push(mods[i]);
                }
                if (Mod.lookBack2) {
                    const twoAgo = Mod.tree.length - 2;
                    if (twoAgo >= 0 && Mod.tree[twoAgo].toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) {
                        foundMods.push(mods[i]);
                    }
                }
                break; 
            }
        }
    }

    return foundMods;
}

function filterTag(mods, tag) {
    const foundMods = [];

    for (let i = 0; i < modTags.all.length; i++) { //for every tag..
        var thing = modTags.all[i];
        var lowercaseThing = thing.toLowerCase();
        if (lowercaseThing.indexOf(tag.toLowerCase()) > -1) { //if filtered tag is a slice of a tag..
            for (let j = 0; j < mods.length; j++) { //for every mod..
                for (let k = 0; k < modTags[mods[j]].length; k++) { //for every tag of that mod..
                    if (modTags[mods[j]][k].toLowerCase() == (lowercaseThing)) {
                        foundMods.push(mods[j]); //push mod to found mods if that mod has the tag
                        break;
                    }
                }
            }
        }
    }

    return foundMods;
}

function filterPhrase(mods, phrase) {
    const foundMods = [];

    for (let i = 0; i < mods.length; i++) {
        var thing = mods[i];
        var lowercaseThing = thing.toLowerCase();
        if (lowercaseThing.indexOf(phrase.toLowerCase()) > -1) {
            foundMods.push(mods[i]);
        } 
    }

    return foundMods;
}

function renderFilters(mods) {

    for (let i = 0; i < modList.length; i++) {
        if (mods.indexOf(modList[i]) > -1) {
            document.getElementById(modList[i]).style.display = "flex";
            document.getElementById("noResults").style.display = "none";
        } else {
            document.getElementById(modList[i]).style.display = "none";
        }
    }

    if (mods.length == 0) {
        document.getElementById("noResults").style.display = "unset";
    } else {
        document.getElementById("noResults").style.display = "none";
    }
    if (mods.length == modList.length) {
        document.getElementById("comingSoon").style.display = "flex";
    } else {
        document.getElementById("comingSoon").style.display = "none";
    }
}