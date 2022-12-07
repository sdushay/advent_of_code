import sys
import pdb

filepath = sys.argv[1]

with open(filepath, 'r') as file:
    lines = file.readlines()

    priority_sum = 0
    window = []

    for line in lines:
        elf_set = set(list(line.replace('\n', '')))
        window.append(elf_set)
        
        if len(window) == 3:
            dupe = list(window[0] & window[1] & window[2])[0]
            window = []
            priority = list('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ').index(dupe) + 1
            priority_sum += priority

    print(priority_sum)
