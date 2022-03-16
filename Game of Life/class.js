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
        if (newCell && this.multiply >= 3) {
            let newX = newCell[0]; // 1
            let newY = newCell[1]; // 2
            matrix[newX][newY] = 1; // 1
            let newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}


class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = []
    }
    getNewCoordinates() {
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
    };

    chooseCell(char) {
        this.getNewCoordinates()
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

    move() {
        let emptyCell = this.chooseCell(0); // [[0, 1], [8, 9], [5, 6]]
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]; //[8, 9]
        if (newCell && this.energy > 0) {
            this.energy--
            let newX = newCell[0]; // 8
            let newY = newCell[1]; // 9
            matrix[newX][newY] = 2
            matrix[this.x][this.y] = 0
            this.x = newX
            this.y = newY


        } else {
            this.die()
        }
    }

    eat() {
        let emptyCell = this.chooseCell(1); //
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            this.energy++
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newX][newY] = 2
            matrix[this.x][this.y] = 0

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1);
                    break;

                }
            }
            this.x = newX
            this.y = newY
        } else {
            this.move()
        }
    }

    mul() {
        let emptyCell = this.chooseCell(0); //
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 12) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newX][newY] = 2;
            let newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 8;
        }
        else {
            this.die()
        }
    }

    die() {
        if (this.energy == 0) {
            matrix[this.x][this.y] = 0

            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                    break;

                }
            }
        }
    }
}

class Gazanik {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 12;
        this.directions = []
    }
    getNewCoordinates() {
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
    };

    chooseCell(char) {
        this.getNewCoordinates()
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


    move() {
        this.energy--;
        let emptyCell1 = this.chooseCell(1)
        let emptyCell0 = this.chooseCell(0)
        let arr = [...emptyCell0,...emptyCell1]
        let newCell = arr[Math.floor(Math.random() * arr.length)];
        if (newCell && this.energy > 0) {
            let newX = newCell[0];
            let newY = newCell[1];
                if (matrix[newX][newY] == 0) {
                    matrix[newX][newY] = 3
                    matrix[this.x][this.y] = 0;
                    this.x = newX
                    this.y = newY
                } else if (matrix[newX][newY] == 1) {
                    matrix[newX][newY] = 3
                    matrix[this.x][this.y] = 1;
                    this.x = newX
                    this.y = newY
                }
        }
		else if(this.energy<=0){
			this.die()
		}
    }
	
    eat() {
        let emptyCell = this.chooseCell(2); //
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            this.energy++
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newX][newY] = 3
            matrix[this.x][this.y] = 0

            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1);
                }
            }
            this.x = newX
            this.y = newY
		}

		else {
            this.move()
        }
    }
    
    mul() {
        let emptyCell = this.chooseCell(0); //
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 12) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newX][newY] = 2;
            let newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 8;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.x][this.y] = 0

            for (let i = 0; i < gazanikArr.length; i++) {
                if (gazanikArr[i].x == this.x && gazanikArr[i].y == this.y) {
                    gazanikArr.splice(i, 1);
                    break;

                }
            }
        }
    }
}

class Human{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.directions = []
    }
    getNewCoordinates() {
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
    };

    chooseCell(char) {
        this.getNewCoordinates()
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
    
    takeEnergy(){
        let emptyCell = this.chooseCell(3); //
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
		    
            this.energy++
			let newX = newCell[0];
			let newY = newCell[1];
            for (let i = 0; i < gazanikArr.length; i++) {
                if (gazanikArr[i].x == newX && gazanikArr[i].y == newY) {
				   gazanikArr[i].energy--
				   if(gazanikArr[i].energy<=0){
						gazanikArr[i].die()
				   }
                }
            } 
		}else{this.giveEnergy()}
		}

	giveEnergy(){
	    let emptyCell = this.chooseCell(2); 
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy>0) {
		    
            this.energy--
			let newX = newCell[0];
			let newY = newCell[1];
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
					grassEaterArr[i].energy++
				   if(grassEaterArr[i].energy>=12){
						grassEaterArr[i].mul()
				   }
                }
            } 
		}else{this.move()}
	}

    
	   move() {
        let emptyCell1 = this.chooseCell(1)
        let emptyCell0 = this.chooseCell(0)
        let arr = [...emptyCell0,...emptyCell1]
        let newCell = arr[Math.floor(Math.random() * arr.length)];
        if (newCell && this.energy > 0) {
			this.energy--;
            let newX = newCell[0];
            let newY = newCell[1];
                if (matrix[newX][newY] == 0) {
                    matrix[newX][newY] = 4
                    matrix[this.x][this.y] = 0;
                    this.x = newX
                    this.y = newY
                } else if (matrix[newX][newY] == 1) {
                    matrix[newX][newY] = 4
                    matrix[this.x][this.y] = 1;
                    this.x = newX
                    this.y = newY
                }
            }else if(this.energy==0){
				this.die()
			}
        }


	die() {
        if (this.energy <= 0) {
            matrix[this.x][this.y] = 0

            for (let i = 0; i <  humanArr.length; i++) {
                if ( humanArr[i].x == this.x &&  humanArr[i].y == this.y) {
                     humanArr.splice(i, 1);
                    break;

                }
            }
        }
    }

	    mul() {
        let emptyCell = this.chooseCell(0); //
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 25) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newX][newY] = 4;
            let newhuman = new Human(newX, newY);
            humanArr.push(newhuman);
            this.energy = 15;
        }
        else {
            this.die()
        }
    }

}


class EnergyGiver{
	 constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 100;
        this.directions = []
    }
    getNewCoordinates() {
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
    };

    chooseCell(char) {
        this.getNewCoordinates()
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

	move() {
        let emptyCell1 = this.chooseCell(1)
        let emptyCell0 = this.chooseCell(0)
        let arr = [...emptyCell0,...emptyCell1]
        let newCell = arr[Math.floor(Math.random() * arr.length)];
        if (newCell && this.energy > 0) {
			this.energy--;
            let newX = newCell[0];
            let newY = newCell[1];
            if (matrix[newX][newY] == 0) {
                    matrix[newX][newY] = 5
                    matrix[this.x][this.y] = 0;
                    this.x = newX
                    this.y = newY
            } else if (matrix[newX][newY] == 1) {
                    matrix[newX][newY] = 5
                    matrix[this.x][this.y] = 1;
                    this.x = newX
                    this.y = newY
            }
		}else if(this.energy<=0){
			this.die()
		}
    }


	die() {
        if (this.energy <= 0) {
            matrix[this.x][this.y] = 0

            for (let i = 0; i <  energyGiverArr.length; i++) {
                if ( energyGiverArr[i].x == this.x &&  energyGiverArr[i].y == this.y) {
                     energyGiverArr.splice(i, 1);
                    break;

                }
            }
        }
    }

	giveEnergy(){
	    let emptyCell = this.chooseCell(4); 
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy>0) {
		    
            this.energy-=5
			let newX = newCell[0];
			let newY = newCell[1];
            for (let i = 0; i < humanArr.length; i++) {
                if (humanArr[i].x == newX && humanArr[i].y == newY) {
					humanArr[i].energy+=5
				   if(humanArr[i].energy>=25){
						humanArr[i].mul()
				   }
                }
            } 
		}else if(this.energy<=0){
		this.die()
		}
		else{this.move()}
	}
}