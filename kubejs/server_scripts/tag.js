const bud = ["neoecoae:small_energized_crystal_bud", "neoecoae:medium_energized_crystal_bud", "neoecoae:large_energized_crystal_bud"]

const ignore = ["minecraft", "aeronautics"]

ServerEvents.tags("item", event => {
    // 恩特罗簇 添加群落物品标签
    event.add("c:clusters", "extendedae:entro_cluster")
    // 移除盈能水晶芽的clusters标签
    bud.forEach(item => {
        event.remove("c:clusters", item)
    })
})

ServerEvents.tags("block", event => {
    // 恩特罗簇 添加群落方块标签
    event.add("c:clusters", "extendedae:entro_cluster")
    // 移除盈能水晶芽的clusters标签
    bud.forEach(block => {
        event.remove("c:clusters", block)
    })
    // Sable自定义方块质量
    let blockCount = 0
    Ingredient.of("*").itemIds.forEach(id => {
        let block = Block.getBlock(id)
        if (block == null) {
            return
        }
        blockCount++
        // 忽略部分模组
        if (ignore.includes(block.getMod())) {
            return
        }
    });
    console.log(`总记方块数: ${blockCount}`)
})
