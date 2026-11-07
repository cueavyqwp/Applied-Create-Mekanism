ServerEvents.recipes(event => {
    // 部分无效配方删除
    event.remove({ id: "createfood:minecraft/crafting/ube_cake_batter_bucket_from_crafting" })
    event.remove({ id: "createfood:minecraft/crafting/ube_cream_frosting_bucket_from_crafting_alt" })
    event.remove({ mod: "sequenced_pattern_provider", type: "create:sequenced_assembly" })
    // 部分无尽贪婪的联动
    event.remove({ id: "avaritia:mek_creative_bin" })
    event.remove({ id: "avaritia:mek_creative_fluid_tank" })
    event.remove({ id: "avaritia:mek_creative_chemical_tank" })
    event.remove({ id: "avaritia:de_creative_op_capacitor" })
    event.remove({ id: "avaritia:eio_creative_power" })
    event.remove({ id: "avaritia:ae2_creative_energy_cell" })
})