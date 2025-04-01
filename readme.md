# Ilcsi dumabox tagok
Megjeleníti a tagokat egy [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1p6-tKnTOQdKGPFxyt05FTaCDkBNuUL3aUaI0xaLkU8o/edit?usp=sharing) alapján.  
Ebben felvehető pár adat.  
Ha szükséges, bővítem!

# Működéshez
Kell egy env.js amiben van pár dolog  
Példa:  
export const config = {
    apiKey:"KEY",
    sheetId:'FILE_ID',
    sheetRange:'MUNKALAP_NEVE!TARTOMÁNY',
    mapApiKey:'MAPKEY',
    mapID: 'MAP_ID'
}

export const dataOfSpreadsheet=[]

