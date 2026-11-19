import { Mods, Mod, mods } from "./mods";


const tags = ["#active", "#discontinued", "#hiatus",
    "#samples", "#modulation", "#songPlayer", "#jokeMod", "#microtonal", "#offline",
    "#2012", "#2017", "#2018", "#2019", "#2020", "#2021", "#2022", "#2023", "#2024", "#2025", "#2026"] as const; //contains every possible tag
type Tag = typeof tags[number];
const modList: mods[] = Mods.map((mod) => mod.id);

const modTags: Record<string, Tag[]> = {
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
};

export function setAndReturnTagsList() {

    let setList: string[] = tags.slice();
    setList = setList.concat(["#before:", "#after:", "#children:", "#descendants:", "#modder:"]).concat(modList);

    for (let i = 0; i < setList.length; i++) {
        let tag = new Option();
        tag.value = setList[i];
        document.getElementById("tags")!.appendChild(tag);
    }

    return setList;
}

function parseTokenForFilter(token: string) {
    if (token.indexOf("#surprise") > -1) {
        return (mods: mods[]) => filterSurprise(mods);
    } else if (token.indexOf("#before:") > -1) {
        let date = token.split(":")[1].replace(" ", "").replace("#", ""); //get it into just a date
        if (date.length == 0) { //no date given; use default
            date = "9999";
        }
        return (mods: mods[]) => filterBefore(mods, parseInt(date)); //Add the filter function to the list of filters

    } else if (token.indexOf("#after:") > -1) {
        let date = token.split(":")[1].replace(" ", "").replace("#", ""); //get it into just a date
        if (date.length == 0) { //no date given; use default
            date = "0000";
        }
        return (mods: mods[]) => filterAfter(mods, parseInt(date)); //Add the filter function to the list of filters

    } else if (token.indexOf("#children:") > -1) {
        let fork = token.split(":")[1].replace(" ", "").replace("#", ""); //get it into just a fork
        if (fork.length == 0) { //no fork given; use default
            fork = "beepbox";
        }
        return (mods: mods[]) => filterChildren(mods, fork.replace(" ", "").replaceAll("'", "")); //Add the filter function to the list of filters
    } else if (token.indexOf("#descendants:") > -1) {
        let fork = token.split(":")[1].replace(" ", "").replace("#", ""); //get it into just a fork
        if (fork.length == 0) { //no fork given; use default
            fork = "beepbox";
        }
        return (mods: mods[]) => filterDescendants(mods, fork.replace(" ", "").replaceAll("'", "")); //Add the filter function to the list of filters
    } else if (token.indexOf("#modder:") > -1) {
        let modder = token.split(":")[1].replace(" ", "").replace("#", ""); //get it into just a modder
        if (modder.length == 0) { //no modder given; use default
            modder = "johnnesky";
        }
        return (mods: mods[]) => filterModder(mods, modder.toLowerCase().replace(" ", "").replaceAll("'", "")); //Add the filter function to the list of filters
    } else if (token[0] == "#") {
        return (mods: mods[]) => filterTag(mods, token);
    } else if (token.indexOf("*") > -1) { 
        return (mods: mods[]) => filterPhraseWildcard(mods, token.toLowerCase());
    } else if (token != "") {
        return (mods: mods[]) => filterPhrase(mods, token);
    }
    return (mods: mods[]) => mods;
}

abstract class TokenWrap {
    abstract append(token: Token): boolean;
    abstract merge(fromModsStack: mods[][]): void;
}

type Token = TokenWrap | string;

class Or implements TokenWrap {
    constructor(private left: Token, private right: Token | null = null) { }

    append(token: Token) {
        this.right = token;
        return true;
    }

