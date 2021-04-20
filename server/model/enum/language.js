/**
 * Languages of the game, Karen included.
 */
const Languages = {
    ALBANIAN: "Albanian",
    ARABIC: "Arabic",
    BOSNIAN: "Bosnian",
    BULGARIAN: "Bulgarian",
    CZECH: "Czech",
    DANISH: "Danish",
    DUTCH: "Dutch",
    ENGLISH: "English",
    FINNISH: "Finnish",
    FRENCH: "French",
    GERMAN: "German",
    GREEK: "Greek",
    HUNGARIAN: "Hungarian",
    ICELANDIC: "Icelandic",
    INDONESIAN: "Indonesian",
    ITALIAN: "Italian",
    JAPANESE: "Japanese",
    KAREN: "Karen", // I want to see the manager
    KOREAN: "Korean",
    LITHUANIAN: "Lithuanian",
    MANDARIN: "Mandarin",
    NORWEGIAN: "Norwegian",
    POLISH: "Polish",
    PORTUGUESE: "Portuguese",
    RUSSIAN: "Russian",
    SLOVAK: "Slovak",
    SPANISH: "Spanish",
    SWEDISH: "Swedish",
    TAIWANESE: "Taiwanese",
    TURKISH: "Turkish",
    VIETNAMESE: "Vietnamese",
};

// Turn enum into array of strings
function toArray(languages) {
    let array = []
    for(let key in Languages){
        array.push(languages[key]);
    }
    return array;
}

module.exports = toArray(Languages);