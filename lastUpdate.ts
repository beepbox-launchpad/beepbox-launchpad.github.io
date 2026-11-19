import { mods } from "./mods";

export function calculateNewUpdate(mod: mods): "unset" | "none" {
    // - Update Times - //

    // Make sure to set the date to 7 days after the update happens 

    // If you add a new mod here be sure that there is a valid link to a patch notes in ./mods.json
    const knownModUpdateTimes: Partial<Record<mods, [number, number, number]>> = {
        AbyssBox: [7, 11, 2025],
        SlarmoosBox: [10, 22, 2026],
        UltraBox: [7, 7, 2026],
        BeepBox: [3, 12, 2025],
        LemmBox: [7, 10, 2025],
        JukeBox: [29, 7, 2026],
        EdoBox: [25, 10, 2025],
        "41Box": [30, 7, 2026],
        froupbox: [30, 7, 2026]
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
function compareDates(updateDay: number, updateMonth: number, updateYear: number) {
    const time = new Date();
    const day = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    return (updateYear + updateMonth / 12 + updateDay / 12 / 31 >
        year + month / 12 + day / 12 / 31) 
}
