import sys
import pdb


def get_set_from_range_string(rs):
    arr = rs.split('-')
    arr[0] = int(arr[0])
    arr[1] = int(arr[1]) + 1
    return set(range(*arr))

filepath = sys.argv[1]

with open(filepath, 'r') as file:
    lines = file.readlines()
    total = 0
    pdb.set_trace()
    for line in lines:
        (elf1, elf2) = line.replace('\n', '').split(',')
        elf1_start_stop = elf1.split('-')
        elf_set1 = get_set_from_range_string(elf1)
        elf_set2 = get_set_from_range_string(elf2)
        contains = elf_set1 >= elf_set2 or elf_set2 >= elf_set1
        total += int(contains)

print(total)

