module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		out: 'out/',
		test: 'src/test/app/build/',

		clean: {
			out: {
				src: ['<%= out %>']
			},

			less: {
				src: ['<%= out %>dev/less/']
			}
		},

		copy: {
			dev: {
				cwd: 'src/app/',
				src: '**',
				dest: '<%= out %>dev',
				expand: true
			},
			test: {
				cwd: '<%= out %>dev/',
				src: '**',
				dest: '<%= test %>',
				expand: true
			}
		},

		less: {
			dev: {
				files: {
					'<%= out %>dev/css/style.css': '<%= out %>dev/less/main.less'
				}
			}
		},

		watch: {
			main: {
				files: 'src/app/**',
				tasks: ['dev']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('dev', [ 'clean:out', 'copy:dev', 'less:dev', 'clean:less' ]);

	grunt.registerTask('testDev', [ 'dev', 'copy:test' ]);

	grunt.registerTask('default', [ 'dev' ]);
};