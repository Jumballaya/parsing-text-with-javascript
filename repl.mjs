/****
 *
 * Calculator
 */
import rl from 'readline'
import calculator from './src/index.mjs'

const gets = (msg, cb) => {
  const message = msg + '\n';
  const r = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  r.question(message, a => {
    r.close();
    cb(null, a);
  });
};

const App = () => {
  let running = true;
  gets('What can I calculate?', (err, answer) => {
    if (answer === 'quit') {
      return;
    }

    const solution = calculator.evaluate(answer);
    if (solution.errors.length) {
      solution.errors.forEach(console.log);
    } else {
      console.log(solution.output[0]);
      console.log('');
    }

    App();
  });
};

App();
