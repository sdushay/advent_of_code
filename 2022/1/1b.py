import sys

filepath = sys.argv[1]

with open(filepath, 'r') as file:
    lines = file.readlines()
    curr_total = 0
    totals = []
    for line in lines:
        try:
            val = int(line)
            curr_total += val
        except ValueError:
            totals.append(curr_total)
            curr_total = 0
totals.sort()
print(sum(totals[-3:]))
