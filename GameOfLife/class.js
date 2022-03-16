class Grass {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.multiply = 0;
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }

  chooseCell(char) {
    let found = []; //
    for (const i in this.directions) {
      let x = this.directions[i][0]; //  this.x - 1,
      let y = this.directions[i][1]; // this.y - 1
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[x][y] == char) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }

  mul() {
    this.multiply++; // 1
    let emptyCell = this.chooseCell(0); //
    var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]; // [1, 2]
    if (newCell && this.multiply >= 8) {
      let newX = newCell[0]; // 1
      let newY = newCell[1]; // 2
      matrix[newX][newY] = 1; // 1
      let newGrass = new Grass(newX, newY);
      grassArr.push(newGrass); // էս մասը պարտադիր ա, որովհետև սեթափի մեջ մենակ սկզբւմ ա նայում
      //որ վանդակում ինչ թիվ ա , ու սարքում օբյեկտ,,,իսկ մեզ պետքա ամեն նորի հետ սարքի
      this.multiply = 0;
    }
  }
}
