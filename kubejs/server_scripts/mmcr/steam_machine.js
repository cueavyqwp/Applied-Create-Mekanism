MMCREvents.server(event => {
    const api = event.getAPI()
    const structure = event.createStructure("kubejs:steam_machine")
        .pattern("XXX", "XAX", "XAX", "XAX", "XXX")
        .pattern("XXX", "ABA", "ADA", "AEA", "XFX")
        .pattern("XCX", "XAX", "XAX", "XAX", "XXX")
        .set('X', api.anyOf(
            api.block('create:andesite_casing'),
            api.anyOfChemicalPorts()
        ))
        .set('A', api.block('mekanism:structural_glass'))
        .set('B', api.state('create:fluid_tank[bottom=true,shape=window,top=false]'))
        .set('D', api.state('create:fluid_tank[bottom=false,shape=window,top=true]'))
        .set('E', api.state('create:encased_fan[facing=down]'))
        .set('F', api.state('mmcr:create_stress_output_interface[axis=y,waterlogged=false]'))
        .controller('C')
        .build()
})