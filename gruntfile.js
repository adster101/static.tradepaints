module.exports = function (grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    // Add a 'global' opts object that we can access in each task...
    opts: {
      date: grunt.template.today('yyyymmddHM')
    },
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      site: {
        files: ['css/*','js/*'],
        tasks: ['cssmin', 'concat'],
        options: {
          livereload: {
            host: 'localhost',
            port: 35729
          }
        }
      }
    },
    concat: {
      dist: {
        src: [
          'node_modules/lory.js/dist/lory.min.js',
          'js/tp.js'
        ],
        dest: '_assets/js/tp.js'
      }
    }
  });
  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  // Task definition
  grunt.registerTask('init', ['watch']);

  grunt.registerTask('default', ['concat']);

};
