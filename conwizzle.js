// INITIALIZE GLOBALS
var windowWidth,
    windowHeight,
    cellWidth,
    cellHeight,
    intervalId,
    canvasElement,
    generation,
    generationElement,
    grid;
var rows = 100,
    columns = 100,
    speed = 100,
    startingPattern = 'acorn',
    clickPattern = 'glider';
var size = rows * columns;

// EVENTS
window.onload = function() {
  resetGame();
  setClickEvents();
}
window.onresize = setCanvasSize;

function setClickEvents() {
  canvasElement.addEventListener('click', placePattern);
  document.getElementById('pause').addEventListener('click', pauseGame);
  document.getElementById('continue').addEventListener('click', continueGame);
  document.getElementById('reset').addEventListener('click', resetGame);
  var startButtons = document.getElementsByClassName('start');
  _.each(startButtons, function(button) {
    button.addEventListener('click', function() {
      startingPattern = event.target.dataset.pattern;
    });
  });
  var clickButtons = document.getElementsByClassName('click');
  _.each(clickButtons, function(button) {
    button.addEventListener('click', function() {
      clickPattern = event.target.dataset.pattern;
    });
  });
  var speedButtons = document.getElementsByClassName('speed');
  _.each(speedButtons, function(button) {
    button.addEventListener('click', function() {
      speed = parseInt(event.target.dataset.speed, 10);
      continueGame();
    })
  });
}

// GAME CONTROLS
function resetGame() {
  generationElement = document.getElementById('generation');
  generation = 0
  canvasElement = document.getElementById('grid');
  setCanvasSize();
  resetGrid();
  startPattern();
  clearInterval(intervalId);
  intervalId = setInterval(tick, speed);
}

function pauseGame() {
  clearInterval(intervalId);
}

function continueGame() {
  clearInterval(intervalId);
  intervalId = setInterval(tick, speed);
}

// GRID
function resetGrid() {
  grid = [];
  for (var i = 0; i < size; i++) {
    grid.push(0);
  }
}

// PATTERNS
function startPattern() {
  setCells(size / 2 + columns / 2, patterns[startingPattern]);
}

function placePattern() {
  var clickedRow = parseInt(event.offsetY / cellHeight, 10);
  var clickedCol = parseInt(event.offsetX / cellWidth, 10);
  setCells(clickedRow * columns + clickedCol, patterns[clickPattern]);
  draw();
}

function setCells(i, offsets) {
  for (var coords = 0; coords < offsets.length; coords++) {
    grid[(i + (offsets[coords][0] * columns) + offsets[coords][1])] = 1;
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
    grid[(i - columns     + size) % size],
    grid[(i - columns + 1 + size) % size],
    grid[(i           - 1 + size) % size],
    grid[(i           + 1 + size) % size],
    grid[(i + columns - 1 + size) % size],
    grid[(i + columns     + size) % size],
    grid[(i + columns + 1 + size) % size]
  ], function(sum, n) {return sum + n; });
}

// RENDER
function setCanvasSize() {
  windowWidth = window.innerWidth - 6;
  windowHeight = window.innerHeight - 6;
  cellWidth = windowWidth / rows;      // may need to refactor this to use integers
  cellHeight = windowHeight / columns; // if resultant floats are unperformant
  canvasElement.width = windowWidth;
  canvasElement.height = windowHeight;
}

function draw() {
  generationElement.innerHTML = generation;
  var ctx = canvasElement.getContext('2d');
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
// make it pretty
