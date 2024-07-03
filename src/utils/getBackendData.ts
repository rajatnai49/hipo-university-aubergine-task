const API_URL = "http://universities.hipolabs.com";

async function getUniversitiesData(name?: string) {
    let url = API_URL + "/search";
    if (name) {
        url += "?name=" + name;
    }

    const res = await fetch(encodeURI(url))
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


export { getUniversitiesData }
