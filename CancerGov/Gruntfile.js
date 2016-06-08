module.exports = function(grunt) {

	// Define Dirs
	grunt.config('dirs', {
		src: {
			base: "_src/",
			templates: "_src/PageTemplates/",
			sublayouttemplates: "_src/SublayoutTemplates/",
			velocitytemplates: "_src/VelocityTemplates/",
			styles: "_src/StyleSheets/",
			scripts: "_src/Scripts/"
		},
		tmp: {
			base: "_tmp/",
			templates: "_tmp/PageTemplates/",
			sublayouttemplates: "_tmp/SublayoutTemplates/",
			velocitytemplates: "_tmp/VelocityTemplates/",
			styles: "_tmp/Styles/",
			scripts: "_tmp/js/"
		},
		dist: {
			base: "_dist/",
			templates: "_dist/PageTemplates/",
			sublayouttemplates: "_dist/SublayoutTemplates/",
			velocitytemplates: "_dist/VelocityTemplates/",
			styles: "_dist/Styles/",
			scripts: "_dist/js/"
		},
		bower: 'bower_components/'
	});

	// Project Config
	grunt.config('pkg', grunt.file.readJSON('package.json'));

	// Load Plugins
	/*****************************************
	 *  SVN Repo Updating
	 ****************************************/
	grunt.loadNpmTasks('grunt-svn-fetch');
	grunt.config('svn_fetch', {
		options: {
			'repository': "<%= pkg.repository.url %><%= pkg.repository.branchdir %><%= pkg.repository.devbranch %><%= pkg.repository.subpath %>"
		},
		nvcg: {
			map: {
				"_src": "_src"
			}
		}
	});

	/*****************************************
	 *  SASS Preprocessing
	 ****************************************/
	grunt.loadNpmTasks('grunt-sass');
	grunt.config('sass', {
		dev: {
			options: {
				sourceMap: true
			},
			files: {
				'<%= dirs.tmp.styles %>nvcg.css': '<%= dirs.src.styles %>nvcg.scss'
			}
		},
		prod: {
			options: {
				sourceMap: false,
				outputStyle: 'compressed'
			},
			files: {
				'<%= dirs.tmp.styles %>nvcg.css': '<%= dirs.src.styles %>nvcg.scss'
			}
		}
	});

	/*****************************************
	 *  Build template files
	 ****************************************/
	grunt.loadNpmTasks('grunt-bake');
	grunt.config('bake', {
		templates: {
			options: {},
			files: [{
				expand: true,
				cwd: '<%= dirs.src.templates %>',
				src: ['**/*.aspx'],
				dest: '<%= dirs.tmp.templates %>',
				ext: ".aspx"
			}]
		},
		sublayouttemplates: {
			options: {},
			files: [{
				expand: true,
				cwd: '<%= dirs.src.sublayouttemplates %>',
				src: ['**/*.ascx'],
				dest: '<%= dirs.tmp.sublayouttemplates %>',
				ext: ".ascx"
			}]
		},
		velocitytemplates: {
			options: {},
			files: [{
				expand: true,
				cwd: '<%= dirs.src.velocitytemplates %>',
				src: ['**/*.vm'],
				dest: '<%= dirs.tmp.velocitytemplates %>',
				ext: ".vm"
			}]
		}
	});

	/*****************************************
	 * Require.js
	 * Compile the JavaScript modules into packages.
	 ****************************************/
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.config('requirejs', {
		options: {
			skipDirOptimize: true,
			normalizeDirDefines: 'skip',
			wrapShim: true,
			appDir: '<%= dirs.src.scripts %>NCI',
			dir: '<%= dirs.tmp.scripts %>NCI',
			paths: {
				'requirejs': '../../../bower_components/requirejs/require',
				'config': 'config',
				'ContentPage': 'UX/Common/ContentPage',
				'CTHPPage': 'UX/PageSpecific/CTHP/CTHPPage',
				'HomePage': 'UX/PageSpecific/Home/HomePage',
				'InnerPage': 'UX/PageSpecific/Inner/InnerPage',
				'LandingPage': 'UX/PageSpecific/Landing/LandingPage',
				'PDQPage': 'UX/PageSpecific/PDQ/PDQPage',
				'TopicPage': 'UX/PageSpecific/Topic/TopicPage',
				'Popups': 'UX/PageSpecific/Popups/Popups',
				'BasicCTSResultsPage': 'UX/AppModuleSpecific/BasicCTS/Results/BasicCTSResultsPage',
				'BasicCTSSearchPage': 'UX/AppModuleSpecific/BasicCTS/Search/BasicCTSSearchPage',
				'BasicCTSViewPage': 'UX/AppModuleSpecific/BasicCTS/View/BasicCTSViewPage'
			},
			mainConfigFile: '<%= dirs.src.scripts %>NCI/config.js',
			modules: [
				{
					name: 'ContentPage',
					insertRequire: ['ContentPage']
				},
				{
					name: 'CTHPPage',
					insertRequire: ['CTHPPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'HomePage',
					insertRequire: ['HomePage'],
					exclude: ['ContentPage']
				},
				{
					name: 'InnerPage',
					insertRequire: ['InnerPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'LandingPage',
					insertRequire: ['LandingPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'PDQPage',
					insertRequire: ['PDQPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'TopicPage',
					insertRequire: ['TopicPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'Popups',
					insertRequire: ['Popups'],
					exclude: []
				},
				{
					name: 'BasicCTSResultsPage',
					insertRequire: ['BasicCTSResultsPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'BasicCTSSearchPage',
					insertRequire: ['BasicCTSSearchPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'BasicCTSViewPage',
					insertRequire: ['BasicCTSViewPage'],
					exclude: ['ContentPage']
				}

			]
		},
		dev: {
			options: {
				generateSourceMaps: true,
				optimize: 'none'
			}
		},
		prod: {
			options: {
				optimize: 'uglify2',
				uglify2: {
					output: {
						max_line_len: 500
					}
				}
			}
		}
	});

	/*****************************************
	 * Uglify JS
	 ****************************************/
	grunt.loadNpmTasks('grunt-contrib-uglify');
	var oldFiles = {
		expand: true,
		flatten: true,
		dest: '<%= dirs.tmp.scripts %>NCI_OLD',
		src: ['<%= dirs.src.scripts %>NCI_OLD/*.js']
	};
	var commonFile = {
		'<%= dirs.tmp.scripts %>Common.js': [
			'<%= dirs.src.scripts %>NCI/Vendor/respond.js',
			'<%= dirs.src.scripts %>NCI/Vendor/modernizr.custom.2.7.1.js',
			'<%= dirs.bower %>jquery/jquery.js',
			'<%= dirs.bower %>jquery-ui/jquery-ui.js',
			'<%= dirs.bower %>requirejs/require.js',
			'<%= dirs.src.scripts %>NCI/config.js'
		]
	};
	grunt.config('uglify', {
		options: {
			preserveComments: 'some',
			maxLineLen: 500
		},
		dev: {
			options: {
				mangle: false,
				beautify: true,
				sourceMap: true
			},
			files: [oldFiles, commonFile]
		},
		prod: {
			options: {
				mangle: true
			},
			files: [oldFiles, commonFile]
		}
	});

	/*****************************************
	 *  Cleaning
	 ****************************************/
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.config('clean', {
		tmp: {
			src: ['<%= dirs.tmp.base %>']
		},
		requirejs: {
			// previously used to clean up the require build, but I couldn't get this working using a configure-once setup (see copy:scripts)
			src: []
		}
	});

	/*****************************************
	 *  Copying
	 ****************************************/
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.config('copy', {
		templates: {
			nonull: true,
			files: [{
				expand: true,
				flatten: true,
				src: ['<%= dirs.tmp.templates %>**/*.aspx'],
				dest: '<%= dirs.dist.templates %>',
				filter: 'isFile'
			}]
		},
		sublayouttemplates: {
			nonull: true,
			files: [{
				expand: true,
				flatten: true,
				src: ['<%= dirs.tmp.sublayouttemplates %>**/*.ascx'],
				dest: '<%= dirs.dist.sublayouttemplates %>',
				filter: 'isFile'
			}]
		},
		velocitytemplates: {
			nonull: true,
			files: [{
				expand: true,
				flatten: true,
				src: ['<%= dirs.tmp.velocitytemplates %>**/*.vm'],
				dest: '<%= dirs.dist.velocitytemplates %>',
				filter: 'isFile'
			}]
		},
		styles: {
			nonull: true,
			files: [{
				expand: true,
				flatten: true,
				src: [
					'<%= dirs.tmp.styles %>**/*.css',
					'<%= dirs.tmp.styles %>**/*.css.map'
				],
				dest: '<%= dirs.dist.styles %>',
				filter: 'isFile'
			}]
		},
		scripts: {
			nonull: true,
			files: [{
				expand: true,
				flatten: true,
				src: [
					'<%= dirs.tmp.scripts %>Common.js*',
					'<%= dirs.tmp.scripts %>NCI_OLD/**/*.js*',
					'<%= dirs.tmp.scripts %>/**/build.txt'
				].concat(grunt.config('requirejs').options.modules.map(function(module) {
					return grunt.template.process('<%= dirs.tmp.scripts %>**/' + grunt.config('requirejs').options.paths[module.name] + '.js*');
				})),
				dest: '<%= dirs.dist.scripts %>',
				filter: 'isFile'
			}]
		}
	});

	/************************************************************************
	 * TASK: Runs the Server
	 ************************************************************************/
	grunt.loadNpmTasks('grunt-develop');
	grunt.config('develop', {
		server: {
			file: 'server/server.js'
		}
	});

	/*****************************************
	 *  Watch
	 ****************************************/
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.config('watch', {
		options: {
			//liveReload: true
		},
		css: {
			files: '<%= dirs.src.styles %>**/*.scss',
			tasks: ['build-styles:' + 'dev']
		},
		js: {
			files: '<%= dirs.src.scripts %>**/*.js',
			tasks: ['build-scripts:' + 'dev']
		},
		templates: {
			files: ['<%= dirs.src.templates %>*.aspx', '<%= dirs.src.templates %>Includes/*.inc'],
			tasks: ['build-templates:' + 'dev']
		}
		//NOT adding sublayouts or dynamic list templates, I wonder why templates are here...
	});


	// Tasks
	grunt.registerTask('build-scripts', 'Build the JavaScript.', function(env) {
		env = (env === 'prod' ? 'prod' : 'dev');
		grunt.config('env', env);

		var tasks = ['requirejs:' + env, 'clean:requirejs', 'uglify:' + env, 'copy:scripts', 'clean:tmp'];
		grunt.task.run(tasks);
	});

	grunt.registerTask('build-styles', 'Build the CSS.', function(env) {
		env = (env === 'prod' ? 'prod' : 'dev');
		grunt.config('env', env);

		var tasks = ['sass:' + env, 'copy:styles', 'clean:tmp'];
		grunt.task.run(tasks);
	});

	grunt.registerTask('build-templates', 'Build the CDE page, sublayout & velocity templates.', function(env) {
		env = (env === 'prod' ? 'prod' : 'dev');
		grunt.config('env', env);

		var tasks = ['bake:templates', 'copy:templates', 'bake:sublayouttemplates', 'copy:sublayouttemplates', 'bake:velocitytemplates', 'copy:velocitytemplates', 'clean:tmp'];
		grunt.task.run(tasks);
	});

	grunt.registerTask('build', 'Build all files.', function(env) {
		env = (env === 'prod' ? 'prod' : 'dev');
		grunt.config('env', env);

		var tasks = ['build-styles:' + env, 'build-scripts:' + env, 'build-templates:' + env];
		grunt.task.run(tasks);
	});


	grunt.registerTask('build-watch', 'Build all files and watch for changes.', function(env) {
		var proxy;

		switch (env) {
			case 'dev/red':
			case 'red-dev':
			case 'red':
				proxy = 'www-red-dev';
				break;
			case 'dev/pink':
			case 'pink-dev':
			case 'pink':
				proxy = 'www-pink-dev';
				break;
			case 'dev/blue':
			case 'blue-dev':
			case 'blue':
			case 'dev':
			default:
				proxy = 'www-blue-dev';
				if(/^\d+$/.test(env))
					proxy = 'www-ocdev' + env + '.ha2';
				break;
			case 'qa':
				proxy = 'www-qa';
				break;
			case 'dt-qa':
			case 'dt':
				proxy = 'www-dt-qa';
				break;
			case 'stage':
				proxy = 'www-stage';
				break;
			case 'training':
				proxy = 'www-training';
				break;
			case 'production':
			case 'prod':
				proxy = 'www';
				env = 'prod';
				break;
		}
		env = (env === 'prod' ? 'prod' : 'dev');

		grunt.config('env', env);
		grunt.config.merge({
			develop: {
				server: {
					env: {
						PROXY_ENV: proxy
					}
				}
			}
		});

		var tasks = ['build:' + env, 'develop', 'watch'];
		grunt.task.run(tasks);
	});

	// We should ALWAYS define the 'default' task
	grunt.registerTask('default', ['build']);

	// Deploy task is used by the build script
	grunt.registerTask('deploy', ['build:prod']);
};
