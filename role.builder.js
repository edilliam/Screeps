var roleBuilder = {

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
	        creep.say('🚧 build');
	    }

		/* if builder in building mode then create two arrays, one of all construction sites and one of priority sites then move to nearest one highest priority first to build and draw path */
	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			/* Current priorities: containers */
			var priorityTargets = creep.room.find(FIND_CONSTRUCTION_SITES, { 	filter: object => object.structureType == STRUCTURE_CONTAINER});
			if(priorityTargets.length) {
                if(creep.build(priorityTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(priorityTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            if(!priorityTargets.length && targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
			/* Makes builder upgrade room if nothing to build */
			if(!priorityTargets.length && !targets.length) {
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

module.exports = roleBuilder;