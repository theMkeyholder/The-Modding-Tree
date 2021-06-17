addLayer("n", {
    name: "NXF", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "NXF", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#ff0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Extra Flame", // Name of prestige currency
    baseResource: "Fire", // Name of resource prestige is based on
    baseAmount() {
        return player.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration(){
        if (!inChallenge("a", 11)) {
            if (!hasUpgrade("g", 21))
                return hasMilestone("g",0) && (!hasUpgrade("g", 21))
            else
                return hasMilestone("v", 0)
        }
    },
    autoUpgrade(){
        if (!inChallenge("a", 11)){
            return hasMilestone("v", 0)
        }
    },
    branches: ["g", "v", "a", "o"],
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "n", description: "n: Reset your Fire for Extra Flame ", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown() {
        return true
    },
    upgrades: {
        rows: 4,
        cols: 3,
        11: {
            title: "Flame",
            description: "Generate +2 Fire for every NXF upgrade",
            effect(){
                return new Decimal(player.n.upgrades.length).times(2).plus(1)
            },
            effectDisplay() {
                return `+${format(upgradeEffect("n", 11))}`;
            },
            cost: 1
        },
        12: {
            title: "Flamemaster",
            description: "Is this a FlamemasterNXF game without inflation early on? Fire Multiplies Fire gain!",
            effect(){
                if (player.points.gte(1)){
                    if (hasUpgrade("n", 13))
                    return new Decimal(player.points.sqrt().sqrt().log(2).plus(1))
                    else
                        return new Decimal(player.points.sqrt().sqrt().log(10).plus(1))
                }
                else
                    return new Decimal(1)
            },
            effectDisplay() {
                return `${format(upgradeEffect("n", 12))}x`;
            },
            cost: 10
        },
        13: {
            title: "FlamemasterNXF",
            description: "The previous upgrade is horrible! Change the log(10) to a log(2) in it's formula",
            cost: 20
        },
        21: {
            title: "FLAMEMASTER999",
            description: "9 is a cool number. Multiply your Fire gain by 9",
            effect(){
                if (hasUpgrade("n", 33)){
                    return new Decimal(1)
                }
                if (hasUpgrade("n", 23))
                    return new Decimal(99)
                else
                    return new Decimal(9)
            },
            cost: 21
        },
        22: {
            title: "FLAMEMASTER444",
            description: "9 is still a cool number! Multiply your Fire gain by 9 *before all other effects*",
            effect(){
                if (hasUpgrade("n", 33)){
                    return new Decimal(1)
                }
                if (hasUpgrade("n", 23))
                    return new Decimal(99)
                else
                    return new Decimal(9)
            },
            cost: 121
        },
        23: {
            title: "FLAMEMASTER9000",
            description: "Why did I keep changing the numbers in my name? No clue! Both of the previous upgrades now multiply by 99 instead",
            cost: 169
        },
        31: {
            title: "Burning Flame",
            description: "Upgrades without a formula are boring. Multiply Fire gain by a formula that is good!",
            effect(){
                if (hasUpgrade("n", 32))
                    return new Decimal(1)
                if (player.points.gte(1) && hasUpgrade("n", 11))
                return new Decimal(player.points.log(100).plus(1))
                else
                    return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("n", 31))}x`;
            },
            cost: 960
        },
        32: {
            title: "Flamemaster96",
            description: "96 best number. Raise Fire gain to... a power that is calculated based off a complex formula! But disable Burning Flame, its gonna inflate :(",
            effect(){
                if (player.points.gte(1) && hasUpgrade("n", 11)){
                    if (hasUpgrade("n", 33)){
                        return new Decimal(player.points.sqrt().log(90).plus(1))
                    }
                    else
                        return new Decimal(player.points.sqrt().log(9e6).plus(1))
                }
                else
                    return new Decimal(1)
            },
            effectDisplay(){
                return `^${format(upgradeEffect("n", 32))}`;
            },
            cost: 1.0096e4
        },
        33: {
            title: "I ran out of names",
            description: "Wow that last Upgrade really made progress take off! Disable all row 2 upgrades, but Flamemaster96 has a much better formula [log(9e6) => log(90)]",
            cost() {
                if (!inChallenge("a", 12))
                    return new Decimal(9.6e4)
                else
                    return new Decimal(15000)
            }
        },
        42: {
            unlocked(){return hasUpgrade("n", 33)},
            title: "Lol the previous upgrade is a obvious nerf to prevent inflation!! (trolled!)",
            description: "Unlock a new layer because this one is boring now",
            cost: 1
        },
    }
})
addLayer("g", {
    name: "gwa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "gwa", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    image: "https://cdn.discordapp.com/emojis/844745243592884264.png?v=1",
    color: "#ffffff",
    requires: new Decimal(1e4), // Can be a function that takes requirement increases into account
    resource: "gwa", // Name of prestige currency
    baseResource: "Extra Flame", // Name of resource prestige is based on
    baseAmount() {
        return player.n.points
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    resetDescription: "[requires final nxf upgrade] reset for ",
    branches: [],
    unlocked() {
        return hasUpgrade("n", 42) || player.g.points.gte(1) || hasUpgrade("g", 11);
    },
    canReset() {
        return hasUpgrade("n", 42) && player.n.points.gte(tmp.g.nextAt);
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "g", description: "g: reset your extra flame for gwa", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown() {
        return (!hasUpgrade("g", 21))
    },
    milestones: {
        0: {
            requirementDescription: "1 gwa",
            effectDescription: "gain 100% of extra flame every second",
            done() { return player.g.points.gte(1) }
        },
    },
    upgrades: {
        rows: 3,
        cols: 3,
        11: {
            title: "g",
            description: "what is this thing??? it seems to boost your fire production based on your extra flame?",
            effect(){
                if (player.n.points.gte(1)){
                    if (hasUpgrade("g", 12))
                    return new Decimal(player.n.points.log(10).plus(1).times(upgradeEffect("g", 12)))
                    else
                        return new Decimal(player.n.points.log(10).plus(1))
                }
                else
                    return new Decimal(1)
            },
            effectDisplay() {
                return `${format(upgradeEffect("g", 11))}x`;
            },
            cost: 1
        },
        12: {
            title: "w",
            description: "it demands more. multiply the previous upgrade's effect by the log(100) of itself",
            effect(){
                if (player.n.points.gte(1))
                    return new Decimal(upgradeEffect("g", 11).log(100).plus(1))
                else
                    return new Decimal(1)
            },
            effectDisplay() {
                return `${format(upgradeEffect("g", 12))}x`;
            },
            cost: 1
        },
        13: {
            title: "a",
            description: "the gwa has awoken. multiply the previous upgrade's effect by the log(100) of itself",
            effect(){
                if (player.n.points.gte(1))
                    return new Decimal(upgradeEffect("g", 12).log(100).plus(1))
                else
                    return new Decimal(1)
            },
            effectDisplay() {
                return `${format(upgradeEffect("g", 13))}x`;
            },
            cost: 2
        },
        21: {
            unlocked() {
                return hasUpgrade("g", 13)
            },
            title: "gwa",
            description: "gwa.",
            cost: 1
        },
    }
})
addLayer("g2", {
    name: "gwa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "gwa", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    image: "https://cdn.discordapp.com/emojis/844745243592884264.png?v=1",
    color: "#ffffff",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "true gwa", // Name of prestige currency
    baseResource: "", // Name of resource prestige is based on
    baseAmount() {
        return new Decimal(0)
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    resetDescription: "Reset for ",
    branches: [],
    unlocked() {
        return hasUpgrade("n", 42) || player.g.points.gte(1) || hasUpgrade("g", 11);
    },
    canReset() {
        return false
    },
    row: 96, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return (hasUpgrade("g", 21))
    },
    upgrades: {
        rows: 3,
        cols: 3,
        11: {
            title: "the true gwa.",
            description: "unleash the true power of gwa.",
            cost: 1
        },
    }
})
addLayer("v", {
    name: "Void", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "V", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#9800cd",
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resetDescription: "[REQUIRES FINAL NXF UPGRADE] Reset for ",
    resource: "Void Shards", // Name of prestige currency
    baseResource: "Extra Flame", // Name of resource prestige is based on
    canReset() {
        return hasUpgrade("n", 42) && player.n.points.gte(10000);
    },
    baseAmount() {
        return player.n.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("as", 12)) mult = mult.times(upgradeEffect("as", 12))
        if (hasUpgrade("as", 14)) mult = mult.times(upgradeEffect("as", 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        return hasUpgrade("as", 11);
    },
    branches: ["a", "as"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "v", description: "v: Reset your Extra Flame for Void Shards ", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown() {
        return hasUpgrade("g", 21)
    },
    update(diff) {
        if (player.v.points.equals(0) && hasUpgrade("g", 21)){
            player.v.points = player.v.points.plus(1)
        }
    },
    milestones: {
        0: {
            requirementDescription: "1 Void Shard",
            effectDescription: "Gain 100% of Extra Flame every second and Autobuy Extra Flame Upgrades",
            done() { return player.v.points.gte(1) }
        },
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            unlocked(){
                return (!inChallenge("a", 12))
            },
            title: "...",
            description: "Multiply Fire gain by the log(10) of Fire",
            effect(){
                if (player.points.gte(1))
                return new Decimal(player.points.log(10).plus(1))
                else
                    return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("v", 11))}x`
            },
            cost: 2
        },
        12: {
            unlocked(){
                return (!inChallenge("a", 12))
            },
            title: "Endless.",
            description: "Multiply Fire gain by the log(2) of Fire",
            effect(){
                if (player.points.gte(1))
                return new Decimal(player.points.log(2).plus(1))
                else
                    return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("v", 12))}x`
            },
            cost: 20
        },
        13: {
            unlocked(){
                return (!inChallenge("a", 12))
            },
            title: "Void",
            description: "Multiply Fire gain by the slog of Fire raised to the 2nd Power",
            effect(){
                if (hasUpgrade("a", 11))
                    return new Decimal(1)
                else{
                    if (player.points.gte(1))
                        return new Decimal(player.points.slog().pow(2).plus(1))
                    else
                        return new Decimal(1)
                }
            },
            effectDisplay(){
                return `${format(upgradeEffect("v", 13))}x`
            },
            cost: 300
        },
        14: {
            unlocked(){
                return (!inChallenge("a", 12))
            },
            title: "Void II",
            description: "Multiply Fire gain by the slog of Fire raised to the 5th Power",
            effect(){
                if (hasUpgrade("a", 11))
                    return new Decimal(1)
                else{
                    if (player.points.gte(1))
                        return new Decimal(player.points.slog().pow(5).plus(1))
                    else
                        return new Decimal(1)
                }
            },
            effectDisplay(){
                return `${format(upgradeEffect("v", 14))}x`
            },
            cost: 1000
        },
    }
})
addLayer("a", {
    name: "Atoms", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#0074cd",
    requires() {
        if (hasUpgrade("as", 15))
            return new Decimal(1e37).div(upgradeEffect("as", 15))
        else
            return new Decimal(1e37)
    },
    // Can be a function that takes requirement increases into account
    resource: "Atoms", // Name of prestige currency
    baseResource: "Fire", // Name of resource prestige is based on
    resetDescription: "Reset for ",
    baseAmount() {
        return player.points
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base(){
        if (hasUpgrade("as", 15)){
            return 1e6
        }
        else{
            return 1e9696
        }
    },
    branches: [""],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "a", description: "a: Reset your Extra Flame for Atoms ", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown() {
        return hasUpgrade("g", 21)
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            title: "Atomic Destruction",
            description: "Annihilate Atoms, which deactivates Void and Void II, but unlock something new?",
            cost: 1
        },
        12: {
            unlocked(){
                return hasChallenge("a", 11)
            },
            title: "Atomic Shards",
            description: "Annihilate Annihilated Atoms, which unlocks 2 new Layers.",
            cost: 0
        },
        21: {
            unlocked(){
                return hasUpgrade("as", 15)
            },
            effect(){
                return new Decimal(9)
            },
            fullDisplay: "<h3>Atomic 9</h3><br>Multiply your Fire gain by 9<br><br>Requires: 1 Atom",
            canAfford(){return (player.a.points.gte(1))},
        },
        22: {
            unlocked(){
                return hasUpgrade("as", 15)
            },
            effect(){
                if (player.a.points.lessThan(11))
                    return new Decimal(player.a.points)
                else
                    return new Decimal(10)
            },
            fullDisplay: "<h3>Atomic Repetition</h3><br>Multiply your Fire Gain by your Atoms (capped at 10x)<br><br>Requires: 2 Atoms and 1 Oddity",
            canAfford(){return (player.a.points.gte(2) && player.o.points.gte(1))},
        },
        23: {
            unlocked(){
                return hasUpgrade("as", 15)
            },
            effect(){
                if (inChallenge("a", 12)){
                    return new Decimal(player.as.points.plus(1).sqrt())
                }
                else
                    return new Decimal(player.as.points.plus(1).log(10).sqrt())
            },
            fullDisplay() {
                return `<h3>Atomic Shattering</h3><br>Atomic Shards multiply your Fire gain<br><br>Requires: 5 Atoms and 100 Oddities<br>Currently: ${format(upgradeEffect("a", 23))}x`
            },
            canAfford(){return (player.a.points.gte(5) && player.o.points.gte(100))},
        },
        31: {
            unlocked(){
                return hasUpgrade("a", 23)
            },
            fullDisplay() {
                return `<h3>Atomic Awakening.</h3><br>Disable the last Atomic Shard Upgrade but unlock <h3>Atomic Awakening</h3>.<br><br>Requires: 7 Atoms and 9600 Oddities`
            },
            canAfford(){return (player.a.points.gte(7) && player.o.points.gte(9600))},
        },
    },
    challenges: {
        11: {
            unlocked(){return hasUpgrade("a", 11)},
            name: "Atomic Annihilation",
            challengeDescription: "Invert all Upgrade Effects, disable Upgrades that raise something to a power, the Void Milestone is disabled, each upgrade multiplies production by 2 (before all other effects), and reset EVERYTHING BEFORE ATOMS.",
            goalDescription: "At least 4 NXF Upgrades",
            rewardDescription: "...",
            canComplete: function() {return new Decimal(player.n.upgrades.length).gte(4)},
            onEnter() {
                player.points = player.points.sub(player.points)
                player.n.points = player.n.points.sub(player.n.points.sub(5))
                player.v.points = player.v.points.sub(player.v.points)
                layerDataReset("v")
            },
            onExit() {
                player.v.points = player.v.points.plus(1)
            }
        },
        12: {
            unlocked(){return hasUpgrade("a", 31)},
            name: "Atomic Awakening",
            challengeDescription: "All effects of Atomic Annihilation, Atomic Shattering uses a better formula, disable all new Atom Upgrades (except Atomic Shattering), Void Shards stop converting to Atomic Shards, and reset EVERYTHING BEFORE ATOMS.",
            goalDescription: "Buy the final NXF Upgrade",
            rewardDescription: "Awaken The Atoms",
            canComplete: function() {return hasUpgrade("n", 42)},
            onEnter() {
                player.points = player.points.sub(player.points)
                player.n.points = player.n.points.sub(player.n.points.sub(5))
                player.v.points = player.v.points.sub(player.v.points)
                layerDataReset("v")
            },
            onExit() {
                player.v.points = player.v.points.plus(1)
            },
            countsAs: [11]
        },
    }
})
addLayer("as", {
    name: "Atomic Shards", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#6814ff",
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "Atomic Shards", // Name of prestige currency
    baseResource: "Void Shards", // Name of resource prestige is based on
    resetDescription: "Reset for ",
    baseAmount() {
        return player.v.points
    }, // Get the current amount of baseResource
    canReset() {
        return false
    },
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: [""],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return hasUpgrade("a", 12)
    },
    effect(){
        return new Decimal(player.as.points.plus(1).div(10))
    },
    effectDescription(){
        return `dividing the Oddity requirement by ${format(tmp.as.effect)}`
    },
    update(diff) {
        if (!inChallenge("a", 12)){
            if (hasUpgrade("as", 11)){
                if (hasUpgrade("as", 13)){
                    if (player.as.points.plus(player.v.points).div(10).div(2).gte(player.as.points))
                    player.as.points = player.as.points.plus(player.v.points).div(10).div(2)
                }
                else
                    player.as.points = player.as.points.plus(player.v.points).div(100)
            }
        }
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            title: "Atomic Annihilation",
            description: "Gain 100% of Void Shard gain every second and convert 1% of your Void Shards to Atomic Shards every second",
            cost: 0
        },
        12: {
            title: "Atomic Power",
            description: "Atomic Shards boost Void Shard gain",
            effect(){
                return new Decimal(player.as.points.plus(1).log(2).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("as", 12))}x`
            },
            cost: 3000
        },
        13: {
            title: "Atomic Ascension",
            description: "5% of your Void Shards are converted to Atomic Shards instead of 1%",
            cost: 100000
        },
        14: {
            title: "Atomic Enhancement",
            description: "Atomic Shards boost Void Shard gain again",
            effect(){
                return new Decimal(player.as.points.plus(1).log(2).pow(1.1).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("as", 14))}x`
            },
            cost: 1e6
        },
        15: {
            title: "Atomic Synergy",
            description: "Atomic Shards also lower the Atom requirement, and unlock new Atom upgrades",
            effect(){
                if (hasUpgrade("a", 31))
                    return new Decimal(1)
                else
                    return new Decimal(player.as.points.plus(1).pow(1.8))
            },
            effectDisplay(){
                return `/${format(upgradeEffect("as", 15))}`
            },
            cost: 1e7
        },
    },
})
addLayer("o", {
    name: "Oddities", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#8a8a8a",
    requires() {
        if (tmp.as.effect.gt(1))
            return new Decimal(1e17).div(tmp.as.effect)
        else
            return new Decimal(1e17)
    }, // Can be a function that takes requirement increases into account
    resource: "Oddities", // Name of prestige currency
    baseResource: "Extra Flame", // Name of resource prestige is based on
    resetDescription: "Reset for ",
    baseAmount() {
        return player.n.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: [""],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "o", description: "o: Reset your Extra Flame for Oddities ", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown() {
        return hasUpgrade("a", 12)
    },
})
