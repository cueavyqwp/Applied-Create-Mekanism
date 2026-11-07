MMCREvents.startup(event => {
    // 虚拟龙场
    const VirtualDragonSpace = event.createMachine("kubejs:virtual_dragon_space")
        .recipePool("kubejs:virtual_dragon_space")
        .appearance("mmcr:base_casing")
        .allowVerticalFacing()
        .fullyRotationallySymmetric()
    VirtualDragonSpace.register()
    // 蒸汽机
    const SteamMachine = event.createMachine("kubejs:steam_machine")
        .recipePool("kubejs:steam_machine")
        .appearance("create:andesite_casing")
        .allowVerticalFacing()
        .fullyRotationallySymmetric()
    SteamMachine.register()
})