'use strict';


const _BOARD = [
    ['.', '9', '.',    '.', '4', '2',   '1', '3', '6'],
    ['.', '.', '.',    '9', '6', '.',   '4', '8', '5'],
    ['.', '.', '.',    '5', '8', '1',   '.', '.', '.'],

    ['.', '.', '9',    '.', '.', '.',   '.', '.', '.'],
    ['5', '1', '7',    '2', '.', '.',   '9', '.', '.'],
    ['6', '.', '2',    '5', '8', '1',   '3', '7', '.'],

    ['1', '.', '.',    '8', '.', '4',   '.', '2', '.'],
    ['7', '.', '6',    '.', '.', '.',   '8', '1', '.'],
    ['3', '.', '.',    '.', '9', '.',   '.', '.', '.']
]

const _QUADS = [
    [1,1,1,  2,2,2,  3,3,3],
    [1,1,1,  2,2,2,  3,3,3],
    [1,1,1,  2,2,2,  3,3,3],

    [4,4,4,  5,5,5,  6,6,6],
    [4,4,4,  5,5,5,  6,6,6],
    [4,4,4,  5,5,5,  6,6,6],

    [7,7,7,  8,8,8,  9,9,9],
    [7,7,7,  8,8,8,  9,9,9],
    [7,7,7,  8,8,8,  9,9,9]
]

function getRow(board, row){
    //returns an array with all of the array elements from the row
    return board[row]; 
}

function getCol(board, col){
    //returns an array with all of the array elements from the column
    let inCol = [];

    for(let row in board){
        inCol.push(board[row][col])

    }

    return inCol
}

function getQuad(board, quadNum){
    //creates an array of all the elements in the same quadant

    let inQuad = []

    //cycles through every row
    for(let row in board){
        //cycles through every column
        for(let col in board[row]){
            if(_QUADS[row][col] == quadNum){
                inQuad.push(board[row][col])
            }
        }
    }
    return inQuad;
}

//for any [row][col] on the board you will return the array of all possible numvers
function getPossible(board, row, col){
    let inRow = getRow(board, row);
    let inCol = getCol(board, col);
    let inQuad = getQuad(board, _QUADS[row][col]);

    let possible = [];
    let used = [];

    //every row element that is not possible
    //remove any that have already been added
    for(let r in inRow){
        let included = false;
        for(let u in used){
            if(inRow[r] == used[u]){
                included = true;
                break;
            }
        }
        if(!included){
            used.push(inRow[r])
        }
    }
    for(let c in inCol){
        let included = false;
        for(let u in used){
            if(inCol[c] == used[u]){
                included = true;
                break;
            }
        }
        if(!included){
            used.push(inCol[c])
        }
    }
    for(let q in inQuad){
        let included = false;
        for(let u in used){
            if(inQuad[q] == used[u]){
                included = true;
                break;
            }
        }
        if(!included){
            used.push(inQuad[q])
        }
    }

    for(let u in used){
        if(used[u] == '.'){
            used.splice(u, 1);
        }
    }

    for(let num = 1; num < 10; num++){
        if(!used.includes(num+"")){
            possible.push(num+"")
        }
    }

    //console.log(used)
    return possible;
}

function fillInCell(board, row, col){
    let possible = getPossible(board, row, col);

    //if the possible number(s) is 1 character long, the board's row and column will = what the possible number is
    if(possible.length == 1){
        board[row][col] = possible[0]
    }
    for(row in _BOARD){
        for(col in _BOARD[row]){
            fillInCell(_BOARD, row, col);
        }
    }
}

//function repeatFillCell(board, row, col){
//    //
//}

console.table(getPossible(_BOARD, 0, 3));

//console.table(_BOARD);