import json
from random import randint
from pprint import pprint
import sys
import os


PAR = os.path.dirname(os.path.abspath(__file__))
BLCHARS = '()*/<>;:""\\/_`~1234567890'
PUNC = ',.?!-'
noPunc = True

with open(PAR + '/words.json') as f:
    words = json.load(f)

def space_pad(s):
    i = 0
    while i < len(s):
        if s[i] in PUNC:
            s = s[:i] + ' ' + s[i] + ' ' + s[i+1:]
            i += 3
        else:
            i += 1
    return s

def tokenize(arr):
    tokens = []
    for s in arr:
        for t in space_pad(s).split(' '):
            i = 0
            while i < len(t):
                if t[i] in BLCHARS or (noPunc and (t[i] in PUNC)):
                    t = t[:i] + t[i+1:]
                else:
                    i += 1
            if(len(t) > 0):
                tokens.append(t.lower())
    return tokens

def addWord(name, forward, backward):
    if name not in words:
        words[name] = {}
        words[name]['f'] = {}
        words[name]['b'] = {}

    if forward != None:
        if forward not in words[name]['f']:
            words[name]['f'][forward] = 1
        else:
            words[name]['f'][forward] += 1

    if backward != None:
        if backward not in words[name]['b']:
            words[name]['b'][backward] = 1
        else:
            words[name]['b'][backward] += 1

def makeWords():
    with open(PAR + '/poems.json') as f:
        poems = json.load(f)['poems']

    for i in range(len(poems)):
        poems[i] = tokenize(poems[i]) + ['_END']

    global words
    words = {}

    for poem in poems:
        addWord(poem[0], poem[1], None)
        for i in range(1, len(poem) - 1):
            addWord(poem[i], poem[i + 1], poem[i - 1])
        addWord(poem[-1], None, poem[-2])

    with open(PAR + '/words.json', 'w') as f:
        json.dump(words, f)

def randomConn(name, dir):
    conns = words[name][dir]
    t = 0
    for c in conns:
        t += conns[c]
    r = randint(1, t)
    for c in conns:
        r -= conns[c]
        if r <= 0:
            return c

def shift(arr, i, d):
    arr[i + d] = arr[i + d] + arr[i][0:1] if d == -1 else arr[i][-1:] + arr[i + d]
    arr[i] = arr[i][1:] if d == -1 else arr[i][:-1]

def toLines(arr, n, min, max):
    lines = []
    s = float(len(arr)) / n
    for i in range(n):
        lines.append(arr[int(s * i) : int(s * (i + 1))])
    for i in range(n * 5):
        if i % 2 == 0:
            r = randint(0, n - 2)
            if len(lines[r]) - 1 >= min and len(lines[r + 1]) + 1 <= max:
                shift(lines, r, 1)
        else:
            r = randint(1, n - 1)
            if len(lines[r]) - 1 >= min and len(lines[r - 1]) + 1 <= max:
                shift(lines, r, -1)
    return lines

def standard_poem(lines = 5, minLine = 5, maxLine = 5):
    poem = []
    curr = '_END'
    for l in range(randint(minLine * lines, maxLine * lines)):
        curr = randomConn(curr, 'b')
        poem.append(curr)
    return toLines(poem[::-1], lines, minLine, maxLine)

def main():

    if len(sys.argv) == 2 and sys.argv[1] == "true":
        makeWords()
    else:
        p = standard_poem(lines = int(sys.argv[1]), minLine = int(sys.argv[2]), maxLine = int(sys.argv[3]))

        for l in p:
            for w in l:
                print(w + ' '),
            print
        
        sys.stdout.flush()


if __name__ == "__main__":
    main()