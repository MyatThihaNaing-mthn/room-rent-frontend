export function capitalize(word){
    if(!word) return word;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function convertForUi(word){
    switch(word){
        case "airConTime":
            return "AirCon"
        case "cookingAllowance":
            return "Cooking"
        case "location":
            return "Location"
        case "propertyType":
            return "Property Type"
        case "roomType":
            return "Room Type"
        case "sharePub":
            return "PUB"
        case "stationName":
            return "Station"
        default:
            return ""
    }
}

const stringUtils = {
    convertForUi,
    capitalize
}

export default stringUtils
