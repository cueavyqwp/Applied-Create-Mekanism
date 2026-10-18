ServerEvents.recipes(event => {
    // 鞍
    event.shaped("minecraft:saddle", [" L ", "LIL"], { L: "minecraft:leather", I: "#c:ingots/iron" }).id("kjs/saddle")
    // 半砖合整砖
    Ingredient.of("#minecraft:slabs").stacks.forEach(stack => {
        let id = stack.getId()
        if (id.startsWith("create:")) {
            return
        }
        event.findRecipes(id).forEach(recipe => {
            let obj = recipe.json.get("pattern")
            if (obj == null) {
                return
            }
            let text = obj.getAsJsonArray().get(0).getAsString()
            if (text != null && text.length() == 3 && text == text.slice(0, 1).repeat(3)) {
                obj = recipe.json.get("key").getAsJsonObject().get(text.slice(0, 1))
                let out = []
                if (obj.isJsonArray()) {
                    out = obj.getAsJsonArray()
                } else {
                    out.push(obj.getAsJsonObject())
                }
                out.forEach(item => {
                    let out = item.get("item").getAsString()
                    event.shapeless(out, `2x ${id}`).id(`kjs/slab2block/${out.split(":")[1]}`)
                })
            }
        }
        )
    })
    // 紫水晶
    event.shapeless("4x minecraft:amethyst_shard", ["minecraft:amethyst_block"]).id("kjs/amethyst")
    // 红色染料
    event.shapeless("minecraft:red_dye", ["minecraft:redstone"]).id("kjs/red_dye")
    // 附魔金苹果
    event.shaped("minecraft:enchanted_golden_apple", ["GGG", "GAG", "GGG"], { G: "minecraft:gold_block", A: "minecraft:golden_apple" }).id("kjs/enchanted_golden_apple")
    // 原木箱子
    event.shaped("4x minecraft:chest", ["LLL", "L L", "LLL"], { L: "#minecraft:logs" }).id("kjs/chest")
    // 树皮锯锯末
    event.recipes.mekanismSawing("2x mekanism:sawdust", "4x farmersdelight:tree_bark").id("kjs/sawdust")
    // 量子缠绕态奇点复制
    // 尾缀`_manual_only`防止生成自动搅拌配方
    event.shapeless("2x ae2:quantum_entangled_singularity", ["ae2:singularity", "ae2:quantum_entangled_singularity"]).id("kjs/quantum_entangled_singularity_manual_only")
})

ItemEvents.crafted(event => {
    if (event.item == "ae2:quantum_entangled_singularity") {
        // 原本的奇点
        let original
        let inventory = event.getInventory()
        // 使用for循环而非直接getItems以兼容AE2合成终端
        for (let i = 0; i < inventory.getSlots(); i++) {
            let item = inventory.getItem(i)
            if (item.id == "ae2:quantum_entangled_singularity") {
                original = item
                break
            }
        }
        // 让合成得到的量子缠绕态奇点继承原奇点的ID
        if (original && original.toJson().has("components")) {
            event.item.components = original.components
        }
    }
})
