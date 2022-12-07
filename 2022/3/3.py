import sys
import pdb

filepath = sys.argv[1]

with open(filepath, 'r') as file:
    lines = file.readlines()

    priority_sum = 0

    for line in lines:
        trimmed_line = line.replace('\n', '')
        half_index = int(len(trimmed_line) / 2)
        first_half = set(trimmed_line[:half_index])
        second_half = set(trimmed_line[half_index:])
        dupe = list(first_half & second_half)[0]

        priority = list('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ').index(dupe) + 1
        priority_sum += priority

    print(priority_sum)
