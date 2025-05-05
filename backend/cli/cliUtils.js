const readline = require('readline');

const ask = (q) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => rl.question(q, (ans) => {
    rl.close();
    resolve(ans);
  }));
};

module.exports = { ask };
