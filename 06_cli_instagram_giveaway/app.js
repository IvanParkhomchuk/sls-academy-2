const fs = require('fs');

const uniqueValues = () => {
    let arr = [];

    for (let i = 0; i < 20; i++) {
        const data = fs.readFileSync(`./files/out${i}.txt`, 'utf8');
        arr = arr.concat(data.split('\n'));
    }

    const usernamesObject = {};

    arr.forEach(elem => {
        if (elem in usernamesObject) {
            usernamesObject[elem]++;
        } else {
            usernamesObject[elem] = 1;
        }
    });

    let count = 0;

    for (let i in usernamesObject) {
        if (usernamesObject[i] === 1) count++;
    }

    return count;
};

const existInAllFiles = () => {
    const arr = [];

    for (let i = 0; i < 20; i++) {
        const data = fs.readFileSync(`./files/out${i}.txt`, 'utf8');
        arr.push(Array.from(new Set(data.split('\n'))));
    }

    const obj = {};

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (!obj[arr[i][j]]) {
                obj[arr[i][j]] = 1;
            } else {
                obj[arr[i][j]]++;
            }
        }
    }

    let count = 0;

    for (let i in obj) {
        if (obj[i] === 20) count++;
    }

    return count;
};

const existInAtLeastTen = () => {
    const arr = [];

    for (let i = 0; i < 20; i++) {
        const data = fs.readFileSync(`./files/out${i}.txt`, 'utf8');
        arr.push(Array.from(new Set(data.split('\n'))));
    }

    const obj = {};

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (!obj[arr[i][j]]) {
                obj[arr[i][j]] = 1;
            } else {
                obj[arr[i][j]]++;
            }
        }
    }

    let count = 0;

    for (let i in obj) {
        if (obj[i] >= 10) count++;
    }

    return count;
};

console.time('program-execution');

console.log('1: ' + uniqueValues());
console.log('2: ' + existInAllFiles());
console.log('3: ' + existInAtLeastTen());

console.timeEnd('program-execution');
