"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bruteforce = exports.ArrayManipulation = void 0;
const fs_1 = require("fs");
const inputArray = (0, fs_1.readFileSync)("./input.txt").toString().split('\n').map(line => line.split('').map(Number));
class ArrayManipulation {
    constructor(array) {
        this.array = array;
        this.highestScore = 0;
        this.columnsCount = array.length;
        this.rowsCount = array[0].length;
        this.upToBottomMaximums = [...array[0].map(val => ({ val, index: 0 }))];
        this.leftToRightMaximums = array.map(n => ({ val: n[0], index: 0 }));
    }
    check(x, y) {
        const allResults = [this.analyze(x, y, 'left'), this.analyze(x, y, 'up'), this.analyze(x, y, 'right'), this.analyze(x, y, 'down')];
        return {
            visible: allResults.some(a => a.visible),
            countOfTreesVisible: allResults.reduce((sum, curr) => curr.countOfTreesVisible * sum || 0, 1)
        };
    }
    countEdgeTrees() {
        return (this.columnsCount * 2) + (this.rowsCount * 2) - 4;
    }
    checkLeft(x, y) {
        const treeHeight = this.array[x][y];
        const currentMaxToTheLeft = this.leftToRightMaximums[x].val;
        if (treeHeight >= currentMaxToTheLeft) {
            this.leftToRightMaximums[x] = {
                val: treeHeight,
                index: y
            };
            return {
                visible: treeHeight > currentMaxToTheLeft,
                countOfTreesVisible: treeHeight > currentMaxToTheLeft ? y : y - this.leftToRightMaximums[x].index + 1
            };
        }
        return {
            visible: false,
            countOfTreesVisible: y - this.leftToRightMaximums[x].index
        };
    }
    checkTop(x, y) {
        const treeHeight = this.array[x][y];
        const currentMaxFromTheTop = this.upToBottomMaximums[y].val;
        if (treeHeight >= currentMaxFromTheTop) {
            this.upToBottomMaximums[y] = {
                val: treeHeight,
                index: x
            };
            return {
                visible: treeHeight > currentMaxFromTheTop,
                countOfTreesVisible: treeHeight > currentMaxFromTheTop ? x : x - this.upToBottomMaximums[y].index + 1
            };
        }
        return {
            visible: false,
            countOfTreesVisible: x - this.upToBottomMaximums[y].index
        };
    }
    checkToRight(x, y) {
        const treeHeight = this.array[x][y];
        const rightPart = this.array[x].slice(y + 1);
        let count = 0;
        let isVisible = true;
        for (let i = 0; i < rightPart.length; i++) {
            const nextTreeHeight = rightPart[i];
            if (isVisible && nextTreeHeight >= treeHeight) {
                isVisible = false;
            }
            if (nextTreeHeight < treeHeight) {
                ++count;
            }
            if (nextTreeHeight >= treeHeight) {
                ++count;
                break;
            }
        }
        return {
            visible: isVisible,
            countOfTreesVisible: count
        };
    }
    // private analyze(x: number, y: number, direction: 'up' | 'down' | 'right' | 'left'): CheckResult {
    //   const treeHeight: number = this.array[x][y];
    //   const increment = ['right', 'down'].includes(direction) ? 1 : -1;
    //   const part = ['right', 'left'].includes(direction)
    //     ? this.array[x].slice(y + increment)
    //     : this.array.slice(x + increment).map(row => row[y]);
    //   let count = 0;
    //   let isVisible = true;
    //   let i = increment === -1 ? part.length : 0
    //   let upper = increment === -1 ? 0 : part.length
    //   for (; i !== upper; i += increment) {
    //     const nextTreeHeight = part[i];
    //     if (isVisible && nextTreeHeight >= treeHeight) {
    //       isVisible = false;
    //     }
    //     if (nextTreeHeight < treeHeight) {
    //       ++count;
    //     }
    //     if (nextTreeHeight >= treeHeight) {
    //       ++count
    //       break;
    //     }
    //   }
    //   return {
    //     visible: isVisible,
    //     countOfTreesVisible: count
    //   }
    // }
    analyze(x, y, direction) {
        const treeHeight = this.array[x][y];
        let count = 0;
        let isVisible = true;
        let part;
        if (direction === 'up') {
            // part = this.array[x].slice(0, x).reverse().map(row => row[y])
            part = this.array.slice(0, x).map(row => row[y]).reverse();
        }
        else if (direction === "left") {
            part = this.array[x].slice(0, y).reverse();
        }
        else if (direction === 'right') {
            part = this.array[x].slice(y + 1);
        }
        else if (direction === "down") {
            part = this.array.slice(x + 1).map(row => row[y]);
        }
        for (let i = 0; i < part.length; ++i) {
            const nextTreeHeight = part[i];
            if (isVisible && nextTreeHeight >= treeHeight) {
                isVisible = false;
            }
            if (nextTreeHeight < treeHeight) {
                ++count;
            }
            if (nextTreeHeight >= treeHeight) {
                ++count;
                break;
            }
        }
        return {
            visible: isVisible,
            countOfTreesVisible: count
        };
    }
    // private resolvePart()
    checkToBottom(x, y) {
        const treeHeight = this.array[x][y];
        const bottomPart = this.array.slice(x + 1).map(row => row[y]);
        // console.log(this.array.slice(x + 1).map)
        console.log(`check bottom [${x}, ${y}] value - ${this.array[x][y]}`);
        let count = 0;
        let isVisible = true;
        for (let i = 0; i < bottomPart.length; i++) {
            const nextTreeHeight = bottomPart[i];
            if (isVisible && nextTreeHeight >= treeHeight) {
                isVisible = false;
            }
            if (nextTreeHeight < treeHeight) {
                ++count;
            }
            if (nextTreeHeight >= treeHeight) {
                ++count;
                break;
            }
        }
        console.log(`bottom - ${bottomPart}, every result ${bottomPart.every(val => val < treeHeight)}, my result - ${isVisible}, count ${count}`);
        return {
            visible: isVisible,
            countOfTreesVisible: count
        };
    }
}
exports.ArrayManipulation = ArrayManipulation;
function bruteforce(array) {
    let count = 0;
    let maxVisibleTrees = 0;
    const helper = new ArrayManipulation(array);
    const treesVisibility = [
        [-1, -1, -1, -1, -1],
        [-1, 1, 4, 1, -1],
        [-1, 6, 2, 2, -1],
        [-1, 1, 4, 8, -1],
        [-1, -1, -1, -1, -1],
    ];
    for (let x = 1; x < array.length - 1; x++) {
        for (let y = 1; y < array[x].length - 1; y++) {
            if (x === 2 && y === 2) {
                const stophere = true;
                console.log(stophere);
            }
            const { visible, countOfTreesVisible } = helper.check(x, y);
            if (visible) {
                count++;
            }
            if (countOfTreesVisible > maxVisibleTrees) {
                maxVisibleTrees = countOfTreesVisible;
                console.log(x, y);
            }
            if (treesVisibility[x][y] !== countOfTreesVisible) {
                console.log(`lol, ${x},${y} (${array[x][y]}) should be ${treesVisibility[x][y]} but got ${countOfTreesVisible}`);
            }
        }
    }
    console.log(count + helper.countEdgeTrees());
    console.log(maxVisibleTrees);
}
exports.bruteforce = bruteforce;
bruteforce(inputArray);
//# sourceMappingURL=app.js.map