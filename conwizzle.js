// ON LOAD
window.onload = function() {
  setCanvasSize();
  resetGrid();
  centerPattern('acorn');
  intervalId = setInterval(tick, speed);
}

// ON RESIZE
window.onresize = setCanvasSize;

// INITIALIZE GLOBALS
var windowWidth, windowHeight, cellWidth, cellHeight, intervalId;
var grid = [],
    rows = 100,
    columns = 100,
    speed = 100;
    generation = 0;
var size = rows * columns;

// GRID
function resetGrid() {
  grid = [];
  for (var i = 0; i < size; i++) {
    grid.push(0);
  }
}

// PATTERNS
function centerPattern(pattern) {
  setCells(size / 2 + columns / 2, patterns[pattern]);
}

function setCells(i, offsets) {
  for (var rp = 0; rp < offsets.length; rp++) {
    grid[(i + (offsets[rp][0] * columns) + offsets[rp][1])] = 1;
  }
}

// ENGINE
function tick() {
  generation++;
  grid = forecastCells();
  draw();
}

function forecastCells() {
  return _.map(grid, function(val, i) {return determineState(i);});
}

function determineState(i) {
  var score = getCellScore(i);
  return (score === 3 || grid[i] == 1 && score === 2)? 1 : 0;
}

function getCellScore(i) {
  return _.reduce([
    grid[(i - columns - 1 + size) % size],
    grid[(i - columns + size) % size],
    grid[(i - columns + 1 + size) % size],
    grid[(i - 1 + size) % size],
    grid[(i + 1 + size) % size],
    grid[(i + columns - 1 + size) % size],
    grid[(i + columns + size) % size],
    grid[(i + columns + 1 + size) % size]
  ], function(sum, n) {return sum + n; });
}

// RENDER
function setCanvasSize() {
  windowWidth = window.innerWidth - 5;
  windowHeight = window.innerHeight - 5;
  // may need to refactor this to use integers if resultant floats are unperformant
  cellWidth = window.innerWidth / rows;
  cellHeight = window.innerHeight / columns;
  var canvasElement = document.getElementById('grid');
  canvasElement.width = windowWidth;
  canvasElement.height = windowHeight;
}

function draw() {
  document.getElementById('generation').innerHTML = generation;
  var ctx = document.getElementById('grid').getContext('2d');
  ctx.fillStyle = "rgb(0,0,0)";
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
      if (grid[r * rows + c] == 1) {
        ctx.fillRect (cellWidth * c, cellHeight * r, cellWidth, cellHeight);
      } else {
        ctx.clearRect (cellWidth * c, cellHeight * r, cellWidth, cellHeight);
      }
    }
  }
}

// check rows columns stuff on non square grid
// include controls to stop/pause/restart/modify speed, click pattern, starting pattern
// make it pretty
