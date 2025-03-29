export function searchForMod(result) {
    var modList = [
        "UltraBox", "Slarmoo's Box", "AbyssBox", "BeepBox", "JummBox", "ModBox", "Sandbox", "GoldBox", "HaileyBox", "BruceBox",
        "ZefBox", "WideBox", "BlackBox", "CardboardBox", "BluBox", "Wackybox", "TodBox", "MicroBox", "PaandorasBox", "BlockBox", "Midbox", "Dogebox2",
        "Nepbox", "Unbox", "shitbox4", "BariBox", "BoxBeep", "AestheticBox", "AwesomeBox", "VoxBox", "LemmBox"
    ];

    const modTags = {
        "all": ["#active", "#discontinued",
            "#samples", "#modulation", "#songPlayer",
            "#2012", "#2017", "#2018", "#2019", "#2020", "#2021", "#2023", "#2024", "#2025"], //contains any possible tag

        "UltraBox": ["#active", "#samples", "#modulation", "#songPlayer", "#2023"],
        "Slarmoo's Box": ["#active", "#samples", "#modulation", "#songPlayer", "#2024"],
        "AbyssBox": ["#active", "#samples", "#modulation", "#songPlayer", "#2024"],
        "BeepBox": ["#active", "#songPlayer", "#2012"],
        "JummBox": ["#active", "#modulation", "#songPlayer", "#2019"],
        "ModBox": ["#discontinued", "#2017"],
        "Sandbox": ["#discontinued", "#2017"],
        "GoldBox": ["#discontinued", "#songPlayer", "#modulation", "#2021"],
        "HaileyBox": ["#discontinued", "#2017"],
        "BruceBox": ["#discontinued", "#2017"],
        "ZefBox": ["#discontinued", "#2018"],
        "WideBox": ["#discontinued", "#2019"],
        "BlackBox": ["#discontinued", "#2019"],
        "BluBox": ["#discontinued", "#modulation", "#2020"], //song player option exists, but takes you to a 404 page
        "CardboardBox": ["#discontinued", "#modulation", "#2020"], //song player option exists, but takes you to a 404 page
        // "JummBox 11edo":["#discontinued", "#modulation", "#microtonal", "#2020"], //song player option exists, but takes you to a 404 page
        "Wackybox": ["#discontinued", "#2021"], //song player option exists, but takes you to a 404 page
        "TodBox": ["#discontinued", "#songPlayer", "#2021"],
        "MicroBox": ["#discontinued", "#songPlayer", "#modulation", "#2021"],
        "PaandorasBox": ["#discontinued", "#samples", "#modulation", "#2021"],
        "BlockBox": ["#discontinued", "#samples", "#modulation", "#2021"], //song player option exists, but takes you to a 404 page
        // "TETBox":["#discontinued", "#microtonal", "#2023"], //song player option exists, but takes you to a black page
        "Midbox": ["#active", "#songPlayer", "#modulation", "#2023"],
        "Dogebox2": ["#active", "#songPlayer", "#modulation", "#2023"],
        "Nepbox": ["#active", "#songPlayer", "#2024"], //I can't find a button to go to the song player, but if you change the url you can get there
        "Unbox": ["#active", "#songPlayer", "#samples", "#modulation", "#2024"],
        "shitbox4": ["#active", "#songPlayer", "#2024"],
        "BariBox": ["#discontinued", "#samples", "#modulation", "#songPlayer", "#2024"],
        "BoxBeep": ["#discontinued", "#songPlayer", "#2024"],
        "AestheticBox": ["#discontinued", "#2024"], //song player option exists, but takes you to a 404 page
        "AwesomeBox": ["#active", "#songPlayer", "#modulation", "#2024"],
        "VoxBox": ["#active", "#samples", "#songPlayer", "#modulation", "#2024"],
        "LemmBox": ["#active", "#samples", "#songPlayer", "#modulation", "#2025"],
    }

    if (result.toLowerCase().indexOf("#before:") > -1) { //special case: do date searching (before)
        let date = result.toLowerCase().split(":")[1].replace(" ", "").replace("#", ""); //get it into just a date
        if (date.length == 0) date = "9999";

        var blank = 0;

        const foundMods = [];

        for (let i = 0; i < modList.length; i++) {
            let found = false;
            for (let j = 0; j < modTags[modList[i]].length; j++) {
                let dateTag = parseInt(modTags[modList[i]][j].toLowerCase().replace("#", ""));
                if (dateTag <= date) found = true;
            }
            if (found) foundMods.push(modList[i]);
        }
        for (let i = 0; i < modList.length; i++) {
            if (foundMods.indexOf(modList[i]) > -1) {
                document.getElementById(modList[i]).style.display = "flex";
                blank = 0;
                document.getElementById("noResults").style.display = "none";
            } else {
                document.getElementById(modList[i]).style.display = "none";
                blank++;
            }
        }
    } else if (result.toLowerCase().indexOf("#after:") > -1) { //special case: do date searching (after)
        let date = result.toLowerCase().split(":")[1].replace(" ", "").replace("#", ""); //get it into just a date
        if (date.length == 0) date = "0000";

        var blank = 0;

        const foundMods = [];

        for (let i = 0; i < modList.length; i++) {
            let found = false;
            for (let j = 0; j < modTags[modList[i]].length; j++) {
                let dateTag = parseInt(modTags[modList[i]][j].toLowerCase().replace("#", ""));
                if (dateTag >= date) found = true;
            }
            if (found) foundMods.push(modList[i]);
        }
        for (let i = 0; i < modList.length; i++) {
            if (foundMods.indexOf(modList[i]) > -1) {
                document.getElementById(modList[i]).style.display = "flex";
                blank = 0;
                document.getElementById("noResults").style.display = "none";
            } else {
                document.getElementById(modList[i]).style.display = "none";
                blank++;
            }
        }
    } else if (result[0] == "#") { //do tag searching instead
        var blank = 0;

        const foundMods = [];
        for (i = 0; i < modTags.all.length; i++) {
            var thing = modTags.all[i];
            var lowercaseThing = thing.toLowerCase();
            if (lowercaseThing.indexOf(result.toLowerCase()) > -1) {
                for (let j = 0; j < modList.length; j++) {
                    let found = false;
                    for (let k = 0; k < modTags[modList[j]].length; k++) {
                        if (modTags[modList[j]][k].toLowerCase() == (lowercaseThing)) found = true;
                    }
                    if (found) foundMods.push(modList[j]);
                }
            }
        }
        for (let i = 0; i < modList.length; i++) {
            if (foundMods.indexOf(modList[i]) > -1) {
                document.getElementById(modList[i]).style.display = "flex";
                blank = 0;
                document.getElementById("noResults").style.display = "none";
            } else {
                document.getElementById(modList[i]).style.display = "none";
                blank++;
            }
        }

    } else if (result != "") { //do regular searching
        var blank = 0;

        for (i = 0; i < modList.length; i++) {
            var thing = modList[i];
            var lowercaseThing = thing.toLowerCase();
            if (lowercaseThing.indexOf(result.toLowerCase()) > -1) {
                document.getElementById(modList[i]).style.display = "flex";
                blank = 0;
                document.getElementById("noResults").style.display = "none";
            } else {
                document.getElementById(modList[i]).style.display = "none";
                blank++;
            }
        }

        if (blank == modList.length) {
            document.getElementById("noResults").style.display = "unset";
        } else {
            document.getElementById("noResults").style.display = "none";
        }
        document.getElementById("comingSoon").style.display = "none";

    } else {

        for (i = 0; i < modList.length; i++) {
            document.getElementById(modList[i]).style.display = "flex";
        }
        document.getElementById("comingSoon").style.display = "flex";
        document.getElementById("noResults").style.display = "none";

    }


    if (result.length == 0) {
        window.history.replaceState(null, "", location.pathname);
    }

}