module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        coffee: {
            compile: {
                files: {
                    'dist/ember-wizard.js': [
                        'src/ember-wizard.coffee',
                        'src/dsl/step_dsl.coffee',
                        'src/mixins/step_mixin.coffee',
                        'src/routes/route.coffee',
                        'src/views/base_step_view.coffee',
                        'src/views/default_step_view.coffee'
                    ],

                    'spec/ember-wizard_spec.js': [
                        'spec/*.coffee'
                    ]
                }
            }
        },

        emblem: {
            compile: {
                files: {
                    'src/templates/javascript/templates.js': ['src/templates/emblem/*.emblem']
                },
                options: {
                    root: 'src/templates/emblem/',
                    dependencies: {
                        jquery: 'vendor/jquery.js',
                        ember: 'vendor/ember.js',
                        emblem: 'vendor/emblem.js',
                        handlebars: 'vendor/handlebars.js'
                    }
                }
            }
        },

        uglify: {
            options: { mangle: false, compress: false },

            dist: {
                src: ['dist/ember-wizard.js', 'src/templates/javascript/templates.js'],
                dest: 'dist/ember-wizard.min.js'
            }
        },

        jasmine: {
            pivotal: {
                src: [
                    'vendor/jquery.js',
                    'vendor/handlebars.js',
                    'vendor/ember.js',
                    'dist/ember-wizard.js'
                ],

                options: {
                    specs: 'spec/ember-wizard_spec.js'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-emblem');

    grunt.registerTask('default', ['emblem', 'coffee', 'uglify']);
    grunt.registerTask('spec', ['coffee', 'jasmine:pivotal']);
    grunt.registerTask('spec-browser', ['coffee', 'jasmine:server']);
};