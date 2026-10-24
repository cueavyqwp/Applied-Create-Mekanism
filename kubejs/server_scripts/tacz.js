let bluePrint = []

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
            let category = key.startsWith("tacz:") ? "tacz" : "tacz_" + key.split(":")[0]
            if (!bluePrint.includes(category)) {
                bluePrint.push(category)
            }
            event.custom({
                type: "immersiveengineering:blueprint",
                category: category,
                result: Item.of(`tacz:ammo[custom_data={AmmoId:"${key}"}]`).toJson(),
                inputs: data
            }).id(`kjs/tacz/ammo/${key.replace(":", "/")}`)
        }
    })
    // 蓝图, 利用多态合成区分
    bluePrint.forEach(output => {
        event.shaped(`immersiveengineering:blueprint[immersiveengineering:blueprint="${output}"]`, [
            "GIC",
            "BBB",
            "PPP"
        ], {
            B: "minecraft:blue_dye",
            C: "minecraft:copper_ingot",
            G: "#c:gunpowders",
            I: "minecraft:iron_ingot",
            P: "#c:paper"
        }).id(`kjs:blueprint/${output}`)
    });
})
