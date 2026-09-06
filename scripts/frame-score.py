import os
import shutil
import subprocess
import sys

import numpy as np
from PIL import Image

comp = sys.argv[1]
ref = sys.argv[2]
ours = f"out/{comp}.mp4"
work = f"out/score-{comp}"

shutil.rmtree(work, ignore_errors=True)
os.makedirs(f"{work}/a")
os.makedirs(f"{work}/b")


rate = 30.0

subprocess.check_call(
    ["ffmpeg", "-v", "error", "-i", ref, "-vf", f"fps={rate},scale=320:180", f"{work}/a/f%04d.png"]
)
subprocess.check_call(
    [
        "ffmpeg",
        "-v",
        "error",
        "-i",
        ours,
        "-vf",
        f"fps={rate},scale=320:180",
        f"{work}/b/f%04d.png",
    ]
)

a = sorted(os.listdir(f"{work}/a"))
b = sorted(os.listdir(f"{work}/b"))
n = min(len(a), len(b))

rows = []
for i in range(n):
    ia = np.asarray(Image.open(f"{work}/a/{a[i]}").convert("L"), dtype=np.float32)
    ib = np.asarray(Image.open(f"{work}/b/{b[i]}").convert("L"), dtype=np.float32)
    rows.append((i + 1, float(np.abs(ia - ib).mean())))

rows.sort(key=lambda r: -r[1])
mean = sum(r[1] for r in rows) / len(rows)
print(f"frames={n} mean_abs_diff={mean:.2f}")
print("worst frames (frame_30fps, score):")
for f, s in rows[:24]:
    print(f"  {f:4d}  t={((f - 1) / 30):5.2f}s  {s:6.2f}")

buckets = {}
for f, s in rows:
    key = (f - 1) // 30
    buckets.setdefault(key, []).append(s)
print("worst seconds:")
worst = sorted(buckets.items(), key=lambda kv: -sum(kv[1]) / len(kv[1]))
for sec, vals in worst[:12]:
    print(f"  {sec:3d}s  {sum(vals) / len(vals):6.2f}")
