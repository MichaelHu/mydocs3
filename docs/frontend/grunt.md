# grunt备忘


> @[style="color:green;font-size:18px"]The JavaScript Task Runner

`github`: <a href="https://github.com/gruntjs/grunt">https://github.com/gruntjs/grunt</a>

`docs`: <a href="http://gruntjs.com/">http://gruntjs.com/</a>

## 安装

Node.js Requirement: `>= 0.8.0`

安装命令行接口：

    $ npm install -g grunt-cli

在与`package.json`同一目录下，快速安装grunt包：

    $ npm install grunt --save-dev

安装常用grunt plugins：

    $ npm install grunt-contrib-jshint --save-dev
    $ npm install grunt-contrib-concat --save-dev


## Gruntfile文件

例子：

    module.exports = function(grunt) {

        // Project configuration.
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },  
                build: {
                    src: 'src/<%= pkg.name %>.js',
                    dest: 'build/<%= pkg.name %>.min.js'
                }   
            }   
        }); 

        // Load the plugin that provides the "uglify" task.
        grunt.loadNpmTasks('grunt-contrib-uglify');

        // Default task(s).
        grunt.registerTask('default', ['uglify']);

    };

1. 总是包含在以下结构中：

    module.exports = function(grunt){
        ...
    };


        
