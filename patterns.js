function rpentomino(grid, r, c) {
  grid[r-1][c][0] = 1;
  grid[r-1][c+1][0] = 1;
  grid[r][c-1][0] = 1;
  grid[r][c][0] = 1;
  grid[r+1][c][0] = 1;
}

function diehard(grid, r, c) {
  grid[r-1][c+3][0] = 1;
  grid[r][c-3][0] = 1;
  grid[r][c-2][0] = 1;
  grid[r+1][c-2][0] = 1;
  grid[r+1][c+2][0] = 1;
  grid[r+1][c+3][0] = 1;
  grid[r+1][c+4][0] = 1;
}

function acorn(grid, r, c) {
  grid[r-1][c-2][0] = 1;
  grid[r][c][0] = 1;
  grid[r+1][c-3][0] = 1;
  grid[r+1][c-2][0] = 1;
  grid[r+1][c+1][0] = 1;
  grid[r+1][c+2][0] = 1;
  grid[r+1][c+3][0] = 1;
}

function glider(grid, r, c) {
  grid[r-1][c-1][0] = 1;
  grid[r][c][0] = 1;
  grid[r][c+1][0] = 1;
  grid[r+1][c-1][0] = 1;
  grid[r+1][c][0] = 1;
}

function lwss(grid, r, c) {
  grid[r-2][c-1][0] = 1;
  grid[r-2][c][0] = 1;
  grid[r-1][c-2][0] = 1;
  grid[r-1][c-1][0] = 1;
  grid[r-1][c][0] = 1;
  grid[r-1][c+1][0] = 1;
  grid[r][c-2][0] = 1;
  grid[r][c-1][0] = 1;
  grid[r][c+1][0] = 1;
  grid[r][c+2][0] = 1;
  grid[r+1][c][0] = 1;
  grid[r+1][c+1][0] = 1;
}