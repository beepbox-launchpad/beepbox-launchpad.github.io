import { currentView, switchView } from "./preferences.js";

const modList = [];

const modTags = {
    "all": ["#active", "#discontinued", "#hiatus",
        "#samples", "#modulation", "#songPlayer", "#jokeMod", "#microtonal", "#offline",
        "#2012", "#2017", "#2018", "#2019", "#2020", "#2021", "#2022", "#2023", "#2024", "#2025", "#2026"], //contains any possible tag

    "UltraBox": ["#active", "#samples", "#modulation", "#songPlayer", "#offline", "#2023"],
    "SlarmoosBox": ["#active", "#samples", "#modulation", "#songPlayer", "#offline", "#2024"],
    "AbyssBox": ["#active", "#samples", "#modulation", "#songPlayer", "#2024"],
    "BeepBox": ["#active", "#songPlayer", "#offline", "#2012"],
    "JummBox": ["#active", "#modulation", "#offline", "#songPlayer", "#2019"],
    "ModBox": ["#discontinued", "#2017"],
    "Sandbox": ["#discontinued", "#2017"],
    "GoldBox": ["#discontinued", "#songPlayer", "#modulation", "#offline", "#2021"],
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
    "Dogebox2": ["#hiatus", "#songPlayer", "#modulation", "#2023"],
    "Nepbox": ["#discontinued", "#songPlayer", "#2024"], //I can't find a button to go to the song player, but if you change the url you can get there
    "Unbox": ["#active", "#songPlayer", "#samples", "#modulation", "#2024"],
    "shitbox4": ["#active", "#songPlayer", "#jokeMod", "#2024"],
    "BariBox": ["#discontinued", "#samples", "#modulation", "#songPlayer", "#2024"],
    "BoxBeep": ["#discontinued", "#songPlayer", "#jokeMod", "#2024"],
    "AestheticBox": ["#discontinued", "#2024"], //song player option exists, but takes you to a 404 page
    "BirdBox": ["#discontinued", "#songPlayer", "#jokeMod", "#2024"], //song player option exists, but takes you to a 404 page
    "AwesomeBox": ["#discontinued", "#songPlayer", "#modulation", "#2024"],
    "VoxBox": ["#discontinued", "#samples", "#songPlayer", "#modulation", "#2024"],
    "Box": ["#discontinued", "#jokeMod", "#2024"],
    "DinoBox": ["#discontinued", "#songPlayer", "#2024"],
    "AxoBox": ["#discontinued", "#samples", "#songPlayer", "#modulation", "#2024"],
    "EdoBox": ["#hiatus", "#songPlayer", "#modulation", "#microtonal", "#offline", "#2024"],
    "LemmBox": ["#hiatus", "#samples", "#songPlayer", "#modulation", "#2025"],
    "BonBox": ["#discontinued", "#songPlayer", "#jokeMod", "#2025"],
    "LunariisBox": ["#hiatus", "#samples", "#songPlayer", "#modulation", "#2025"],
    "RolyBox": ["#active", "#samples", "#songPlayer", "#modulation", "#2025"],
    "JukeBox": ["#discontinued", "#samples", "#songPlayer", "#modulation", "#2025"],
    "DsQuickBoxMod": ["#active", "#samples", "#songPlayer", "#modulation", "#2025"],
    "BloxBox": ["#hiatus", "#songPlayer", "#2025"],
    "BulbBox": ["#active", "#samples", "#modulation", "#songPlayer", "#2025"],
    "StudioBox": ["#active", "#samples", "#modulation", "#songPlayer", "#2026"],
    "41Box": ["#active", "#samples", "#modulation", "#songPlayer", "#2026"],
    "ModBox+": ["#active", "#2026"],
    "Tesseract": ["#discontinued", "#samples", "#modulation", "#songPlayer", "#2025"],
    "XenBox": ["#hiatus", "#modulation", "#microtonal", "#songPlayer", "#2026"],
    "froupbox": ["#active", "#samples", "#modulation", "#songPlayer", "#microtonal", "#2026"],
    "Modorox": ["#active", "#samples", "#2026"],
    "MidiBox": ["#hiatus", "#samples", "#modulation", "#songPlayer", "#2025"],
    "trixieBox": ["#active", "#samples", "#modulation", "#songPlayer", "#2026"],
    "theepbox": ["#active", "#samples", "#modulation", "#songPlayer", "#2026"],
}

export function setAndReturnTagsList() {
    for (const mod in window.Mods) {
        modList.push(window.Mods[mod].id);
    }

    const setList = modTags.all.concat(["#before:", "#after:", "#children:", "#descendants:", "#modder:"]).concat(modList);

    for (let i = 0; i < setList.length; i++) {
        var tag = new Option();
        tag.value = setList[i]
        document.getElementById("tags").appendChild(tag);
    }

    return setList;
}

