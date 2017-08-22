var roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
		
		/* if carrier carries no energy switch to collecting mode (technically !carrying mode) and announce */
	    if(creep.memory.carrying && creep.carry.energy == 0) {
            creep.memory.carrying = false;
            creep.say('🔄 Collecting');
	    }
		/* if carrier has any energy switch to carrying mode and announce */
	    if(!creep.memory.carrying && creep.carry.energy > 0) {
	        creep.memory.carrying = true;
	        creep.say('🚧 Carrying');
	    }

		/* if carrier is in carrying mode then create an array of stuff that needs to be filled, move towards and draw path */
	    if(creep.memory.carrying) {
	        var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) 	=> {
					return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
				}});
            if(targets.length) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
			/* Makes carrier upgrade room if nothing to carry */
			/*else {
				if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}*/
	    }
		/* if carrier in collecting mode (!carrying mode) create array of containers and move to nearest one to collect and draw path */
	    if(!creep.memory.carrying) {
			var containers = creep.room.find(FIND_STRUCTURES, {
				filter: structure => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= 50
			});
			if(containers.length){
				if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
			}
	    }
	}
};

module.exports = roleCarrier;