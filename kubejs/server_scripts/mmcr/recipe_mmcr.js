ServerEvents.recipes(event => {
    // 虚拟龙场
    event.shaped("mmcr:virtual_dragon_space_controller", [
        "CNC",
        "SBS",
        "CGC"
    ], {
        B: "draconicevolution:awakened_draconium_block",
        C: "draconicevolution:awakened_core",
        G: "draconicevolution:grinder",
        N: "#c:nether_stars",
        S: "ae2:singularity"
    }).id("kjs/virtual_dragon_space_controller")
    event.custom({
        type: "mmcr:machine_recipe",
        recipe_pool: "kubejs:virtual_dragon_space",
        tick_time: 200,
        requirements: [
            { type: "minecraft:item", io: "input", item: { item: "minecraft:dragon_egg" }, count: 1 },
            { type: "minecraft:item", io: "input", item: { item: "minecraft:end_crystal" }, count: 4 },
            { type: "neoforge:energy", io: "input", fe_per_tick: 2000000 },
            { type: "minecraft:item", io: "output", stack: { id: "draconicevolution:dragon_heart", count: 1 } }
        ]
    }).id("kjs/mmcr/dragon_heart")
    // 蒸汽机
    event.shaped("mmcr:steam_machine_controller", [
        "ATA",
        "CGC",
        "ATA"
    ], {
        A: "create:andesite_casing",
        C: "create:copper_casing",
        G: "create:gearbox",
        T: "create:fluid_tank"
    }).id("kjs/steam_machine_controller")
    event.custom({
        type: "mmcr:machine_recipe",
        recipe_pool: "kubejs:steam_machine",
        tick_time: 2,
        requirements: [
            { type: "mekanism:chemical", io: "input", id: "mekanism:steam", amount: 2000 },
            { type: "create:stress", io: "output", rpm: 128, stress: 256 }
        ]
    }).id("kjs/mmcr/steam_to_stress")
})