function parseTokenForFilter(token) {
    if (token.indexOf("#surprise") > -1) {
        return (mods) => filterSurprise(mods);
    } else if (token.indexOf("#before:") > -1) {
        let date = token.split(":")[1].replace(" ", "").replace("#", ""); //get it into just a date
        if (date.length == 0) { //no date given; use default
            date = "9999";
        }
        return (mods) => filterBefore(mods, date); //Add the filter function to the list of filters

    } else if (token.indexOf("#after:") > -1) {
        let date = token.split(":")[1].replace(" ", "").replace("#", ""); //get it into just a date
        if (date.length == 0) { //no date given; use default
            date = "0000";
        }
        return (mods) => filterAfter(mods, date); //Add the filter function to the list of filters

    } else if (token.indexOf("#children:") > -1) {
        let fork = token.split(":")[1].replace(" ", "").replace("#", ""); //get it into just a fork
        if (fork.length == 0) { //no fork given; use default
            fork = "beepbox";
        }
        return (mods) => filterChildren(mods, fork.replace(" ", "").replaceAll("'", "")); //Add the filter function to the list of filters
    } else if (token.indexOf("#descendants:") > -1) {
        let fork = token.split(":")[1].replace(" ", "").replace("#", ""); //get it into just a fork
        if (fork.length == 0) { //no fork given; use default
            fork = "beepbox";
        }
        return (mods) => filterDescendants(mods, fork.replace(" ", "").replaceAll("'", "")); //Add the filter function to the list of filters
    } else if (token.indexOf("#modder:") > -1) {
        let modder = token.split(":")[1].replace(" ", "").replace("#", ""); //get it into just a modder
        if (modder.length == 0) { //no modder given; use default
            modder = "johnnesky";
        }
        return (mods) => filterModder(mods, modder.toLowerCase().replace(" ", "").replaceAll("'", "")); //Add the filter function to the list of filters
    } else if (token[0] == "#") {
        return (mods) => filterTag(mods, token);
    } else if (token.indexOf("*") > -1) { 
        return (mods) => filterPhraseWildcard(mods, token);
    } else if (token != "") {
        return (mods) => filterPhrase(mods, token);
    }
    return (mods) => mods;
}

class Or {
    constructor(left, right = null) {
        this.left = left;
        this.right = right;
    }

    append(right) {
        this.right = right;
        return true;
    }

    merge(fromModsStack) {
        let fromLeft = [];
        if (this.left) {
            if (typeof this.left == 'string') {
                fromLeft = parseTokenForFilter(this.left)(fromModsStack[fromModsStack.length - 1]);
            } else {
                this.left.merge(fromModsStack);
                fromLeft = fromModsStack.pop();
            }
        }
        let fromRight = [];
        if (this.right) {
            if (typeof this.right == 'string') {
                fromRight = parseTokenForFilter(this.right)(fromModsStack[fromModsStack.length - 1]);
            } else {
                this.right.merge(fromModsStack);
                fromRight = fromModsStack.pop();
            }
        }

        fromModsStack.push(new Array(...new Set(fromLeft).union(new Set(fromRight))));
    }
}

class Not {
    append(token) {
        this.token = token;
        return true;
    }

    merge(fromModsStack) {
        if (!this.token) return;
        if (typeof this.token == 'string') {
            fromModsStack.push(parseTokenForFilter(this.token)(fromModsStack[fromModsStack.length - 1]));
        } else {
            this.token.merge(fromModsStack);
        }
        const fromMods = filterNot(fromModsStack[fromModsStack.length - 1], fromModsStack[fromModsStack.length - 2]);
        fromModsStack.pop();
        fromModsStack.push(fromMods);
    }
}

class TokenList {
    tokens = [];
    
    append(token) {
        this.tokens.push(token);
        return false;
    }

    pop() {
        return this.tokens.pop();
    }

    merge(fromModsStack) {
        let mergeIndex = 0;
        for (; mergeIndex < this.tokens.length; mergeIndex++) {
            if (!this.tokens[mergeIndex]) continue;
            if (typeof this.tokens[mergeIndex] == 'string') {
                fromModsStack.push(parseTokenForFilter(this.tokens[mergeIndex])(fromModsStack[fromModsStack.length - 1]));
            } else {
                this.tokens[mergeIndex].merge(fromModsStack);
            }
        }
        const last = fromModsStack.pop();
        for (; mergeIndex > 1; mergeIndex--) {
            fromModsStack.pop();
        }
        fromModsStack.push(last);
    }
}

