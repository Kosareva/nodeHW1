import process from 'process';
import app from './app';

const successCode = 0;
const errorCode = 1;

app.run()
  .then(() => {
    console.log('File has been processed');
    process.exit(successCode);
  })
  .catch((e) => {
    console.log('App failed: ', e);
    process.exit(errorCode);
  });

process.on('uncaughtException', (err) => {
  console.log('App crashed: ', err);
});
