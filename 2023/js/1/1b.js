const fsp = require('node:fs/promises');

const promise = myFileReader();

promise.then((answer) => {
    console.log('====')
    console.log(answer)
})


async function myFileReader() {
    let sum = 0

    const validstrs = [
        null, "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    ]

    // had to look this up--https://www.reddit.com/r/adventofcode/comments/1883ibu/comment/kbj3j9s/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
    const str2num = {
        "one": "o1e",
        "two": "t2o",
        "three": "t3e",
        "four": "f4r",
        "five": "f5e",
        "six": "s6x",
        "seven": "s7n",
        "eight": "e8t",
        "nine": "n9e",
    }
    
    const file = await fsp.open('./input.txt');
    for await (let line of file.readLines()) {
        console.log(line);
        let arr = line.split("");
        const processedArr = [];
        for (let i = 0; i < arr.length; i++) {
            const c = arr[i];

            let s = ""
            let found = false;
            for (let j = i + 2; j < i + 5; j++) {
                s = arr.slice(i, j + 1).join("")
                // console.log(s)

                if (str2num.hasOwnProperty(s)) {
                    found = str2num[s];
                    // i = j;
                    break;
                }
            }
            if (found) {
                processedArr.push(...found);
            } else {
                processedArr.push(c);
            }
        }


        console.log(processedArr.join(""))
        let first, last;
        for (let i = 0; i < processedArr.length; i++) {
            const c = processedArr[i];
            if (isNaN(parseInt(c))) {
                continue;
            } else {
                first = c
                break;
            }
        }
        for (let i = processedArr.length - 1; i >= 0 ; i--) {
            const c = processedArr[i]
            if (isNaN(parseInt(c))) {
                continue;
            } else {
                last = c
                break;
            }
        }

        const res = parseInt(first + last)
        console.log(res)
        sum += res;
        console.log(sum)
    }
    return sum

}