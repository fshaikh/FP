// Test Harness. This file contains code samples.

// Set the global scope explicitly. If not set, FP framework will determine global scope on its own.
FP.setGlobalScope(window);

// Create a Employee class
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

// Mixins

// Singleton

// Static class

// Function overloading

// Defining classes using Namespaced-naming convention

// Sealed
// A class can be marked as sealed i.e not allow any further inheritance by using "sealed" config.
// Expected values : true / false
FP.define('LogConsole',{
      sealed:true,
});

// This will throw an exception. Wrap the call in try/catch
FP.define('LogConsoleDerived',{
    extend : 'LogConsole'
});

// var testObj = FP.create('TestClass');
// FP.define('Core.UI.Controls.ControlFactory',{
//             static:{
//                 instances: 0
//             },
//              create:function(){
//                 console.log('create factory');
//              }
//         });

//         var textFieldControl = FP.create('Core.UI.Controls.ControlFactory');
//         textFieldControl.create();
//        // console.log(Core.UI.Controls.ControlFactory.instances);

// FP.define('Core.UI.Controls.ControlBase',{
//             static:{
//                 instances: 0
//             },
//              render:function(){
//                 console.log('render');
//              }
//         });
// var controlBase = FP.create('Core.UI.Controls.ControlBase');
//         controlBase.render();

// FP.define('TestSimpleClass',{
//             config:{
//                 total:100,
//                 baseVal : 1
//             },
//             applyTotal:function(total){
//                 if(total > 2000){
//                     return "error";
//                 }else{
//                     return total;
//                 }
//             },
//             static:{
//                 count:0
//             }
//         });
//         console.log(TestSimpleClass.count);

// console.log(FP.Util.isNaN(100));
// console.log(FP.Util.isNaN(100/"a"));
// console.log(FP.Util.isNaN(null));
// console.log(FP.Util.isNaN("a"));
// // Getter/Setter
//  FP.define('TestClass',{
//             config:{
//                 total:100,
//                 baseVal : 1
//             },
//             applyTotal:function(total){
//                 if(total > 2000){
//                     return "error";
//                 }else{
//                     return total;
//                 }
//             }
//         });
//         var baseObj = FP.create('TestClass');
//         baseObj.setTotal(3000);

// define the derived class
// FP.define('DerivedTestClass',{
//             extend:'TestClass',
//             config:{
//                 salary:1000
//             }
//         });
//         var derivedObj = FP.create('DerivedTestClass',{salary:2000});
        
//         console.log(derivedObj.getSalary());



//   FP.define('a', {
//         config:{
//             sal: 5000,
//             age: 30
//         },
//          getSal: function () {
//                 return 'Sal is:'+this.sal;
//             }
//         });
        
//         var a = FP.create('a');
//         console.log(a.age, a.sal);
//         console.log(a.getSal());
        
//         FP.define('b', {
//             config:{
//                 name: 'pankaj',
//                 age: 18
//             },
//             getAge: function () {
//                 return 'Age is:'+this.age;
//             },
//             extend: 'a'
//         });
//         //var b = FP.create('b');
//         //console.log(b.getAge());

//         FP.define('c', {
//             config:{
//                 test: 42
//             },
//             getTest: function () {
//                 return this.test;
//             },
//             extend: 'b'
//         });
//         FP.define('d', {
//             config:{
//                 test2: 422
//             },
//             getTest2: function () {
//                 return this.test2;
//             },
//             extend: 'c'
//         });
//         var d = FP.create('d');
//         console.log(d.test, d.name, d.sal, d.getAge(), d.getSal(), d.getTest(), d.getTest2());

// FP.define('BaseClass',{
//             config:{
//                 total:100,
//                 baseVal : 1
//             },
//             // base instance function
//             filter:function(){
//                 this.baseVal = 2;
//                 return "base";
//             },
//             getTotal:function(){

//             }
//         });
//         var val;
//         // define the derived class
//         FP.define('DerivedClass',{
//             extend:'BaseClass',
//             // override instance function
//             filter:function(){
//                 val = this.base.filter();
//             }
//         });

//         var derivedObj = FP.create('DerivedClass');
//         derivedObj.filter();

        

// FP.define('TestClass',{
//     constructor:function(){
//         console.log('ctor TestClass');
//     }
// });

