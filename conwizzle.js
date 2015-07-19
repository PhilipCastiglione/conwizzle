window.onload = function() {

  // INITIALIZE
  var grid = [],
      rows = 100,
      columns = 100,
      speed = 50;
  var size = rows * columns;

  resetGrid();
  insertPattern(acorn, size / 2 + columns / 2);
  render();

  var intervalId = setInterval(tick, speed);

  // GRID
  function resetGrid() {
    grid = [];
    for (var i = 0; i < size; i++) {
      grid.push(0);
    }
  }

  // ENGINE
  function tick() {
    grid = forecastCells();
    render();
  }

  function forecastCells() {
    var new_grid = [];
    for (var i = 0; i < size; i++) {
      new_grid[i] = determineState(i);
    }
    return new_grid;
  }

  function determineState(i) {
    var score = getCellScore(i);
    return (score === 3 || grid[i] == 1 && score === 2)? 1 : 0;
  }

  function getCellScore(i) {
    var count = 0;
    count += grid[(i - columns - 1 + size) % size];
    count += grid[(i - columns + size) % size];
    count += grid[(i - columns + 1 + size) % size];
    count += grid[(i - 1 + size) % size];
    count += grid[(i + 1 + size) % size];
    count += grid[(i + columns - 1 + size) % size];
    count += grid[(i + columns + size) % size];
    count += grid[(i + columns + 1 + size) % size];
    return count;
  }

  // RENDER
  function render() {
    var html      = "",
        gridOpen  = "<div class='grid'>",
        rowOpen   = "<div class='row'>",
        colOpen   = "<div class='col ",
        colClose  = "'></div>",
        rowClose  = "</div>",
        gridClose = "</div>";

    var refactorMe = 0;
    html += gridOpen;
    for (var r = 0; r < rows; r++) {
      html += rowOpen;
      for (var c = 0; c < columns; c++) {
        html += colOpen;
        html += (grid[refactorMe] == 1)? 'alive' : 'dead';
        html += colClose;
        refactorMe++;
      }
      html += rowClose;
    }
    html += gridClose;
    document.getElementById('container').innerHTML = html;
  }

  // PATTERNS
  function insertPattern(pattern, i) {
    pattern(i)
  }

  function setCells(i, offsets) {
    for (var p = 0; p < offsets.length; p++) {
      grid[(i + (offsets[p][0] * columns) + offsets[p][1])] = 1;
    }
  }

  function rpentomino(i) {
    setCells(i,[[-1,0],
                [-1,1],
                [0,-1],
                [0,0],
                [1,0]]);
  }

  function diehard(i) {
    setCells(i,[[-1,3],
                [0,-3],
                [0,-2],
                [1,-2],
                [1,2],
                [1,3],
                [1,4]]);
  }

  function acorn(i) {
    setCells(i,[[-1,-2],
                [0,0],
                [1,-3],
                [1,-2],
                [1,1],
                [1,2],
                [1,3]]);
  }

  function glider(i) {
    setCells(i,[[-1,-1],
                [0,0],
                [0,1],
                [1,-1],
                [1,0]]);
  }

  function lwss(i) {
    setCells(i,[[-2,-1],
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

};

// use canvas
// check rows columns stuff
// include timer in / stage of evolution
// include controls to stop/pause/restart/modify params
// choice of starting pattern and click etc
// make a pretty splash for the text