    merge(fromModsStack: mods[][]) {
        let fromLeft: mods[] = [];
        if (this.left) {
            if (typeof this.left == 'string') {
                fromLeft = parseTokenForFilter(this.left)(fromModsStack[fromModsStack.length - 1]);
            } else {
                this.left.merge(fromModsStack);
                fromLeft = fromModsStack.pop()!;
            }
        }
        let fromRight: mods[] = [];
        if (this.right) {
            if (typeof this.right == 'string') {
                fromRight = parseTokenForFilter(this.right)(fromModsStack[fromModsStack.length - 1]);
            } else {
                this.right.merge(fromModsStack);
                fromRight = fromModsStack.pop()!;
            }
        }

        fromModsStack.push(new Array(...new Set(fromLeft).union(new Set(fromRight))));
    }
}

class Not implements TokenWrap {
    private token: Token | null = null;

    append(token: Token) {
        this.token = token;
        return true;
    }

    merge(fromModsStack: mods[][]) {
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

class TokenList implements TokenWrap {
    private tokens: Token[] = [];
    
    append(token: Token) {
        this.tokens.push(token);
        return false;
    }

    pop(): Token | null {
        return this.tokens.pop() ?? null;
    }

    merge(fromModsStack: mods[][]) {
        let mergeIndex: number = 0;
        for (; mergeIndex < this.tokens.length; mergeIndex++) {
            const token: Token = this.tokens[mergeIndex];
            if (!token) continue;
            if (typeof token == 'string') {
                fromModsStack.push(parseTokenForFilter(token)(fromModsStack[fromModsStack.length - 1]));
            } else {
                (token as TokenWrap).merge(fromModsStack);
            }
        }
        const last: mods[] = fromModsStack.pop()!;
        for (; mergeIndex > 1; mergeIndex--) {
            fromModsStack.pop();
        }
        fromModsStack.push(last);
    }
}

export function searchForMods(result: string, fromMods: mods[] = modList) {
    const tokenListStack: TokenWrap[] = [new TokenList()];
    const tokenList: TokenWrap = tokenListStack[0];
    let lastIndex: number = -1;

    function appendThenPopIfFull(token: Token) {
        const isFull: boolean = tokenListStack[tokenListStack.length - 1].append(token);
        if (isFull) {
            tokenListStack.pop();
        }
    }

    for (let i: number = 0; i < result.length; i++) {
        const char: string = result[i];
        const nextChar: string = result[i + 1] || " ";
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
            const or = new Or((tokenListStack[tokenListStack.length - 1] as TokenList).pop()!);
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

    let mods: mods[] = fromMods.slice();
    const modsStack: mods[][] = [mods, mods];
    tokenList.merge(modsStack);
    renderFilters(modsStack[modsStack.length - 1]);

    if (result.length == 0) {
        window.history.replaceState(null, "", location.pathname);
    }
}

function filterNot(mods: mods[], prevMods: mods[] = modList): mods[] {
    const foundMods: mods[] = [];

    for (const mod of prevMods) {
        if (mods.indexOf(mod) <= -1) {
            foundMods.push(mod)
        }
    }

    return foundMods;
}

function filterBefore(mods: mods[], date: number): mods[] {

    const foundMods: mods[] = [];

    for (let i: number = 0; i < mods.length; i++) { //for every mod..
        for (let j: number = 0; j < modTags[mods[i]].length; j++) { //for every tag in that mod..
            let dateTag: number = parseInt(modTags[mods[i]][j].toLowerCase().replace("#", "")); 
            if (!Number.isNaN(dateTag) && dateTag <= date) { //check if tag is a date and push mod to found mods if date is less than the filtered one
                foundMods.push(mods[i]);
                break;
            } 
        }
    }

    return foundMods;
}

function filterAfter(mods: mods[], date: number): mods[] {

    const foundMods: mods[] = [];

    for (let i: number = 0; i < mods.length; i++) { //for every mod..
        for (let j: number = 0; j < modTags[mods[i]].length; j++) { //for every tag in that mod..
            let dateTag: number = parseInt(modTags[mods[i]][j].toLowerCase().replace("#", ""));
            if (!Number.isNaN(dateTag) && dateTag >= date) { //check if tag is a date and push mod to found mods if date is greater than the filtered one
                foundMods.push(mods[i]);
                break;
            }
        }
    }

    return foundMods;
}

function filterDescendants(mods: mods[], forked: string): mods[] {
    const foundMods: mods[] = [];

    //make a map for easy lookup
    const refMap = new Map<mods, Mod>();
    for (const index in Mods) {
        const Mod = Mods[index];
        refMap.set(Mod.id, Mod);
    }
    for (let i: number = 0; i < mods.length; i++) {
        const Mod: Mod = refMap.get(mods[i])!;
        if (Mod.id.toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) { //is the mod
            foundMods.push(mods[i]);
            continue;
        }
        for (let j: number = 0; j < Mod.tree.length; j++) {
            if (Mod.tree[j].toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) {
                foundMods.push(mods[i]);
                break;
            }
        }
    }

    return foundMods;
}

function filterChildren(mods: mods[], forked: string): mods[] {
    const foundMods: mods[] = [];

    //make a map for easy lookup
    const refMap = new Map<mods, Mod>();
    for (const index in Mods) {
        const Mod = Mods[index];
        refMap.set(Mod.id, Mod);
    }

    for (let i: number = 0; i < mods.length; i++) {
        const Mod: Mod = refMap.get(mods[i])!;
        if (Mod.id.toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) { //is the mod
            foundMods.push(mods[i]);
            continue;
        }
        const lastIndex: number = Mod.tree.length - 1;
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

function filterModder(mods: mods[], modder: string): mods[] {
    const foundMods: mods[] = [];

    //make a map for easy lookup
    const refMap = new Map<mods, Mod>();
    for (const index in Mods) {
        const Mod = Mods[index];
        refMap.set(Mod.id, Mod);
    }

    for (let i: number = 0; i < mods.length; i++) {
        const Mod: Mod = refMap.get(mods[i])!;
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

function filterTag(mods: mods[], tag: string): mods[] {
    const foundMods: mods[] = [];

    for (let i: number = 0; i < tags.length; i++) { //for every tag..
        let lowercaseThing: string = tags[i];
        if (lowercaseThing.indexOf(tag.toLowerCase()) > -1) { //if filtered tag is a slice of a tag..
            for (let j: number = 0; j < mods.length; j++) { //for every mod..
                if (!modTags[mods[j]]) {
                    console.error("Tags not implemented for " + mods[j] + " yet");
                    continue;
                }
                for (let k: number = 0; k < modTags[mods[j]].length; k++) { //for every tag of that mod..
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

function filterPhrase(mods: mods[], phrase: string): mods[] {
    const foundMods: mods[] = [];

    for (let i: number = 0; i < mods.length; i++) {
        let thing: mods = mods[i];
        let lowercaseThing: string = thing.toLowerCase();
        if (lowercaseThing.indexOf(phrase.toLowerCase()) > -1) {
            foundMods.push(mods[i]);
        } 
    }

    return foundMods;
}

function filterPhraseWildcard(mods: mods[], phrase: string): mods[] {
    const foundMods: mods[] = [];

    for (let i: number = 0; i < mods.length; i++) {
        let thing: mods = mods[i];
        let lowercaseThing: string = thing.toLowerCase();
        for (let thingIndex: number = 0; thingIndex < lowercaseThing.length - phrase.length; thingIndex++) {
            let matches: boolean = true;
            for (let charIndex = 0; charIndex < phrase.length; charIndex++) {
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

function filterSurprise(mods: mods[]): mods[] {
    return [mods[Math.floor(Math.random() * mods.length)]];
}

function renderFilters(mods: mods[]) {

    for (let i: number = 0; i < modList.length; i++) {
        if (mods.indexOf(modList[i]) > -1) {
            document.getElementById(modList[i])!.style.display = "flex";
            document.getElementById("noResults")!.style.display = "none";
        } else {
            document.getElementById(modList[i])!.style.display = "none";
        }
    }

    if (mods.length == 0) {
        document.getElementById("noResults")!.style.display = "unset";
    } else {
        document.getElementById("noResults")!.style.display = "none";
    }
    if (mods.length == modList.length) {
        document.getElementById("comingSoon")!.style.display = "flex";
    } else {
        document.getElementById("comingSoon")!.style.display = "none";
    }
}