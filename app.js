import { config } from './env.js'
import { appFunctions } from './appFunctions.js';


const af=new appFunctions()

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
            console.error("hiba történt a konvertálásnál",error);
        }
    }).catch((err) => {
        console.error(err);
    });
};
const convertResult = (result) => {
    af.createTitleArray(result)
    af.createMarkers(result).then(af.createScripts())
}

(() => {
    gapi.load('client', start);
})()
