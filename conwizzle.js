$(document).ready( function() {

  var grid = [];
  // ESTABLISH GRID
  var size = 50;
  for (var r = 0; r < size; r++) {
    var row = [];
    for (var c = 0; c < size; c++) {
      row.push([0,0]);
    }
    grid.push(row);
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

  function progressCells(grid) {
    var nextState, cell;
    for (var r = 0; r < size; r++) {
      for (var c = 0; c < size; c++) {
        cell = grid[r][c];
        nextState = determineState(grid, cell, r, c);
        grid[r][c] = progressCell(cell, nextState);
      }
    }
  }

  function determineState(grid, cell, row, col) {
    var score = getCellScore(grid, row, col);
    if (cell[0] = 1) {
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

  function getCellScore(grid, row, col) {
    var count;
    for (var x = 0; x < 9; x++) {
      count += grid[row][col][0];
    }
    return count;
  }

  function progressCell(ary, nextState) {
    return [ary[1], nextState];
  }

  function tick() {
    progressCells(grid);
    render(grid);
  }

  render(grid);
  var intervalId = setInterval(tick, 500);

});

// include timer in / stage of evolution
// include controls to stop/pause/restart/modify params
// make a pretty splash for the text
