var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRoady = require('role.roady');
var roleCarrier = require('role.carrier');
var spawn = require('spawn');
var defense = require('defense');

module.exports.loop = function () {
	
	/* each tick log to console energy harvested in room && deposited ready to use */
	for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
	
	/* each tick clear any dead creeps from memory */
	for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
	
	/* run extra modules */
	spawn.run(creep);
	defense.run(creep);

	/* each tick run script for every creep depending on their assigned role */
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
		if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
		if(creep.memory.role == 'roady') {
            roleRoady.run(creep);
        }
		if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
    }
}