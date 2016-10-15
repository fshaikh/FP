# FP

Javascript library for writing object-oriented code in JS applications. Supports Node.

There are multiple ways of approaching a problem in JavaScript with different coding styles and techniques. Large application code base can quickly turn into sphagetti code which are difficult to use, read and maintain. Class-based code development is still very popular model of development using Object-Oriented Programming.

FP provides powerful capability to design and implement class-based programming using familiar OOP concepts. This helps in keeping the code: Organized, Structured, Readable and Familiar.

## Features
* Define class 
* Define instance members 
* Define instance functions 
* Define static members 
* Define static functions 
* Define constructor function to initialize the object 
* Access static members from instance functions 
* Create class instances 
* Access instance members using class instance 
* Invoke instance functions using class instance 
* Access/Invoke static members/functions 
* Automatic getter/setter functions for instance properties 
* Invoke apply* function to execute business logic before updating instance properties 
* Define inheritance chain 
* Invoke base constructors 
* Invoke base functions 
* Define members/functions in derived classes 
* Override base functions 
* Support for classes defined with namespaced-naming convention 
* Access base object functions using "base" keyword 
* Mixin for borrowing behavior 
* Define a singleton class 
* Define static class
* Prevent inheritance using “sealed” concept.
* Support function overloading 
* Use strict mode 
* Available as a Node module 
* Comprehensive test suite using Jasmine 
* Grunt support: o Linting (uses JSHint) o Minification (uses uglify) o Running unit tests

## Getting Started

