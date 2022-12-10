import sys
import pdb

filepath = sys.argv[1]

with open(filepath, 'r') as file:
    lines = file.readlines()
    pdb.set_trace()
    for line in lines:


