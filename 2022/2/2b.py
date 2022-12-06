import sys
import pdb

filepath = sys.argv[1]

RESULT_SCORE = {
    'X': 0,
    'Y': 3,
    'Z': 6
}
SHAPE_SCORE = {
    'X': {
        'A': 3,
        'B': 1,
        'C': 2
    },
    'Y': {
        'A': 1,
        'B': 2,
        'C': 3
    },
    'Z': {
        'A': 2,
        'B': 3,
        'C': 1
    },
}

total_score = 0

with open(filepath, 'r') as file:
    lines = file.readlines()

    for line in lines:
        (opp, res) = line.replace("\n", "").split(" ")
        score = 0
        score += SHAPE_SCORE[res][opp]
        score += RESULT_SCORE[res]
        total_score += score

print(total_score)