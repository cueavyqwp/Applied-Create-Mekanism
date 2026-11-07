BlockEvents.rightClicked(event => {
    let player = event.player
    let item = player.getMainHandItem()
    if (event.hand != "main_hand" || item.id != "mekanism:spark") {
        return
    }
    // 能量不足
    let info = item.get("mekanism:energy")
    if (info.get(0) < 250000000) {
        player.setStatusMessage(Component.translate("kubejs.msg.spark.low_on_energy").color("red"))
        return
    }
    // 挥手
    player.swing()
    // 闪电
    let entity = event.level.createEntity("minecraft:lightning_bolt")
    entity.setPos(event.block.pos)
    entity.spawn()
    // 创造模式下不扣能量
    if (!player.isCreative()) {
        item.set("mekanism:energy", info.create(0))
    }
    player.damageHeldItem("main_hand", 1)
    player.addItemCooldown(item, 10)
})