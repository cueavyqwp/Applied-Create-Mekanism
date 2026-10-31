"""
打包为符合Modrinth的格式
"""

import zipfile
import typing
import json
import os

os.chdir(os.path.dirname(__file__))

import info

if not os.path.exists("./dist"):
    os.mkdir("./dist")
dist = os.path.join("./dist", info.dist_client.replace(".zip", ".mrpack"))

mapping = {
    f"mods/{name.split('] ',1)[-1]}": f"mods/{name}" for name in os.listdir("mods")
}

mapping |= {f"tacz/{name}": f"tacz+1.20.1/{name}" for name in os.listdir("tacz+1.20.1")}

src = input("整合包(*.zip)>")
if not os.path.isfile(src) or not src.endswith(".zip"):
    print("无效的路径")
    exit()

with zipfile.ZipFile(dist, "w") as zpd:
    with zipfile.ZipFile(src, "r") as zp:
        data = json.loads(zp.read("modrinth.index.json"))
        files: list[dict[str, typing.Any]] = []
        for item in data["files"]:
            target: str | None = None
            for url in item["downloads"]:
                if "cdn.modrinth.com" in url:
                    target = url
            if target is None:
                to: str = item["path"]
                path = mapping[to]
                zpd.write(path, f"overrides/{to}")
            else:
                item["downloads"] = [target]
                files.append(item)
        data["files"] = files
        for item in zp.infolist():
            if item.filename == "modrinth.index.json":
                continue
            zpd.writestr(item.filename, zp.read(item))
        zpd.writestr(
            "modrinth.index.json", json.dumps(data, ensure_ascii=False, indent=4)
        )

print(f"已导出mrpack至: \"{os.path.abspath(os.path.join('./dist', dist))}\"")
