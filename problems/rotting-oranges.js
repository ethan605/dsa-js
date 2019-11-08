/*
 * See more: https://leetcode.com/problems/rotting-oranges/
 */

const ADJACENT_DELTAS = [[-1, 0], [0, -1], [1, 0], [0, 1]];
const FRESH = 1;
const ROTTEN = 2;

function encode(i, j) {
  return [i, j].join('-');
}

function decode(coord) {
  return coord.split('-').map(part => parseInt(part, 10));
}

function getAdjacentFreshIndices(grid, i, j) {
  return ADJACENT_DELTAS.map(([deltaI, deltaJ]) => [i + deltaI, j + deltaJ])
    .filter(([x, y]) => grid[x] && grid[x][y] === FRESH)
    .map(([x, y]) => encode(x, y));
}

function orangesRotting(grid) {
  let minutes = 0;
  let freshCount = 0;

  // All indices awaited to be rotten in the next minute
  let rottenAwaited = new Set();

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === FRESH) freshCount += 1;

      if (grid[i][j] === ROTTEN) {
        getAdjacentFreshIndices(grid, i, j).forEach(coord => rottenAwaited.add(coord));
      }
    }
  }

  console.log('start:', {
    freshCount,
    rottenAwaited,
  });

  while (rottenAwaited.size > 0) {
    let haveFreshes = false;
    const temp = new Set();

    rottenAwaited.forEach(codedCord => {
      const [i, j] = decode(codedCord);

      if (grid[i][j] === FRESH) {
        grid[i][j] = ROTTEN;
        freshCount -= 1;
        getAdjacentFreshIndices(grid, i, j).forEach(coord => temp.add(coord));
        haveFreshes = true;
      }
    });

    rottenAwaited = new Set(temp);

    if (haveFreshes) {
      minutes += 1;
    }
  }

  // There're some fresh ones left without touched by rotten ones
  if (freshCount > 0) return -1;

  return minutes;
}

// console.log(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]));
// console.log(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]]));
// console.log(orangesRotting([[0, 2]]));
console.log(orangesRotting([[2, 2], [1, 1], [0, 0], [2, 0]]));
