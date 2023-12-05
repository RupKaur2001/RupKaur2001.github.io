document.addEventListener('DOMContentLoaded', () =>{
const gridWidth = 4;
rows = gridWidth;
columns = gridWidth;
var gameArray = [];

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
        if (currentZeros().length != 0) {
            introduceNewNumber();
        }
    } else if ((e.keyCode === 38) || (e.keyCode === 87)) {
        keyUp();
        if (currentZeros().length != 0) {
            introduceNewNumber();
        }
    } else if ((e.keyCode === 39) || (e.keyCode === 68)) {
        keyRight();
        if (currentZeros().length != 0) {
            introduceNewNumber();
        }
    } else if ((e.keyCode === 40) || (e.keyCode === 83 )) {
        keyDown();
        if (currentZeros().length != 0) {
            introduceNewNumber();
        }
    }
    displayInBox();
};
const colorMapping = {
    0    : "#cdc0b4",
    2    : "#eee4da",
    4    : "#ede0c8",
    8    : "#f2b179",
    16   : "#f59563",
    32   : "#f67c5f",
    64   : "#f65d39",
    128  : "#edcf72",
    256  : "#f0cf4a",
    512  : "#e4c02a",
    1024 : "#ecc400",
    2048 : "#ecc400"
};

function displayInBox() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (gameArray[i][j] == 0) {
                document.getElementById("boxNum".concat(gridWidth*i+j)).innerHTML = null;    
            } else {
                document.getElementById("boxNum".concat(gridWidth*i+j)).innerHTML = gameArray[i][j];
            }
            document.getElementById("boxNum".concat(gridWidth*i+j)).style.backgroundColor = (colorMapping[gameArray[i][j]]);
        }
    }   
};

function transposeArray(array, arrayLength){
    var newArray = [];
    for(var i = 0; i < array.length; i++){
        newArray.push([]);
    };

    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < arrayLength; j++){
            newArray[j].push(array[i][j]);
        };
    };

    return newArray;
}

createEmptyArray();
introduceNewNumber();
introduceNewNumber();
displayInBox();
 document.addEventListener('keyup',readKey);


function keyUp() {
    let gameArrayTranspose = transposeArray(gameArray,gridWidth);
    gameArrayTranspose = leftise(gameArrayTranspose);
    gameArray = transposeArray(gameArrayTranspose,gridWidth);
}

function keyLeft () {
    gameArray = leftise(gameArray);
}

function keyDown() {
    let gameArrayTranspose = transposeArray(gameArray,gridWidth);
    gameArrayTranspose = rightise(gameArrayTranspose);
    gameArray = transposeArray(gameArrayTranspose,gridWidth);
}

function keyRight () {
    gameArray=rightise(gameArray);
}

function leftise(arr) {
    for (let i = 0; i < rows; i++) {
        let newRow = arr[i].filter(item => item !== 0);
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
                arr[i][gi] = newRow[gi];
            } else {
                arr[i][gi] = 0;
            }
        }
    }
    return arr;
}
function rightise(arr) {
    for (let i = 0; i < rows; i++) {
        let newRow = arr[i].filter(item => item !== 0);
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
                arr[i][gi] = newRow[gi-(gridWidth-newRow.length)];
            } else {
                arr[i][gi] = 0;
            }
        }
    }
    return arr;
}
})