const lines = require('./mylines');

const sums = lines
  .split('\n\n')
  .map(array =>
    array.split('\n')
      .map(Number)
      .reduce((prev, curr) => prev + curr));

const top1 = sums.reduce((prev, curr) => prev > curr ? prev : curr)

const top3sum = sums
  .sort((a, b) => a - b)
  .reverse()
  .splice(0, 3)
  .reduce((prev, curr) => prev + curr)

console.log(`top 1 = ${top1}, sum of top 3 = ${top3sum}`);

