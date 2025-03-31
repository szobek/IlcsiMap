import { config } from './env.js'

const data_rows = []
const title_array = []
const start = () => {
    gapi.client.init({
        'apiKey': config.apiKey,
        'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(() => {
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: config.sheetId,
            range: config.sheetRange
        })
    }).then((response) => {
        try {
            convertResult(response.result.values);
        } catch (error) {
            console.log("hiba történt a konvertálásnál");
        }
    }).catch((err) => {
        console.log(err);
    });
};
const convertResult = (result) => {
    createTitleArray(result)
    createMarkers(result)
    createScripts()
}
const createMarkers = (result) => {
    for (let row = 1; row < result.length; row++) {
        let obj = {}
        for (let item = 0; item < title_array.length; item++) {
            obj[title_array[item]] = result[row][item]
        }
        data_rows.push(obj)
        obj = {}
    }
    dataOfSpreadsheet.push(data_rows)
}

const createTitleArray = (result) => {
    const title = result[0].values()
    for (let item of title) {
        title_array.push(item)
    }
    dataOfSpreadsheet.push(title_array)
}

const createScripts = () => {
    const mapScript = document.createElement('script');
    const mapApi = document.createElement('script');
    mapScript.src = "map.js";
    mapApi.src = `https://maps.googleapis.com/maps/api/js?key=${config.mapApiKey}&callback=initMap&loading=async`
    document.body.appendChild(mapScript)
    document.body.appendChild(mapApi)
}


(() => {
    gapi.load('client', start);
})()
