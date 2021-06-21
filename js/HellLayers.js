addLayer("p", {
    name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#ffffff",
    requires() {
        return new Decimal(1e9696)
    }, // Can be a function that takes requirement increases into account
    resource: "Prestige Points", // Name of prestige currency
    exponent(){
        return new Decimal(0.3)
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect(){
        return new Decimal(player.p.points.plus(1).log(10).plus(1))
    },
    effectDescription(){
        return `multiplying Fire gain by ${format(tmp.p.effect)}`
    },
    branches: ["sp"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return hasUpgrade("vg", 21) || new Decimal(player.sp.points).gte(1) || player.up.points.gte(1) || hasUpgrade("sp", 11)
    },
    update(diff){
        let gain = new Decimal(0)
        if (hasUpgrade("p", 11)){
            if (hasUpgrade("p", 11)) gain = gain.plus(0.1)
            if (hasUpgrade("p", 12)) gain = gain.times(upgradeEffect("p", 12))
            if (hasUpgrade("p", 13)) gain = gain.times(upgradeEffect("p", 13))
            if (hasUpgrade("p", 14)) gain = gain.times(upgradeEffect("p", 14))
            if (hasUpgrade("p", 15)) gain = gain.times(upgradeEffect("p", 15))
            if (getBuyableAmount("p", 11).gte(1)) gain = gain.times((getBuyableAmount("p", 11)).times(2))
            if (player.sp.points.gte(1)) gain = gain.times(tmp.sp.effect)
            if (hasUpgrade("sp", 11)) gain = gain.times(upgradeEffect("sp", 11))
            if (hasUpgrade("sp", 12)) gain = gain.times(upgradeEffect("sp", 12))
        }
        player.p.points = player.p.points.plus(gain)
    },
    buyables: {
        11: {
            unlocked(){
                return hasUpgrade("p", 15) && !hasUpgrade("sp", 12)
            },
            cost() {return new Decimal(300000)},
            display() {return `<h3>PRESTIGE</h3><br>Reset your Prestige Points for a boost (capped at 50x)<br><h2>Currently: ${getBuyableAmount("p", 11).times(2)}x</h2><br>Requires 300,000 Prestige Points`},
            canAfford() {
                if (!getBuyableAmount("p", 11).gte(25))
                    return player.p.points.gte(this.cost())
                else
                    return false
            },
            buy() {
                player.p.points = player.p.points.sub(player.p.points)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            title: "Welcome",
            description: "Welcome to hell. Generate 1 Prestige Point every second",
            cost: 0
        },
        12: {
            title: "Timewall Gaming",
            description: "Multiply Prestige Point gain based on Prestige points",
            effect(){
                return new Decimal(player.p.points.plus(1).log(5).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("p", 12))}x`
            },
            cost: 30
        },
        13: {
            title: "Timewall Gaming^2",
            description: "Multiply Prestige Point gain based on Prestige points again",
            effect(){
                return new Decimal(player.p.points.plus(1).log(5).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("p", 13))}x`
            },
            cost: 300
        },
        14: {
            title: "Odd.",
            description: "Multiply Prestige Point gain based on Oddities",
            effect(){
                return new Decimal(player.o.points.plus(1).log(10).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("p", 14))}x`
            },
            cost: 1000
        },
        15: {
            title: "Points when",
            description: "Multiply Prestige Point gain based on Fire and unlock a Buyable",
            effect(){
                return new Decimal(player.points).plus(1).log(100).plus(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("p", 15))}x`
            },
            cost: 2500
        },
    },
})
addLayer("sp", {
    name: "Super Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#8a8a8a",
    requires() {
        return new Decimal(5e7)
    }, // Can be a function that takes requirement increases into account
    resource: "Super Prestige Points", // Name of prestige currency
    baseResource: "Prestige Points", // Name of resource prestige is based on
    resetDescription: "Reset for ",
    baseAmount() {
        return player.p.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
        return new Decimal(0.3)
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect(){
        return new Decimal(player.sp.points).plus(1).sqrt().plus(1)
    },
    effectDescription(){
        return `multiplying Prestige Point gain by ${format(tmp.sp.effect)}`
    },
    branches: ["up"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "s", description: "s: Reset your Prestige Points for Super Prestige Points ", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown() {
        return hasUpgrade("vg", 21) || player.sp.points.gte(1) || player.up.points.gte(1) || hasUpgrade("sp", 11)
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            title: "Hell 2: Pain Boogaloo",
            description: "Multiply Prestige Points gain by Prestige Points",
            effect(){
                return new Decimal(player.p.points.plus(1).log(10).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("sp", 11))}x`
            },
            cost: 1
        },
        12: {
            unlocked() {
                return hasUpgrade("sp", 11);
            },
            title: "Un-Prestiged",
            description: "Multiply Prestige Points gain by 50 but disable the Prestige Points Buyable",
            effect(){
                return new Decimal(50)
            },
            cost: 1
        },
    },
})
addLayer("up", {
    name: "Ultra Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#4e4e4e",
    requires() {
        return new Decimal(1e35)
    }, // Can be a function that takes requirement increases into account
    resource: "Ultra Prestige Points", // Name of prestige currency
    baseResource: "Super Prestige Points", // Name of resource prestige is based on
    resetDescription: "Reset for ",
    baseAmount() {
        return player.sp.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
        return new Decimal(0.3)
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect(){
        return new Decimal(1)
    },
    effectDescription(){
        return `subtracting the second Awakened Atom requirement by ${format(tmp.p.effect)}`
    },
    branches: [""],
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "u", description: "u: Reset your Super Prestige Points for Ultra Prestige Points ", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown() {
        return hasUpgrade("vg", 21) || player.sp.points.gte(1) || player.up.points.gte(1) || hasUpgrade("sp", 11)
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            title: "WIP",
            description: ".",
            effect(){
                return new Decimal(9)
            },
            cost: 1
        },
    },
})