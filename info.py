import typing

name: str = "Applied: Create & Mekanism"
summary: str = "Applied: Create & Mekanism"
version: str = "0.2.1"

id: str = name.replace(":", "")
dist_client: str = f"{id}-{version}.mrpack"
dist_server: str = f"{id}-{version}-server.zip"

version_mc: str = "1.21.1"
loader: typing.Literal["forge", "neoforge", "fabric-loader"] = "neoforge"
loader_version = "21.1.265"

files_append: list[dict[str, typing.Any]] = [
    {
        "path": "shaderpacks/BSL_v10.1.8.zip",
        "hashes": {
            "sha1": "e89818c8827d0131c102fb480c3c3446624db0df",
            "sha512": "94a3c25d6820868db624e11347873e6b572e7cd571967d9ac6f4690ca5d37ca302a7645d85eec800e0654541e3825fba14d37b5a25d3996aaf038178552be26f",
        },
        "downloads": [
            "https://cdn.modrinth.com/data/Q1vvjJYV/versions/Y68yiql9/BSL_v10.1.8.zip",
        ],
        "fileSize": 1134153,
    },
    {
        "path": "resourcepacks/CTM-Overhaul-V_6.0-Pre1.zip",
        "hashes": {
            "sha1": "fa60ebe8f76f6ca925efb616eec593221a26ed67",
            "sha512": "5b3c37af66c89202e2001f874c192078f4c24bfd403648912dabc96bdaa9863b1f48f44d9ab18cb508bd55a99e93433437caa08168ed331e3cd1e766bce01fb1",
        },
        "downloads": [
            "https://cdn.modrinth.com/data/S1rcrDD7/versions/x7nkmGUO/CTM-Overhaul-V_6.0-Pre1.zip",
        ],
        "fileSize": 40806610,
    },
    {
        "path": "tacz/BlueArchive FPS Ver.TaCZ 1.25.1 abydos_complete.zip",
        "hashes": {
            "sha1": "92e8c57a58596bd711969a540e47a40f58679185",
            "sha512": "57eda75ce94f8d2786e64c15a31b99a2d652e03bba625dd9b2a5d723d8a2526f2e1067d724343fff7ba77ce0217bbf1de76d074a9aee6e79c9f5b83a13b23ff1",
        },
        "downloads": [
            "https://mediafilez.forgecdn.net/files/9057/170/BlueArchive%20FPS%20Ver.TaCZ%201.25.1%20abydos_complete.zip",
            "https://edge.forgecdn.net/files/9057/170/BlueArchive%20FPS%20Ver.TaCZ%201.25.1%20abydos_complete.zip",
        ],
        "fileSize": 25706797,
    },
    {
        "path": "tacz/bluearchive1.5.0.zip",
        "hashes": {
            "sha1": "b9850535d8a5df0bd7e4b680133029f6323dc22a",
            "sha512": "a13b4af98ca4b2bed1a977c385ad7049c30202ac080e52ebb5c672530b1455e9beaf595a0878383cbd0445554d78189f47fead257ac420ed743093fdc14a35b2",
        },
        "downloads": [
            "https://mediafilez.forgecdn.net/files/8491/195/bluearchive1.5.0.zip",
            "https://edge.forgecdn.net/files/8491/195/bluearchive1.5.0.zip",
        ],
        "fileSize": 48341426,
    },
    {
        "path": "tacz/Create Armorer-v1.2.0.1-for117.zip",
        "hashes": {
            "sha1": "2f718e169a6bd42fe90fa9d28ffa56add0c74b79",
            "sha512": "77066929381d42d379c29aa8b2f86efe1242860e623ffe5e3ecf9b9581b53b46b6346953c6b85403c64103aac75828a86e038fd7249ae686942e9f2f43d9afe8",
        },
        "downloads": [
            "https://mediafilez.forgecdn.net/files/7598/625/Create%20Armorer-v1.2.0.1-for117.zip",
            "https://edge.forgecdn.net/files/7598/625/Create%20Armorer-v1.2.0.1-for117.zip",
        ],
        "fileSize": 7107566,
    },
    {
        "path": "tacz/Immersive Armorer-v1.2.1-for117.zip",
        "hashes": {
            "sha1": "2284c83c1917f4ec16ab1d776dca137b85c98968",
            "sha512": "33cf2ce6b927cb0407526c0e294af53a9fbcadada0f104853d7ffffe3921755c943d5259d3de47147194a9199b0f1be106dfbd517b72801771d6e45465c1a710",
        },
        "downloads": [
            "https://mediafilez.forgecdn.net/files/7598/69/Immersive%20Armorer-v1.2.1-for117.zip",
            "https://edge.forgecdn.net/files/7598/69/Immersive%20Armorer-v1.2.1-for117.zip",
        ],
        "fileSize": 8987273,
    },
]
