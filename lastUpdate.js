export function calculateNewUpdate(mod) {
    // - Update Times - //

    // PN stands for Patch Notes

    // Make sure to set the date to 7 days after the update happens 

    // If you add a new mod here be sure that there is a valid link to a patch notes in ./mods.json

    switch (mod) {
        case "AbyssBox": {
            var abyssboxPN = compareDates(3, 7, 2025);
            return abyssboxPN ? "unset" : "none";
        }
        case "SlarmoosBox": {
            var slarmoosBoxPN = compareDates(4, 7, 2025);
            return slarmoosBoxPN ? "unset" : "none";
        }
        case "UltraBox": {
            var ultraboxPN = compareDates(2, 7, 2025);
            return ultraboxPN ? "unset" : "none";
        }
        case "BeepBox": {
            var beepBoxPN = false;
            return beepBoxPN ? "unset" : "none";
        }
        case "LemmBox": {
            var LemmBoxPN = compareDates(22, 6, 2025);
            return LemmBoxPN ? "unset" : "none";
        }
        case "JummBox": {
            var jummBoxPN = false;
            return jummBoxPN ? "unset" : "none";
        }
        case "JukeBox": {
            var jukeBoxPN = compareDates(4, 8, 2025);
            return jukeBoxPN ? "unset" : "none";
        }
        
    }
    return "none";
}

function compareDates(updateDay, updateMonth, updateYear) {
    var time = new Date();
    var day = time.getDate();
    var month = time.getMonth() + 1;
    var year = time.getYear() + 1900;
    return (updateYear + updateMonth / 12 + updateDay / 12 / 31 >
        year + month / 12 + day / 12 / 31) 
}
