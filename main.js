import { createMods } from "./createMods.js";
import { searchForMod } from "./searching.js";

await createMods();

var urlThing = String(window.location.hash);
var urlThing2 = urlThing.substring(3);

if (window.location != (location.pathname + "/#s=" || location.pathname)) {
    document.getElementById("searchbar").value = urlThing2;
    searchForMod(urlThing2);
}

window.searchForMod = searchForMod;