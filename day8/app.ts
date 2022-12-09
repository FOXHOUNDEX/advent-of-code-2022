import { readFileSync } from 'fs';

const inputArray = readFileSync("./input.txt").toString().split('\n').map(line => line.split('').map(Number))

type CheckResult = {
  visible: boolean;
  height: number;
}

type MaximumInfo = {
  val: number;
  index: number;
}

export class ArrayManipulation {
  private readonly rowsCount: number;
  private readonly columnsCount: number;
  private readonly upToBottomMaximums: MaximumInfo[];
  private readonly leftToRightMaximums: MaximumInfo[];

  public highestScore = 0;

  constructor(private readonly array: number[][]) {
    this.columnsCount = array.length;
    this.rowsCount = array[0].length;
    this.upToBottomMaximums = [...array[0].map(val => ({ val, index: 0 }))];
    this.leftToRightMaximums = array.map(n => ({ val: n[0], index: 0 }))
  }

  public check(x: number, y: number): CheckResult {
    const allResults = [this.analyze(x, y, 'left'), this.analyze(x, y, 'up'), this.analyze(x, y, 'right'), this.analyze(x, y, 'down')];
    return {
      visible: allResults.some(a => a.visible),
      height: allResults.reduce((sum, curr) => curr.height * sum || 0, 1)
    }
  }

  public countEdgeTrees(): number {
    return (this.columnsCount * 2) + (this.rowsCount * 2) - 4;
  }

  private analyze(x: number, y: number, direction: 'up' | 'down' | 'right' | 'left'): CheckResult {
    const treeHeight: number = this.array[x][y];

    let count = 0;
    let isVisible = true;

    let partToAnalyze
    if (direction === 'up') {
      partToAnalyze = this.array.slice(0, x).map(row => row[y]).reverse()
    } else if (direction === "left") {
      partToAnalyze = this.array[x].slice(0, y).reverse()
    } else if (direction === 'right') {
      partToAnalyze = this.array[x].slice(y + 1)
    } else if (direction === "down") {
      partToAnalyze = this.array.slice(x + 1).map(row => row[y])
    }

    for (let i = 0; i < partToAnalyze.length; ++i) {
      const nextTreeHeight = partToAnalyze[i];
      if (isVisible && nextTreeHeight >= treeHeight) {
        isVisible = false;
      }
      if (nextTreeHeight < treeHeight) {
        ++count;
      }
      if (nextTreeHeight >= treeHeight) {
        ++count
        break;
      }
    }

    return {
      visible: isVisible,
      height: count
    }
  }
}

export function bruteforce(array: number[][]) {
  let countOfVisibleTrees = 0;
  let maxHeight = 0;

  const helper = new ArrayManipulation(array);

  for (let x = 1; x < array.length - 1; x++) {
    for (let y = 1; y < array[x].length - 1; y++) {
      const { visible, height } = helper.check(x, y)
      if (visible) {
        countOfVisibleTrees++;
      }
      if (height > maxHeight) {
        maxHeight = height
      }
    }
  }

  console.log(countOfVisibleTrees + helper.countEdgeTrees())
  console.log(maxHeight)
}

bruteforce(inputArray)