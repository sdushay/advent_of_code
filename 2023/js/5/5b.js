const fsp = require('node:fs/promises');

myFileReader();

async function myFileReader() {
    const file = await fsp.open('input.txt');

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
    // console.dir(maps)

    let seedRangeStart = null
    let seedRangeLength = null
    let seedRangeEnd = null
    let allRanges = []
    for (let s = 0; s < startSeeds.length; s+=2) {
        seedRangeLength = parseInt(startSeeds[s+1])
        seedRangeStart = parseInt(startSeeds[s])
        seedRangeEnd = seedRangeStart + seedRangeLength
        // console.log('seedRange', seedRangeStart, seedRangeEnd)

        // if we only keep track of the start/end ranges, and create new ones when they are interrupted
        // the changes are predictable for the whole middle of the range and we don't have to test each value
        let srcRanges = [{start: seedRangeStart, end: seedRangeEnd}]

        let currMap = null
        let fromKey = 'seed'
        while(fromKey !== 'location') {
            console.log('======================')

            // console.log(` sourceVal ${sourceVal}`)
            currMap = maps[fromKey]
            // console.log(`from ${fromKey} to ${currMap.to}`)


            // evaluate range to convert a to b
            let addToSrcRngsAfterThisMap = []



            while(srcRanges.length) {
                const srcRng = srcRanges.shift()
                let addToSrcRngsAfterThisRange = [];

                for (let i = 0; i < currMap.ranges.length; i++) {

                    let addToSrcRngsAfterThisRange = [];
                    const [destRangeStart, sourceRangeStart, rangeLength] = currMap.ranges[i];
                    const sourceRangeEnd = sourceRangeStart + rangeLength;
                    const destRangeEnd = destRangeStart + rangeLength;
                    console.log(currMap.ranges[i])


                    // do the ranges intersect?
                    let newStart = null
                    let newEnd = null
                    const before = {start: srcRng.start, end: Math.min(srcRng.end, sourceRangeStart)}
                    const inter = {
                        start: Math.max(srcRng.start, sourceRangeStart),
                        end: Math.min(sourceRangeEnd, srcRng.end)
                    }
                    const after = {start: Math.max(sourceRangeEnd, srcRng.start), end: srcRng.end}

                    if (before.end > before.start) {
                        addToSrcRngsAfterThisRange.push(before)
                    }
                    if (after.end > after.start) {
                        addToSrcRngsAfterThisRange.push(after)
                    }
                    if (inter.end > inter.start) {
                        addToSrcRngsAfterThisMap.push(inter)
                    }
                }
                srcRanges = [...addToSrcRngsAfterThisRange];
            }
            fromKey = currMap.to

            srcRanges = [...srcRanges, ...addToSrcRngsAfterThisMap]
            // console.dir(srcRanges)
            // process.stdout.write('[')
            // srcRanges.forEach(sr => {
            //     process.stdout.write(`[${sr.start}, ${sr.end}]`)
            // })
            // process.stdout.write(']\n')

        }

        allRanges = [...allRanges, ...srcRanges]
    }
    // to find minimum, check the start of each range
    // console.log('allRanges: ')
    // console.dir(allRanges)
    allRanges.forEach(r => {
        minimumLocation = minimumLocation !== null ? Math.min(r.start, minimumLocation) : r.start;
    })

    // console.log(`len ${allRanges.length}`)
    // console.log(`min ${minimumLocation}`)

    // console.log(games)
    // console.log(sum)

}