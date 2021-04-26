addLayer("z", {
    name: "Speed", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fc7b03",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "speed", // Name of prestige currency
    baseResource: "inflations", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "z", description: "Z: Reset your Inflations for Speed", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        rows: 2,
        cols: 2,
        11: {
            title: "Begin to Inflate",
            description: "Inflations boost their own gain",
            effect(){
                if (hasUpgrade("z", 21)){
                    return new Decimal(1.1).sqrt(player.points).times(upgradeEffect("z", 21)).plus(1)
                }
                else{
                    return new Decimal(1.1).sqrt(player.points).plus(1)
                }
            },
            effectDisplay() {
                return `${format(upgradeEffect("z", 11))}x`
            },
            cost: new Decimal(2),
        },
        21: {
            title: "Inflating Speed",
            description: "Begin effect is multiplied by your Speed amount",
            effect(){
                return player.z.points.times(0.1).plus(1)
            },
            effectDisplay() {
                return `${format(upgradeEffect("z", 21))}x`
            },
            cost: new Decimal(10),
        },
    }
})
