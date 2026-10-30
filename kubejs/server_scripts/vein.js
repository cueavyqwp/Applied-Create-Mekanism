const veinData = [{
    "output": [
        "minecraft:coal_ore", "minecraft:copper_ore", "create:zinc_ore"
    ],
    "biome": "minecraft:is_overworld",
    "stress": 256,
    "avg": 128,
    "min": 8,
    "tick": 400,
    "fluid": null,
    "drill": null
},
{
    "output": [
        "minecraft:iron_ore", "minecraft:redstone_ore", "minecraft:lapis_ore", "mekanism:osmium_ore", "mekanism:lead_ore", "mekanism:tin_ore", "immersiveengineering:ore_silver", "immersiveengineering:ore_aluminum", "immersiveengineering:ore_nickel"
    ],
    "biome": "minecraft:is_overworld",
    "stress": 256,
    "avg": 128,
    "min": 16,
    "tick": 600,
    "fluid": Fluid.of("minecraft:water", 200),
    "drill": "createoreexcavation:drill"
},
{
    "output": [
        "minecraft:nether_quartz_ore", "minecraft:glowstone"
    ],
    "biome": "minecraft:is_nether",
    "stress": 256,
    "avg": 128,
    "min": 16,
    "tick": 600,
    "fluid": Fluid.of("minecraft:lava", 200),
    "drill": "createoreexcavation:drill"
},
{
    "output": [
        "minecraft:gold_ore", "mekanism:uranium_ore", "mekanism:fluorite_ore", "draconicevolution:overworld_draconium_ore", "createpropulsion:platinum_ore"
    ],
    "biome": "minecraft:is_overworld",
    "stress": 256,
    "avg": 128,
    "min": 16,
    "tick": 800,
    "fluid": Fluid.of("kubejs:chemical/redstone", 160),
    "drill": "createoreexcavation:diamond_drill"
},
{
    "output": [
        "minecraft:nether_gold_ore", "draconicevolution:nether_draconium_ore"
    ],
    "biome": "minecraft:is_nether",
    "stress": 256,
    "avg": 128,
    "min": 16,
    "tick": 800,
    "fluid": Fluid.of("kubejs:chemical/redstone", 160),
    "drill": "createoreexcavation:diamond_drill"
},
{
    "output": [
        "draconicevolution:end_draconium_ore", "neoecoae:aluminum_ore", "neoecoae:tungsten_ore"
    ],
    "biome": "minecraft:is_end",
    "stress": 256,
    "avg": 128,
    "min": 16,
    "tick": 800,
    "fluid": Fluid.of("kubejs:chemical/redstone", 160),
    "drill": "createoreexcavation:diamond_drill"
},
{
    "output": [
        "minecraft:diamond_ore", "minecraft:emerald_ore"
    ],
    "biome": "minecraft:is_overworld",
    "stress": 256,
    "avg": 128,
    "min": 32,
    "tick": 1000,
    "fluid": Fluid.of("kubejs:chemical/gold", 320),
    "drill": "createoreexcavation:netherite_drill"
},
{
    "output": [
        "mekanism_extras:naquadah_ore"
    ],
    "biome": "minecraft:is_overworld",
    "stress": 512,
    "avg": 256,
    "min": 32,
    "tick": 1600,
    "fluid": Fluid.of("kubejs:chemical/refined_obsidian", 320),
    "drill": "createoreexcavation:netherite_drill"
},
{
    "output": [
        "mekanism_extras:end_naquadah_ore"
    ],
    "biome": "minecraft:is_end",
    "stress": 512,
    "avg": 256,
    "min": 32,
    "tick": 1600,
    "fluid": Fluid.of("kubejs:chemical/refined_obsidian", 320),
    "drill": "createoreexcavation:netherite_drill"
},
{
    "output": [
        "minecraft:ancient_debris"
    ],
    "biome": "minecraft:is_nether",
    "stress": 512,
    "avg": 256,
    "min": 32,
    "tick": 3200,
    "fluid": Fluid.of("kubejs:chemical/refined_obsidian", 320),
    "drill": "createoreexcavation:netherite_drill"
}
]

ServerEvents.recipes(event => {
    // 移除原有配方
    event.remove({ mod: "createoreexcavation" })
    event.remove({ output: "createoreexcavation:netherite_drill" })
    let seed = 0
    veinData.forEach(data => {
        data["output"].forEach(output => {
            seed += 4
            let veinID = `kubejs:vein/${output.split(":")[1]}`
            event.recipes.createoreexcavation.vein(`{ "translate": "block.${output.replace(':', '.')}", "color": "aqua" }`, output).placement(data["avg"], data["min"], seed).alwaysInfinite().biomeWhitelist(data["biome"]).id(veinID)
            let obj = event.recipes.createoreexcavation.drilling(output, veinID, data["tick"]).stress(data["stress"]).id(`kjs/drilling/${output.split(":")[1]}`)
            if (data["drill"] != null) {
                obj = obj.drill(data["drill"])
            }
            if (data["fluid"] != null) {
                obj = obj.fluid(data["fluid"])
            }
        })
    })
    // 魔改配方
    event.shapeless("createoreexcavation:vein_atlas", ["minecraft:book", "#c:raw_materials"]).id("kjs/vein_atlas")
    event.shaped("createoreexcavation:vein_finder", [
        "EC ",
        "RS ",
        "  S"
    ], {
        C: "minecraft:amethyst_shard",
        E: "minecraft:ender_eye",
        R: "#c:raw_materials",
        S: "#c:rods/wooden"
    }
    ).id("kjs/vein_finder")
    event.shaped("createoreexcavation:sample_drill", [
        "PTP",
        "PMP",
        "SDS"], {
        D: "createoreexcavation:drill",
        M: "create:precision_mechanism",
        P: "#c:plates/brass",
        T: "create:electron_tube",
        S: "create:sturdy_sheet"
    }
    ).id("kjs/sample_drill")
    event.shaped("createoreexcavation:drilling_machine", [
        "SNS",
        "BEC",
        "SDS"], {
        B: "create:brass_casing",
        C: "create:copper_casing",
        D: "createoreexcavation:drill",
        E: "mekanism:digital_miner",
        N: "minecraft:nether_star",
        S: "ae2:singularity"
    }
    ).id("kjs/drilling_machine")
    event.shaped("createoreexcavation:drill", [
        "IAI",
        "IDI",
        "MIM"
    ], {
        A: "mekanism:alloy_infused",
        D: "create:mechanical_drill",
        I: "minecraft:iron_block",
        M: "create:andesite_alloy"
    }).id("kjs/drill")
    event.shaped("createoreexcavation:diamond_drill", [
        "BAB",
        "BSB",
        "ADA"
    ], {
        A: "mekanism:alloy_reinforced",
        B: "minecraft:diamond_block",
        D: "create:mechanical_drill",
        S: "createoreexcavation:drill"
    }).id("kjs/diamond_drill")
    event.shaped("createoreexcavation:netherite_drill", [
        "ABA",
        "ASA",
        "ADA"
    ], {
        A: "mekanism:alloy_atomic",
        B: "minecraft:netherite_block",
        D: "create:mechanical_drill",
        S: "createoreexcavation:diamond_drill"
    }).id("kjs/netherite_drill")
})
