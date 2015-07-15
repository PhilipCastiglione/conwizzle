// GLOBALS
var grid = [];

$(document).ready( function() {

  // ESTABLISH GRID
  for (var i = 0; i < 50; i++) {
    var row = [];
    for (var i2 = 0; i2 < 50; i2++) {
      row.push([0,0]);
    }
    grid.push(row);
  }

  function render() {
    var $grid = $("<div class='grid'>"),
        $row,
        state;
    for (var i = 0; i < 50; i++) {
    $row = $("<div class='row'>");
    for (var i2 = 0; i2 < 50; i2++) {
      state = (grid[i][i2][0] == 1)? 'alive' : 'dead';
      $row.append("<div class='col " + state + "'>");
    }
    $grid.append($row);
    }
    $('.container').html($grid);
  }

  function ITSALIIIVE(row, col) {
    grid[row][col] = 1;
  }

  function KILLTHEFUCKER(row, col) {
    grid[row][col] = 0;
  }

});