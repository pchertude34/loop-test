const fs = require('fs');
const main = require('./loops');
const { generateEntry } = require('./generateData');
const createCsv = require('./createCsv');

const fakeData = {};
const resultData = {};

async function runner() {
  for (let i = 1; i <= 1000; i++) {
    console.log('Object size:', i);
    const entry = generateEntry();
    fakeData[entry.id] = entry;

    const results = await main(fakeData, 1000);

    Object.entries(results.average).forEach(([key, value]) => {
      resultData[key] ? resultData[key].push(value) : (resultData[key] = [value]);
    });
  }

  fs.writeFileSync('./output.json', JSON.stringify(resultData), 'utf8');
  createCsv();
}

runner();