export function searchForMods(result, fromMods = modList) {
    const tokenListStack = [new TokenList()];
    const tokenList = tokenListStack[0];
    let lastIndex = -1;

    function appendThenPopIfFull(token) {
        const isFull = tokenListStack[tokenListStack.length - 1].append(token);
        if (isFull) {
            tokenListStack.pop();
        }
    }

    for (let i = 0; i < result.length; i++) {
        const char = result[i];
        const nextChar = result[i + 1] || " ";
        if (char == "(") {
            if (lastIndex != i - 1) {
                appendThenPopIfFull(result.slice(lastIndex + 1, i));
            }
            lastIndex = i;
            const newTokenList = new TokenList();
            appendThenPopIfFull(newTokenList);
            tokenListStack.push(newTokenList);
        } else if (char == ")") {
            if (lastIndex != i - 1) {
                appendThenPopIfFull(result.slice(lastIndex + 1, i));
            }
            lastIndex = i;
            tokenListStack.pop();
        } else if ((char.toLowerCase() == "o" && (nextChar || " ").toLowerCase() == "r") || char == "|") {
            if (lastIndex != i - 1) {
                appendThenPopIfFull(result.slice(lastIndex + 1, i));
            }
            lastIndex = i;
            if (char.toLowerCase() == "o") { //skip r
                i++;
                lastIndex++;
            }
            const or = new Or(tokenListStack[tokenListStack.length - 1].pop());
            appendThenPopIfFull(or);
            tokenListStack.push(or);
        } else if (char == "!" || char == "-") {
            if (lastIndex != i - 1) {
                appendThenPopIfFull(result.slice(lastIndex + 1, i));
            }
            lastIndex = i;
            const not = new Not();
            appendThenPopIfFull(not);
            tokenListStack.push(not);
        } else if (char == ":") {
            if (nextChar == " ") i++; //don't split on this space
        } else if (char == " ") {
            if (lastIndex != i - 1) {
                appendThenPopIfFull(result.slice(lastIndex + 1, i));
            }
            lastIndex = i;
        }
    }

    if (lastIndex != result.length - 1) {
        appendThenPopIfFull(result.slice(lastIndex + 1, result.length));
    }

    let mods = fromMods.slice();
    const modsStack = [mods, mods];
    tokenList.merge(modsStack);
    renderFilters(modsStack[modsStack.length - 1]);

    if (result.length == 0) {
        window.history.replaceState(null, "", location.pathname);

        if (currentView == 2) {
            switchView(2);
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

    //make a map for easy lookup
    const refMap = new Map();
    for (const index in window.Mods) {
        const Mod = window.Mods[index];
        refMap.set(Mod.id, Mod);
    }
    for (let i = 0; i < mods.length; i++) {
        const Mod = refMap.get(mods[i]);
        if (Mod.id.toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) { //is the mod
            foundMods.push(mods[i]);
            continue;
        }
        for (let j = 0; j < Mod.tree.length; j++) {
            if (Mod.tree[j].toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) {
                foundMods.push(mods[i]);
                break;
            }
        }
    }

    return foundMods;
}

function filterChildren(mods, forked) {
    const foundMods = [];

    //make a map for easy lookup
    const refMap = new Map();
    for (const index in window.Mods) {
        const Mod = window.Mods[index];
        refMap.set(Mod.id, Mod);
    }

    for (let i = 0; i < mods.length; i++) {
        const Mod = refMap.get(mods[i])
        if (Mod.id.toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) { //is the mod
            foundMods.push(mods[i]);
            continue;
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
    }

    return foundMods;
}

function filterModder(mods, modder) {
    const foundMods = [];

    //make a map for easy lookup
    const refMap = new Map();
    for (const index in window.Mods) {
        const Mod = window.Mods[index];
        refMap.set(Mod.id, Mod);
    }

    for (let i = 0; i < mods.length; i++) {
        const Mod = refMap.get(mods[i]);
        const modderList = typeof Mod.modder == "string" ? [Mod.modder] : Mod.modder
        for (const m of modderList) {
            if (m.toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(modder) > -1) {
                foundMods.push(mods[i]);
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
                if (!modTags[mods[j]]) {
                    console.error("Tags not implemented for " + mods[j] + " yet");
                    continue;
                }
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

function filterPhraseWildcard(mods, phrase) {
    const foundMods = [];

    for (let i = 0; i < mods.length; i++) {
        var thing = mods[i];
        var lowercaseThing = thing.toLowerCase();
        console.log(lowercaseThing);
        for (let thingIndex = 0; thingIndex < lowercaseThing.length - phrase.length; thingIndex++) {
            let matches = true;
            for (let charIndex = 0; charIndex < phrase.length; charIndex++) {
                if (lowercaseThing.includes("paandora")) console.log(charIndex, charIndex + thingIndex, phrase[charIndex], lowercaseThing[charIndex + thingIndex])
                if (phrase[charIndex] != "*" && phrase[charIndex] != lowercaseThing[charIndex+thingIndex]) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                foundMods.push(mods[i]);
                break;
            }
        }
    }

    return foundMods;
}

function filterSurprise(mods) {
    return [mods[Math.floor(Math.random() * mods.length)]];
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