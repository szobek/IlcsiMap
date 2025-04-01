import { config } from './env.js'

const dataRows = []
const titleArray = []

export class appFunctions {
    constructor() { 
    }

    createScripts() {
        const scripts = [
            'map.js',
            `https://maps.googleapis.com/maps/api/js?key=${config.mapApiKey}&libraries=marker&callback=initMap&loading=async`
        ]

        for (let scriptsrc of scripts) {
            const script = document.createElement('script');
            script.src = scriptsrc;
            document.body.appendChild(script)
        }
    }

    createMarkers(result) {
        return new Promise((resolve, reject) => {
            for (let row = 1; row < result.length; row++) {
                let obj = {}
                for (let item = 0; item < titleArray.length; item++) {
                    obj[titleArray[item]] = result[row][item]
                }
                dataRows.push(obj)
                obj = {}
            }
            dataOfSpreadsheet.push(dataRows)
            resolve()
        })
    }

    createTitleArray(result) {

        const title = result[0].values()
        for (let item of title) {
            titleArray.push(item)
        }
        dataOfSpreadsheet.push(titleArray)
    }

    convertResult(result) {
        this.createTitleArray(result)
        this.createMarkers(result).then(this.createScripts())

    }

}