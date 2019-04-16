import shapes
import pallet_maker
import random
import helpers
from PIL import Image


def find_sqrs(w, h):
    sqrs = []
    s = w/100
    last = None
    mul = (random.random() / 2 + 1.5)
    offa = tuple((random.random() * 1.6 - 0.8) for i in range(2))
    while len(sqrs) == 0 or not fills_screen(w, h, last) and not off_screen(w, h, last):
        pos = (random.randint(w/3, 2*w/3), random.randint(h/3, 2*h/3)) if len(sqrs) == 0 else last.center
        s *= mul
        #s = int(s * (random.random() * 2 + 1.5))
        #offset = tuple(random.randint((-1 * (s/2 - last.s/2)) * 2/3, (s/2 - last.s/2) * 2/3) for i in range(2)) if len(sqrs) > 0 else (0,0)
        offset = tuple((offa[i] * (s/2 - last.s/2)) for i in range(2)) if last != None else (0,0)
        #print offa
        sqrs.append(shapes.Square((pos[0] + offset[0], pos[1] + offset[1]), s))
        last = sqrs[-1]
    return sqrs[:-1]


def fills_screen(w, h, sqr):
    return 0 > sqr.center[0] - (sqr.s / 2) and w <= sqr.center[0] + (sqr.s / 2) and 0 >= sqr.center[1] - (sqr.s / 2) and h <= sqr.center[1] + (sqr.s / 2)

def off_screen(w, h, sqr):
    return 0 > sqr.center[0] + (sqr.s / 2) or sqr.center[0] - (sqr.s / 2) >= w or 0 > sqr.center[1] + (sqr.s / 2) or sqr.center[1] - (sqr.s / 2) >= h

def generate(size, savepath):
    w = size[0]
    h = size[1]
    ss = find_sqrs(w, h)
    p = pallet_maker.monochrome_pallet(len(ss) + 1)
    img = Image.new("RGBA", (w, h), p[0])
    pxs = img.load()
    i = 1
    for s in ss[::-1]:
        # print str(i) + "/" + str(len(ss))
        s.fill(pxs, dems = (w, h), color = p[i])
        #s.outline(pxs, dems = (w, h), thickness = int(s.r ** 0.5) / 4)
        i += 1

    img.save(savepath, "PNG")
    print('Done')
