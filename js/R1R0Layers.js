addLayer("i", {
    name: "Inversions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#00a206",
    requires(){
        return new Decimal(1)
    }, // Can be a function that takes requirement increases into account
    resource: "Inversions", // Name of prestige currency
    baseResource: "Fire", // Name of resource prestige is based on
    baseAmount() {
        return player.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: [],
    row: 0, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(1) },
    layerShown() {
        return temp.i.isActive
    },
    update(diff){
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            title: "a",
            description: "a",
            cost: 1
        },
    },
})