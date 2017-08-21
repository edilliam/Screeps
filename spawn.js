var spawn = {
	
	run: function(creep) {

		/* create array of all current harvesters and log to console the number of harvesters */
		var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
		console.log('Harvesters: ' + harvesters.length);

		/* if there are less than 2 harvesters in the above array then spawn a new creep from Spawn1, assign it the harvester role and log to console its name */
		if(harvesters.length < 2) {
			var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
			console.log('Spawning new harvester: ' + newName);
		}

		/* spawn 2 upgraders only if there are already 2 harvesters */
		var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
		console.log('Upgraders: ' + upgraders.length);

		if(upgraders.length < 2 && harvesters.length == 2) {
			var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
			console.log('Spawning new upgrader: ' + newName);
		}
		
		/* spawn 1 roady only if there are already 2 harvesters && 2 upgraders */
		var roadys = _.filter(Game.creeps, (creep) => creep.memory.role == 'roady');
		console.log('Roadys: ' + roadys.length);

		if(roadys.length < 1 && harvesters.length == 2 && upgraders.length == 2) {
			var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'roady'});
			console.log('Spawning new roady: ' + newName);
		}

		/* spawn 4 builders only if there are already 2 harvesters && there are already 2 upgraders && 1 roady */
		var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
		console.log('Builders: ' + builders.length);

		if(builders.length < 4 && harvesters.length == 2 && upgraders.length == 2 && roadys.length == 1) {
			var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
			console.log('Spawning new builder: ' + newName);
		}

		/* if Spawn1 is spawning something then draw what it is spawning */
		if(Game.spawns['Spawn1'].spawning) { 
			var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
			Game.spawns['Spawn1'].room.visual.text(
				'🛠️' + spawningCreep.memory.role,
				Game.spawns['Spawn1'].pos.x + 1, 
				Game.spawns['Spawn1'].pos.y, 
				{align: 'left', opacity: 0.8});
		}
	}
};

module.exports = spawn;
