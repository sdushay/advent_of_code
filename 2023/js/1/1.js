const fsp = require('node:fs/promises');

myFileReader();

async function myFileReader() {
    let sum = 0
    const file = await fsp.open('./input.txt');
    for await (const line of file.readLines()) {
        arr = line.split("")

        let first, last;
        for (let i = 0; i < arr.length; i++) {
            const c = arr[i];
            if (isNaN(parseInt(c))) {
                continue;
            } else {
                first = c
                break;
            }
        }
        for (let i = arr.length - 1; i >= 0 ; i--) {
            const c = arr[i]
            if (isNaN(parseInt(c))) {
                continue;
            } else {
                last = c
                break;
            }
        }
        res = parseInt(first + last)
        console.log(res)
        sum += res;
    }
    console.log('====')
    console.log(sum)
}