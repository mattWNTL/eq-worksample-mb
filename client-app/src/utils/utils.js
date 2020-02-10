export const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const CapitalizeFirstLetter = (val) => {
    return val ? val.charAt(0).toUpperCase() + val.substring(1) : ""
}