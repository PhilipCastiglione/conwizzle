$(document).ready( function() {

  var grid = [],
      size = 50,
      row;
  for (var r = 0; r < size; r++) {
    row = [];
    for (var c = 0; c < size; c++) {
      row.push([0,0]);
    }
    grid.push(row);
  }

  function tick() {
    forecastCells(grid);
    progressCells(grid);
    render(grid);
  }

  function forecastCells(grid) {
    var nextState;
    for (var r = 0; r < size; r++) {
      for (var c = 0; c < size; c++) {
        nextState = determineState(grid, r, c);
        grid[r][c][1] = nextState;
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
    var $grid = $("<div class='grid'>"),
        $row,
        state;
    for (var r = 0; r < size; r++) {
    $row = $("<div class='row'>");
    for (var c = 0; c < size; c++) {
      state = (grid[r][c][0] == 1)? 'alive' : 'dead';
      $row.append("<div class='col " + state + "'>");
    }
    $grid.append($row);
    }
    $('.container').html($grid);
  }

  for (var sl = 20; sl < 30; sl++) {
    grid[25][sl][0] = 1;
  }
  render(grid);
  var intervalId = setInterval(tick, 50);

});

// currently need to progress the whole grid at once

// include timer in / stage of evolution
// include controls to stop/pause/restart/modify params
// make a pretty splash for the text
