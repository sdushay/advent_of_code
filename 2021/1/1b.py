import sys

filepath = sys.argv[1]

with open(filepath, 'r') as file:
    lines = file.readlines()
    window = []
    result_arr = []

    for line in lines:
        if len(window) >= 3:
            result_arr.append(sum(window))
            window.pop(0)
        window.append(int(line))

    result_arr.append(sum(window))

def count_increases(int_arr):
    prev = None
    increases_total = 0
    for int_value in int_arr:
        if prev is not None:
            if int_value > prev:
                increases_total += 1
        prev = int_value
    return increases_total

print(count_increases(result_arr))
