module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    cleancss: true,
                    ieCompat: false,
                    strictMath: true,
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: 'assets/less/',
                    src: ['*.less'],
                    dest: 'assets/css/',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            development: {
                options: {
                    report: 'gzip',
                    mangle: {
                        except: ['jQuery']
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'assets/js/',
                    src: ['*.js', '!*min.js'],
                    dest: 'assets/js/',
                    ext: '.min.js'
                }]
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: '0.0.0.0',
                    base: '.',
                    debug: true,
                    livereload: true
                }
            }
        },
        watch: {
            styles: {
                files: ['assets/less/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['uglify'],
                options: {
                    nospawn: true
                }
            },
            livereload: {
                files: ['assets/**/*.*', 'index.html'],
                options: {
                    nospawn: true,
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['connect', 'watch']);
};