const parse = require('csv-parse/lib/sync');
const fs = require('fs');

const csv = fs.readFileSync('csv/movie.csv');
const records = parse(csv.toString('utf-8'));

records.forEach((cv, i) => {
    console.log(i, cv);
});
