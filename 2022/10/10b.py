import sys
import pdb
import re
import json

filepath = sys.argv[1]
addx_cycles = 2
crtwidth = 40

def draw_crt(cycles_completed, x):
    pos = cycles_completed % 40
    if pos == 0:
        print('\n', end='')
    is_sprite_visible = pos in [x - 1, x, x + 1]
    if is_sprite_visible:
        print('#', end='')
    else:
        print('.', end='')

with open(filepath, 'r') as file:
    lines = file.readlines()

    results = []
    cycles_completed = 0
    x = 1
    results.append([cycles_completed, x])
    draw_crt(cycles_completed, x)

    for line in lines:

        tokens = re.findall(r"(\S+)", line)
        command = tokens[0]

        if command == 'noop':
            cycles_completed += 1
            results.append([cycles_completed, x])

            draw_crt(cycles_completed, x)
        else:
            apply_val = int(tokens[1])
            for run in range(addx_cycles - 1):
                cycles_completed += 1
                results.append([
                    cycles_completed,
                    x
                ])
                draw_crt(cycles_completed, x)
            cycles_completed += 1
            x += apply_val
            results.append([
                cycles_completed,
                x
            ])
            draw_crt(cycles_completed, x)

