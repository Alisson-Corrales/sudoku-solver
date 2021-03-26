'use strict';


const _BOARD = [
    ['.', '9', '.', '.', '4', '2', '1', '3', '6'],
    ['.', '.', '.', '9', '6', '.', '4', '8', '5'],
    ['.', '.', '.', '5', '8', '1', '.', '.', '.'],

    ['.', '.', '4', '.', '.', '.', '.', '.', '.'],
    ['5', '1', '7', '2', '.', '.', '9', '.', '.'],
    ['6', '.', '2', '5', '8', '1', '3', '7', '.'],

    ['1', '.', '.', '8', '.', '4', '.', '2', '.'],
    ['7', '.', '6', '.', '.', '.', '8', '1', '.'],
    ['3', '.', '.', '.', '9', '.', '.', '.', '.']
]

const _QUADS = [
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],

    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],

    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9]
]

//grabs the rows from _BOARD
function getRow(board, row) {
    //returns an array with all of the array elements from the row
    //console.log(row +" " + board[row])
    return board[row];
}
//grabs the columns from _BOARD
function getCol(board, col) {
    //returns an array with all of the array elements from the column
    let inCol = [];

    for (let row in board) {
        inCol.push(board[row][col])
    }
    //console.log(inCol)
    return inCol
}
//grabs the quads from _BOARD
function getQuad(board, quadNum) {
    //creates an array of all the elements in the same quadant

    let inQuad = []

    //cycles through every row
    for (let row2 in board) {
        //cycles through every column
        for (let col in board[row2]) {
            if (_QUADS[row2][col] == quadNum) {
                inQuad.push(board[row2][col])
            }
        }
    }
    return inQuad;
}

//for any [row][col] on the board you will return the array of all possible numvers
function getPossible(board, row, col) {
    let inRow = getRow(board, row);
    let inCol = getCol(board, col);
    let inQuad = getQuad(board, _QUADS[row][col]);
    //console.log(inRow)
    //console.log(inCol)
    //console.log(inQuad)
    
    let possible = [];
    let used = [];

    //every row element that is not possible
    //remove any that have already been added
    for (let r in inRow) {
        let included = false;
        for (let u in used) {
            if (inRow[r] == used[u]) {
                included = true;
                break;
            }
        }
        if (!included) {
            used.push(inRow[r])
        }
    }
    for (let c in inCol) {
        let included = false;
        for (let u in used) {
            if (inCol[c] == used[u]) {
                included = true;
                break;
            }
        }
        if (!included) {
            used.push(inCol[c])
        }
    }
    for (let q in inQuad) {
        let included = false;
        for (let u in used) {
            if (inQuad[q] == used[u]) {
                included = true;
                break;
            }
        }
        if (!included) {
            used.push(inQuad[q])
        }
    }

    for (let u in used) {
        if (used[u] == '.') {
            used.splice(u, 1);
        }
    }

    for (let num = 1; num < 10; num++) {
        if (!used.includes(num + "")) {
            possible.push(num + "")
        }
    }
    //console.log(used)
    return possible;
}

//problem here(?)
function fillInCell(board, row, col) {
    if (board[row][col] == '.') {
        let possible = getPossible(board, row, col);

        //if the possible number(s) is 1 character long, the board's row and column will = what the possible number is
        if (possible.length == 1) {
            board[row][col] = possible[0]
        }
    }
}
//console.log(_BOARD[0])
//console.log(getPossible(_BOARD, 3,0))


//this grabs the row in _BOARD
//for (let row in _BOARD) {
//    //this grabs the column in _BOARD
//    for (let col in _BOARD[row]) {
//        //does the function to a specific 'coordinate', and loops
//        //ex: (0,0), (0,2), etc
//        fillInCell(_BOARD, row, col);
//    }
//}
//first it finished col. (0,1) (0,2)
//then it finishes row, and loops col:
//(0,0) (0,2)
//(1,0) (1,2)
//(2,1) (2,2)

function finishBoard(row, col){
    //let used = false;
    if(_BOARD[row][col] == '.'){
        //used = true;
        for (let rows in _BOARD) {
            for (let cols in _BOARD[rows]) {
                fillInCell(_BOARD, rows, cols);
            }
        }
        continue
    }else{
        break
    }
}

//for (let row2 in _BOARD) {
//    for (let col in _BOARD[row2]) {
//        fillInCell(_BOARD, row2, col);
//    }
//}

//loops the above code
//knows when it is done
/*function finishBoard(board, row, col){
    let rows = getRow(board, row);
    let column = getCol(board, col);
    for(let r in rows){
        for (let w in _BOARD[r]){
            fillInCell(_BOARD, w);
        }
    }
    for(let c in column){
        for (let l in _BOARD[c]){
            fillInCell(_BOARD, l);
        }
    }
}
//
//
//
// /for (let col in _BOARD[row]) {
    // fillInCell(_BOARD, row, col);
// /}


function fillEveryCell(board, row, col){
    let used = true;

    for(let row in _BOARD){
        if(board[row][col] == '.'){
            for (let col in _BOARD[row]) {
                fillInCell(_BOARD, row, col);
            }
        }else if(board[row][col] != '.'){
            break
        }
    }

}
*/

console.table(finishBoard(_BOARD))