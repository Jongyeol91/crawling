const xlsx = require ('xlsx');

const workbook = xlsx.readFile('xlsx/data.xlsx');

const ws = workbook.Sheets.영화목록
// console.log(workbook);
console.log(ws)

