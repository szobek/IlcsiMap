import { config, dataOfSpreadsheet } from './env.js'
export class appFunctions {
    dataRows
    titleArray
    tbody
    constructor() {
        this.dataRows=[]
        this.titleArray= []
        this.tbody = document.querySelector('#tbody')
    }
    
    createScripts() {
        const scripts = [
            `map.js`,
            `https://maps.googleapis.com/maps/api/js?key=${config.mapApiKey}&libraries=marker&callback=initMap&loading=async`
        ]

        for (let scriptsrc of scripts) {
            const script = document.createElement('script');
            script.src = scriptsrc;
            if (scriptsrc.includes("maps.googleapis.com")) script.async = true;
            if (scriptsrc.includes("map.js")) script.type = "module"
            document.body.appendChild(script)
        }
    }

    createMarkers(result) {
        for (let row = 1; row < result.length; row++) {
            const obj = {}
            for (let item = 0; item < this.titleArray.length; item++)  obj[this.titleArray[item]] = result[row][item] 
            this.dataRows.push(obj)
        }
        dataOfSpreadsheet.push(this.dataRows)
    }

    createTitleArray(result) {
        return new Promise((resolve, reject) => {
            const title = result[0].values()
            for (let item of title) {
                this.titleArray.push(item)
            }
            dataOfSpreadsheet.push(this.titleArray)
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
        dataOfSpreadsheet[1].forEach(item => {
            this.createTableRow(item)
        })
    }
    createTableRow(data) {
        const row = document.createElement('tr')
        const cell1 = document.createElement('td')
        const cell2 = document.createElement('td')
        cell1.textContent = data.Name
        cell2.textContent = data.City
        row.style.backgroundColor = this.getBackgroundBySex(data.Sex)
        row.style.color = 'white'
        row.appendChild(cell1)
        row.appendChild(cell2)
        this.tbody.appendChild(row)

    }
    getBackgroundBySex(sex) {
        switch (sex) {
            case 'Férfi':
                return '#5f5fa5'
            case 'Nő':
                return '#e35d5d'
        }
    }
}