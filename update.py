import zipfile
import json
import os

import info

src = f"{info.id}.zip"
if not os.path.isfile(src):
    print(f"文件: '{src}' 未找到,请先使用PCL2导出整合包")

with zipfile.ZipFile(src, "r") as zf:
    data = json.loads(zf.read("modrinth.index.json"))

data["name"] = info.name
data["summary"] = info.summary
data["versionId"] = info.version
data["dependencies"] = {"minecraft": info.version_mc, info.loader: info.loader_version}
data["files"] += info.files_append

for item in data["files"]:
    if "] " in item["path"]:
        prefix, suffix = item["path"].split("] ")
        item["path"] = prefix.split("[")[0] + suffix

with open("modrinth.index.json", "w", encoding="utf-8") as fp:
    json.dump(data, fp, ensure_ascii=False, indent=4)

print(f"文件: 'modrinth.index.json' 已更新")
