from PIL import Image, ImageDraw, ImageFont
import os

sizes = [16, 48, 128]

for size in sizes:
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 背景圆角矩形
    padding = max(1, size // 16)
    radius = size // 4
    draw.rounded_rectangle(
        [padding, padding, size - padding, size - padding],
        radius=radius,
        fill=(233, 69, 96, 255)
    )
    
    # 画一个简单的文档+星号图标
    cx, cy = size // 2, size // 2
    
    # 文档形状
    doc_w = size * 0.4
    doc_h = size * 0.5
    doc_x1 = cx - doc_w / 2
    doc_y1 = cy - doc_h / 2
    doc_x2 = cx + doc_w / 2
    doc_y2 = cy + doc_h / 2
    draw.rounded_rectangle(
        [doc_x1, doc_y1, doc_x2, doc_y2],
        radius=max(1, size // 16),
        fill=(255, 255, 255, 230)
    )
    
    # 文档上的横线
    line_margin = size * 0.08
    line_y_start = doc_y1 + size * 0.12
    line_gap = size * 0.09
    line_w = max(1, size // 32 + 1)
    for i in range(3):
        ly = line_y_start + i * line_gap
        if ly + line_w < doc_y2 - size * 0.05:
            draw.rectangle(
                [doc_x1 + line_margin, ly, doc_x2 - line_margin, ly + line_w],
                fill=(233, 69, 96, 180)
            )
    
    # 右下角小星星
    star_cx = cx + doc_w * 0.4
    star_cy = cy + doc_h * 0.3
    star_r = size * 0.15
    # 简单用一个小圆+颜色表示
    draw.ellipse(
        [star_cx - star_r, star_cy - star_r, star_cx + star_r, star_cy + star_r],
        fill=(255, 220, 100, 255)
    )
    
    img.save(f'icon{size}.png')
    print(f'Generated icon{size}.png')

print('Done!')
