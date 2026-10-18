// Controlify
const ControlifyApi = Java.loadClass("dev.isxander.controlify.api.ControlifyApi")
const RumbleSource = Java.loadClass("dev.isxander.controlify.rumble.RumbleSource")
const RumbleState = Java.loadClass("dev.isxander.controlify.rumble.RumbleState")
const BasicRumbleEffect = Java.loadClass("dev.isxander.controlify.rumble.BasicRumbleEffect")

// TaCZ
const ShootKey = Java.loadClass("com.tacz.guns.client.input.ShootKey")
const MeleeKey = Java.loadClass("com.tacz.guns.client.input.MeleeKey")
const CrawlKey = Java.loadClass("com.tacz.guns.client.input.CrawlKey")
const ReloadKey = Java.loadClass("com.tacz.guns.client.input.ReloadKey")
const InspectKey = Java.loadClass("com.tacz.guns.client.input.InspectKey")
const FireSelectKey = Java.loadClass("com.tacz.guns.client.input.FireSelectKey")

// 近战武器列表(GunId)
const meleeWeapons = ["create_armorer:special_melee_wrench"]

// strong & weak: 强度(浮点数 [0,1] ) ; ticks: 持续刻数(整形)
function playRumble(strong, weak, ticks) {
    ControlifyApi.get().playRumbleEffect(
        RumbleSource.PLAYER,
        BasicRumbleEffect.constant(strong, weak, ticks)
    )
}

function isMelee(item) {
    return meleeWeapons.includes(String(item.toJson().get("components").get("minecraft:custom_data").get("GunId")).slice(1, -1))
}

let cooldown = 0
ClientEvents.tick(event => {
    let player = event.player
    // TaCZ适配
    cooldown += cooldown >= 200 ? 0 : 1
    let item = player.getMainHandItem()
    if (item.id != "tacz:modern_kinetic_gun") {
        return
    }
    // 换弹振动
    if (player.getSynReloadState().getCountDown() > 0) {
        playRumble(0.1, 0.1, 1)
    }
    // 调用现有的对另一个手柄模组的适配
    // 近战
    if (isMelee(item) && ShootKey.SHOOT_KEY.isDown()) {
        MeleeKey.onMeleeControllerPress(true)
    }
    // 换弹
    if (ReloadKey.RELOAD_KEY.isDown()) {
        ReloadKey.onReloadControllerPress(true)
    }
    // 检视
    if (InspectKey.INSPECT_KEY.isDown()) {
        InspectKey.onInspectControllerPress(true)
    }
    // 模式
    if (FireSelectKey.FIRE_SELECT_KEY.isDown()) {
        if (cooldown > 10) {
            FireSelectKey.onFireSelectControllerPress(true)
            cooldown = 0
        }
    }
    // 爬行
    if (CrawlKey.CRAWL_KEY.isDown()) {
        CrawlKey.onCrawlControllerPress(!player.isCrawl())
    }
})

TimelessGunEvents.gunMelee(event => {
    playRumble(1, 0.8, 5)
})

TimelessGunEvents.gunReload(event => {
    if (isMelee(event.getGunItemStack())) {
        // 近战武器不换弹
        MeleeKey.onMeleeControllerPress(true)
        return
    }
    // 刚触发换弹时
    playRumble(1, 1, 2)
})

TimelessGunEvents.gunFire(event => {
    // 近战武器不应触发开火
    if (isMelee(event.getGunItemStack())) {
        MeleeKey.onMeleeControllerPress(true)
        return
    }
    // 换弹时触发的开火不应触发振动
    if (event.getShooter().getSynReloadState().getCountDown() != -1) {
        return
    }
    playRumble(1, 1, 3)
})
