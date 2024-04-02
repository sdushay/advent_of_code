const fsp = require('node:fs/promises');

myFileReader();

async function myFileReader() {
    const file = await fsp.open('./input.txt');

    let games = []
    let i = 0

    for await (const line of file.readLines()) {
        const arr = line.split(/\s*[\:|\|]\s*/g)
        const winningNums = arr[1].split(/\s+/g)
        const yourNums = arr[2].split(/\s+/g)


        let numFound = yourNums.filter(n => {
            return winningNums.indexOf(n) > -1
        }).length

        games[i] = {
            copies: 0,
            numFound: numFound
        }

        i++
    }

    // console.log(games)

    for (let j = 0; j < games.length; j++) {
        const g = games[j];

        // distribute copies
        for (let c = 0; c <= g.copies; c++) {
            for (let k = 1; k <= g.numFound; k++) {
                games[j + k].copies += 1;
            }
        }
    }
    // console.log(games)

    const sum = games.reduce((accum, curr) => {
        return accum += curr.copies + 1
    }, 0)



    // console.log(sum)

}