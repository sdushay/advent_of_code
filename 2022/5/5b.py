import sys
import pdb
import re

filepath = sys.argv[1]

stacks = []

regex = r"\[(\w+)\]"
start_columns = []

with open(filepath, 'r') as file:
    lines = file.readlines()
    # find line with number labels
    for i, line in enumerate(lines):
        if line[:2] == " 1":
            start_row = i
            num_stacks = int(len(line.replace('\n', '')) / 4) + 1
            for stack_num in range(1, num_stacks + 1):
                start_columns.append(stack_num * 4 - 3)
                stacks.append([])
            break
    
    # build stacks
    row = start_row - 1
    while row >= 0:
        line = lines[row]
        for stack_pos, col in enumerate(start_columns):
            try:
                crane = line[col]
                if crane == ' ':
                    raise Exception
                stacks[stack_pos].append(crane)
            except:
                pass
        row -= 1

    # execute moves
    for line in lines[(start_row + 2):]:
        quant, source, dest = re.findall(r"(\d+)", line)
        temp = []
        for x in range(int(quant)):
            temp.append(stacks[int(source) - 1].pop())
        while len(temp):
            stacks[int(dest) - 1].append(temp.pop())

# get top off each stack
res = ''
for stack in stacks:
    res += stack.pop()

print(res)