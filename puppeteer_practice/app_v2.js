const puppeteer = require('puppeteer');
const fs = require('fs');

// 엑셀 모듈
const xlsx = require('xlsx');
const workbook = xlsx.readFile('xlsx/data.xlsx');

// csv모듈
const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');

// 엑셀
const add_to_sheet = require('./add_to_sheet');
const ws = workbook.Sheets.영화목록;
const records = xlsx.utils.sheet_to_json(ws);

// csv
const csv = fs.readFileSync('./csv/movie.csv');
//const records = parse(csv.toString('utf-8'));

const crawler = async () => {
    try {
        const result = [];
        const browser = await puppeteer.launch({headless: process.env.NODE_ENV === 'production'}); // true: 화면이 없게 (default)

        // @ 페이지 객체 생성 (엑셀) + 이동
        //await Promise.all(records.map(async (r, i) => {
        const page = await browser.newPage(); // 한탭에서 계속 사용하기 위해 for문 바깥으로 뺌
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36");
        for (const [i, r] of records.entries()) {
            await page.goto(r[1]);

            const text = await page.evaluate(() => {
                const score = document.querySelector('.score.score_left .star_score'); // document를 쓰려면 page.evaluate안에서 써야함
                if (score) {
                    return score.textContent
                }
            });
            console.log(text);
            if (text) {
                result[i] = [r[0], r[1], text.trim()];
            }
            await page.waitFor(1000);
        }
            await page.close();
            await browser.close();
            const str = stringify(result); // 이중배배열을 sv로 만들어 줌
            fs.writeFileSync('csv/result4.csv', str); // 파일에 받아온 텍스트(평점)를 씀
    } catch (err) {
        console.log(err);
    }
};

crawler();

// 크롤링 vs api

// for of 문은 순차적 실행을 보장하지만 속도가 느리다.
// promise문은 순차적 실행을 보장하지는 않지만 빠르다. (동시 진행)

// @ 페이지 객체 생성 방법 1
// const page = await browser.newPage();
// const page2 = await browser.newPage();

// @ 페이지 객체 생성 방법 2
// const [page, page2] = await Promise.all([browser.newPage(), browser.newPage()]);

// @ 페이지 이동
// await Promise.all([
//     page.goto('https://www.daum.net'),
//     page2.goto('https://www.naver.com'),
// ]);

// @ 태그핸들러 가져오기
// const scoreEl = await page.$('.score.score_left .star_score');
// if (scoreEl) {
//     const text = await page.evaluate(tag => tag.textContent, scoreEl);
//     // result.push([r[0], r[1], text.trim()]); // Promise.all로 돌아서 온것이기 때문에 순서가 보장이 안됨
//     result[i] = [r[0], r[1], text.trim()]; // i는 promise.all이 시작하기 전에 생성되는 index이기 때문에 i를 result의 인덱스로 사용하면 원래순서대로 저장 가능
// }