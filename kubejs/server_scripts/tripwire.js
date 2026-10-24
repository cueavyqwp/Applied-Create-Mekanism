BlockEvents.rightClicked("minecraft:tripwire", event => {
    let block = event.block
    let state = block.getBlockState()
    let properties = {}
    // 只处理主手剪刀
    if (event.hand != "main_hand" || event.player.getMainHandItem().id != "minecraft:shears") {
        return
    }
    state.properties.forEach(property => {
        properties[property.getName()] = state.getValue(property)
    })
    properties["disarmed"] = !properties["disarmed"]
    block.set(block.id, properties)
    event.player.tell(`disarmed: ${properties["disarmed"]}`)
})