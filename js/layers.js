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
        if (hasUpgrade("a", 12)) mult = mult.times(upgradeEffect("a", 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration(){return hasMilestone("a", 0)},
    autoUpgrade(){return hasMilestone("a", 1)},
    branches: ["a"],
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
                if (hasUpgrade("a", 13)){
                    return player.points.log(10).pow(5).plus(1)
                }
                if (hasUpgrade("z", 21)) {
                    return new Decimal(1.1).times(player.points.sqrt()).times(upgradeEffect("z", 21)).plus(1)
                }
                else{
                    return new Decimal(1.1).times(player.points.sqrt()).plus(1)
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
                if (hasUpgrade("a", 13)){
                    return new Decimal(1)
                }
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
                if (hasUpgrade("a", 13)){
                    return `DISABLED`
                }
                else{
                    return `${format(upgradeEffect("z", 21))}x`
                }
            },
            cost: new Decimal(10),
        },
        31: {
            title: "Spike",
            description: "Inflation gain is +2x for each upgrade bought",
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
        13: {
            title: "Continue Inflating",
            description: "Inflations boost their own gain massively",
            effect(){
                return new Decimal(0.2).sqrt(player.points).plus(1)
            },
            effectDisplay() {
                return `^${format(upgradeEffect("z", 13))}`
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
            description: "Spike is now +10x for each upgrade",
            effectDisplay() {
                if (hasUpgrade("z", 32))
                    return `Unlocked`
                else{
                    return 'Locked'
                }
            },
            cost: new Decimal(500),
        },
        //Middle
        12: {
            title: "True Inflation",
            description: "Inflation gain is multiplied by [Begin's Effect^Continue's Effect]",
            effect(){
                return upgradeEffect("z", 11).pow(upgradeEffect("z", 13))
            },
            effectDisplay() {
                return `${format(upgradeEffect("z", 12))}x`
            },
            cost: new Decimal(2000),
        },
    }
})
addLayer("a", {
    name: "Acceleration", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#fcba03",
    requires: new Decimal(1e4), // Can be a function that takes requirement increases into account
    resource: "Acceleration Energy", // Name of prestige currency
    baseResource: "speed", // Name of resource prestige is based on
    baseAmount() {return player.z.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset your Speed for Acceleration Energy", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    milestones: {
        0: {
            requirementDescription: "Now we're getting somewhere! | 5 Accel Energy",
            effectDescription() {
                return "You gain 100% of your Speed gained on reset every tick";
            },
            done() { return player.a.points.gte(5)}
        },
        1: {
            requirementDescription: "Progress | 50 Accel Energy",
            effectDescription() {
                return "You autobuy Speed upgrades";
            },
            done() { return player.a.points.gte(50)}
        },
        2: {
            requirementDescription: "Where is the Inflation? | 200 Accel Energy",
            effectDescription() {
                return "Unlock a new Acceleration Energy upgrade";
            },
            done() { return player.a.points.gte(200)}
        },
    },
    upgrades: {
        rows: 3,
        cols: 3,
        //collum 1
        11: {
            title: "Accelerating Inflation",
            description: "Acceleration Energy boosts Inflations gain",
            effect(){
                if (player.a.points.gt(0))
                    return player.a.points.log(3).pow(2).plus(3)
                else
                    return new Decimal(3)
            },
            effectDisplay(){
                return `${format(upgradeEffect("a", 11))}x`
            },
            cost: new Decimal(1),
        },
        12: {
            title: "Accelerating Speed",
            description: "Acceleration Energy boosts speed gain",
            effect(){
                return player.a.points.sqrt().times(1.1).plus(5)
            },
            effectDisplay() {
                return `${format(upgradeEffect("a", 12))}x`
            },
            cost: new Decimal(1),
        },
        13: {
            unlocked(){return hasMilestone("a", 2)},
            fullDisplay: "<h3>Begin Again</h3><br>Begin uses a much better formula BUT disable Inflating Speed (it's worth it)<br><br>Cost: 300 Acceleration Energy and 5e7 Speed",
            canAfford(){return (player.z.points.greaterThan(5e7) && player.a.points.greaterThan(299))},
            pay() {
                player.z.points = player.z.points.sub(5e7)
                player.a.points = player.a.points.sub(300)
            }
        },
    }
})
