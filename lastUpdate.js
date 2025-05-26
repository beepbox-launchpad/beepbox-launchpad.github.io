export function calculateNewUpdate(mod) {
    // - Update Times - //

    // PN stands for Patch Notes

    // Make sure to set the date to 7 days after the update happens 

    switch (mod) {
        case "AbyssBox": {
            var abyssboxPN = false;
            return abyssboxPN ? "unset" : "none";
        }
        case "SlarmoosBox": {
            var slarmoosBoxPN = compareDates(2, 6, 2025)
            return slarmoosBoxPN ? "unset" : "none";
        }
        case "UltraBox": {
            var ultraboxPN = compareDates(20, 2, 2025);
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
        case "LemmBox": {
            var LemmBoxPN = false;
            return LemmBoxPN ? "unset" : "none";
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