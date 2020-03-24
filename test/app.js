const axios = require('axios');
const cheerio = require('cheerio'); // html 파싱

const arr = [{"name" : 'park', 'age': 29}, {'name': 'kim', 'age': 30}];
const link = [{"url": "https://groupware.stunitas.com/hr/okr/list"}];

const crawler = async () => {
    // 배열 안의 링크들이 모두 프로미스 이행한 후 promise 반환

    // for of 문은 순차적 실행을 보장하지만 속도가 느리다.
    // promise문은 순차적 실행을 보장하지는 않지만 빠르다. (동시 진행)
    await Promise.all(link.map(async (cv) => {
        const res = await axios.get(cv.url);
        const html = res.data;
        if (res.status === 200) {
            const $ = cheerio.load(html);
            const text = $('button').text();
            console.log(text.trim());
        }
    }))
};

crawler();

// userAgent 내 브라우저가 무엇인지 나타내는 문자열
// 퍼페티어로 사용자로 속이게 할 수 있다.
