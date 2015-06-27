module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
        scripts: {
            files: ['specs/**/*.js', 'src/**/*.js'],
            tasks: ['concat', 'uglify', 'copy', 'jasmine']
        }
    },

    jasmine: {
        src: 'src/**/*.js',
        options: {
            specs: 'specs/**/*-spec.js',
            helpers: 'specs/**/*-helper.js'
        }
    },

    concat: {
        options: {
            separator: ';'
        },
        dist: {
            src: [
              'src/cornerstone.js'
              // TODO(jwwishart) add cornerstone files here in order!
            ],
            dest: 'dest/cornerstone.js'
        }
    },

    uglify: {
        options: {
        },
        my_target: {
            files: {
                'dest/cornerstone.min.js': [
                  'src/cornerstone.js'
                ]
            }
        }
    },

    copy: {
        cs: {
            src: 'dest/cornerstone.js',
            dest: '../site/js/cornerstone.js'
        },
        csmin: {
            src: 'dest/cornerstone.min.js',
            dest: '../site/js/cornerstone.min.js'
        },
        siteFramework: {
            src: 'dest/cornerstone.js',
            dest: '../site/framework/cornerstone.js'
        }
    }

  });


  // Load Plugins
  //

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  // Tasks
  //

  grunt.registerTask('default', ['jasmine']);

};