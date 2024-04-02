const fsp = require('node:fs/promises');

myFileReader();

async function myFileReader() {
    const file = await fsp.open('./input.txt');

    let maps = {}
    let startSeeds = []
    let currFromKey = null
    let minimumLocation = null

    for await (const line of file.readLines()) {
        if (!startSeeds.length) {
            startSeeds = line.split(/\s+/g).slice(1)
        } else if (line.includes(':')) {
            // map heading
            const arr = line.split(/[\-|\s+]/g).slice(0,3)
            currFromKey = arr[0]
            maps[currFromKey] = {to: arr[2], ranges: []}
        } else {
            re = /\d/g
            if (re.exec(line)) {
                const range = line.split(/\s+/g).map(v => parseInt(v))
                maps[currFromKey].ranges.push(range)
            } else {
                currFromKey = null
            }
        }
    }
    console.log(maps)


    startSeeds.forEach(seed => {
        let sourceVal = seed
        let currMap = null
        let fromKey = 'seed'
        let destVal = null
        while(fromKey !== 'location') {
            // console.log(` sourceVal ${sourceVal}`)
            currMap = maps[fromKey]
            // console.log(`from ${fromKey} to ${currMap.to}`)

            // evaluate range to convert a to b
            destVal = null
            for (let i = 0; i < currMap.ranges.length; i++) {
                const r = currMap.ranges[i]
                const [destRangeStart, sourceRangeStart, rangeLength] = r

                // console.log('destRangeStart', destRangeStart)
                // console.log('sourceRangeStart', sourceRangeStart)
                // console.log('rangeLength', rangeLength)

                if (sourceVal >= sourceRangeStart && sourceVal < sourceRangeStart + rangeLength) {
                    const delta = sourceVal - sourceRangeStart
                    destVal = destRangeStart + delta
                    break;
                }
            }
            if (!destVal) {
                destVal = sourceVal
            }
            // console.log('destVal', destVal)

            sourceVal = destVal
            fromKey = currMap.to
        }
        console.log(`seed ${seed} maps to location ${destVal}`)
        minimumLocation = minimumLocation ? Math.min(destVal, minimumLocation) : destVal
    })
    console.log(`min ${minimumLocation}`)

    // console.log(games)
    // console.log(sum)

}