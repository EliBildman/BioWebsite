from sys import argv, stdout
import d1, d2, d3
import os

#call: python runner.py [design] [width] [height] [output path]

generators = [d1.generate, d2.generate, d3.generate]

path = argv[4]
cont = path[:path.rfind('/')]

if not os.path.isdir(cont):
    os.mkdir(os.mkdir(cont))

generators[int(argv[1]) - 1]((int(argv[2]), int(argv[3])), argv[4])

stdout.flush()