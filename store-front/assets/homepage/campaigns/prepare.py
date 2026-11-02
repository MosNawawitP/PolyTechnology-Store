"""Create responsive delivery formats from the five generated PNG originals."""
from pathlib import Path
from PIL import Image

for source in sorted(Path(__file__).resolve().parent.glob('hero-*-v2.png')):
    with Image.open(source) as image:
        image = image.convert('RGB')
        for suffix, width in [('-small',640),('',1280),('-large',2172)]:
            height = round(image.height * width / image.width)
            image.resize((width,height),Image.Resampling.LANCZOS).save(source.with_name(source.stem+suffix+'.webp'),'WEBP',quality=86,method=6)
    print(source.name)
