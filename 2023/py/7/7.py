import sys
import re
from functools import cmp_to_key

filepath = sys.argv[1]

pattern = r"\s+"
data = []

"""
return an int based on what type of hand
"""
def getTypeInt(h):
    set_h = set(h)
    if (len(set_h) == 1): # five of a kind
        return 7
    if (len(set_h) == 2): # either four of a kind or full house
        if (2 <= h.count(h[0]) <= 3): # if there are 2 or 3 of something, full house
            return 5
        return 6 # otherwise must be 4 of a kind
    if (len(set_h) == 3): # 3 of a kind or 2 pair
        if (h.count(h[0]) == 2 or h.count(h[1]) == 2): # if there are 2 of either the first two, 2p
            return 3
        return 4
    if (len(set_h) == 5): # must be high card
        return 1
    return 2

"""
return card values
"""
def cardValue(c):
    match c:
        case 'A':
            return 14
        case 'K':
            return 13
        case 'Q':
            return 12
        case 'J':
            return 11
        case 'T':
            return 10
        case _:
            return int(c)

"""
walk through the cards one by one until you find two that are not equal and can be compared
"""
def compareInOrder(a, b):
    for i in range(0, 5):
        if(a[i] == b[i]):
            continue
        return 1 if cardValue(a[i]) > cardValue(b[i]) else -1
    return 0

"""
return 1 if a > b, 0 if a == b, or -1 if a < b 
"""
def compareHands(a, b):
    type_a = getTypeInt(a)
    type_b = getTypeInt(b)
    if (type_a != type_b):
        return 1 if type_a > type_b else -1
    return compareInOrder(a, b)

def compareHandTuples(a, b):
    return compareHands(a[0], b[0])


with open(filepath, 'r') as file:
    lines = file.readlines()
    for line in lines:
        data.append(re.split(pattern, line.rstrip()))
    sorted_data = sorted(data, key = cmp_to_key(compareHandTuples))
    result = 0
    for (i, (hand, bid)) in enumerate((sorted_data)):
        result += ((i + 1) * int(bid))
        print(hand)

    print(result)
