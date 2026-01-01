export type Cell = boolean;
export type Grid = Cell[][];

export interface GameState {
  grid: Grid;
  moves: number;
  isWon: boolean;
}

/**
 * Creates a new grid of the specified size with random lights
 */
export function createRandomGrid(size: number): Grid {
  const grid: Grid = Array(size)
    .fill(null)
    .map(() =>
      Array(size)
        .fill(null)
        .map(() => Math.random() > 0.6)
    );

  // Ensure the puzzle is solvable by starting from an all-off state
  // and applying random moves
  const solvableGrid: Grid = Array(size)
    .fill(null)
    .map(() => Array(size).fill(false));

  // Apply 5-10 random moves to create a solvable puzzle
  const numMoves = Math.floor(Math.random() * 6) + 5;
  for (let i = 0; i < numMoves; i++) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    toggleCells(solvableGrid, row, col);
  }

  return solvableGrid;
}

/**
 * Toggles a cell and its adjacent neighbors
 */
export function toggleCells(grid: Grid, row: number, col: number): void {
  const size = grid.length;

  // Toggle the clicked cell
  grid[row][col] = !grid[row][col];

  // Toggle adjacent cells (up, down, left, right)
  const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1],  // right
  ];

  directions.forEach(([dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;

    if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
      grid[newRow][newCol] = !grid[newRow][newCol];
    }
  });
}

/**
 * Creates a new grid with toggled cells (immutable)
 */
export function getToggledGrid(grid: Grid, row: number, col: number): Grid {
  const newGrid = grid.map(row => [...row]);
  toggleCells(newGrid, row, col);
  return newGrid;
}

/**
 * Checks if all lights are off (game won)
 */
export function checkWin(grid: Grid): boolean {
  return grid.every(row => row.every(cell => !cell));
}

/**
 * Creates an initial game state
 */
export function createInitialState(size: number = 5): GameState {
  return {
    grid: createRandomGrid(size),
    moves: 0,
    isWon: false,
  };
}
