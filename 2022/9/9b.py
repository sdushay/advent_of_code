import sys
import pdb
import re

filepath = sys.argv[1]

"""
 ['L', 'U', 'R', 'D']
 [(-1, 0), (0, -1), (1, 0), (0, 1)]
"""

visited_coords = set()
visited_coords.add((0,0))
knot_coords = [(0,0),(0,0),(0,0),(0,0),(0,0),(0,0),(0,0),(0,0),(0,0),(0,0)]
move_dirs = {
    'L': (-1, 0),
    'U': (0, -1),
    'R': (1, 0),
    'D': (0, 1)
}

with open(filepath, 'r') as file:
    lines = file.readlines()

    for line in lines:
        (dm, quant) = re.findall(r"(\S+)", line)
        move_dir = move_dirs[dm]
        for move in range(int(quant)):
            head_pos = 0
            tail_pos = 1

            # move head
            knot_coords[head_pos] = (knot_coords[head_pos][0] + move_dir[0], knot_coords[head_pos][1] + move_dir[1])

            # potentially move others
            while(tail_pos <= 9):
                delta = (knot_coords[head_pos][0] - knot_coords[tail_pos][0], knot_coords[head_pos][1] - knot_coords[tail_pos][1])
                delta_contains = set(delta)
                direction_of_delta = (-1 if delta[0] < 0 else 1, -1 if delta[1] < 0 else 1)
                if 2 in delta_contains or -2 in delta_contains:
                    move_coords = (int(bool(delta[0])) * direction_of_delta[0], int(bool(delta[1])) * direction_of_delta[1])
                    # apply move coords
                    knot_coords[tail_pos] = (knot_coords[tail_pos][0] + move_coords[0], knot_coords[tail_pos][1] + move_coords[1])

                if tail_pos == 9:
                    visited_coords.add(knot_coords[tail_pos])

                head_pos += 1
                tail_pos += 1

    print(len(visited_coords))