require('dotenv').config();

const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

const start = async () => {
    await doc.useServiceAccountAuth(require('./config/crawling-270209-ff9c6d170e06.json'));
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[3]; // or use doc.sheetsById[id]
    console.log(sheet.title);
    // console.log(sheet.rowCount);

    const rows = await sheet.getRows(); // can pass in { limit, offset }
    // console.dir(rows[3]); // 'Larry Page'

    await sheet.loadCells('F5:E129'); // loads a range of cells
    // const targetCell = await sheet.getCell(6, 11); // or A1 style notation
    const c6 = sheet.getCellByA1('C6'); // or A1 style notation
}

start();
