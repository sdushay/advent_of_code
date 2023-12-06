const fsp = require('node:fs/promises');

myFileReader();

const isAdjacentToSymbol = (parent2DArray, leftCoord, rightCoord) => {
    /* Given a left coord and right coord of a multi digit int in a 2d array,
    * search adjacent cells until a symbol is found
    * if none is found, return false */

    // start top left corner
    let curr = [leftCoord[0] - 1, leftCoord[1] - 1]
    // process.stdout.write(`[${curr[0]},${curr[1]}]`)
    // search top row
    const re = /[^.\w]/
    while(curr[1] < rightCoord[1] + 1) {
        if (curr[0] >= 0 && curr[0] < parent2DArray.length && curr[1] >= 0 && curr[1] < parent2DArray[curr[0]].length) {
            const el = parent2DArray[curr[0]][curr[1]];
            if(re.exec(el)) {
                // process.stdout.write(` ${el} is a symbol\n`)
                return true
            }
        }
        curr = [curr[0], curr[1] + 1]
        // process.stdout.write(`[${curr[0]},${curr[1]}]`)
    }
    // search right bumper
    while(curr[0] < rightCoord[0] + 1) {
        if (curr[0] >= 0 && curr[0] < parent2DArray.length && curr[1] >= 0 && curr[1] < parent2DArray[curr[0]].length) {
            const el = parent2DArray[curr[0]][curr[1]];
            if(re.exec(el)) {
                // process.stdout.write(` ${el} is a symbol\n`)
                return true
            }
        }
        curr = [curr[0] + 1, curr[1]]
        // process.stdout.write(`[${curr[0]},${curr[1]}]`)
    }
    // search bottom row
    while(curr[1] > leftCoord[1] - 1) {
        if (curr[0] >= 0 && curr[0] < parent2DArray.length && curr[1] >= 0 && curr[1] < parent2DArray[curr[0]].length) {
            const el = parent2DArray[curr[0]][curr[1]];
            if(re.exec(el)) {
                // process.stdout.write(` ${el} is a symbol\n`)
                return true
            }
        }
        curr = [curr[0], curr[1] - 1]
        // process.stdout.write(`[${curr[0]},${curr[1]}]`)
    }
    // search left bumper
    while(curr[0] > leftCoord[0] - 1) {
        if (curr[0] >= 0 && curr[0] < parent2DArray.length && curr[1] >= 0 && curr[1] < parent2DArray[curr[0]].length) {
            const el = parent2DArray[curr[0]][curr[1]];
            if(re.exec(el)) {
                // process.stdout.write(` ${el} is a symbol\n`)
                return true
            }
        }
        curr = [curr[0] - 1, curr[1]]
        // process.stdout.write(`[${curr[0]},${curr[1]}]`)
    }
    return false
}

async function myFileReader() {
    const file = await fsp.open('./input.txt');

    let sum = 0;
    const Y = []
    for await (const line of file.readLines()) {
        Y.push(line.split(''))
    }

    let startCoord, lastCoord = null;
    let currStr = null;
    for (let y = 0; y < Y.length; y++) {
        for (let x = 0; x < Y[y].length; x++) {
            const el = Y[y][x];
            if(!isNaN(parseInt(el))) {
                if (x == 0 && currStr) {
                    // special case where we dont want numbers to wrap lines
                    if (isAdjacentToSymbol(Y, startCoord, lastCoord)) {
                        console.log(currStr + " is adjacent to a symbol")
                        sum += parseInt(currStr)
                        console.log(sum)
                    } else {
                        console.log(currStr + " is not adjacent to a symbol")
                    }
                    currStr = el;
                    startCoord = [y, x]
                    lastCoord = [y, x]
                } else {
                    lastCoord = [y, x]
                    if (currStr) {
                        currStr += el
                    } else {
                        startCoord = [y, x]
                        currStr = el;
                    }
                }
            } else {
                if (currStr) {
                    if (isAdjacentToSymbol(Y, startCoord, lastCoord)) {
                        console.log(currStr + " is adjacent to a symbol")
                        sum += parseInt(currStr)
                        console.log(sum)
                    } else {
                        console.log(currStr + " is not adjacent to a symbol")
                    }
                    currStr = null;
                    startCoord = null;
                    lastCoord = null;
                }
            }

        }

    }
    console.log('===')
    console.log(sum)

}