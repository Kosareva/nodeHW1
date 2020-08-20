import fs from 'fs';
import csv from 'csvtojson';
import { once } from 'events';
import path from 'path';
import readline from 'readline';

const inputPath = path.resolve(__dirname, '../assets/input.csv');
const outputPath = path.resolve(__dirname, '../out/output.txt');

function createWriteStream() {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(path.resolve(__dirname, '../out'));
  }
  return fs.createWriteStream(outputPath);
}

const readable = fs.createReadStream(inputPath)
  .on('error', (err) => {
    console.log('read error: ', err);
  });
const writable = createWriteStream()
  .on('error', (err) => {
    console.log('write error: ', err);
  });

const lineReader = readline.createInterface({
  input: readable
});

async function buildHeaders() {
  const headers = [];
  lineReader.on('line', (line) => {
    headers.push(...line.split(',').map(el => el.toLowerCase()));
    lineReader.close();
    lineReader.removeAllListeners();
  });
  await once(lineReader, 'close');
  return headers;
}

async function processFile(headers) {
  return new Promise((resolve, reject) => {
    const onCsvReadError = (err) => {
      reject('csv read error: ', err);
    };
    const onComplete = () => {
      writable.end();
    };
    writable.on('finish', () => {
      resolve();
    });
    csv({
      headers,
      ignoreColumns: /(amount)/
    })
      .fromFile(inputPath)
      .subscribe((json) => {
        writable.write(`${JSON.stringify(json)}\n`);
      }, onCsvReadError, onComplete);
  });
}

async function run() {
  const headers = await buildHeaders();
  return processFile(headers);
}

export default { run };
