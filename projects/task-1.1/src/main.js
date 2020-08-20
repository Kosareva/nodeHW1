import process from 'process';
import app from './app';

app.run()
  .then(() => console.log('App is running...'))
  .catch((e) => console.log('App failed: ', e));

process.on('uncaughtException', (err) => {
  console.log('App crashed: ', err);
});
