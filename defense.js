var defense = {
	
	run: function(creep) {
		
		/* Activate safe mode here in future */	
		
		/* Creates array of towers in W92N27 then iterates through each attacking and healing the closest objects for each */
		var towers = Game.rooms.W92N27.find(FIND_MY_STRUCTURES, {filter: object => object.structureType == STRUCTURE_TOWER});
		for (i = 0; i < towers.length; i++){
			var tower = towers[i];
			if(tower) {
				var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
				if(closestHostile) {
					tower.attack(closestHostile);
				}
				
				var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: (structure) => structure.hits < structure.hitsMax
				});
				if(closestDamagedStructure) {
					tower.repair(closestDamagedStructure);
				}
			}
		}
	}
};

module.exports = defense;