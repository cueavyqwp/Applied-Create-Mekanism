ServerEvents.recipes(event => {
    // 移除原有配方
    event.remove({ mod: "createoreexcavation" })
    event.remove({ output: "createoreexcavation:netherite_drill" })
})
