import random
from math import sin, cos, atan, pi

def comb_randint(*args):
    pos = []
    for r in args:
        pos += range(r[0], r[1] + 1)
    return random.choice(pos)

def most_square(num):
    for i in range(1, int(num ** 0.5) + 1):
        if num % i == 0:
            l = i
    return (l, num / l)

def to_hsv(rgb):
    None

def to_rgb(hsv):
    h = float(hsv[0]) % 360
    c = float(hsv[1]) * float(hsv[2])
    x = c * (1 - abs((h / 60) % 2 - 1))
    m = float(hsv[2]) - c
    rgb = ()
    if h < 60:
        rgb = (c, x, 0)
    elif h < 120:
        rgb = (x, c, 0)
    elif h < 180:
        rgb = (0, c, x)
    elif h < 240:
        rgb = (0, x, c)
    elif h < 300:
        rgb = (x, 0, c)
    else:
        rgb = (c, 0, x)
    rgb = tuple(int((rgb[i] + m) * 255) for i in range(3))
    return rgb

def ang(p1, p2):
    x = p2[0] - p1[0]
    y = p2[1] - p1[1]
    if x == 0:
        return pi / 2 if y > 0 else 3 * pi / 2
    t = float(y) / x
    theta = atan(t)
    if x < 0:
        return theta + pi
    elif y < 0:
        return 2 * pi + theta
    else:
        return theta

def dis(p1, p2):
    return ((p2[1] - p1[1]) ** 2 + (p2[0] - p1[0]) ** 2) ** 0.5

def any_within(num, range, arr):
    for x in arr:
        if abs(num - x) <= range:
            return True
    return False

def lines_crossed(lines, p1, p2):
    crossed = 0
    for l in lines:
        if (p1[1] - l[p1[0]]) * (p2[1] - l[p2[0]]) <= 0:
            crossed += 1
    return crossed
