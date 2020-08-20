import { pipeline } from 'stream';
import { ReverseTransform } from './utils';
import process from 'process';

async function run() {
  pipeline(
    process.stdin,
    new ReverseTransform(),
    process.stdout,
    err => {
      if (err) {
        console.log('Pipeline failed: ', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  );
}

export default { run };
