import sys
import pdb

filepath = sys.argv[1]

SHAPE_SCORES = {
    'X': 1,
    'Y': 2,
    'Z': 3
}
RESULT_SCORES = {
    'X': {
        'A': 3,
        'B': 0,
        'C': 6
    },
    'Y': {
        'A': 6,
        'B': 3,
        'C': 0
    },
    'Z': {
        'A': 0,
        'B': 6,
        'C': 3
    },
}

total_score = 0

with open(filepath, 'r') as file:
    lines = file.readlines()

    for line in lines:
        (opp, play) = line.replace("\n", "").split(" ")
        score = 0
        score += SHAPE_SCORES[play]
        score += RESULT_SCORES[play][opp]
        total_score += score

print(total_score)