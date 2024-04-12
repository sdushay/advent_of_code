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
    jokers = h.count('J')
    set_h = set(h)
    if (len(set_h) == 1): # five of a kind
        return 7
    if (len(set_h) == 2): # either four of a kind or full house
        if (2 <= h.count(h[0]) <= 3): # if there are 2 or 3 of something, full house
            if (jokers):
                return 7 # a full house with jokers is always 5 of a kind
            return 5 # full house
        if (jokers):
            return 7 # if the jokers are the 1 or the 4, it's still 5 of a kind
        return 6 # otherwise must be 4 of a kind, even if the 4 are jokers
    if (len(set_h) == 3): # 3 of a kind or 2 pair
        if (h.count(h[0]) == 2 or h.count(h[1]) == 2): # if there are 2 of either the first two, 2p
            if (jokers == 2):
                return 6 # 2 jokers means there are 4 of a kind
            if (jokers == 1):
                return 5 # 1 joker means full house
            return 3 # 2 pair
        if (jokers):
            return 6 # 1 joker in 3 of a kind means 4 of a kind, so does 3 jokers
        return 4 # 3 of a kind
    if (len(set_h) == 5): # must be high card
        if (jokers):
            return 2 # if joker, always a pair
        return 1
    if (jokers):
        return 4 # pair with 1 joker, or 2 jokers means 3 of a kind
    return 2

def typeIntToDisplay(t):
    return ['None', 'High', 'Pair', '2 Pair', '3Kind', 'Full House', 'FourKind', '5Kind'][t]

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
            return 1 # joker is less than 2 when comparing in order
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
        print(f'{hand} {typeIntToDisplay(getTypeInt(hand))}')

    print(result)
