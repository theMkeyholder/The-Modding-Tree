addLayer("R0Gate", {
    name: "R0Gate", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R0", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#ff0000",
    requires(){
        return new Decimal(1)
    }, // Can be a function that takes requirement increases into account
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ["R1Gate", "R2Gate", "R3Gate", "R4Gate"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(96) },
    layerShown() {
        return temp.R0Gate.isActive
    },
    clickables: {
        11: {
            title() {return "Enter Reality 0"},
            canClick(){return true},
            onClick(){
                player.reality = new Decimal(0)
            },
        },
    }
})
addLayer("R1Gate", {
    name: "R1Gate", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#00a206",
    requires(){
        return new Decimal(1)
    }, // Can be a function that takes requirement increases into account
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: [],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(96) },
    layerShown() {
        return temp.R1Gate.isActive
    },
    clickables: {
        11: {
            title() {return "Enter Reality 1"},
            canClick(){return true},
            onClick(){
                player.reality = new Decimal(1)
            },
        },
    }
})
addLayer("R2Gate", {
    name: "R1Gate", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "WIP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#4c4c4c",
    requires(){
        return new Decimal(1)
    }, // Can be a function that takes requirement increases into account
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: [],
    row: 3, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(96) },
    layerShown() {
        return temp.R1Gate.isActive
    },
    clickables: {
        11: {
            title() {return "Enter Reality 1"},
            canClick(){return true},
            onClick(){
                player.reality = new Decimal(1)
            },
        },
    }
})
addLayer("R3Gate", {
    name: "R1Gate", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "WIP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#4c4c4c",
    requires(){
        return new Decimal(1)
    }, // Can be a function that takes requirement increases into account
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: [],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(96) },
    layerShown() {
        return temp.R1Gate.isActive
    },
    clickables: {
        11: {
            title() {return "Enter Reality 1"},
            canClick(){return true},
            onClick(){
                player.reality = new Decimal(1)
            },
        },
    }
})
addLayer("R4Gate", {
    name: "R1Gate", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "WIP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#4c4c4c",
    requires(){
        return new Decimal(1)
    }, // Can be a function that takes requirement increases into account
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: [],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(96) },
    layerShown() {
        return temp.R1Gate.isActive
    },
    clickables: {
        11: {
            title() {return "Enter Reality 1"},
            canClick(){return true},
            onClick(){
                player.reality = new Decimal(1)
            },
        },
    }
})