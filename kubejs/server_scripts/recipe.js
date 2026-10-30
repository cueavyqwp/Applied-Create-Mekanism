ServerEvents.recipes(event => {
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
    // 鞍
    event.shaped("minecraft:saddle", [
        " L ",
        "LIL"], {
        L: "minecraft:leather",
        I: "#c:ingots/iron"
    }).id("kjs/saddle")
    // 附魔金苹果
    event.shaped("minecraft:enchanted_golden_apple", [
        "GGG",
        "GAG",
        "GGG"
    ], {
        G: "minecraft:gold_block",
        A: "minecraft:golden_apple"
    }).id("kjs/enchanted_golden_apple")
    // 原木箱子
    event.shaped("4x minecraft:chest", [
        "LLL",
        "L L",
        "LLL"
    ], {
        L: "#minecraft:logs"
    }).id("kjs/chest")
    // 树皮锯锯末
    event.recipes.mekanismSawing("2x mekanism:sawdust", "4x farmersdelight:tree_bark").id("kjs/sawdust")
    // 量子缠绕态奇点复制
    event.shaped("2x ae2:quantum_entangled_singularity", [
        "ROR",
        "RSR",
        "RLR"
    ], {
        L: "ae2:quantum_link",
        O: "ae2:quantum_entangled_singularity",
        R: "ae2:quantum_ring",
        S: "ae2:singularity",
    }).id("kjs/quantum_entangled_singularity")
    // 更合理的吸管
    event.remove({ output: "createaddition:straw" })
    event.shaped("createaddition:straw", [
        "SS ",
        " S ",
        " S "
    ], {
        S: "mekanism:hdpe_sheet"
    }).id("kjs/straw")
    // 下界合金棒
    event.custom(
        {
            type: "createaddition:rolling",
            ingredients: [
                {
                    item: "minecraft:netherite_ingot"
                }
            ],
            results: [
                {
                    id: "immersiveengineering:stick_netherite",
                    count: 2
                }
            ]
        }
    ).id("kjs/stick_netherite")
    // 骨块出骨头
    event.custom(
        {
            type: "createaddition:rolling",
            ingredients: [
                {
                    item: "minecraft:bone_block"
                }
            ],
            results: [
                {
                    id: "minecraft:bone",
                    count: 3
                }
            ]
        }
    ).id("kjs/bone")
    // 创造模式物理手杖
    event.shaped("simulated:creative_physics_staff", [
        "TNT",
        "TWT",
        "AAA"
    ], {
        A: "mekanism:pellet_antimatter",
        N: "minecraft:nether_star",
        T: "mekanism:teleportation_core",
        W: "create:wrench"
    }).id("kjs/creative_physics_staff")
    // 腐肉烧皮革
    event.smelting("minecraft:leather", "minecraft:rotten_flesh", 0, 40).id("kjs/leather")
    // 绀珠之药(无法破坏)
    event.shaped("touhou_little_maid:ultramarine_orb_elixir[unbreakable={}]", [
        "UGU",
        "GUG",
        "UGU"
    ], {
        G: "minecraft:enchanted_golden_apple",
        U: "touhou_little_maid:ultramarine_orb_elixir",
    }).id("kjs/ultramarine_orb_elixir")
    // MEK 压板
    event.forEachRecipe({ type: "create:pressing" }, (recipe) => {
        let data = recipe.json
        let result = data.get("results").get(0).get("id")
        if (result && Item.of(result).hasTag("c:plates")) {
            event.recipes.mekanism.compressing(result, data.get("ingredients").get(0), "60x mekanism:hydrogen").id(`kjs/pressing/${String(result).split(":")[1].slice(1, -1)}`)
        }
    })
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
