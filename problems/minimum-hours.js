// IMPORT LIBRARY PACKAGES NEEDED BY YOUR PROGRAM
// SOME FUNCTIONALITY WITHIN A PACKAGE MAY BE RESTRICTED
// DEFINE ANY FUNCTION NEEDED
// FUNCTION SIGNATURE BEGINS, THIS FUNCTION IS REQUIRED
const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]];

function isEmpty(grid, i, j) {
  return i < grid.length && i >= 0 && j < grid[0].length && j >= 0 && grid[i][j] === 0;
}

function minimumHours(rows, columns, grid) {
  let hours = 0;
  let notYets = 0;
  const queue = [];

  // First enqueue all current servers
  // and count servers that not connected yet
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] === 1) {
        queue.push([i, j]);
      } else {
        notYets += 1;
      }
    }
  }

  // No notYets at first
  if (notYets === 0) return 0;

  // Iterate through the queue,
  // after each rounds, if notYets still > 0
  // then iterate the next round
  // until no more servers are not connected
  // or queue is empty but there're some servers not connected
  for (hours = 1; queue.length > 0; hours += 1) {
    for (let idx = 0; idx < queue.length; idx += 1) {
      const [x, y] = queue.shift();

      for (const [deltaX, deltaY] of DIRS) {
        const i = x + deltaX;
        const j = y + deltaY;

        if (isEmpty(grid, i, j)) {
          notYets -= 1;
          if (notYets === 0) return hours;
          grid[i][j] = 1;
          queue.push([i, j]);
        }
      }
    }
  }

  // Queue is empty but there're some servers not connected
  return -1;
}
// FUNCTION SIGNATURE ENDS
