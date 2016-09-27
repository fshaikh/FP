// File to configure/define GRUNT tasks

module.exports = function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),

        // JSHint configuration
        jshint:{
            options:{
                force : false, // do not continue with the next task if linting produces errors
                curly:true ,    // always put curly braces around blocks in loops and conditionals. JavaScript allows you to omit curly braces when the block consists of only one statement.
                eqeqeq : true ,  // prohibits the use of == and != in favor of === and !==
                forin:true ,      // requires all for in loops to filter object's items
                freeze:true      // prohibits overwriting prototypes of native objects such as Array, Date and so on.
            },
            files:['../src/Code/*.js']  // Specify the files to run the linter on
        },

        // jasmine configuration
        jasmine: {
            all: {
                src: [
                    '../src/Code/*.js',  // location of javascript files
                ],
                options: {
                    'specs': ['../src/Tests/FP-spec.js','../src/Tests/FPUtil-spec.js'] // location of spec files
                }
            }
        },

        // clean configuration
        clean:{
            options:{
                force:true   // When the files/folders to be cleaned are outside the current working directory, clean plugin doesnt allow that. Set force to true to allow deleting
            },
            build:['../build/*.*'], // path of the folder/files to be cleaned
            
        },

        // uglify configuration
        uglify: {
            development:{
                files:[{
                        expand:true,
                        cwd:'../src/Code/', // current working directory
                        src:['**/FP-0.1.0.js'], // what files to minify
                        dest:'../build/', // destination folder where the minified files will be copied
                       // ext:'.min.js'   // This has a bug. Don't use it
                    }]
            },
            options:{
                mangle:true,
                compress:{
                    drop_console:true // drops all references to console from the minified file
                }
            }
        },

        // replace configuration
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'CODE',
                            replacement: '<%= grunt.file.read("../src/Code/FP-0.1.0.js") %>'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ["../build/FPModule-0.1.0.js"],
                        dest: "../build/"
                    }
                ]
            }
       },

        // copy configuration
        copy:{
            dev:{
                files:[{
                        expand:true,
                        cwd:'../src/Code/', // current working directory
                        src:'**/FPModule-0.1.0.js', // what files to copy
                        dest:'../build/', // destination folder where the minified files will be copied
                    }]
            }
        }
    });

    // load npm plugins
    grunt.loadNpmTasks("grunt-contrib-jshint"); // jshint
    grunt.loadNpmTasks('grunt-contrib-jasmine'); // jasmine
    grunt.loadNpmTasks("grunt-contrib-clean"); // clean
    grunt.loadNpmTasks("grunt-contrib-uglify"); // uglify
    grunt.loadNpmTasks('grunt-replace');        // replace
    grunt.loadNpmTasks("grunt-contrib-copy"); // copy
    
    // Register tasks. The order of tasks is as below:
    // 1. Copy the core code into FPModule js file
    // 2. linting using JSHint
    // 3. Running unit tests using jasmine
    // 4. Cleaning the build folder using clean
    // 5. Minifying the output js files using uglify
    // 6. Copy other files to output directory
    grunt.registerTask("default",['jshint','jasmine','clean','uglify','copy','replace']);
};