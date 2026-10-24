const bud = ["neoecoae:small_energized_crystal_bud", "neoecoae:medium_energized_crystal_bud", "neoecoae:large_energized_crystal_bud"]

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
        let mod = block.getMod()
        if (block == null) {
            return
        }
        blockCount++
        // 忽略带sable标签的
        let pass = false
        block.getTags().forEach(tag => {
            if (String(tag).includes("sable:")) {
                pass = true
            }
        })
        if (pass) {
            return
        }
        // MEK
        if (mod.startsWith("mekanism")) {
            // 线缆无质量
            if ((id.endsWith("_tube") || id.endsWith("_cable") || id.endsWith("_pipe") || id.endsWith("_transporter") || id.endsWith("_conductor"))) {
                event.add("sable:weightless", id)
            } else {
                event.add("sable:heavy", id)
            }
        }
    });
    console.log(`总记方块数: ${blockCount}`)
})
