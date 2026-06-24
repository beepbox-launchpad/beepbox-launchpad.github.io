export function calculateNewUpdate(mod) {
    // - Update Times - //

    // PN stands for Patch Notes

    // Make sure to set the date to 7 days after the update happens 

    // If you add a new mod here be sure that there is a valid link to a patch notes in ./mods.json

    const knownModUpdateTimes = {
        AbyssBox: [7, 11, 2025],
        SlarmoosBox: [4, 3, 2026],
        UltraBox: [2, 7, 2025],
        BeepBox: [3, 12, 2025],
        LemmBox: [7, 10, 2025],
        JukeBox: [8, 3, 2026],
        EdoBox: [25, 10, 2025],
        "41Box": [14, 4, 2026],
    };

    const modUpdateDate = knownModUpdateTimes[mod];

    if (!modUpdateDate) return "none";

    return compareDates(...modUpdateDate) ? "unset" : "none";
}

/**
 * DAY - MONTH - YEAR
 * 
 * Please set to a week after the update releases 
 * @param {number} updateDay - The day of the month to display the button until
 * @param {number} updateMonth - The month to display the button until. This is 1 indexed
 * @param {number} updateYear - The year to display the update until
 * @returns {boolean}
 */
function compareDates(updateDay, updateMonth, updateYear) {
    var time = new Date();
    var day = time.getDate();
    var month = time.getMonth() + 1;
    var year = time.getYear() + 1900;
    return (updateYear + updateMonth / 12 + updateDay / 12 / 31 >
        year + month / 12 + day / 12 / 31) 
}
