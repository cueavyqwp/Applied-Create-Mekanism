"""
本地服务端生成
"""

import tomllib
import zipfile
import json
import os

os.chdir(os.path.dirname(__file__))

import info

ignore = (
    "colorwheel",
    "colorwheel_patcher",
    "controlify",
    "continuity",
    "flickerfix",
    "mousetweaks",
    "norealmsbutton",
)

target = (
    "immersiveengineering-server.toml",
    "cookingforblockheads-common.toml",
    "touhou_little_maid-common.toml",
    "easy_villagers-server.toml",
    "ftbultimine-server.snbt",
    "solcarrot-server.toml",
    "simulated-server.toml",
    "ftbchunks-world.snbt",
    "curios-common.toml",
    "create-server.toml",
    "xnet-server.toml",
    "xnetgases.toml",
    "fml.toml",
)

mods: list[str] = []
for name in os.listdir("./mods"):
    if not name.endswith(".jar"):
        continue
    path = os.path.join("./mods", name)
    if not zipfile.is_zipfile(path):
        continue
    use = False
    with zipfile.ZipFile(path, "r") as zp:
        names = set(zp.namelist())
        if "META-INF/neoforge.mods.toml" in names:
            data = tomllib.loads(
                zp.read("META-INF/neoforge.mods.toml").decode("utf-8", "ignore")
            )
            modid = data["mods"][0]["modId"]
            if modid in ignore:
                use = False
                continue
            deps = data.get("dependencies", {})
            key = modid if modid in deps else ("{id}" if "{id}" in deps else None)
            if key is None:
                use = True
            else:
                haveside = False
                for item in deps[key]:
                    if "side" not in item:
                        continue
                    if item.get("type", "required") != "required":
                        continue
                    if not item.get("required", True):
                        continue
                    haveside = True
                    if item["side"] != "CLIENT":
                        use = True
                if not haveside:
                    use = True
        elif "fabric.mod.json" in names:
            env = json.loads(zp.read("fabric.mod.json")).get("environment", "*")
            use = env != "client"
        else:
            use = True
    if use:
        mods.append(path)

if not os.path.exists("./dist"):
    os.mkdir("./dist")

dist = os.path.join("./dist", info.dist_server)

with zipfile.ZipFile(dist, "w") as zp:
    # 配置文件
    for dirpath, dirnames, filenames in os.walk("./config"):
        for name in dirnames + filenames:
            path = os.path.join(dirpath, name)
            if name not in target and not (
                ("yes_steve_model" in path and "custom" in path)  # 复制YSM模型到服务端
                or "ftbquests" in path  # 复制FTB任务
            ):
                continue
            zp.write(path)
    # 默认配置文件
    for dirpath, dirnames, filenames in os.walk("./defaultconfigs"):
        for name in dirnames + filenames:
            zp.write(os.path.join(dirpath, name))
    # 魔改文件
    for dirpath, dirnames, filenames in os.walk("./kubejs"):
        for name in dirnames + filenames:
            path = os.path.join(dirpath, name)
            if name.endswith(".txt"):
                continue
            # 忽略ProbeJS相关
            if name in ("package.json", "jsconfig.json"):
                continue
            # 忽略客户端相关
            if "client" in path:
                continue
            zp.write(path)
    # 枪包
    for name in os.listdir("./tacz"):
        path = os.path.join("./tacz", name)
        if path.endswith(".zip"):
            zp.write(path)
    # 模组
    for path in mods:
        zp.write(path)

print(
    f"已导出服务端至: \"{os.path.abspath(os.path.join('./dist', info.dist_server))}\""
)
