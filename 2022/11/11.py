import sys
import pdb
import re
import json
import math
import dis

filepath = sys.argv[1]
monkeys = []

with open(filepath, 'r') as file:
    lines = file.readlines()

    for line in lines:
        match = re.search(r"(Monkey\s\d)", line)
        if match:
            curr_monkey = {'name': match[0], 'items': [], 'num_inspections': 0}
            monkeys.append(curr_monkey)
        else:
            tokens = re.findall(r"\S+", line)
            if tokens:
                if tokens[0] == 'Starting':
                    for t in tokens[2:]:
                        curr_monkey['items'].append(int(t.replace(',', '')))
                elif tokens[0] == 'Operation:':
                    body = line.replace('\n', '').split('=')[1]
                    curr_monkey['operation'] = eval(f'lambda old : {body}')
                elif tokens[0] == 'Test:':
                    curr_monkey['test'] = int(tokens[-1])
                elif tokens[0] == 'If':
                    if tokens[1] == 'true:':
                        curr_monkey['throw_true'] = int(tokens[-1])
                    else:
                        curr_monkey['throw_false'] = int(tokens[-1])



for round in range(20):
    for monkey in monkeys:
        while(monkey['items']):
            item = monkey['items'].pop(0)
            monkey['num_inspections'] += 1
            worry_level = math.floor(monkey['operation'](item) / 3)
            test_res = worry_level % monkey['test'] == 0
            if test_res:
                monkeys[monkey['throw_true']]['items'].append(worry_level)
            else:
                monkeys[monkey['throw_false']]['items'].append(worry_level)

vals = []
for m in monkeys:
    vals.append(m['num_inspections'])

vals.sort()

print(math.prod(vals[-2:]))