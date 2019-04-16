import urllib, urllib2
import json
from pprint import pprint
import os

cap = 200 # None for no cap
PAR = os.path.dirname(os.path.abspath(__file__))

def convert(name):
    for i in range(len(name)):
        if name[i] == ' ':
            name = name[:i] + '+' + name[i+1:]
    return name

def clean(s):
    return s.strip("1234567890\\ \n")

authors = json.load(urllib2.urlopen("http://poetrydb.org/author"))["authors"]

data = {"poems": []}

count = 0
for a in authors:
    if cap == None or count < cap:
        poems = json.load(urllib2.urlopen("http://poetrydb.org/author/" + convert(a)))
        for p in poems:
            data["poems"].append(p["lines"])
            count += 1
            if cap != None and count >= cap:
                break


with open(PAR + 'poems.json', 'w') as f:
    json.dump(data, f)
