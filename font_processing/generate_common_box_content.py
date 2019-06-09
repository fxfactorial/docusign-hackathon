COMMON_FONTS = [
    "Times-Roman",
    "Times-Bold",
    "Time-Italic",
    "Time-BoldItalic",
    "Courier",
    "Courier",
    "Courier-Bold",
    "Courier-Oblique",
    "Helvetica",
    "Helvetica-Bold",
    "Helvetica-Oblique",
    "Helvetica-BoldOblique",
    "Symbol",
    "ZapfDingbats",
]

from PIL import Image, ImageFont, ImageDraw
from pdb import set_trace

COMMON_TEXT = "Hello World"


for font_name in COMMON_FONTS:
    try:
        font = ImageFont.truetype(font_name, 28, encoding="unic")
        text_width, text_height = font.getsize(COMMON_TEXT)
        print(font)
        canvas = Image.new("RGB", (text_width + 10, text_height + 10), "orange")
        draw = ImageDraw.Draw(canvas)
        draw.text((5, 5), COMMON_TEXT, "blue", font)
        canvas.save(f"unicode-{font_name}.png", "PNG")
    except Exception as e:
        print(f"Font failed {font_name}", e)
