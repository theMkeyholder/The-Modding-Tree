let modInfo = {
	name: "The Flame Tree",
	id: "flametree",
	author: "FlamemasterNXF",
	pointsName: "Fire",
	discordName: "My Discord server!",
	discordLink: "https://discord.gg/Js93DSjBAY",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "Shards",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.0</h3><br>
		- I'm not using this lol.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (!inChallenge("a", 11)){
		if (hasUpgrade("n", 33)) gain = gain.pow(upgradeEffect("n", 32))
		if (hasUpgrade("n", 22)) gain = gain.times(upgradeEffect("n", 22))
		if (hasUpgrade("n", 11)) gain = gain.plus(upgradeEffect("n", 11))
		if (hasUpgrade("n", 12)) gain = gain.times(upgradeEffect("n", 12))
		if (hasUpgrade("n", 21)) gain = gain.times(upgradeEffect("n", 21))
		if (hasUpgrade("n", 31)) gain = gain.times(upgradeEffect("n", 31))
		if (hasUpgrade("n", 32)) gain = gain.pow(upgradeEffect("n", 32))
		if (!hasUpgrade("g", 21)){
			if (hasUpgrade("g", 11)) gain = gain.times(upgradeEffect("g", 11))
		}
		if (hasUpgrade("v", 11)) gain = gain.times(upgradeEffect("v", 11))
		if (hasUpgrade("v", 12)) gain = gain.times(upgradeEffect("v", 12))
		if (hasUpgrade("v", 13)) gain = gain.times(upgradeEffect("v", 13))
		if (hasUpgrade("v", 14)) gain = gain.times(upgradeEffect("v", 14))
	}
	else {
		gain = gain.plus(9)
		if (hasUpgrade("n", 22)) gain = gain.div(upgradeEffect("n", 22))
		if (hasUpgrade("n", 11)) gain = gain.sub(upgradeEffect("n", 11))
		if (hasUpgrade("n", 12)) gain = gain.div(upgradeEffect("n", 12))
		if (hasUpgrade("n", 21)) gain = gain.div(upgradeEffect("n", 21))
		if (hasUpgrade("n", 31)) gain = gain.div(upgradeEffect("n", 31))
		if (!hasUpgrade("g", 21)){
			if (hasUpgrade("g", 11)) gain = gain.div(upgradeEffect("g", 11))
		}
		if (hasUpgrade("v", 11)) gain = gain.div(upgradeEffect("v", 11))
		if (hasUpgrade("v", 12)) gain = gain.div(upgradeEffect("v", 12))
		if (hasUpgrade("v", 13)) gain = gain.div(upgradeEffect("v", 13))
		if (hasUpgrade("v", 14)) gain = gain.div(upgradeEffect("v", 14))
	}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	`Current Endgame: 1 Oddity`,
	`The Real Game Begins after Completing the gwa Layer`
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}