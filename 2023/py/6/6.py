import sys
import re

filepath = sys.argv[1]

pattern = r"\:*\s+"

races = []
result = 1

with open(filepath, 'r') as file:
    lines = file.readlines()
    times = [int(x) for x in re.split(pattern, lines[0])[1:] if x]
    winning_distances = [int(x) for x in re.split(pattern, lines[1])[1:] if x]

    for i, total_time in enumerate(times):
        # test each length of time as a possible length to hold the button for
        races.append([])

        for t in range(1, total_time):
            distance = (t * (total_time - t))
            races[i].append(distance)

        winning_times = [x for x in races[i] if x > winning_distances[i]]
        result = result * len(winning_times)
