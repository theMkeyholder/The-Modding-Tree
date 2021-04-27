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
        let mult = new Decimal(1)
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
        rows: 3,
        cols: 3,
        //collum 1
        11: {
            title: "Begin to Inflate",
            description: "Inflations boost their own gain",
            effect(){
                //return new Decimal(1.1).sqrt(player.points).times(upgradeEffect("z", 21)).plus(1)
                if (hasUpgrade("z", 21)) {
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
                if (player.z.points.greaterThan(0)){
                    if (hasUpgrade("z", 22))
                    return player.z.points.log(2).plus(10)
                    else {
                        return player.z.points.log(10).plus(10)
                    }
                }
                else{
                    return new Decimal(10)
                }
            },
            effectDisplay() {
                return `${format(upgradeEffect("z", 21))}x`
            },
            cost: new Decimal(10),
        },
        31: {
            title: "Spike",
            description: "Inflation gain is multiplied by 2x for each upgrade you have",
            effect(){
                if (hasUpgrade("z", 32))
                return new Decimal(player.z.upgrades.length) * 10
                else{
                    return new Decimal(player.z.upgrades.length) * 2
                }
            },
            effectDisplay() {
                return `${format(upgradeEffect("z", 31))}x`
            },
            cost: new Decimal(25),
        },
        //collum 2
        12: {
            title: "Continue Inflating",
            description: "Inflations boost their own gain massively",
            effect(){
                return new Decimal(0.2).sqrt(player.points).plus(1)
            },
            effectDisplay() {
                return `^${format(upgradeEffect("z", 12))}`
            },
            cost: new Decimal(50),
        },
        22: {
            title: "Speed Bump",
            description: "Inflating Speed's formula now uses log(2)",
            effectDisplay() {
                if (hasUpgrade("z", 22))
                return `Unlocked`
                else{
                    return 'Locked'
                }
            },
            cost: new Decimal(300),
        },
        32: {
            title: "Just a Small Boost",
            description: "Spike is now 10x for each Upgrade",
            effectDisplay() {
                if (hasUpgrade("z", 32))
                    return `Unlocked`
                else{
                    return 'Locked'
                }
            },
            cost: new Decimal(500),
        },
    }
})
