import sys
import pdb
import re
import json

filepath = sys.argv[1]
addx_cycles = 2

with open(filepath, 'r') as file:
    lines = file.readlines()

    results = []
    cycles_completed = 0
    x = 1
    results.append([cycles_completed, x])

    for line in lines:

        tokens = re.findall(r"(\S+)", line)
        command = tokens[0]

        if command == 'noop':
            cycles_completed += 1
            results.append([cycles_completed, x])
        else:
            apply_val = int(tokens[1])
            for run in range(addx_cycles - 1):
                cycles_completed += 1
                results.append([
                    cycles_completed,
                    x
                ])
            cycles_completed += 1
            x += apply_val
            results.append([
                cycles_completed,
                x
            ])

print(json.dumps(results))
#calculate signal strengths
sum = 0
for c in [20, 60, 100, 140, 180, 220]:
    signal_strength = results[c-1][1] * c
    print(signal_strength)
    sum += signal_strength

print(sum)

