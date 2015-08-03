// Created on 2014-05-26
// @Author: acr (hello@crucifixarnaud.com)
// ------------------------------------------
'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        config: {
            // Configurable paths
            app: 'app',
            dist: 'dist',
            tmp: '.tmp',
            title: 'tawct',
            src: ['*.{ico,png,txt}',
                'statics/css/{,*/}*.css',
                'statics/js/{,*/}*.js',
                'statics/fonts/{,*/}*.*',
                'statics/img/{,*/}*.{gif,jpeg,jpg,png,svg,ico}',
                'data/{,*/}*',
                '{,*/}*.html',
                '{,*/}*.php',
                'config.ini']
        },
        concurrent: {
            dev: ['watch:scss', 'watch:js']
        },
        // Watch specific file and launch task
        watch: {
            scss: {
                files: ['<%= config.app %>/statics/scss/{,*/}*.scss'],
                tasks: ['dev']
            },
            js: {
                files: ['Gruntfile.js','<%= config.app %>/statics/js/{,*/}*.js'],
                tasks: ['dev']
            },
            img: {
                files: ['<%= config.app %>/statics/img/*'],
                tasks: ['dev']
            },
            pages: {
                files: ['<%= config.app %>/*.php'],
                tasks: ['dev']
            }
        },
        // SASS compilation
        sass: {
            global: {
                options: {
                  sourceMap: true,
                  sourceComments: false,
                  outputStyle: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/statics/scss/',
                    src: ['styles.scss'],
                    dest: '<%= config.app %>/statics/css/',
                    ext: '.css'
                }]
            }
        },
        // Autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 9', 'ie 8'],
                map: true,
                diff: true
            },
            styles: {
                src: '<%= config.dist %>/statics/css/styles.css'
            }
        },
        // Compass files
        compass: {
            build: {
                options: {
                    config: 'config.rb'
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['<%= config.dist %>/statics/js/{,*/}*.js'],
                dest: '<%= config.dist %>/statics/js/scripts.js',
            },
        },
        jshint: {
            jshintrc: '../../../.jshintrc',
            files: ['<%= config.app %>/statics/js/{,*/}*.js', '!<%= config.app %>/statics/js/lib/*.js']
        },
        // Optimize img
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/statics/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= config.dist %>/statics/img/'
                }]
            }
        },
        // Clean .tmp or dist folder
        clean: {
            dev: {
                src: ['<%= config.tmp %>/']
            },
            dist: {
                src: ['<%= config.dist %>/']
            },
            concat:{
                src: ['<%= config.dist %>/statics/js/{,*/}*.js','!<%= config.dist %>/statics/js/scripts.js']
            },
            sketch:{
                src: ['<%= config.dist %>/statics/img/{,*/}*.sketch']
            }
        },
        // Copies files to places other tasks can use
        copyto: {
            dev: {
                files: [{
                    cwd: '<%= config.app %>/',
                    dest: '<%= config.tmp %>/',
                    src: '<%= config.src %>'
                }]
            },
            dist: {
                files: [{
                    cwd: '<%= config.app %>/',
                    dest: '<%= config.dist %>/',
                    src: '<%= config.src %>'
                },{
                    cwd: '.',
                    dest: '<%= config.dist %>/',
                    src: 'humans.txt, robots.txt'
                }]
            }
        },
        // Minify CSS for build
        cssmin: {
            dist: {
                expand: true,
                cwd: '<%= config.dist %>/statics/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= config.dist %>/statics/css/',
                ext: '.css'
            }
        },
        uglify: {
            dist: {
                expand: true,
                cwd: '<%= config.dist %>/statics/js/',
                src: ['*.js', '!*.min.js'],
                dest: '<%= config.dist %>/statics/js/',
                ext: '.js'
            }
        },
        // Dev Update (update all grunt-plugin)
        devUpdate: {
            // Update all the plugin (prompt for confirmation)
            main: {
                options: {
                    updateType: 'prompt',
                    reportUpdated: false,
                    packages: {
                        //only devDependencies by default
                        devDependencies: true,
                        dependencies: false
                    },
                    packageJson: null
                }
            },
            // Check and report if package is outdated.
            check: {
                options: {
                    updateType: 'report',
                    reportUpdated: false,
                    packages: {
                        //only devDependencies by default
                        devDependencies: true,
                        dependencies: false
                    },
                    packageJson: null
                }
            }
        }

    });

    // Load Plugin(s)
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', [
        'dev',
    ]);
    // Dev task (build website in .tmp)
    grunt.registerTask('dev', [
        'sass',
        'autoprefixer',
        'jshint',
        'clean:dev',
        'copyto:dev',
    ]);
    // Build task (build website for production (or staging) in .dist)
    grunt.registerTask('build', [
        'sass',
        'autoprefixer',
        'jshint',
        'clean:dist',
        'copyto:dist',
        'imagemin',
        'concat:dist',
        'clean:concat',
        'clean:sketch',
        'uglify',
    ]);
    //update : update all grunt-plugins
    grunt.registerTask('package-update', ['devUpdate:main']);
    grunt.registerTask('package-check', ['devUpdate:check']);
};
