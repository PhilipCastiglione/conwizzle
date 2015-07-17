function setCells(grid, r, c, offsets) {
  for (var i = 0; i < offsets.length; i++) {
    grid[r+offsets[i][0]][c+offsets[i][1]][0] = 1;
  }
}

function rpentomino(grid, r, c) {
  setCells(grid, r , c,[[-1,0],
                        [-1,1],
                        [0,-1],
                        [0,0],
                        [1,0]]);
}

function diehard(grid, r, c) {
  setCells(grid, r , c,[[-1,3],
                        [0,-3],
                        [0,-2],
                        [1,-2],
                        [1,2],
                        [1,3],
                        [1,4]]);
}

function acorn(grid, r, c) {
  setCells(grid, r , c,[[-1,-2],
                        [0,0],
                        [1,-3],
                        [1,-2],
                        [1,1],
                        [1,2],
                        [1,3]]);
}

function glider(grid, r, c) {
  setCells(grid, r , c,[[-1,-1],
                        [0,0],
                        [0,1],
                        [1,-1],
                        [1,0]]);
}

function lwss(grid, r, c) {
  setCells(grid, r , c,[[-2,-1],
                        [-2,0],
                        [-1,-2],
                        [-1,-1],
                        [-1,0],
                        [-1,1],
                        [0,-2],
                        [0,-1],
                        [0,1],
                        [0,2],
                        [1,0],
                        [1,1]]);
}