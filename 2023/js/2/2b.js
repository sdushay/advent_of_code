const fsp = require('node:fs/promises');

myFileReader();

async function myFileReader() {
    const file = await fsp.open('./input.txt');

    const maxes = {
        red: 12,
        green: 13,
        blue: 14
    }
    const gamesArr = [null];

    for await (const line of file.readLines()) {
        const arr = line.split(/[\:|\;]\s*/g)

        // [
        //     'Game 2',
        //     '1 blue, 2 green',
        //     '3 green, 4 blue, 1 red',
        //     '1 green, 1 blue'
        // ]
        const gameObj = {}

        for (let i = 1; i < arr.length; i++) {
            const hand = arr[i];
            const colors = hand.split(',');
            colors.forEach((c) => {
                const q = parseInt(c.match(/\d+/)[0])
                const label = c.match(/[a-zA-Z]+/)[0]
                if (gameObj.hasOwnProperty(label)) {
                    if (gameObj[label] < q) {
                        gameObj[label] = q
                    }
                } else {
                    gameObj[label] = q
                }
            })
        }
        gamesArr.push(gameObj)
    }
    // console.log('====')
    // console.log(sum)
    let sum = 0;
    gamesArr.forEach((game, i) => {

        if (game) {
            let power = 1
            console.log(game)
            for (const color in game) {
                const maxFound = game[color]
                power = power * maxFound;
            }
            sum += power
        }

    })
    console.log(gamesArr)
    console.log(sum)


}