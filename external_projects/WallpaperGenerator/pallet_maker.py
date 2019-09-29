from random import randint, random
import helpers

def r_color():
    return tuple(randint(0, 255) for i in range(3))

def make_base(min_range):
    return tuple(randint(0, 255 - min_range) for i in range(3))

def spectrum_pallet(n, min_range = 50, base = None):
    if base == None:
        base = make_base(min_range)
    top = tuple(randint(x + min_range, 255) for x in base)
    pallet = []
    for i in range(0, n):
        pallet.append(tuple(base[j] + ((top[j] - base[j]) / n) * i for j in range(len(base))))
    return pallet

def random_pallet(n):
    pallet = []
    for i in range(n):
        pallet.append(r_color())
    return pallet

def mix_pallet(n, mix = (255, 255, 255)):
    diff = 50
    pallet = []
    for i in range(n):
        pallet.append(((randint(0, 255) + mix[0]) / 2, (randint(0, 255) + mix[1]) / 2, (randint(0, 255) + mix[2]) / 2))
    return pallet

def shift_pallet(n = 3):
    pallet = []
    ocol = r_color()
    for i in range(n):
        pallet.append(tuple(ocol[(i + j) % 3] for j in range(3)))
    return pallet

def rgb_op_pallet(n = 2):
    pallet = []
    col1 = r_color()
    col2 = tuple(255 - col1[i] for i in range(3))
    for i in range(n):
        pallet.append(col1 if i % 2 == 0 else col2)
    return pallet

def similar_pallet(n, cols):
    pallet = []
    x = tuple(randint(0, 255) if i in cols else None for i in range(3))
    for i in range(n):
        pallet.append(tuple(randint(0, 255) if x[j] == None else x[j] for j in range(3)))
    return pallet

def normal_pallet(n): #creates a normal shape on the color wheel
    pallet = []
    s = randint(30, 70) / 100.0
    v = randint(30, 70) / 100.0
    a1 = randint(0, 359)
    for i in range(n):
        pallet.append(helpers.to_rgb(((a1 + (360/ n) * i) % 360, s, v)))
    return pallet

def monochrome_pallet(n, min_range = 100):
    pallet = []
    h = randint(0, 359)
    av = randint(0, 100 - min_range)
    bv = randint(av + min_range, 100) / 100.0
    av /= 100.0
    for i in range(1, n + 1):
        pallet.append(helpers.to_rgb((h, 1, av + (bv - av) / n * i)))
    return pallet

def close_pallet(n, r = 120):
    pallet = []
    ah = randint(0, 359)
    s = randint(30, 70) / 100.0
    v = randint(50, 70) / 100.0
    step = r/n
    for i in range(n):
        pallet.append(helpers.to_rgb((ah + step * i, s, v)))
    return pallet
