from sys import argv, stdout
import d1, d2, d3

#call: python runner.py [design] [width] [height] [output path]

generators = [d1.generate, d2.generate, d3.generate]

generators[int(argv[1]) - 1]((int(argv[2]), int(argv[3])), argv[4])

stdout.flush()