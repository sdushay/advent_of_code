const fsp = require('node:fs/promises');

myFileReader();

const makeUniqueCoordKey = (coord) => {
    return `${coord[0]}_${coord[1]}`
}

const isAdjacentToGear = (parent2DArray, leftCoord, rightCoord) => {
    /* Given a left coord and right coord of a multi digit int in a 2d array,
    * search adjacent cells until a symbol is found
    * if none is found, return false */
    const res = []
    // start top left corner
    let curr = [leftCoord[0] - 1, leftCoord[1] - 1]
    // process.stdout.write(`[${curr[0]},${curr[1]}]`)
    // search top row
    const re = /\*/
    while(curr[1] < rightCoord[1] + 1) {
        if (curr[0] >= 0 && curr[0] < parent2DArray.length && curr[1] >= 0 && curr[1] < parent2DArray[curr[0]].length) {
            const el = parent2DArray[curr[0]][curr[1]];
            if(re.exec(el)) {
                // process.stdout.write(` ${el} is a symbol\n`)
                res.push(makeUniqueCoordKey(curr))
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
                res.push(makeUniqueCoordKey(curr))
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
                res.push(makeUniqueCoordKey(curr))
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
                res.push(makeUniqueCoordKey(curr))
            }
        }
        curr = [curr[0] - 1, curr[1]]
        // process.stdout.write(`[${curr[0]},${curr[1]}]`)
    }
    return res
}

async function myFileReader() {
    const file = await fsp.open('./input.txt');

    let sum = 0;
    const Y = []
    for await (const line of file.readLines()) {
        Y.push(line.split(''))
    }

    const possibleGearsObj = {}

    let startCoord, lastCoord = null;
    let currStr = null;
    for (let y = 0; y < Y.length; y++) {
        for (let x = 0; x < Y[y].length; x++) {
            const el = Y[y][x];
            if(!isNaN(parseInt(el))) {
                if (x == 0 && currStr) {
                    // special case where we dont want numbers to wrap lines
                    const adjGears = isAdjacentToGear(Y, startCoord, lastCoord)
                    if (adjGears) {
                        adjGears.forEach(gcoordkey => {
                            if (possibleGearsObj.hasOwnProperty(gcoordkey)) {
                                possibleGearsObj[gcoordkey].push(parseInt(currStr))
                            } else {
                                possibleGearsObj[gcoordkey] = [parseInt(currStr)]
                            }
                        })
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
                    const adjGears = isAdjacentToGear(Y, startCoord, lastCoord)
                    if (adjGears) {
                        adjGears.forEach(gcoordkey => {
                            if (possibleGearsObj.hasOwnProperty(gcoordkey)) {
                                possibleGearsObj[gcoordkey].push(parseInt(currStr))
                            } else {
                                possibleGearsObj[gcoordkey] = [parseInt(currStr)]
                            }
                        })
                    }
                    currStr = null;
                    startCoord = null;
                    lastCoord = null;
                }
            }

        }
    }
    console.log('===')
    console.log(possibleGearsObj)

    for (key in possibleGearsObj) {
        const adjacentNums = possibleGearsObj[key]
        if (adjacentNums.length == 2) {
            const gearRatio = adjacentNums[0] * adjacentNums[1]
            sum += gearRatio
        }
    }

    console.log('===')
    console.log(sum)
}