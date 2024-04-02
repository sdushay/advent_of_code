const fsp = require('node:fs/promises');

myFileReader();

async function myFileReader() {
    const file = await fsp.open('./test.txt');

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
    // console.log(maps)

    let seedRangeStart = null
    let seedRangeLength = null
    let seedRangeEnd = null
    let srcRanges = []
    debugger;
    for (let s = 0; s < startSeeds.length; s+=2) {
        seedRangeLength = parseInt(startSeeds[s+1])
        seedRangeStart = parseInt(startSeeds[s])
        seedRangeEnd = seedRangeStart + seedRangeLength
        srcRanges.push({start: seedRangeStart, end: seedRangeEnd})
    }

    let currMap = null
    let fromKey = 'seed'
    while(fromKey !== 'location') {
        // console.log(` sourceVal ${sourceVal}`)
        currMap = maps[fromKey]
        // console.log(`from ${fromKey} to ${currMap.to}`)
        let newSrcRngs = [];

        for (let i = 0; i < currMap.ranges.length; i++) {
            // while looping through map entries, check each source range

            const [destRangeStart, sourceRangeStart, rangeLength] = currMap.ranges[i];
            const sourceRangeEnd = sourceRangeStart + rangeLength;
            const destRangeEnd = destRangeStart + rangeLength;
            const nextLoopSrcRng = []

            for (let r = 0; r < srcRanges.length; r++) {
                const srcRng = srcRanges[r]

                // do the ranges intersect?
                let newStart = null
                let newEnd = null
                if (srcRng.start >= sourceRangeStart && srcRng.start < sourceRangeEnd) {
                    const delta = srcRng.start - sourceRangeStart
                    newStart = destRangeStart + delta
                }
                if (srcRng.end > sourceRangeStart && srcRng.end <= sourceRangeEnd) {
                    const delta = srcRng.end - sourceRangeStart
                    newEnd = destRangeStart + delta
                }

                console.log(`newStart ${newStart}`)
                console.log(`newEnd ${newEnd}`)

                const intersect = newStart || newEnd || (srcRng.start < sourceRangeStart && srcRng.end > sourceRangeEnd)

                if (intersect) {
                    process.stdout.write('srcRng:')
                    console.dir(srcRng)
                    console.log(`intersects ${sourceRangeStart}, ${sourceRangeEnd}`)
                    // find newStart and newEnd to this range, if we need to


                    // build new ranges list based on findings
                    // we have to add ranges that have been mapped AFTER we finish looping through this map
                    // but we want to continue to test ranges that have not been mapped at all
                    if (newStart && newEnd) {
                        newSrcRngs.push({start: newStart, end: newEnd})
                    } else if (newStart && !newEnd) {
                        newSrcRngs.push({start: newStart, end:destRangeEnd})
                        nextLoopSrcRng.push({start: sourceRangeEnd, end: srcRng.end});
                    } else if (newEnd && !newStart) {
                        nextLoopSrcRng.push({start: srcRng.start, end: sourceRangeStart})
                        newSrcRngs.push({start: destRangeStart, end: newEnd})
                    } else {
                        // included the whole source range, so include the whole dest range
                        // include portion before intersection and after
                        nextLoopSrcRng.push({start: srcRng.start, end: sourceRangeStart})
                        nextLoopSrcRng.push({start: sourceRangeEnd, end: srcRng.end})
                        newSrcRngs.push({start: destRangeStart, end: destRangeEnd})
                    }
                } else {
                    nextLoopSrcRng.push({start: srcRng.start, end: srcRng.end})
                }
            }
            srcRanges = [...nextLoopSrcRng]
            // // set src range to new ranges
            // console.log('srcRanges:')
            // console.log(newSrcRngs)
            // if (typeof newSrcRngs != 'undefined') {
            //     srcRanges = [...newSrcRngs];
            // }

        }
        console.log('srcRanges:')
        console.log(newSrcRngs)
        srcRanges = [...srcRanges, ...newSrcRngs];
        console.log(`fromKey = ${currMap.to}`)
        fromKey = currMap.to
    }
    // to find minimum, check the start of each range
    console.log('allRanges: ')
    console.dir(srcRanges)
    srcRanges.forEach(r => {
        minimumLocation = minimumLocation !== null ? Math.min(r.start, minimumLocation) : r.start;
    })

    console.log(`min ${minimumLocation}`)

    // console.log(games)
    // console.log(sum)

}