// Test Harness. This file contains code samples.

// 1. Set the global scope explicitly. If not set, FP framework will determine global scope on its own.
FP.setGlobalScope(window);

// 2. Create a Employee class
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

// Create Employee instance
var empObj = FP.create('Employee',{
    id:1,
    name:'Furqan Shaikh',
    email:'fur@sha.com'
});

// Invoke function/set properties/ static members
empObj.setEmail(''); // This should output "Email cannot be empty" since setting a config property will invoke applyEmail function, if defined
console.log(empObj.toString());
Employee.instances = 2;
console.log(Employee.getInstances());

// Inheritance
// Use 'extend' config to configure the base class
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





// Mixins
// Use 'mixin' config to add behavior from other classes without inheriting from them

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

// Singleton
// Use 'singleton' config to define a class as a singleton
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

// Static class
// Use 'staticClass' config to create a static class
FP.define('Utility',{
        staticClass:true,

        config:{
            EU:'EU'
        },

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

// Function overloading
// Use 'overload' config to define overloaded functions in a class. Overloading is based on the number of arguments
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

// Defining classes using Namespaced-naming convention
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


// Sealed
// A class can be marked as sealed i.e not allow any further inheritance by using "sealed" config.
// Expected values : true / false
FP.define('LogConsole',{
      //sealed:true,
});

// This will throw an exception. Wrap the call in try/catch
FP.define('LogConsoleDerived',{
    extend : 'LogConsole'
});


// LRU Cache demo
var lruCache = FP.create('FP.LRUCache',{capacity:3});
lruCache.set("1",1);
lruCache.set("2",2);
lruCache.set("3",3);
lruCache.set("4",4);


var lruCache1 = FP.create('FP.LRUCache',{capacity:3});
lruCache1.set("1",1);
lruCache1.set("2",2);
lruCache1.set("3",3);
lruCache1.set("4",4);













