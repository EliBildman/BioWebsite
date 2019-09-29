from PIL import Image
import pallet_maker
import shapes
import random

def rand_squares(w, h, num, min_size, max_size):
    sqrs = []
    for i in range(num):
        center = (random.randint(min_size / 2, w - min_size / 2 - 1), random.randint(min_size / 2, h - min_size / 2 - 1))
        side = random.randint(min_size, max_size)
        while not valid_square(w, h, center, side):
            side = random.randint(min_size, max_size)
        sqrs.append(shapes.Square(center, side))
    return sqrs

def num_contains(point, shapes):
    num = 0
    for shape in shapes:
        if shape.contains_point(point):
            num += 1
    return num

def valid_square(w, h, center, side):
    r = side / 2
    return 0 <= center[0] - r and center[0] + r < w and 0 <= center[1] - r and center[1] + r < h


def generate(size, savepath):
    w = size[0]
    h = size[1]
    num_sqrs = 5

    pallet = pallet_maker.monochrome_pallet(num_sqrs + 2)

    img = Image.new("RGBA", (w, h), pallet[0])
    pallet = pallet[1:]
    pxs = img.load()

    sqrs = rand_squares(w, h, num_sqrs, w / 3, w)
    j = 0
    for sqr in sqrs:
        j += 1
        # print float(j) / num_sqrs * 100, "%"
        for x in range(sqr.points[2][0], sqr.points[0][0]):
            for y in range(sqr.points[2][1], sqr.points[0][1]):
                pxs[x, y] = pallet[num_contains((x, y), sqrs)]
    for sqr in sqrs:
        sqr.outline(pxs)


    img.save(savepath, "PNG")
    print('Done')
