import sys
import pdb

filepath = sys.argv[1]

"""
 ['left', 'up', 'right', 'down']
 [(-1, 0), (0, -1), (1, 0), (0, 1)]
"""

data = []

with open(filepath, 'r') as file:
    lines = file.readlines()

    # read file into 2d array

    for row, line in enumerate(lines):
        data.append([])
        for height in list(line.replace('\n', '')):
            data[row].append(height)


    visible_total = 0
    for row, trees in enumerate(data):
        for col, height in enumerate(trees):
            for dir_label, dir in [('left', (-1, 0)), ('up', (0, -1)), ('right', (1, 0)), ('down', (0, 1))]:
                try:
                    next_col = col + dir[0]
                    next_row = row + dir[1]
                    if next_col >= 0 and next_row >= 0:
                        next_tree = data[next_row][next_col]
                    else:
                        next_tree = None
                except:
                    next_tree = None
                
                vision_blocked = False

                while next_tree:
                    if int(next_tree) >= int(height):
                        vision_blocked = True
                        break

                    try:
                        next_col = next_col + dir[0]
                        next_row = next_row + dir[1]
                        if next_col >= 0 and next_row >= 0:
                            next_tree = data[next_row][next_col]
                        else:
                            next_tree = None
                    except:
                        next_tree = None
             
                if not vision_blocked:
                    visible_total += 1
                    print(f'tree {col},{row} is visible from dir {dir_label}')
                    break

print(visible_total)

