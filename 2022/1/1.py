import sys

filepath = sys.argv[1]

with open(filepath, 'r') as file:
    lines = file.readlines()
    curr_total = 0
    max_total = 0
    for line in lines:
        try:
            val = int(line)
            curr_total += val
        except ValueError:
            max_total = max(max_total, curr_total)
            curr_total = 0

print(max_total)
