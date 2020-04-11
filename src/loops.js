var fakeData;

// Loop using traditional for loop
function traditionalLoop() {
  const keys = Object.keys(fakeData);
  const objArray = [];

  for (let i = 0, len = keys.length; i < len; i++) {
    const data = fakeData[keys[i]];
    objArray.push({
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      id: data.id,
    });
  }
}

// Loop using the short hand for loop
function forInLoop() {
  const objArray = [];

  for (let key in fakeData) {
    objArray.push({
      firstName: fakeData[key].firstName,
      lastName: fakeData[key].lastName,
      address: fakeData[key].address,
      id: fakeData[key].id,
    });
  }
}

// Loop using the short hand for loop and object entries
function forOfLoop() {
  const objArray = [];

  for (let [key, value] of Object.entries(fakeData)) {
    objArray.push({
      firstName: value.firstName,
      lastName: value.lastName,
      address: value.address,
      id: value.id,
    });
  }
}

// Loop using es6 for each loop
function forEachLoopKeys() {
  const objArray = [];

  Object.keys(fakeData).forEach((key) => {
    objArray.push({
      firstName: fakeData[key].firstName,
      lastName: fakeData[key].lastName,
      address: fakeData[key].address,
      id: fakeData[key].id,
    });
  });
}

// Loop using es6 for each loop and object entries
function forEachLoopEntries() {
  const objArray = [];

  Object.entries(fakeData).forEach(([, value]) => {
    objArray.push({
      firstName: value.firstName,
      lastName: value.lastName,
      address: value.address,
    });
  });
}

/**
 * Time a function, return the duration
 * @param {function} functionToTime The function to time
 */
function timeMe(functionToTime) {
  const hrstart = process.hrtime();
  functionToTime();
  const end = process.hrtime(hrstart);

  // convert seconds to nanoseconds
  // convert combined nanoseconds to miliseconds
  // return a promise so we don't have to wait for everything
  // return Promise.resolve((end[0] * 1000000000 + end[1]) / 1000000);
  return (end[0] * 1000000000 + end[1]) / 1000000;
}

async function main(data, loops = 1000, doLog = false) {
  fakeData = data;

  let totalTraditionalDuration = 0;
  let totalForInDuration = 0;
  let totalForOfDuration = 0;
  let totalForEachKeysDuration = 0;
  let totalForEachEntriesDuration = 0;

  for (let i = 0; i < loops; i++) {
    totalTraditionalDuration += timeMe(traditionalLoop);
    totalForInDuration += timeMe(forInLoop);
    totalForOfDuration += timeMe(forOfLoop);
    totalForEachKeysDuration += timeMe(forEachLoopKeys);
    totalForEachEntriesDuration += timeMe(forEachLoopEntries);
  }

  const timetable = [
    {
      loop: 'Traditional For Loop',
      duration: totalTraditionalDuration.toFixed(5),
      average: (totalTraditionalDuration / loops).toFixed(5),
    },
    {
      loop: 'Enhanced For Loop',
      duration: totalForInDuration.toFixed(5),
      average: (totalForInDuration / loops).toFixed(5),
    },
    {
      loop: 'Enhanced For Loop using Entries',
      duration: totalForOfDuration.toFixed(5),
      average: (totalForOfDuration / loops).toFixed(5),
    },
    {
      loop: 'For Each Loop',
      duration: totalForEachKeysDuration.toFixed(5),
      average: (totalForEachKeysDuration / loops).toFixed(5),
    },
    {
      loop: 'For Each Loop using Entries',
      duration: totalForEachEntriesDuration.toFixed(5),
      average: (totalForEachEntriesDuration / loops).toFixed(5),
    },
  ];

  if (doLog) {
    console.log('Number of entries in map:', Object.keys(fakeData).length);
    console.log('Number of Loops:', loops);
    console.table(timetable);
  }

  return {
    average: {
      'Traditional For Loop': totalTraditionalDuration / loops,
      'Enhanced For Loop': totalForInDuration / loops,
      'Enhanced For Loop with Entries:': totalForOfDuration / loops,
      'For Each Loop': totalForEachKeysDuration / loops,
      'For Each Loop with Entries': totalForEachEntriesDuration / loops,
    },
    duration: {
      'Traditional For Loop': totalTraditionalDuration,
      'Enhanced For Loop': totalForInDuration,
      'Enhanced For Loop with Entries:': totalForOfDuration,
      'For Each Loop': totalForEachKeysDuration,
      'For Each Loop with Entries': totalForEachEntriesDuration,
    },
  };
}

module.exports = main;
