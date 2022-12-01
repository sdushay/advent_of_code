import sys

filepath = sys.argv[1]

with open(filepath, 'r') as file:
    lines = file.readlines()
    prev = None
    increases_total = 0
    for line in lines:
        if prev is not None:
            if int(line) > prev:
                increases_total += 1
        prev = int(line)

print(increases_total)
