import { config } from './env.js'

const dataRows = []
const titleArray = []
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
        for (let item = 0; item < titleArray.length; item++) {
            obj[titleArray[item]] = result[row][item]
        }
        dataRows.push(obj)
        obj = {}
    }
    dataOfSpreadsheet.push(dataRows)
}

const createTitleArray = (result) => {
    const title = result[0].values()
    for (let item of title) {
        titleArray.push(item)
    }
    dataOfSpreadsheet.push(titleArray)
}

const createScripts = () => {
    const scripts=[
        'map.js',
        `https://maps.googleapis.com/maps/api/js?key=${config.mapApiKey}&libraries=marker&callback=initMap&loading=async`
    ]

    for(let scriptsrc of scripts){
        const script = document.createElement('script');
        script.src = scriptsrc;
        document.body.appendChild(script)
    }
}


(() => {
    gapi.load('client', start);
})()
