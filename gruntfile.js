module.exports = function (grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    // Add a 'global' opts object that we can access in each task...
    opts: {
      date: grunt.template.today('yyyymmddHM')
    },
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: ['_site/assets/*.css'],
        tasks: ['cssmin']
      }
    },
    concat: {
      dist: {
        src: [
          'node_modules/lory.js/dist/lory.js',
          'bower_components/priority-nav/dist/priority-nav.js',
          'js/tp.js'
        ],
        dest: '_assets/js/tp.js'
      }
    },
    uglify:{
      target: {
        files: [{
          expand: true,
          cwd: '_site/assets',
          src: ['*.js', '!*.min.js'],
          dest: '../new.tradepaints.eu/templates/tradepaints/js',
          ext: '.min.js'
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '_site/assets',
          src: ['*.css', '!*.min.css'],
          dest: '../new.tradepaints.eu/templates/tradepaints/css',
          ext: '.min.css'
        }]
      }
    }
  });
  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  // Task definition
  grunt.registerTask('minifycss', ['cssmin']);
  grunt.registerTask('minifyjs', ['uglify']);

  grunt.registerTask('default', ['concat']);

};
