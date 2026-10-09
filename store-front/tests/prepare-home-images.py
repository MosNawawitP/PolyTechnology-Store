"""Create web-sized derivatives without modifying the generated PNG originals."""
from pathlib import Path
from PIL import Image

directory = Path(__file__).resolve().parents[1] / 'assets' / 'homepage'
for source in sorted(directory.glob('*.png')):
    with Image.open(source) as image:
        sizes = [('', 1280), ('-small', 640)]
        if source.stem == 'hero-industrial-commerce':
            sizes.append(('-large', image.width))
        for suffix, width in sizes:
            height = round(image.height * width / image.width)
            derivative = image.convert('RGB').resize((width, height), Image.Resampling.LANCZOS)
            target = source.with_name(source.stem + suffix + '.webp')
            derivative.save(target, 'WEBP', quality=84, method=6)
            print(f'{target.name}: {width}x{height}, {target.stat().st_size:,} bytes')
