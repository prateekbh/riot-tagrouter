module.exports = function(grunt) {

		// Project configuration.
		grunt.initConfig({
				pkg: grunt.file.readJSON("package.json"),
				clean: {
						pre_build: ['./build/router_tags_es6.js','./build/routerlib.js']
				},


				riot: {
					options: {
							concat : true
					},
					'build/router_tags_es6.js' : 'tags/*.tag',
				},

				babel: {
					options: {
							sourceMap: true,
							presets: ['es2015']
					},
					dist: {
							files: {
									'build/routerlib.js' : 'build/router_tags_es6.js'
							}
					}
			}

		});

		// Load the plugin that provides the "clean" task.
		grunt.loadNpmTasks('grunt-contrib-clean');

		// Load the plugin that provides the "riot" task.
		grunt.loadNpmTasks("grunt-riot");

		// Load the plugin that provides the "babel" task.
		grunt.loadNpmTasks("grunt-babel");

		//Task for building the static contents of the application
		grunt.registerTask("default", ["clean", "riot", "babel"]);
};