seeds, *maps = open('input.txt').read().split('\n\n')
seeds = [int(seed) for seed in seeds.split()[1:]]
maps = [[list(map(int, line.split())) for line in m.splitlines()[1:]] for m in maps]

locations = []
for i in range(0, len(seeds), 2):
    ranges = [[seeds[i], seeds[i + 1] + seeds[i]]]
    results = []
    for _map in maps:
        print('======================')
        while ranges:
            start_range, end_range = ranges.pop()
            for target, start_map, r in _map:
                print(f'[ {target}, {start_map}, {r} ]')
                end_map = start_map + r
                offset = target - start_map
                if end_map <= start_range or end_range <= start_map:  # no overlap
                    continue
                if start_range < start_map:
                    ranges.append([start_range, start_map])
                    start_range = start_map
                if end_map < end_range:
                    ranges.append([end_map, end_range])
                    end_range = end_map
                results.append([start_range + offset, end_range + offset])
                break
            else:
                results.append([start_range, end_range])
        ranges = results
#         print(results)
        results = []
    locations += ranges
# print(min(loc[0] for loc in locations))