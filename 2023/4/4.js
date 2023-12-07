const fsp = require('node:fs/promises');

myFileReader();

async function myFileReader() {
    const file = await fsp.open('./input.txt');

    let sum = 0

    for await (const line of file.readLines()) {
        const arr = line.split(/\s*[\:|\|]\s*/g)
        const winningNums = arr[1].split(/\s+/g)
        const yourNums = arr[2].split(/\s+/g)


        const numFound = yourNums.filter(n => {
            return winningNums.indexOf(n) > -1
        }).length

        const points = numFound ? 2 ** (numFound - 1) : 0
        sum += points
    }

    console.log(sum)

}