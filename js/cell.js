class Cell {
  hasBee = false;
  isRevealed = false;

  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = w * i + 1;
    this.y = w * j + 1;
    this.w = w;
    this.neighborCount = 0;
  }

  contains(x, y) {
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w
    );
  }

  reveal() {
    this.isRevealed = true;

    if (this.neighborCount == 0) {
      this.floodFill();
    }
  }

  floodFill() {
    for (var xOff = -1; xOff <= 1; xOff++) {
      for (var yOff = -1; yOff <= 1; yOff++) {
        var i = this.i + xOff;
        var j = this.j + yOff;

        if (
          grid[i] &&
          grid[i][j] &&
          !grid[i][j].hasBee &&
          !grid[i][j].isRevealed
        ) {
          grid[i][j].reveal();
        }
      }
    }
  }

  countNeighbors() {
    if (this.hasBee) {
      this.neighborCount = -1;
      return;
    }

    var total = 0;
    for (var xOff = -1; xOff <= 1; xOff++) {
      for (var yOff = -1; yOff <= 1; yOff++) {
        var i = this.i + xOff;
        var j = this.j + yOff;

        if (grid[i] && grid[i][j]) {
          var neighbor = grid[i][j];
          if (neighbor.hasBee) total++;
        }
      }
    }
    this.neighborCount = total;
  }

  show() {
    stroke(0);
    noFill(255);
    rect(this.x, this.y, this.w, this.w);

    if (this.isRevealed) {
      if (this.hasBee) {
        fill(255, 0, 0);
        ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
      } else {
        fill(213, 237, 159);
        noStroke();
        rect(this.x, this.y, this.w, this.w);

        if (this.neighborCount > 0) {
          fill(0);
          textAlign(CENTER);
          text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
        }
      }
    }
  }
}
