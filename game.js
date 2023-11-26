document.addEventListener('DOMContentLoaded', () =>{
const gridWidth = 4;
rows = gridWidth;
columns = gridWidth;
const gameArray = [];

function printCurrArray () {
    // Only for debug purposes
    // No functional use
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            console.log(gameArray[i][j]);
        }
    }   
};
function currentZeros() {
    // Create array of current zero boxes
    // And number of zeros
    let numZeros = 0;
    let zeroIndexArray= [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (gameArray[i][j] == 0) {
                numZeros++;
                zeroIndexArray.push(gridWidth*i +j);
            }
        }
    }
    return zeroIndexArray;
}
function introduceNewNumber () {
    // Adds a box, should be triggered
    // 1. At start of game - twice
    // 2. After every swipe
    let zeroIndexArray = currentZeros();
    let numZeros = zeroIndexArray.length;
    // Choose a random Index out of these indices
    randIndex = Math.floor(Math.random() * numZeros);
    // console.log(randIndex);
    let oneDIndex = zeroIndexArray[randIndex]; 
    // console.log(oneDIndex);
    gameArray[Math.floor(oneDIndex/gridWidth)][oneDIndex%gridWidth] = Math.pow(2,Math.round(Math.random())+1);
    printCurrArray();
};
function createEmptyArray() {
    // Create empty 4x4 array

    for (let i = 0; i < rows; i++) {
      gameArray[i] = [];
      for (let j = 0; j < columns; j++) {
        gameArray[i][j] = 0;
      }
    }
    printCurrArray();
};
 
function readKey(e) {
    // USE WASD or Arrow keys <3
    if((e.keyCode === 37) || (e.keyCode === 65)) {
        keyLeft();
        introduceNewNumber();
        displayInBox();
    } else if ((e.keyCode === 38) || (e.keyCode === 87)) {
        keyUp()
    } else if ((e.keyCode === 39) || (e.keyCode === 68)) {
        keyRight();
        introduceNewNumber();
        displayInBox();
    } else if ((e.keyCode === 40) || (e.keyCode === 83 )) {
        keyDown()
    }
};


function displayInBox() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (gameArray[i][j] == 0) {
                document.getElementById("boxNum".concat(gridWidth*i+j)).innerHTML = null;    
            } else {
                document.getElementById("boxNum".concat(gridWidth*i+j)).innerHTML = gameArray[i][j];
            }
        }
    }   
};

createEmptyArray();
introduceNewNumber();
introduceNewNumber();
displayInBox();
document.addEventListener('keyup',readKey);

function keyLeft () {
    console.log("hi1")
    if (currentZeros().length === 0) {
        return;
    }
    console.log("hi2")

    for (let i = 0; i < rows; i++) {
        let newRow = gameArray[i].filter(item => item !== 0);
        // console.log(newRow.length);
        // for(let newRoIn = 0; newRoIn < newRow.length;newRoIn++) {
        //     console.log(newRow[newRoIn]);
        // }
        for (let j = 0; j < newRow.length-1; j++) {
            if(newRow[j] == newRow[j+1]) {
                newRow[j]  *= 2;
                newRow[j+1] = 0;
                j++;
            }
        }
        newRow = newRow.filter(item => item !== 0);
        console.log(newRow.length);
        for(let newRoIn = 0; newRoIn < newRow.length;newRoIn++) {
            console.log(newRow[newRoIn]);
        }
        for (let gi = 0; gi < gridWidth; gi++) {
            if (gi<newRow.length) {
                gameArray[i][gi] = newRow[gi];
            } else {
                gameArray[i][gi] = 0;
            }
        }
    }

}

function keyRight () {
    console.log("hi1")
    if (currentZeros().length === 0) {
        return;
    }
    console.log("hi2")

    for (let i = 0; i < rows; i++) {
        let newRow = gameArray[i].filter(item => item !== 0);
        // console.log(newRow.length);
        // for(let newRoIn = 0; newRoIn < newRow.length;newRoIn++) {
        //     console.log(newRow[newRoIn]);
        // }
        for (let j = newRow.length-1; j > 0 ; j--) {
            if(newRow[j] == newRow[j-1]) {
                newRow[j]  *= 2;
                newRow[j-1] = 0;
                j--;
            }
        }
        newRow = newRow.filter(item => item !== 0);
        console.log(newRow.length);
        for(let newRoIn = 0; newRoIn < newRow.length;newRoIn++) {
            console.log(newRow[newRoIn]);
        }
        for (let gi = 0; gi < gridWidth; gi++) {
            if (gi>=(gridWidth-newRow.length)) {
                gameArray[i][gi] = newRow[gi-(gridWidth-newRow.length)];
            } else {
                gameArray[i][gi] = 0;
            }
        }
    }

}


})