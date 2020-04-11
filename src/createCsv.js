const fs = require('fs');
const FILE_PATH = './output';

module.exports = function () {
  const data = JSON.parse(fs.readFileSync(FILE_PATH + '.json', 'utf8'));

  // Clear the file
  fs.writeFileSync(FILE_PATH + '.csv', '', 'utf8');
  const len = data[Object.keys(data)[0]].length;
  const keys = Object.keys(data);

  fs.appendFileSync(FILE_PATH + '.csv', ['Object Property Count', ...keys, '\r\n'].join(), 'utf8');

  for (let i = 0; i < len; i++) {
    const row = [];
    keys.forEach((key) => {
      row.push(data[key][i]);
    });

    fs.appendFileSync(FILE_PATH + '.csv', [i + 1, ...row, '\r\n'].join(), 'utf8');
  }
};
