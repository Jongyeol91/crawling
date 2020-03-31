require('dotenv').config();

const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet(process.env.SHEET_ID2);

const start = async () => {
    await doc.useServiceAccountAuth(require('./config/crawling-270209-ff9c6d170e06.json'));
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    // 바라볼 시트 설정
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    // console.log(sheet.title);
    // console.log(sheet.rowCount);

    // 시트 만들기
    // const sheet = await doc.addSheet({ headerValues: ['name', 'email'] });

    // 로우에 데이터 추가하기
    // const larryRow = await sheet.addRow({ name: 'Larry Page', email: 'larry@google.com' });
    // const moreRows = await sheet.addRows([
    //     { name: 'Sergey Brin', email: 'sergey@google.com' },
    //     { name: 'Eric Schmidt', email: 'eric@google.com' },
    // ]);

    // 로우 불러오기
    const rows = await sheet.getRows(); // can pass in { limit, offset }
    console.log(rows[0].name); // 'Larry Page'

    console.log()

    // 셀
    // await sheet.loadCells('A1:B6'); // loads a range of cells
    // // const targetCell = await sheet.getCell(6, 11); // or A1 style notation
    // const cell = sheet.getCellByA1('A1'); // or A1 style notation
    // console.log(cell.value);
};

start();
