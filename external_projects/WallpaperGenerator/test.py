import os

path = os.getcwd() + "/hello.txt"

cont = path[:path.rfind('/')]

print os.path.isdir(cont)