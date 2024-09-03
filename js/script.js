var rows = 25;
var cols = 25;
var w = 20;
var moves = 0;

var totalBees = 30;

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(300, 300);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }
  for (var n = 0; n < totalBees; n++) {
    let idx = floor(random(options.length));
    let choice = options[idx];
    while (!choice) {
      idx = floor(random(options.length));
      choice = options[idx];
    }

    var i = choice[0];
    var j = choice[1];
    options.slice(idx);
    grid[i][j].hasBee = true;
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countNeighbors();
    }
  }
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        moves++;
        grid[i][j].reveal();

        if (grid[i][j].hasBee) {
          gameOver();
        }
      }
    }
  }
}

function draw() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].reveal();
    }
  }
}
