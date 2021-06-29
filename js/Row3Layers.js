addLayer("r", {
    name: "Realities", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#ffc600",
    requires: new Decimal(2), // Can be a function that takes requirement increases into account
    resource: "Hyperrealities", // Name of prestige currency
    baseResource: "Awakened Atoms", // Name of resource prestige is based on
    baseAmount() {
        return player.aa.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.69, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    resetDescription: "Collapse your Reality for ",
    branches: [],
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return hasUpgrade("aa", 21)
    },
    update(diff){
      if (hasUpgrade("r", 11) && !hasChallenge("a", 11) | !hasChallenge("a", 12)){
          canCompleteChallenge("a", 11)
          canCompleteChallenge("a", 12)
      }
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            unlocked(){
                return (getBuyableAmount("r", 11).gte(1))
            },
            title: "gwa Reawakening",
            description: "Multiply Fire gain based on your Extra Flame and Autocomplete the Atom challenges",
            effect(){
                return new Decimal(player.n.points.plus(1).log(100).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("r", 11))}x`
            },
            cost: 0
        },
    },
    buyables: {
        11: {
            unlocked(){
                if (!(getBuyableAmount("r", 12).equals(1) || getBuyableAmount("r", 13).equals(1)))
                    return true
                else
                    return false
            },
            cost() {return new Decimal(1)},
            display() {return `<h3>gwa Enhancer</h3><br>Unlock Hyperreality Upgrades based on the gwa layer<br>`},
            canAfford() {
                return player.r.points.gte(this.cost())
            },
            buy() {
                player.r.points = player.r.points.sub(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit(){
                return new Decimal(1)
            }
        },
        12: {
            unlocked(){
                if (!(getBuyableAmount("r", 11).equals(1) || getBuyableAmount("r", 13).equals(1)))
                    return true
                else
                    return false
            },
            cost() {return new Decimal(1)},
            display() {return `<h3>Void Amplifier</h3><br>Unlock new Void Shard Upgrades<br>`},
            canAfford() {
                return player.r.points.gte(this.cost())
            },
            buy() {
                player.r.points = player.r.points.sub(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit(){
                return new Decimal(1)
            }
        },
        13: {
            unlocked(){
                if (!(getBuyableAmount("r", 11).equals(1) || getBuyableAmount("r", 12).equals(1)))
                    return true
                else
                    return false
            },
            cost() {return new Decimal(1)},
            display() {return `<h3>Oddness Booster</h3><br>Unlock new Oddity Upgrades<br>`},
            canAfford() {
                return player.r.points.gte(this.cost())
            },
            buy() {
                player.r.points = player.r.points.sub(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit(){
                return new Decimal(1)
            }
        },
    },
})