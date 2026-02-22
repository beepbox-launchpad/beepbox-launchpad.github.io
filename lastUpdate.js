export function calculateNewUpdate(mod) {
    // - Update Times - //

    // PN stands for Patch Notes

    // Make sure to set the date to 7 days after the update happens 

    // If you add a new mod here be sure that there is a valid link to a patch notes in ./mods.json

    switch (mod) {
        case "AbyssBox": {
            var abyssboxPN = compareDates(7, 11, 2025);
            return abyssboxPN ? "unset" : "none";
        }
        case "SlarmoosBox": {
            var slarmoosBoxPN = compareDates(10, 10, 2025);
            return slarmoosBoxPN ? "unset" : "none";
        }
        case "UltraBox": {
            var ultraboxPN = compareDates(2, 7, 2025);
            return ultraboxPN ? "unset" : "none";
        }
        case "BeepBox": {
            var beepBoxPN = compareDates(3, 12, 2025);
            return beepBoxPN ? "unset" : "none";
        }
        case "LemmBox": {
            var LemmBoxPN = compareDates(7, 10, 2025);
            return LemmBoxPN ? "unset" : "none";
        }
        case "JummBox": {
            var jummBoxPN = false;
            return jummBoxPN ? "unset" : "none";
        }
        case "JukeBox": {
            var jukeBoxPN = compareDates(28, 2, 2026);
            return jukeBoxPN ? "unset" : "none";
        }
        case "EdoBox": {
            var EdoBoxPN = compareDates(25, 10, 2025);
            return EdoBoxPN ? "unset" : "none";
        }
        
    }
    return "none";
}

/**
 * DAY - MONTH - YEAR
 * 
 * Please set to a week after the update releases 
 * @param {The day of the month to display the button until} updateDay 
 * @param {The month to display the button until. This is 1 indexed} updateMonth 
 * @param {The year to display the update until} updateYear 
 * @returns void
 */
function compareDates(updateDay, updateMonth, updateYear) {
    var time = new Date();
    var day = time.getDate();
    var month = time.getMonth() + 1;
    var year = time.getYear() + 1900;
    return (updateYear + updateMonth / 12 + updateDay / 12 / 31 >
        year + month / 12 + day / 12 / 31) 
}
