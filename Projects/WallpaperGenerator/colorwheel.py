from PIL import Image
import shapes
from random import randint
import math
import pallet_maker
import helpers

w = 1000
h = 1000

img = Image.new("RGBA", (w, h), "white")
pxs = img.load()


for x in range(w):
    for y in range(h):
        t = helpers.ang((w/2,h/2), (x, y))
        #print t
        t = int(t * 180 / math.pi)
        dis = helpers.dis((w/2,h/2), (x,y))
        maxdis = helpers.dis((0,0), (w/2, h/2))
        pxs[x, y] = helpers.to_rgb((t, 1, 1)) if helpers.dis((w/2,h/2), (x,y)) < 500 else (0,0,0)


img.save("test.png", "PNG")
