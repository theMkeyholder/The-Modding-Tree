addLayer("c", {
    name: "cascade", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		    points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "cascade points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
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
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    tabFormat: [
      ["raw-html", "<h1>"+getRegiment()+"</h1>"],
      "prestige-button",
      ["display-text", () => `You have ${player.c.points} cascade points.`],
      "resource-display",
      ["row", [
        ["upgrade", 11],
        ["upgrade", 12],
        ["upgrade", 13],
        ["upgrade", 14]
      ]],
      ["shop",,showIf(() => {
        return hasUpgrade("c", 14)
      })], // haha SAN double comma funny joke
      ["buyable", 11, showIf(() => hasUpgrade("c", 16))]
    ],
    upgrades: {
      rows: 100,
      cols: 100,
      11: {
        title: "Incrementer",
        cost: new Decimal(1) ,
        description: "Gain 1 points per second"
      },
      12: {
        title: "Double the points!",
        cost: new Decimal(1),
        description: "Gain 2x points per second"
      },
      13: {
        title: "Double the points AGAIN",
        cost: new Decimal(2),
        description: "Gain 2x points per second AGAIN"
      },
      14: {
        title: "The Small Number Shop",
        cost: new Decimal(10),
        description: "Unlock the shop"
      },
      15: {
        title: "Finally, a tripler!",
        cost: new Decimal(6),
        description: "Triple the points"
      },
      16: {
        title: "Buyable",
        cost: new Decimal(16),
        description: "Unlock a buyable"
      }
    },
    buyables: {
      rows: 100,
      cols: 100,
      11: {
        cost(x) {
          return new Decimal(3).pow(getBuyableAmount("c", 11)).round()
        },
        canAfford() {
          return player.c.points.gte(this.cost())
        },
        display() {
          return `<h2>Not Inflation</h2><br>
          Double the points <h1>AGAIN</h1><br>
          Cost: ${this.cost()} cascade points
          `
        },
        buy() {
          player.c.points = player.c.points.sub(this.cost())
          setBuyableAmount("c", 11, getBuyableAmount("c", 11).add(1))
        }
      }
    }
})
addLayer("a", {
  name: "achievements",
  symbol: "A",
  row: "side",
  type: "none",
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0)
    }
  },
  tabFormat: ["achievements"],
  color: "yellow",
  achievements: {
    rows: 10,
    cols: 10,
    11: {
      name: "Eyelash Mite",
      tooltip: "Reach 20,000",
      done() {
        return player.points.gte(20000)
      }
    },
    12: {
      name: "Dust Mite",
      tooltip: "Reach 50,000",
      done() {
        return player.points.gte(50000)
      }
    },
    13: {
      name: "Cheese Mite",
      tooltip: "Reach 80,000",
      done() {
        return player.points.gte(80000)
      }
    },
    14: {
      name: "Clover Mite",
      tooltip: "Reach 200,000",
      done() {
        return player.points.gte(200000)
      }
    },
    15: {
      name: "Pipsqueak",
      tooltip: "Reach 10,000,000",
      done() {
        return player.points.gte(1e7)
      }
    },
    21: {
      name: "Little Squeaker",
      tooltip: "Reach 5e9",
      done() {
        return player.points.gte(5e9)
      }
    },
    22: {
      name: "Small Fry",
      tooltip: "Reach 1e15",
      done() {
        return player.points.gte(1e15)
      }
    },
    23: {
      name: "Guppy",
      tooltip: "Reach 1e20",
      done() {
        return player.points.gte(1e20)
      }
    },
    24: {
      name: "Minnow",
      tooltip: "Reach 1e25",
      done() {
        return player.points.gte(1e25)
      }
    },
    25: {
      name: "Goby",
      tooltip: "Reach 1e35",
      done() {
        return player.points.gte(1e35)
      }
    }
  },
  resource: "Achievement Points"
})
function getRegiment() {
  return "Regiment 1: The Guppy Regiment"
}
function showIf(a) {
  return () => { return {
    display: a() ? "block" : "none"
  }}
}