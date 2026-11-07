const MekanismItems = Java.loadClass("mekanism.common.registries.MekanismItems")
const ItemEnergized = Java.loadClass("mekanism.common.item.ItemEnergized")
const ContainerType = Java.loadClass("mekanism.common.attachments.containers.ContainerType")
const EnergyContainerBuilder = Java.loadClass("mekanism.common.attachments.containers.energy.EnergyContainersBuilder")

// 火花
// 为了实现,在 GitHub 翻了几个小时的源码
// https://github.com/mekanism/Mekanism/blob/1.21.x/src/main/java/mekanism/common/registries/MekanismItems.java#L94
// addBasic 前一个是速率,后一个是容量
MekanismItems.ITEMS.registerItem("spark", properties => ItemEnergized(properties.durability(16))).addAttachedContainerCapabilities(ContainerType.ENERGY, () => EnergyContainerBuilder.builder().addBasic(() => 1000000, () => 250000000).build())
// 部分用KubeJS来修改
ItemEvents.modification(event => {
    event.modify("mekanism:spark", item => {
        item.maxStackSize = 1
        item.rarity = "rare"
        item.glow(true)
    })
})