// FP.define('TestClass1',{
//     extend:'TestClass',
//     constructor:function(){
//         console.log('ctor TestClass1');
//     }
// });

// var testClassObj = FP.create('TestClass1');

// FP.define('TestClass2',{
//     extend:'TestClass1',
//     constructor:function(){
//         console.log('ctor TestClass2');
//     }
// });
// var testClassObj = FP.create('TestClass2');

// FP.define('Observable',{
//     singleton:false,
//     config:{
//         eventId:''
//     },

//     // define a constructor function which will be invoked by the framework
//     constructor:function(){
//         // access the config
//         console.log(this.eventId);
//     },
//     static:{
//         instance:0
//     },
//     fireEvent:function(){
//         console.log('fire event');
//     }
// });

//var observable = FP.create('Observable',{eventId:'add'});
// var observable1 = FP.create('Observable');
// observable.fireEvent();
// console.log(observable === observable1);
// console.log(observable.eventId);
// console.log(observable1.eventId);

// FP.define('Builder',{
//     build:function(){
//         console.log('build');
//     }
// });

// FP.define('Employee',{
//     mixin:['Observable','Builder'],  // fireEvent
    
//     // instance members
//     config:{
//         firstName:'',
//         lastName:''
//     },
    
//     constructor:function(){
//         console.log('Employee');
//     },
//     // instance functions
//     getFullName:function(){
//         console.log("Employee instances: " + Employee.instances);
//         return this.firstName + ' ' + this.lastName;
//     },

//     setFirstName : function(firstName){
//         this.firstName = firstName;
//     },

//     static:{
//         instances:1,

//         setInstance:function(val){
//             this.instances = val;
//         },
//         getInstances:function(){
//             return this.instances;
//         }
//     }
// });

// FP.define('Manager',{
//     extend:'Employee',
//     mixin:'Observable',  // fireEvent
//     // instance members
//     config:{
//         salary:''
//     },
    
//     // instance functions
//     isProductive : function(){
//             return false;
//     }
// });

// FP.define('Executive',{
//     extend:'Manager',
//     mixin:'Observable',  // fireEvent
//     // instance members
//     config:{
//         stocks:''
//     },
    
//     // instance functions
//     getStocks : function(){
//             return 2000;
//     }
// });

// console.log(FP.getClasses());

// // FP.define('Product',{
// //     extend:'Person',
// //     mixin:'Observable',  // fireEvent
// //     // instance members
// //     config:{
// //         id:'',
// //         name:'',
// //         price:0
// //     },
    
// //     // instance functions
// //     getProduct:function(){
// //         return this.name + ' ' + this.price;
// //     },

// //     setPrice : function(price){
// //         this.price = price;
// //     }
// // });

// // var product = FP.create('Product',{
// //     id:'1',
// //     name:'babolat',
// //     price:100
// // });

// // console.log(product.getProduct());




// // var employee = FP.create('Employee',{
// //     firstName:'furqan',
// //     lastName:'shaikh'
// // });

// // employee.fireEvent();
// // employee.build();
// // Employee.setInstance(3);
// // console.log(Employee.getInstances());
// // console.log(employee.getFullName());
// // employee.setFirstName('Sana');
// //  console.log(employee.getFullName());

// // var manager = FP.create('Manager',{
// //     firstName:'Michael',
// //     lastName:'Phelps',
// //     salary:2000
// // });

// // console.log(manager.getFullName());
// // console.log(manager.isProductive());

// var executive = FP.create('Executive',{
//     firstName:'Usain',
//     lastName:'Bolt',
//     salary:2000,
//     stocks:3000
// });

// // console.log(executive.getFullName());
// // console.log(executive.isProductive());
// // console.log(executive.getStocks());


// //console.log(product === employee);




// FP.define('TestClass',{
//     config:{
//         id:'1'
//     },

//     protected:{

//     },

    

//     overload:[
//         // overload group -1 
//         {
//             name:'get',
//             functions:[
//                function insert(){
//                    console.log('get all');
//                 },
//                function get(fn,ln){
//                    console.log('all ' + this.id);
//                }
//             ]
//         },

//         {
//             name:'insert',
//             functions:[
//                 function(){
//                    console.log('insert all');
//                 }
//             ]
//         }
//     ]
// });

