//Սիրելիներս, ուզում եմ զգուշացնել, որ x-երը զանգվածներն են(շարքերը), իսկ միջի էլեմենտները y-ներն են(սյունակները)

let grassArr = [];

let matrix = [
  // y  y  y  y  y
  [0, 0, 1, 0, 1], // x
  [1, 0, 0, 1, 0], // x
  [0, 1, 1, 0, 1], // x
  [1, 0, 1, 1, 1], // x
  [0, 1, 0, 1, 0], // x
];

let side = 100;

function setup() {
  createCanvas(matrix[0].length * side, matrix.length * side);
  background("grey");
  frameRate(10);
  for (var x = 0; x < matrix.length; x++) {
    for (var y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y] == 1) {
        var gr = new Grass(x, y);
        grassArr.push(gr);
      }
    }
  }
}

function draw() {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y] == 0) {
        fill("grey");
      } else if (matrix[x][y] == 1) {
        fill("green");
      }
      rect(y * side, x * side, side, side);
    }
  }
  for (const i in grassArr) {
    grassArr[i].mul();
  }
}
