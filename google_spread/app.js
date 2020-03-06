require('dotenv').config();

const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

const start = async () => {
    await doc.useServiceAccountAuth(require('./config/crawling-270209-ff9c6d170e06.json'));
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[3]; // or use doc.sheetsById[id]
    console.log(sheet.title);
    console.log(sheet.rowCount);

    // const rows = await sheet.getRows(); // can pass in { limit, offset }
    // console.log(rows[1]); // 'Larry Page'

    await sheet.loadCells('E5:E129'); // loads a range of cells
    // console.log(sheet.cellStats);
    const e15 = await sheet.getCellByA1('E15'); // or A1 style notation
    console.log(e15)
}

start();