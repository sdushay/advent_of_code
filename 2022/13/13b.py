import sys
import pdb
import re
import json
import math
import dis
import functools

filepath = sys.argv[1]

data = []

def is_in_order(left, right):
    print(f'Compare {left} vs {right}')

    if not left and not right:
        return 0
    elif not left:
        print("Left side ran out of items, so inputs are in the right order")
        return -1
    elif not right:
        print("Right side ran out of items, so inputs are not in the right order")
        return 1

    curr_left = left[0]
    curr_right = right[0]
    if isinstance(curr_left, int) and isinstance(curr_right, int):
        print(f'  Compare {curr_left} vs {curr_right}')
        if curr_left > curr_right:
            print("Left side is larger, return 1")
            return 1
        elif curr_right > curr_left:
            print("Right side is larger, return -1")
            return -1
    elif isinstance(curr_left, list) and isinstance(curr_right, list):
        res = is_in_order(curr_left, curr_right)
        if res != 0:
            return res
    else:
        if isinstance(curr_left, int):
            res = is_in_order([curr_left], curr_right)
            if res != 0:
                return res
        elif isinstance(curr_right, int):
            res = is_in_order(curr_left, [curr_right])
            if res != 0:
                return res

    return is_in_order(left[1:], right[1:])


with open(filepath, 'r') as file:
    lines = file.readlines()
    for row, line in enumerate(lines):
        if row % 3 != 2:
            data.append(eval(line))

data.append([[2]])
data.append([[6]])


data.sort(key=functools.cmp_to_key(is_in_order))

for d in data:
    print(d)

decoder_key = (data.index([[2]]) + 1) * (data.index([[6]]) + 1)
print(decoder_key)
