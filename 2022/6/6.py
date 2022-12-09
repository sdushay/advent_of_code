import sys
import pdb


filepath = sys.argv[1]

with open(filepath, 'r') as file:
    lines = file.readlines()
    pdb.set_trace()
    for line in lines:
        window = []
        for i, char in enumerate(list(line.replace('\n', ''))):
            window.append(char)
            if len(window) >= 4:
                # check window for dupes
                # if no dupes, print res
                # break
                # otherwise, pop(0)
                if len(set(window)) == 4:
                    print(i + 1)
                    break
                else:
                    window.pop(0)

