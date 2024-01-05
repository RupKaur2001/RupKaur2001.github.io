
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

let oldArr = [];
let gameArray = [];

const gridWidth = 4;
let rows = gridWidth;
let columns = gridWidth;

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

function removeStartScreen() {
    document.getElementById("start-screen").style.display = "none";
}

function undoCommand() {
    gameArray = oldArr;
    displayInBox();
}
// function

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
    let randIndex = Math.floor(Math.random() * numZeros);
    let oneDIndex = zeroIndexArray[randIndex]; 
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

function transposeArray(array, arrayLength){
    let newArray = [];
    for(let i of array){
        newArray.push([]);
    };

    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < arrayLength; j++){
            newArray[j].push(array[i][j]);
        };
    };
    
    return newArray;
};

document.addEventListener('DOMContentLoaded', runGame);
function runGame() {
    
    function readKey(e) {
        // USE WASD or Arrow keys <3
        let oldArrTemp = gameArray;
        let didSomethingChange = false;
        if((e.keyCode === 37) || (e.keyCode === 65)) {
            didSomethingChange = keyLeft();       
            if (currentZeros().length != 0 && didSomethingChange) {
                introduceNewNumber();
                oldArr = oldArrTemp;
            }
        } else if ((e.keyCode === 38) || (e.keyCode === 87)) {
            didSomethingChange = keyUp();
            if (currentZeros().length != 0 && didSomethingChange) {
                introduceNewNumber();
                oldArr = oldArrTemp;
            }
        } else if ((e.keyCode === 39) || (e.keyCode === 68)) {
            didSomethingChange = keyRight();
            if (currentZeros().length != 0 && didSomethingChange) {
                introduceNewNumber();
                oldArr = oldArrTemp;
            }
        } else if ((e.keyCode === 40) || (e.keyCode === 83 )) {
            didSomethingChange = keyDown();
            if (currentZeros().length != 0 && didSomethingChange) {
                introduceNewNumber();
                oldArr = oldArrTemp;
            }
        }
        displayInBox();
    };
    
    let startX;
    let startY;
    createEmptyArray();
    introduceNewNumber();
    introduceNewNumber();
    displayInBox();
    document.addEventListener('keyup',readKey);
    document.addEventListener('touchstart', function (e) {
        startX = e.changedTouches[0].screenX;
        startY = e.changedTouches[0].screenY;
    }, false);
    document.addEventListener('touchend', function (e) {
        let endX = e.changedTouches[0].screenX;
        let endY = e.changedTouches[0].screenY;
        let deltaX = endX - startX;
        let deltaY = endY - startY;
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
            if (deltaX > 0) {
                readKey({keyCode: 39} );
            } else if(deltaX < 0) {
                readKey({keyCode: 37});
            } else {
                // do nothing
            }
        } else {
            if (deltaY > 0) {
                readKey({keyCode: 40});
            } else {
                readKey({keyCode: 38});
            }
        }
    })

    function keyUp() {
        let gameArrayTranspose = transposeArray(gameArray,gridWidth);
        let newGameArrayTranspose = leftise(gameArrayTranspose);
        gameArray = transposeArray(newGameArrayTranspose.newArr,gridWidth);
        return newGameArrayTranspose.didSomethingChange;
    }

    function keyLeft () {
        let newGameArray = leftise(gameArray);
        gameArray = newGameArray.newArr;
        return newGameArray.didSomethingChange;
    }

    function keyDown() {
        let gameArrayTranspose = transposeArray(gameArray,gridWidth);
        let newGameArrayTranspose = rightise(gameArrayTranspose);
        gameArray = transposeArray(newGameArrayTranspose.newArr,gridWidth);
        return newGameArrayTranspose.didSomethingChange;
    }

    function keyRight () {
        let newGameArray=rightise(gameArray);
        gameArray = newGameArray.newArr;
        return newGameArray.didSomethingChange;
    }

    function leftise(arr) {
        let didSomethingChange = false;
        for (let i = 0; i < rows; i++) {
            let newRow = arr[i].filter(item => item !== 0);
            for (let j = 0; j < newRow.length-1; j++) {
                if(newRow[j] == newRow[j+1]) {
                    newRow[j]  *= 2;
                    newRow[j+1] = 0;
                    j++;
                }
            }
            newRow = newRow.filter(item => item !== 0);
            for (let gi = 0; gi < gridWidth; gi++) {
                if (gi<newRow.length) {
                    if (arr[i][gi] != newRow[gi]) { 
                        arr[i][gi] = newRow[gi];
                        didSomethingChange = true;
                    }
                } else {
                    arr[i][gi] = 0;
                }
            }
        }
        return {newArr: arr, didSomethingChange: didSomethingChange};
    }
    function rightise(arr) {
        let didSomethingChange = false;
        for (let i = 0; i < rows; i++) {
            let newRow = arr[i].filter(item => item !== 0);
            for (let j = newRow.length-1; j > 0 ; j--) {
                if(newRow[j] == newRow[j-1]) {
                    newRow[j]  *= 2;
                    j--;
                    newRow[j]   = 0;
                }
            }
            newRow = newRow.filter(item => item !== 0);
            for (let gi = 0; gi < gridWidth; gi++) {
                if (gi>=(gridWidth-newRow.length)) {
                    if (arr[i][gi] != newRow[gi-(gridWidth-newRow.length)]) {
                        arr[i][gi] = newRow[gi-(gridWidth-newRow.length)];
                        didSomethingChange = true;
                    }
                } else {
                    arr[i][gi] = 0;
                }
            }
        }
        return {newArr: arr, didSomethingChange: didSomethingChange};
    }
}