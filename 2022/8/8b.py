import sys
import pdb
import math

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


    max_scenic_score = 0

    for row, trees in enumerate(data):
        for col, height in enumerate(trees):
            dir_scenic_scores = {}
            for dir_label, dir in [('left', (-1, 0)), ('up', (0, -1)), ('right', (1, 0)), ('down', (0, 1))]:
                dir_scenic_score = 0
                try:
                    next_col = col + dir[0]
                    next_row = row + dir[1]
                    if next_col >= 0 and next_row >= 0:
                        next_tree = data[next_row][next_col]
                    else:
                        next_tree = None
                except:
                    next_tree = None
                

                while next_tree:
                    dir_scenic_score += 1
                    if int(next_tree) >= int(height):
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
             
                dir_scenic_scores[dir_label] = dir_scenic_score

            scenic_score = math.prod(dir_scenic_scores.values())
            max_scenic_score = max(max_scenic_score, scenic_score)
            # print(f'tree {col},{row} has scenic scores {dir_scenic_scores} = {scenic_score}')

    print(max_scenic_score)