var roleRoady = {

    /** @param {Creep} creep **/
    run: function(creep) {

		/* if builder carries no energy switch to harvest mode (technically !building mode) and announce */
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
		/* if builder is full of carried energy switch to building mode and announce */
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 Roads');
	    }

		/* if roady is in building mode then create an array of roads and containers with health less than 100%, move towards and draw path */
	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_STRUCTURES, { filter: object => object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax || object.structureType == STRUCTURE_CONTAINER && object.hits < object.hitsMax});
            if(targets.length) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
			/* Makes roady upgrade room if nothing to build */
			else {
				if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
	    }
		/* if creep in harvest mode (!building mode) so create array of energy sources and move to nearest one to harvest and draw path */
	    if(!creep.memory.building) {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleRoady;