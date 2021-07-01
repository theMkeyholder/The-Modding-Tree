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
        return player.aa.points.gte(2)|| player.r.total.gte(1)
    },
    update(diff){
      if (hasUpgrade("r", 11) && !hasChallenge("a", 11) | !hasChallenge("a", 12)){
          player.a.challenges[11] = 1
          player.a.challenges[12] = 1
      }
    },
    milestones: {
        0: {
            requirementDescription: "1 Hyperreality",
            effectDescription: "Autocomplete the Atom challenges and all new Atom Upgrades are free",
            done() { return player.r.points.gte(1) }
        },
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            unlocked(){
                return (getBuyableAmount("r", 11).gte(1))
            },
            title: "A new era.",
            description: "Disable the Oddity side of the tree.",
            onPurchase(){
                layerDataReset("up")
                layerDataReset("sp")
                layerDataReset("p")
                layerDataReset("vg")
                layerDataReset("o")
            },
            cost: 0
        },
        21: {
            unlocked(){
                return (hasUpgrade("r", 11))
            },
            title: "gwa Reawakening",
            description: "Multiply Fire gain based on your Extra Flame",
            effect(){
                if (hasUpgrade("r", 22))
                return new Decimal(player.n.points.plus(1).log(100).plus(1).times(upgradeEffect("r", 22)))
                else
                    return new Decimal(player.n.points.plus(1).log(100).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("r", 21))}x`
            },
            cost: 0
        },
        22: {
            unlocked(){
                return (hasUpgrade("r", 21))
            },
            title: "gwaed",
            description: "Multiply the previous upgrade's effect",
            effect(){
                if (hasUpgrade("r", 23))
                return new Decimal(upgradeEffect("r", 21).plus(1).log(2).plus(1).times(upgradeEffect("r", 23)))
                else
                    return new Decimal(upgradeEffect("r", 21).plus(1).log(2).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("r", 22))}x`
            },
            cost: 1
        },
        23: {
            unlocked(){
                return (hasUpgrade("r", 22))
            },
            title: "A Fraction of The Power of true gwa",
            description: "Multiply the previous upgrade's effect",
            effect(){
                return new Decimal(upgradeEffect("r", 22).plus(1).log(2).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("r", 23))}x`
            },
            cost: 1
        },
    },
    buyables: {
        11: {
            unlocked(){
                return true
            },
            cost() {return new Decimal(1)},
            display() {return `<h3>gwa Enhancer</h3><br>Unlock Hyperreality Upgrades<br>`},
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
    },
})