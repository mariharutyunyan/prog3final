
let grassArr = [];
let grassEaterArr = []
let gazanikArr = []
let humanArr = []
let energyGiverArr = []
 /*
let matrix = [
  [0, 5, 1],
  [0, 1, 2],  
  [1, 4, 3],
];*/



let side = 9;
function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background("grey");
    //frameRate(1);
    for (var x = 0; x < matrix.length; x++) {
        for (var y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            } else if (matrix[x][y] == 2) {
                var grEat = new GrassEater(x, y);
                grassEaterArr.push(grEat);
            } else if (matrix[x][y] == 3) {
                var grEatEat = new Gazanik(x, y);
                gazanikArr.push(grEatEat);
            }
            else if (matrix[x][y] == 4) {
                var person= new Human(x, y);
                humanArr.push(person);
            }

			else if (matrix[x][y] == 5) {
                var eGiver= new EnergyGiver(x, y);
                energyGiverArr.push(eGiver);
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
                fill("SpringGreen");
            } else if (matrix[x][y] == 2) {
                fill("Gold");
            }
            else if (matrix[x][y] == 3) {
                fill("Tomato");
            }
            else if (matrix[x][y] == 4) {
                fill('Moccasin');
            }
			else if (matrix[x][y] == 5) {
                fill('purple');
            }
            rect(y * side, x * side, side, side);
        }
    }
    for (const i in grassArr) {
        grassArr[i].mul();
    }
    for (const i in grassEaterArr) {
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
    }
    for (const i in gazanikArr) {
        gazanikArr[i].mul();
		gazanikArr[i].eat();
    }
    for (const i in humanArr) {
        humanArr[i].takeEnergy();
    }
    
	for (const i in energyGiverArr) {
        energyGiverArr[i].giveEnergy();
    }
    
}





