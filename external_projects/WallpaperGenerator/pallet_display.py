from PIL import Image
import pallet_maker
import helpers

pallet = pallet_maker.close_pallet(15)
#print pallet
h, w = helpers.most_square(len(pallet))
m = 100

img = Image.new("RGBA", (w * m, h * m), "white")
pxs = img.load()

for x in range(w * m):
    for y in range(h * m):
        pxs[x, y] = pallet[w * (y / m) + (x / m)]


img.save("pallet.png", "PNG")
