module.exports = function(grunt){
	//任务配置，所有插件的配置信息
	grunt.initConfig({
		//获取package.json的信息
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			build: {
				src: "src/test.js",
				dest: "build/<%= pkg.name %> - v<%= pkg.version %>.js.min.js"
			}
		},
		jshint: {
			build: ['Gruntfile.js', 'src/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		watch: {
			build: {
				files: ['src/*.js'],
				tasks: ['jshint', 'uglify'],
				options: {
					spawn: false,
				},
			},
		}
	});
	
	//告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	//告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）
	grunt.registerTask('default', ['uglify', 'jshint', 'watch']);
};