### Browser-based applications
* [Development Version (0.1.0)](https://github.com/fshaikh/FP/blob/master/src/Code/FP-0.1.0.js)	26kb, Uncompressed with Comments
* [Production Version (0.1.0)](https://github.com/fshaikh/FP/blob/master/build/FP-0.1.0.js)	4kb, Minified with Uglify

* Add the following script tag:
    ```<script type="text\javscript" href="FP-0.1.0.js"></script>```
    
    #### CDN Access
    * [Production Version (0.1.0)](https://d1v87h9csg8bu5.cloudfront.net/FP-0.1.0.min.js)	4kb, Minified with Uglify
    * [Development Version (0.1.0)](https://d1v87h9csg8bu5.cloudfront.net/FP-0.1.0.js)	       26kb, Uncompressed with Comments

### Node-based applications, use
* [Standalone Module (0.1.0)](https://github.com/fshaikh/FP/blob/master/build/FPModule-0.1.0.js) 26 KB
* NPM Module - (In Development)

### Examples

* Define a class
```
FP.define('Employee',{

// Define instance properties. Each of these will get automatic getter/setter functions
config:{
    id:'',
    name:'',
    email:''
},

// define constructor. Called when an instance of the class is created using FP.create. The property values are passed in a 
// object as a parameter
constructor:function(data){
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
},

// define apply* functions. These are called when the config property is set. One can write custom business logic, for eg: validation.
// It will be passed the value being set using setName function. If the function doesnt return a value, the value of the config property
// being set will not be modified.
applyName:function(name){
    if(name === ''){
        console.log('Name cannot be empty');
    }else{
        return name;
    }
},

applyEmail:function(email){
    if(email === ''){
        console.log('Email cannot be empty');
    }else{
        return email;
    }
},

// Define instance functions
isProductive:function(){
    return true;
},
toString:function(){
    return this.name + ' ' + this.email;
},

// define static members using "static" config
static:{
    // Static Properties
    instances:1,

    // Static Functions
    setInstance:function(val){
        this.instances = val;
    },
    getInstances:function(){
        return this.instances;
    }
},
});
```
* Create class instance
```
var empObj = FP.create('Employee',{ id:1, name:'Furqan Shaikh', email:'fur@sha.com' });

// Invoke function/set properties/ static members
empObj.setEmail(''); // This should output "Email cannot be empty" since setting a config property will invoke applyEmail function, if defined
console.log(empObj.toString());
Employee.instances = 2;
console.log(Employee.getInstances());
```

* Inheritance - Use 'extend' config to configure the base class
```
 FP.define('BaseClass', {
        config:{
            sal: 5000,
            age: 30
        },
         getSal: function () {
                return 'Sal is:'+this.sal;
            }
        });
        
        FP.define('DerivedClass1', {
              extend: 'BaseClass',
            config:{
                name: 'Name',
                age: 18
            },
            getAge: function () {
                return 'Age is:'+this.age;
            }
            
        });

        FP.define('DerivedClass2', {
            extend: 'DerivedClass1',
            config:{
                test: 42
            },
            getTest: function () {
                return this.test;
            },
            
        });

        FP.define('DerivedClass3', {
            extend: 'DerivedClass2',
            config:{
                test2: 422
            },
            getTest2: function () {
                return this.test2;
            }
            
        });

        var d = FP.create('DerivedClass3');
        console.log(d.test, d.name, d.sal, d.getAge(), d.getSal(), d.getTest(), d.getTest2());
```

* Mixin - Use 'mixin' config to add behavior from other classes without inheriting from them
```
FP.define('Observable',{
    config:{
        eventId:''
    },
    fireEvent:function(){
        console.log('fire event');
    }
});

FP.define('Builder',{
    build:function(){
        console.log('build');
    }
});

FP.define('ViewController',{
    mixin:['Observable','Builder'], // add mixins
    // Object logic goes here...
});

var viewController = FP.create('ViewController');
viewController.fireEvent(); // Invoke behavior of the mixin object - For eg: Observable
viewController.build(); // Invoke behavior of the mixin object - For eg: Builder
```

* Singleton - Use 'singleton' config to define a class as a singleton
```
FP.define('Logger',{
    singleton:true,

    config:{
        logType:''
    },

    // define a constructor function which will be invoked by the framework
    constructor:function(){
        // access the config
        console.log(this.logType);
    },
   
    log:function(message){
        console.log('Logging: ' + message);
    }
});

var loggerObj1 = FP.create('Logger',{logType:'error'});
var loggerObj2 = FP.create('Logger');
loggerObj1.log('Error in fetching meta from server');
console.log(loggerObj1 === loggerObj2);
console.log(loggerObj1.logType);
console.log(loggerObj2.logType);
```

* Static class - Use 'staticClass' config to create a static class  
```
FP.define('Utility',{
        staticClass:true,

        // This functions test for NaN equality
        isNaN:function(value){
            // NaN type is surprisingly "number". If the passed in value is not a number, return
            if(typeof value !== "number"){
                return false;
            }
            // Unique charactersistic of NaN is that NaN is not equal to NaN :)
            return value !== value ? true:false;
        }
    });
console.log(Utility.isNaN(100/"a"));
console.log(Utility.isNaN(100));
```

* Function Overloading - Use 'overload' config to define overloaded functions in a class. Overloading is based on the number of arguments
```
FP.define('TestClass',{
    config:{
        id:'1'
    },
    overload:[
        // overload group  for 'get'
        {
            name:'get',
            functions:[
               function insert(){
                   console.log('get all');
                },
               function get(fn,ln){
                   console.log('Get by name: ' + this.id);
               }
            ]
        },

        {
            name:'insert',
            functions:[
                function(){
                   console.log('insert all');
                },
                function(obj){
                    console.log('inserting obj');
                }
            ]
        }
    ]
});

var obj = FP.create('TestClass');
obj.get();
obj.insert();
obj.get('furqan','shaikh');
obj.insert({name:'David'});
```

* Defining classes using Namespaced-naming convention
```
FP.define('Core.UI.Controls.ControlBase',{
             render:function(){
                console.log('render base control');
             }
        });

FP.define('Core.UI.Controls.TextFieldControl',{
             extend:'Core.UI.Controls.ControlBase',
             render:function(){
                this.base.render();   // Call base function using 'base' keyword
                console.log('render text field control');
             }
        });

var textFieldControl = FP.create('Core.UI.Controls.TextFieldControl');
textFieldControl.render();
```

* Sealed
A class can be marked as sealed i.e not allow any further inheritance by using "sealed" config.
// Expected values : true / false
```
FP.define('LogConsole',{
      sealed:true,
});

// This will throw an exception. Wrap the call in try/catch
FP.define('LogConsoleDerived',{
    extend : 'LogConsole'
});
```

### Prerequisities

To run Grunt and Jasmine Specs, you will need to install Node, NPM, Grunt and Jasmine. The node packages required for Grunt can be seen
in package.json


### Installing

A step by step series of examples that tell you have to get a development env running


## Running the tests

Unit tests(Specs) are authored using [Jasmine](jasmine.github.io).

* Run tests using browser
     1. Download the code and unzip the contents
     2. Go to <root>/src/Tests
     3. Open SpecRunner.html in browser
     4. This will run the specs and display the results in the html page

* Run tests using Grunt
    1. Ensure Node, NPM and Grunt are installed
    2. Ensure all NPM packages in package.json are installed
    3. Open Command Prompt
    4. Make the current working directory to be the root of the project
    5. Type : Build.bat
    6. This will run all the Grunt tasks including Unit Tests


## Built With

*  JavaScript 
*  Node	
*  Visual Studio Code
*  Grunt
*  Jasmine

## Contributing


## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Furqan Shaikh** - *Initial work* - [fshaikh](https://github.com/fshaikh)
* **Pankaj Shukla** - *Initial work*

## License



## Acknowledgments



	
