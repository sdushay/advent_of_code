import sys
import re

filepath = sys.argv[1]

pattern = r"\:*\s+"

result = None

"""
For part b, only test for the beginning and the end of the winning range
"""

with open(filepath, 'r') as file:
    lines = file.readlines()
    time = int(''.join(re.split(pattern, lines[0])[1:]))
    winning_distance = int(''.join(re.split(pattern, lines[1])[1:]))

    start = None
    end = None

    for t in range(1, time):
        distance = (t * (time - t))
        if (distance <= winning_distance):
            continue
        else:
            start = t
            break

    for t in range(time, start, -1):
        distance = (t * (time - t))
        if (distance <= winning_distance):
            continue
        else:
            end = t
            break

    # add 1 to the delta because the list of wins is inclusive
    result = end - start + 1