// var obj = FP.create('TestClass');
// obj.get();
// obj.insert();
// obj.get('furqan','shaikh');




function Employee(firstName,lastName){
    this.firstName = firstName;
    this.lastName = lastName;

    //Employee.instances = Employee.instances + 1;
}

//Employee.instances = 0;
// Employee.getInstances = function(){
//     return Employee.instances;
// }

Employee.prototype.getFullName = function(){
    return this.firstName + this.lastName;
};

var funcName = {
            totalName : 'getTotal'
};
        Employee.prototype[funcName.totalName] = function(){
            console.log('done');
        };
//var e1 = new Employee('furqan','shaikh');
//var s1 = e1 instanceof Employee;

//e1.getTotal();
// // var e2 = new Employee('furqan','shaikh');
// // var e3 = new Employee('furqan','shaikh');
// // console.log("Emloyeee instances: " + Employee.getInstances());

// function Manager(firstName,lastName){
//     Employee.call(this,[firstName,lastName]);
//     this.base = this.prototype;
// }

// Manager.prototype = new Employee();
// Manager.prototype.isProductive = function(){
//     return false;
// };

// var manager = new Manager("Ian","Thorpe");
// // //console.log(manager.getFullName());
// // //console.log(manager.isProductive());

// // function Singleton(config){
// //     this.config = config;
// // }

// // Singleton.instance = null;
// // Singleton.getInstance = function(config){
// //     if(Singleton.instance){
// //         return Singleton.instance;
// //     }
// //     Singleton.instance = new Singleton(config);
// //     return Singleton.instance;
// // };

// // Singleton.prototype.getConfig = function(){
// //     return this.config;
// // };

// // var s = Singleton.getInstance("config");
// // var s1 = Singleton.getInstance("config");

// // console.log("Singleton same: " + (s === s1));

// // function Observable(){

// // }

// // var observable = function(options){
// //     this.fireEvent = function(){
// //         console.log('fire event');
// //     };
// // };

// // observable.call(Employee.prototype);



// // // filter class hierarchy check
// // var overdueFilter = FP.create('ResourceOne.view.loansource.todo.filters.period.OverduePeriodFilter');
// // var item = {
// //     data:{
// //         isCompleted:false,
// //         dueDate:new Date(),
// //         isOverDue:false
// //     }
// // };

// // console.log("Item overdue: " + overdueFilter.filter(item));

// // Tamper-proof objects

// "use strict";
// // Making objects non-extensible i.e prevent new properties/functions to be added to an objects
// // Seal an object - Non-Extensible + Cannot Delete Existing Properties
// // Freeze an object - Non-Extensible + Sealed + Cannot Modify Existing Properties

// // Frozen objects are especially useful for library authors. A very common problem with JavaScript
// // libraries is when people accidentally (or intentionally) change the main library object. Freezing the
// // main library object (or sealing) can help to prevent some of these errors.
// var Contact = {
//     Company:'ABC',
//     Address:'Vancouver'
// };

// console.log(Object.isExtensible(Contact));

// //Object.preventExtensions(Contact);
// //Object.seal(Contact);
// if(Object.freeze){
//     Object.freeze(Contact);
// }
// Contact.Priority = "Gold";
// Contact.getCompany = function(){
//     console.log('get company');
// };
// console.log(Contact.Priority);
// //Contact.getCompany();
// delete Contact.Address;
// console.log(Contact.Address);
// Contact.Address = "Bangalore";
// console.log(Contact.Address);

// function addMethod(object, name, fn){
//     var old = object[ name ];
//     object[ name ] = function(){
//         if ( fn.length == arguments.length )
//             return fn.apply( this, arguments );
//         else if ( typeof old == 'function' )
//             return old.apply( this, arguments );
//     };
// }

// function Users(){}
// addMethod(Users.prototype, "find", function(){
//   // Find all users...
//   console.log('Find all users...');
// });

// addMethod(Users.prototype, "find", function(name){
//   // Find a user by name
//   console.log('Find a user by name');
// });
// // addMethod(Users.prototype, "find", function(first, last){
// //   // Find a user by first and last name
// //   console.log(' Find a user by first and last name');
// // });



// var users = new Users();
// users.find(); // Finds all
// users.find("John"); // Finds users by name


var add = new Function("a","b","return a+ b;");
console.log(add(2,3));


