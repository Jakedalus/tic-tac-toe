module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      removelogging: {
        dist: {
          src: "js/main.js",
          dest: "js/main-clean.js",

          options: {
            // see below for options. this is optional. 
          }
        }
      }
    });

  grunt.loadNpmTasks("grunt-remove-logging");

  // Default task(s).
  grunt.registerTask('default', ['removelogging']);

};