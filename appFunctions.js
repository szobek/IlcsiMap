import { config } from './env.js'

const dataRows = []
const titleArray = []
const tbody = document.querySelector('#tbody')

export class appFunctions {
    constructor() {

    }

    async createScripts() {
        const scripts = [
            `map.js`,
            `https://maps.googleapis.com/maps/api/js?key=${config.mapApiKey}&libraries=marker&callback=initMap&loading=async`
        ]

        for (let scriptsrc of scripts) {
            const script = document.createElement('script');
            script.src = scriptsrc;

            document.body.appendChild(script)
        }
    }

    createMarkers(result) {

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

    createTitleArray(result) {
        return new Promise((resolve, reject) => {
            const title = result[0].values()
            for (let item of title) {
                titleArray.push(item)
            }
            dataOfSpreadsheet.push(titleArray)
            resolve()
        })
    }

    convertResult(result) {
        this.createTitleArray(result).then(() => {
            this.createMarkers(result)
            this.writeToHTML()
            this.createScripts()
        })

    }
    writeToHTML() {
        const data = dataOfSpreadsheet[1].map(item => {
            return { name: item.Name, city: item.City,sex:item.Sex }
        })
        data.forEach(item => {
            this.createTableRow(item)
        })
    }
    createTableRow(data) {
        const row = document.createElement('tr')
        const cell1 = document.createElement('td')
        const cell2 = document.createElement('td')
        cell1.textContent = data.name
        cell2.textContent = data.city
        row.style.backgroundColor=this.getBackgroundBySex(data.sex)
        row.style.color='white'
        row.appendChild(cell1)
        row.appendChild(cell2)
        tbody.appendChild(row)

    }
    getBackgroundBySex(sex){
        switch(sex){
            case 'Férfi':
                return '#5f5fa5'
            case 'Nő':
                return '#e35d5d'
        }
    }
}