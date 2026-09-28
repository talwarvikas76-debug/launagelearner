import struct
import zlib
import os

def create_png(width, height, fill_color, inner_color, safe_zone=False):
    """
    Creates an uncompressed raw RGBA PNG buffer using Python standard library.
    """
    raw_data = bytearray()
    center_x = width // 2
    center_y = height // 2
    radius = int(width * (0.38 if safe_zone else 0.42))
    
    for y in range(height):
        raw_data.append(0)  # filter type None
        for x in range(width):
            dx = x - center_x
            dy = y - center_y
            dist = (dx * dx + dy * dy) ** 0.5
            
            if dist < radius:
                # Inside logo disc
                t = dist / radius
                r = int(inner_color[0] * (1 - t * 0.25))
                g = int(inner_color[1] * (1 - t * 0.25))
                b = int(inner_color[2] * (1 - t * 0.25))
                a = 255
            else:
                # Background
                r, g, b, a = fill_color
            
            raw_data.extend([r, g, b, a])

    def chunk(tag, data):
        c = tag + data
        crc = zlib.crc32(c) & 0xffffffff
        return struct.pack('>I', len(data)) + c + struct.pack('>I', crc)

    header = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0))
    idat = chunk(b'IDAT', zlib.compress(bytes(raw_data), 9))
    iend = chunk(b'IEND', b'')

    return header + ihdr + idat + iend

os.makedirs('./public', exist_ok=True)

# Colors: Dark Emerald Background, Vivid Mint Center
bg_color = (31, 58, 39, 255)
mint_color = (52, 211, 153, 255)

icons = [
    ('./public/pwa-192x192.png', 192, 192, False),
    ('./public/pwa-512x512.png', 512, 512, False),
    ('./public/pwa-maskable-512x512.png', 512, 512, True),
    ('./public/apple-touch-icon.png', 180, 180, False),
    ('./public/favicon.ico', 32, 32, False),
]

for path, w, h, maskable in icons:
    data = create_png(w, h, bg_color, mint_color, safe_zone=maskable)
    with open(path, 'wb') as f:
        f.write(data)
    print(f"Generated {path} ({w}x{h}, {len(data)} bytes)")

print("All PWA PNG icons generated successfully!")
