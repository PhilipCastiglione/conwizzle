window.onload = function() {

  function resetGrid() {
    var row;
    grid = [];
    for (var r = 0; r < size; r++) {
      row = [];
      for (var c = 0; c < size; c++) {
        row.push([0,0]);
      }
      grid.push(row);
    }
  }

  function tick() {
    forecastCells(grid);
    progressCells(grid);
    render(grid);
  }

  function forecastCells(grid) {
    for (var r = 0; r < size; r++) {
      for (var c = 0; c < size; c++) {
        grid[r][c][1] = determineState(grid, r, c);
      }
    } 
  }

  function determineState(grid, r, c) {
    var score = getCellScore(grid, r, c);
    if (grid[r][c][0] == 1) {
      if (score < 2 || score > 3) {
        return 0;
      } else {
        return 1;
      }
    } else {
      if (score != 3) {
        return 0;
      } else {
        return 1;
      }
    }
  }

  function getCellScore(grid, r, c) {
    var count = 0,
        neighbourRow,
        neighbourCol;
    for (var h = -1; h <= 1; h++) {
      neighbourRow = (r + h + size) % size;
      for (var v = -1; v <= 1; v++) {
        neighbourCol = (c + v + size) % size;
        if (!(h == 0 && v == 0)) {
          count += grid[neighbourRow][neighbourCol][0];
        }
      }
    }
    return count;
  }

  function progressCells(grid) {
    for (var r = 0; r < size; r++) {
      for (var c = 0; c < size; c++) {
        grid[r][c][0] = grid[r][c][1];
      }
    } 
  }

  function render(grid) {
    var html      = "",
        gridOpen  = "<div class='grid'>",
        rowOpen   = "<div class='row'>",
        colOpen   = "<div class='col ",
        colClose  = "'></div>",
        rowClose  = "</div>",
        gridClose = "</div>";

    html += gridOpen;
    for (var r = 0; r < size; r++) {
      html += rowOpen;
      for (var c = 0; c < size; c++) {
        html += colOpen;
        html += (grid[r][c][0] == 1)? 'alive' : 'dead';
        html += colClose;
      }
      html += rowClose;
    }
    html += gridClose;
    document.getElementById('container').innerHTML = html;
  }

  var grid = [],
      size = 50;

  resetGrid(grid);
  lwss(grid, size/2, size/2);
  render(grid);

  var intervalId = setInterval(tick, 100);

};

// include timer in / stage of evolution
// include controls to stop/pause/restart/modify params
// make a pretty splash for the text
