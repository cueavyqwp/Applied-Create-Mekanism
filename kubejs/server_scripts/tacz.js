let bluePrint = [
    'immersiveengineering:blueprint[immersiveengineering:blueprint="tacz"]',
    'immersiveengineering:blueprint[immersiveengineering:blueprint="tacz_bluearchive"]',
    'immersiveengineering:blueprint[immersiveengineering:blueprint="tacz_bluearchivejp"]',
    'immersiveengineering:blueprint[immersiveengineering:blueprint="tacz_create_armorer"]',
    'immersiveengineering:blueprint[immersiveengineering:blueprint="tacz_immersive_armorer"]'
]

ServerEvents.recipes(event => {
    // 沉浸工程自动化生产弹药
    event.forEachRecipe({ type: "tacz:gun_smith_table_crafting" }, (recipe) => {
        if (String(recipe.json.get("result").get("type")).slice(1, -1) == "ammo") {
            let data = []
            let key = String(recipe.json.get("result").get("id")).slice(1, -1)
            recipe.json.get("materials").forEach((value) => {
                data.push({
                    "count": value.get("count") ?? 1,
                    "basePredicate": value.get("item")
                })
            })
            event.custom({
                type: "immersiveengineering:blueprint",
                category: key.startsWith("tacz:") ? "tacz" : "tacz_" + key.split(":")[0],
                result: Item.of(`tacz:ammo[custom_data={AmmoId:"${key}"}]`).toJson(),
                inputs: data
            }).id(`kjs/tacz/ammo/${key.replace(":", "/")}`)
        }
    })
    // 蓝图, 利用多态合成区分
    bluePrint.forEach(output => {
        event.shaped(output, [
            "GIC",
            "BBB",
            "PPP"
        ], {
            B: "minecraft:blue_dye",
            C: "minecraft:copper_ingot",
            G: "#c:gunpowders",
            I: "minecraft:iron_ingot",
            P: "#c:paper"
        }).id(`kjs:blueprint/${output.split('="')[1].replace('"]', "")}`)
    });
})
