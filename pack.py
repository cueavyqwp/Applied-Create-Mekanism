"""
Action客户端打包脚本
"""

import zipfile
import pathlib
import shutil
import os

os.chdir(os.path.dirname(__file__))

import info

if not os.path.isdir("./src"):
    print("此脚本仅适用于在Action打包!")
    exit()

os.makedirs("./tmp/overrides")
os.mkdir("./dist")

# 信息
shutil.move("./src/modrinth.index.json", "./tmp/modrinth.index.json")
shutil.move("./src/CHANGELOG.md", "./tmp/CHANGELOG.md")
shutil.move("./src/LICENSE", "./tmp/LICENSE")
shutil.move("./src/info.py", "./tmp/overrides/info.py")
shutil.move("./src/pack-server.py", "./tmp/overrides/pack-server.py")

# 主要文件
for path in ["kubejs", "config", "defaultconfigs"]:
    shutil.move(os.path.join("./src", path), "./tmp/overrides")
# 替换文件
shutil.copytree("./src/replacement", "./tmp/overrides", dirs_exist_ok=True)

# 压缩
with zipfile.ZipFile(os.path.join("./dist", info.dist_client), "w") as zp:
    for dirpath, dirnames, filenames in os.walk("./tmp"):
        for path in dirnames + filenames:
            path = os.path.join(dirpath, path)
            zp.write(path, os.path.join(*pathlib.Path(path).parts[1:]))
