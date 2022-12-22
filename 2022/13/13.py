import sys
import pdb
import re
import json
import math
import dis

filepath = sys.argv[1]

data = []


def is_in_order(left, right):
    """
    This is not totally correct, found some bugs in part B
    """
    print(f'Compare {left} vs {right}')

    if not left and not right:
        return None
    elif not left:
        print("Left side ran out of items, so inputs are in the right order")
        return True
    elif not right:
        print("Right side ran out of items, so inputs are not in the right order")
        return False

    curr_left = left.pop(0)
    curr_right = right.pop(0)
    if isinstance(curr_left, int) and isinstance(curr_right, int):
        print(f'  Compare {curr_left} vs {curr_right}')
        if curr_left > curr_right:
            return False
        elif curr_right > curr_left:
            return True
    elif isinstance(curr_left, list) and isinstance(curr_right, list):
        res = is_in_order(curr_left, curr_right)
        if res is None:
            return is_in_order(left, right)
        else:
            return res

    else:
        if isinstance(curr_left, int):
            return is_in_order([curr_left], curr_right)
        elif isinstance(curr_right, int):
            return is_in_order(curr_left, [curr_right])

    return is_in_order(left, right)

with open(filepath, 'r') as file:
    lines = file.readlines()
    for row, line in enumerate(lines):
        if row % 3 == 0:
            data.append({'left': eval(line)})
        elif row % 3 == 1:
            data[-1]['right'] = eval(line)


sum_indices = 0
for i, pair in enumerate(data):
    pair_index = i + 1
    pair_in_order = is_in_order(pair["left"], pair["right"])
    print(f'pair {pair_index} {"yes" if pair_in_order else "no"}')
    if pair_in_order:
        sum_indices += pair_index

print(sum_indices)
