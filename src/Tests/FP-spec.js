// Test Suite containing Specs for Core FP framework
describe("FPFramework",function(){
    //initCore();
    var globalScope;

    // Before any spec is run, Jasmine calls this function.
    beforeEach(function(){
        this.globalScope = this;
        FP.setGlobalScope(this.globalScope);
        sharedScope = this.globalScope;
    });

    // each test is described using "it" function

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   Basic Object Construction Specs - START
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Spec # 1 : This spec test whether the object created using FP.create is not null
    it("should test whether object created using FP.create is not null",function(){
        FP.define('TestClass');
        var testClassObj = FP.create('TestClass');
        expect(testClassObj).not.toBeNull();
    });

    // Spec# - should confirm that object created using FP.create is of type "object"
    it("should confirm that object created using FP.create is of type 'object'",function(){
        FP.define('TestClass');
        var testClassObj = FP.create('TestClass');
        expect(typeof testClassObj).toEqual("object");

        FP.define('Core.UI.TestClass');
        var testClassObj2 = FP.create('Core.UI.TestClass');
        expect(typeof testClassObj2).toEqual("object");
    });

    // Spec# - should tell whether instance of a created object is of correct type when using 'instanceof'' operator
    it("should tell whether instance of a created object is of correct type when using 'instanceof'' operator",function(){
        FP.define('TestClass');
        var testClassObj = FP.create('TestClass');
        expect(testClassObj instanceof this.globalScope.TestClass).toEqual(true);

        FP.define('Core.UI.TestClass');
        var testClassObj2 = FP.create('Core.UI.TestClass');
        expect(testClassObj2 instanceof this.globalScope.Core.UI.TestClass).toEqual(true);

        var tb3 = testClassObj.constructor();
        expect(testClassObj instanceof this.globalScope.TestClass).toEqual(true); 
    });

    //Spec# - should verify if derived object is an instance of base object
    it("should verify if derived object is an instance of base object",function(){
        FP.define('Base');
        FP.define('Derived',{
            extend:'Base'
        });

        var base = FP.create('Base');
        var derived = FP.create('Derived');

        expect(derived instanceof this.globalScope.Base).toEqual(true);
        expect(derived instanceof this.globalScope.Derived).toEqual(true);
    });

    // Spec# - should tell whether constructor of instance equals the class constructor
    it("should tell whether constructor of instance equals the class constructor",function(){
        FP.define('TestClass');
        var testClassObj = FP.create('TestClass');
        expect(testClassObj.constructor === this.globalScope.TestClass).toEqual(true);

        FP.define('Core.UI.TestClass');
        var testClassObj2 = FP.create('Core.UI.TestClass');
        expect(testClassObj2.constructor === this.globalScope.Core.UI.TestClass).toEqual(true);
    });

    

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   Basic Object Construction Specs - END
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   Instance Properties Specs - START
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Spec # 2 : should be able to configure instance property on the object
    it("should be able to configure instance property on the object",function(){
        FP.define('TestClass',{
            config:{
                instanceProp : 0
            }
        });
        var testClassObj = FP.create('TestClass',{instanceProp:100});
        expect(testClassObj.instanceProp).toBeDefined();
    });

    // Spec # 3 : should be able to retreive instance property on the object
    it("should be able to retreive instance property on the object",function(){
        FP.define('TestClass',{
            config:{
                instanceProp : 0
            }
        });
        var testClassObj = FP.create('TestClass',{instanceProp:100});
        expect(testClassObj.instanceProp).toEqual(100);
    });

    // Spec # 4 : should be able to set instance property on the object
    it("should be able to set instance property on the object",function(){
        FP.define('TestClass',{
            config:{
                instanceProp : 0
            }
        });
        var testClassObj = FP.create('TestClass',{instanceProp:100});
        testClassObj.instanceProp = 200;
        expect(testClassObj.instanceProp).toEqual(200);
    });

    // Spec # 5 : should be able to define multiple instance properties on the object
    it("should be able to define multiple instance properties on the object",function(){
        FP.define('TestClass',{
            config:{
                instanceProp : 0,
                instanceProp2: ''
            }
        });
        var testClassObj = FP.create('TestClass',{instanceProp:100,instanceProp2:'value'});

        expect(testClassObj.instanceProp).toBeDefined();
        expect(testClassObj.instanceProp2).toBeDefined();
    });

    // Spec # 6 - should be able to define instance function on the object
    it("should be able to define instance function on the object",function(){
        FP.define('TestClass',{
            
            // instance function
            getInstanceFunc : function(){

            }
        });
        var testClassObj = FP.create('TestClass');
        expect(testClassObj.getInstanceFunc).toBeDefined();
    });

    // Spec # 7- This spec tests - should be able to define multiple instance functions on the object
    it("should be able to define multiple instance functions on the object",function(){
        FP.define('TestClass',{
            
            // instance functions
            getInstanceFunc : function(){

            },
            getInstanceFunc2 : function(){

            }
        });
        var testClassObj = FP.create('TestClass');

        // Expect the instance functions are defined on the object
        expect(testClassObj.getInstanceFunc).toBeDefined();
        expect(testClassObj.getInstanceFunc2).toBeDefined();
    });

    // Spec # 8 - This spec tests - should be able to access instance members in instance function on the object
    it("should be able to access instance members in instance function on the object",function(){
        FP.define('TestClass',{

            config:{
                total:100
            },
            
            // instance function
            getInstanceFunc : function(){
                return this.total;
            }
        });
        var testClassObj = FP.create('TestClass');
        var actual = testClassObj.getInstanceFunc();
        expect(actual).toEqual(testClassObj.total);
    });

    // Spec # 9 - This spec tests - should be able to set instance members in instance function on the object
    it("should be able to access instance members in instance function on the object",function(){
        FP.define('TestClass',{

            config:{
                total:100
            },
            
            // instance function
            setInstanceFunc : function(totalVal){
                this.total = totalVal;
            }
        });
        var testClassObj = FP.create('TestClass');
        testClassObj.setInstanceFunc(1000);
        expect(testClassObj.total).toEqual(1000);
    });

    // Spec# 10 - should be able to define static property on the object
    it("10 --should be able to define static property on the object",function(){
        FP.define('TestClass',{

            config:{
                total:100
            },
            
            // instance function
            setInstanceFunc : function(totalVal){
                this.total = totalVal;
            },

            // static 
            static:{
                staticProp:100
            }
        });
        var testClassObj = FP.create('TestClass');
        // Expect the static property to be defined on the object
        expect(this.globalScope.TestClass.staticProp).toBeDefined();

    });

    // Spec# 11 - should be able to define static function on the object
    it("should be able to define static function on the object",function(){
        FP.define('TestClass',{

            config:{
                total:100
            },
            
            // instance function
            setInstanceFunc : function(totalVal){
                this.total = totalVal;
            },

            // static 
            static:{
                staticProp:100,

                staticFunc:function(){

                }
            }
        });
        var testClassObj = FP.create('TestClass');
        // Expect the static function to be defined on the object
        expect(this.globalScope.TestClass.staticFunc).toBeDefined();

    });

    // Spec# 11 - should be able to access constructor function defined on the object
    it("should be able to access constructor function defined on the object",function(){
        FP.define('TestClass',{
            config:{
                total:100
            },
            // constructor function
            constructor:function(){

            }
        });
        var testClassObj = FP.create('TestClass');
        // Expect the constructor function to be defined on the object
        expect(testClassObj.constructor).toBeDefined();
    });

    // Spec# 12 - should be able to execute constructor function defined on the object
    it("should be able to execute constructor function defined on the object",function(){
        var referenceValue = 200;
        FP.define('TestClass',{
            config:{
                total:100
            },
            // constructor function
            constructor:function(){
                this.total = referenceValue;
            }
        });
        var testClassObj = FP.create('TestClass');
        // Expect the constructor function to be defined on the object
        expect(testClassObj.total).toEqual(referenceValue);
    });

    // Spec# 12 - should be able to pass all config properties to constructor function defined on the object
    it("should be able to pass all config properties to constructor function defined on the object",function(){
        var referenceValue = 200;
        FP.define('TestClass',{
            config:{
                total:100
            },
            // constructor function
            constructor:function(props){
                this.total = props.total;
            }
        });
        var testClassObj = FP.create('TestClass',{total:200});
        // Expect the constructor function to be defined on the object
        expect(testClassObj.total).toEqual(referenceValue);
    });

    // Spec# 13 - should be able to access base property to ensure its defined on the derived object
    it("should be able to access base property to ensure its defined on the derived object",function(){
        // define the base class
        FP.define('BaseClass',{
            config:{
                total:100,
                baseVal : 1
            },
            // base instance function
            filter:function(){
                this.baseVal = 2;
            }
        });
        // define the derived class
        FP.define('DerivedClass',{
            extend:'BaseClass',
            // override instance function
            filter:function(){
                
            }
        });

        var derivedObj = FP.create('DerivedClass');
        expect(derivedObj.base).toBeDefined();
    });

    // Spec# 14 - should be able to invoke base object function from derived object using "base" property
    it("should be able to invoke base object function from derived object using base property",function(){
        // define the base class
        FP.define('BaseClass',{
            config:{
                total:100,
                baseVal : 1
            },
            // base instance function
            filter:function(){
                this.baseVal = 2;
                return "base";
            }
        });
        var val;
        // define the derived class
        FP.define('DerivedClass',{
            extend:'BaseClass',
            // override instance function
            filter:function(){
                val = this.base.filter();
            }
        });

        var derivedObj = FP.create('DerivedClass');
        derivedObj.filter();
        expect(derivedObj.baseVal).toEqual(2);
    });

    // Spec# 15 - should be able to access the default value for instance property of an object when no config is set during create
    it("should be able to access the default value for instance property of an object when no config is set during create",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });
        var testObj = FP.create('TestClass');
        expect(testObj.total).toEqual(100);
    });

   
    // Spec# 16 - should be able to derive from a parent object marked as sealed explicitly
    it("should be able to derive from a parent object marked as sealed explicitly",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            },
            sealed:false,
            getTotal:function(){
                return this.total;
            }
        });

        // define the class
        FP.define('DerivedClass',{
           extend:'TestClass'
        });
        var testObj = FP.create('DerivedClass');
        expect(testObj.getTotal()).toEqual(100);
    });

    // Spec# 17 - should be able to derive from a parent object not marked as sealed explicitly
    it("should be able to derive from a parent object not marked as sealed explicitly",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            },
            getTotal:function(){
                return this.total;
            }
        });

        // define the class
        FP.define('DerivedClass',{
           extend:'TestClass'
        });
        var testObj = FP.create('DerivedClass');
        expect(testObj.getTotal()).toEqual(100);
    });

    // Spec# 18 - should throw an exception when extending from a sealed object
    it("should throw an exception when extending from a sealed object",function(){
        // define the class
        FP.define('TestClass',{
            sealed:true,
            config:{
                total:100,
                baseVal : 1
            },
            getTotal:function(){
                return this.total;
            }
        });

        var error = "";
        try{
            FP.define('DerivedClass',{
                extend:'TestClass'
            });
        }
        catch(e){
            error = e;
        }

        
        
        expect(error).toEqual("Parent object is marked as sealed.");
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //   Specs for automatic getter functions
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Spec# 19 - should be able to define get function on a config property
    it("should be able to define get function on a config property",function(){
         // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        var testObj = FP.create('TestClass',{total:200});
        expect(testObj.getTotal).toBeDefined();
    });

    // Spec# 19 - should be able to execute get function on a config property
    it("should be able to execute get function on a config property",function(){
         // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        var testObj = FP.create('TestClass',{total:200});
        var val = testObj.getTotal();
        expect(val).toEqual(200);
    });

    // Spec# 20 - should be able to define set function on a config property
    it("should be able to define set function on a config property",function(){
         // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        var testObj = FP.create('TestClass',{total:200});
        expect(testObj.setTotal).toBeDefined();
    });

    // Spec# 21 - should be able to execute set function on a config property
    it("should be able to execute get function on a config property",function(){
         // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        var testObj = FP.create('TestClass',{total:200});
        testObj.setTotal(400);
        expect(testObj.getTotal()).toEqual(400);
    });

    // Spec# 22 - should be able to execute get function for a config property using derived object
    it("should be able to execute get function for a config property using derived object",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        // define the derived class
        FP.define('DerivedTestClass',{
            extend:'TestClass'
        });
        var derivedObj = FP.create('DerivedTestClass');
        expect(derivedObj.getTotal()).toEqual(100);
    });

    // Spec# 23 - should be able to execute sset function for a config property using derived object
    it("should be able to execute set function for a config property using derived object",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        // define the derived class
        FP.define('DerivedTestClass',{
            extend:'TestClass'
        });
        var derivedObj = FP.create('DerivedTestClass');
        derivedObj.setTotal(500);
        expect(derivedObj.getTotal()).toEqual(500);
    });

    // Spec# 24 - should be able to define get function for a derived config property
    it("should be able to define get function for a derived config property",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        // define the derived class
        FP.define('DerivedTestClass',{
            extend:'TestClass',
            config:{
                salary:1000
            }
        });
        var derivedObj = FP.create('DerivedTestClass');
        expect(derivedObj.getSalary).toBeDefined();
    });

    // Spec# 25 - should be able to execute get function for a derived config property
    it("should be able to execute get function for a derived config property",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        // define the derived class
        FP.define('DerivedTestClass',{
            extend:'TestClass',
            config:{
                salary:1000
            }
        });
        var derivedObj = FP.create('DerivedTestClass');
        expect(derivedObj.getSalary()).toEqual(1000);

        var derivedObj2 = FP.create('DerivedTestClass',{salary:2000});
        expect(derivedObj2.getSalary()).toEqual(2000);
    });

    // Spec# 26 - should be able to define set function for a derived config property
    it("should be able to define set function for a derived config property",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        // define the derived class
        FP.define('DerivedTestClass',{
            extend:'TestClass',
            config:{
                salary:1000
            }
        });
        var derivedObj = FP.create('DerivedTestClass');
        expect(derivedObj.setSalary).toBeDefined();
    });

    // Spec# 27 - should be able to execute set function for a derived config property
    it("should be able to execute set function for a derived config property",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        // define the derived class
        FP.define('DerivedTestClass',{
            extend:'TestClass',
            config:{
                salary:1000
            }
        });
        var derivedObj = FP.create('DerivedTestClass');
        derivedObj.setSalary(2000);
        expect(derivedObj.getSalary()).toEqual(2000);
    });

    // This test is not required since we will not support injecting get/set functions on nested config properties
    // // Spec# 28 - should be able to define get function on a nested config property
    // it("should be able to define get function on a nested config property",function(){
    //      // define the class
    //     FP.define('TestClass',{
    //         config:{
    //             total:100,
    //             baseVal : 1,
    //             nested:{
    //                 prop1:100
    //             }
    //         }
    //     });

    //     var testObj = FP.create('TestClass',{total:200});
    //     expect(testObj.getNested).toBeDefined();
    //     expect(testObj.getNested.getProp1).toBeDefined();
    // });

    // Spec# 29 - should be able to read nested property using the parent object
    it("should be able to read nested property using the parent object",function(){
         // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1,
                nested:{
                    prop1:100
                }
            }
        });

        var testObj = FP.create('TestClass',{total:200});
        expect(testObj.getNested().prop1).toEqual(100);
    });

     // Spec# 30 - should define set function on config property which has nested objects
    it("should be able to read nested property using the parent object",function(){
         // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1,
                nested:{
                    prop1:100
                }
            }
        });

        var testObj = FP.create('TestClass',{total:200});
        expect(testObj.setNested).toBeDefined();
    });

    // Spec# 31 - should set nested object using set function
    it("should be able to read nested property using the parent object",function(){
         // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1,
                nested:{
                    prop1:100
                }
            }
        });

        var testObj = FP.create('TestClass',{total:200});
        testObj.setNested({prop1: 500});
        expect(testObj.getNested().prop1).toEqual(500);
    });

    // Spec# 32 - should be able to call apply* function when setting config property with apply* not returning a value
    it("should be able to check if apply function is defined on the object in FP.define",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                approvedValue:2000,
                baseVal : 1
            },
            applyTotal:function(total){
                if(total > 2000){
                    console.log('Total must be less than 2000');
                }else{
                    return total;
                }
            },

            applyApprovedValue:function(val){
                if(val > 10000){
                    console.log('Cannot approve value more than 5000');
                }else{
                    return val;
                }
            }
        });

        var testObj = FP.create('TestClass',{total:200,approvedValue:3000});
        testObj.setTotal(3000);
        testObj.setApprovedValue(11000);
        expect(testObj.getTotal()).toEqual(200);
        expect(testObj.getApprovedValue()).toEqual(3000);
    });

    // Spec# 33 - should be able to call apply* function when setting config property with apply* returning a value
    it("should be able to check if apply function is defined on the object in FP.define",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            },
            applyTotal:function(total){
                if(total > 2000){
                    console.log('Total must be less than 2000');
                }else{
                    return total;
                }
            }
        });

        var testObj = FP.create('TestClass',{total:200});
        testObj.setTotal(1000);
        expect(testObj.getTotal()).toEqual(1000);
    });

    // Spec# 34 - should set the value of the config property to the one sent by user when no apply* function is defined on the object
    it("should set the value of the config property to the one sent by user when no apply* function is defined on the object",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        var testObj = FP.create('TestClass',{total:200});
        testObj.setTotal(1000);
        expect(testObj.getTotal()).toEqual(1000);
    });

    // Spec# 35 - should set the value of the nested config property to the one sent by user apply* function defined on the object does not return a value
    it("should set the value of the nested config property to the one sent by user apply* function defined on the object does not return a value",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1,
                address:{
                    city:'Bombay',
                    map:{
                        lat:'103.24',
                        lon:'45.65'
                    }
                }
            },
            
            applyAddress:function(address){
                if(!address.map){
                    console.log('Address must have geo data');
                }else{
                    return address;
                }
            }
        });

        var testObj = FP.create('TestClass',{total:200});
        testObj.setAddress({city:'Bangalore'});

        expect(testObj.getAddress().city).toEqual('Bombay');
    });

    // Spec# 36 - should set the value of the nested config property to the one sent by user apply* function defined on the object returns a value
    it("should set the value of the nested config property to the one sent by user apply* function defined on the object returns a value",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1,
                address:{
                    city:'Bombay',
                    map:{
                        lat:'103.24',
                        lon:'45.65'
                    }
                }
            },
            
            applyAddress:function(address){
                if(!address.map){
                    console.log('Address must have geo data');
                }else{
                    return address;
                }
            }
        });

        var testObj = FP.create('TestClass',{total:200});
        testObj.setAddress({city:'Bangalore',map:{lat:'',lon:''}});

        expect(testObj.getAddress().city).toEqual('Bangalore');
    });

    // Spec# 37 - should define _className property on object
    it("should define _className property on object",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        var testObj = FP.create('TestClass',{total:200});
        expect(testObj._className).toBeDefined();
    });

    // Spec# 38 - should return name of the class when using _className property on the object
    it("should return name of the class when using _className property on the object",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        var testObj = FP.create('TestClass',{total:200});
        expect(testObj._className).toEqual('TestClass');
    });

    // Spec# 39 - should return name of the derived class when using _className property on the derived object
    it("should return name of the class when using _className property on the object",function(){
        // define the class
        FP.define('TestClass',{
            config:{
                total:100,
                baseVal : 1
            }
        });

        FP.define('DerivedClass',{
            extend:'TestClass'
        });

        var testObj = FP.create('DerivedClass',{total:200});
        expect(testObj._className).toEqual('DerivedClass');
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Specs for FP root object freeze
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // Spec# 40 - should not be able to add property/function to FP root object
    it("should not be able to add property/function to FP root object",function(){
        FP.newProp = "New Property";
        FP.newFunc = function(){
            console.log('New func');
        }

        expect(FP.newProp).not.toBeDefined();
        expect(FP.newFunc).not.toBeDefined();
    });

    // Spec# 41 - should not be able to delete property/function from FP root object
    it("should not be able to delete property/function from FP root object",function(){
        delete FP.define;

        expect(FP.define).toBeDefined();
    });

    // Spec# 42 - should not be able to modify existing properties.functions defined on FP root object
    it("should not be able to modify existing properties.functions defined on FP root object",function(){
        FP.define = "define";

        expect(typeof FP.define).toEqual("function");
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Specs for mixin - START
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // Spec# 43 : should be able to access mixin function
    it("should be able to access mixin function",function(){
        FP.define('Observable',{
            fireEvent:function(){

            }
        });

        FP.define('TestClass',{
            mixin:['Observable']
        });

        var testObj = FP.create('TestClass');
        expect(testObj.fireEvent).toBeDefined();
    });

    // Spec# 44 : should be able to invoke mixin function
    it("should be able to invoke mixin function",function(){
        FP.define('Observable',{
            fireEvent:function(){
                return "OK";
            }
        });

        FP.define('TestClass',{
            mixin:['Observable']
        });

        var testObj = FP.create('TestClass');
        expect(testObj.fireEvent()).toEqual("OK");
    });

    // Spec# 45 : should be able to define multiple mixins
    it("should be able to define multiple mixins",function(){
        FP.define('Observable',{
            fireEvent:function(){
                return "OK";
            }
        });

        FP.define('EventEmitter',{
            emit:function(){
                return "Emit";
            }
        });

        FP.define('TestClass',{
            mixin:['Observable','EventEmitter']
        });

        var testObj = FP.create('TestClass');
        expect(testObj.fireEvent()).toEqual("OK");
        expect(testObj.emit()).toEqual("Emit");
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Specs for mixin - END
    ////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Specs for static class - START
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Spec# - should be able to define static class
    it("should be able to define static class",function(){
        // define a static class
        FP.define("TestStaticClass",{
            staticClass:true,

            // static functions. No need to define under static config
            isNaN:function(){

            }
            
        });

        expect(this.globalScope.TestStaticClass).toBeDefined();
    });

    // Spec# - should be able to define static functions
    it("should be able to define static functions",function(){
        // define a static class
        FP.define("TestStaticClass",{
            staticClass:true,

            // static functions. No need to define under static config
            isNaN:function(){
                console.log('isnan invoked');
            }
            
        });

        expect(this.globalScope.TestStaticClass.isNaN).toBeDefined();
    });

    // Spec# - should be able to execute static functions
    it("should be able to execute static functions",function(){
        var tempVar = 10;
        // define a static class
        FP.define("TestStaticClass",{
            staticClass:true,

            // static functions. No need to define under static config
            isNaN:function(){
                return 20;
            }
            
        });

        expect(this.globalScope.TestStaticClass.isNaN()).toEqual(20);
    });

    // Spec# - should be able to define static members
    it("should be able to define static members on a static class",function(){
        var tempVar = 10;
        // define a static class
        FP.define("TestStaticClass",{
            staticClass:true,

            config:{
                EU:'EU'
            },
            // static functions. No need to define under static config
            isNaN:function(){
                return 20;
            }
            
        });

        expect(this.globalScope.TestStaticClass.EU).toEqual('EU');
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Specs for static class - END
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // Spec# - should be able to define classes with namespaced naming convention
    it("should be able to define classes with namespaced naming convention",function(){
        FP.define('Core.UI.Controls.ControlBase',{
            config:{
                id:'',
                required : false
            },

            render:function(){
                console.log('base control renderer');
            }
        });

        FP.define('Core.UI.Controls.TextFieldControl',{
            extend:'Core.UI.Controls.ControlBase',
             render:function(){
                 this.base.render();
                 console.log('Text field control renderer');
                 this.required = true;
             }
        });

        var textFieldControl = FP.create('Core.UI.Controls.TextFieldControl',{
            id:'100'
        });

        expect(textFieldControl.getId()).toEqual('100');
        textFieldControl.render();
        expect(textFieldControl.getRequired()).toEqual(true);
    });

    // Core.ControlsFactory - Core not defined
     it("should be able to define classes with namespaced naming convention",function(){
        FP.define('Core.ControlsFactory',{
            static:{
                instances: 0
            },
             create:function(){
                console.log('create factory');
             }
        });

        var textFieldControl = FP.create('Core.ControlsFactory');

        expect(this.globalScope.Core).toBeDefined();
        expect(this.globalScope.Core.ControlsFactory).toBeDefined();
    });

    // Core.ControlsFactory - Core defined
    // Core.ControlsFactory - Core defined with class

    // Spec# - should be able to access static property for class defined with namespaced naming convention
    it("should be able to access static property for class defined with namespaced naming convention",function(){
        FP.define('Core.ControlsFactory',{
            static:{
                instances: 0
            },
             create:function(){
                console.log('create factory');
             }
        });

        var textFieldControl = FP.create('Core.ControlsFactory');

        expect(this.globalScope.Core.ControlsFactory.instances).toEqual(0);
    });

    // Spec# - should be able to access constructor function defined on the object with namespaced naming convention
    it("should be able to access constructor function defined on the object with namespaced naming convention",function(){
        FP.define('Core.UI.Controls.ControlBase',{
            // constructor function
            constructor:function(){

            }
        });
        var testClassObj = FP.create('Core.UI.Controls.ControlBase');
        // Expect the constructor function to be defined on the object
        expect(testClassObj.constructor).toBeDefined();
    });

    // Spec# - should be able to execute constructor function defined on the object with namespaced naming convention
    it("should be able to execute constructor function defined on the object with namespaced naming convention",function(){
        var referenceValue = 200;
        FP.define('Core.UI.Controls.ControlBase',{
            config:{
                total:100
            },
            // constructor function
            constructor:function(){
                this.total = referenceValue;
            }
        });
        var testClassObj = FP.create('Core.UI.Controls.ControlBase');
        // Expect the constructor function to be defined on the object
        expect(testClassObj.total).toEqual(referenceValue);
    });

    // Spec#  - should be able to access base functions on objects with namespaced naming convention
    it("should be able to access base functions on objects with namespaced naming convention",function(){
        // define the base class
        FP.define('Core.UI.Controls.ControlBase',{
            // base instance function
            render:function(){
                return 100;
            }
        });
        // define the derived class
        FP.define('Core.UI.Controls.TextFieldControl',{
            extend:'Core.UI.Controls.ControlBase',
        });

        var textFieldControl = FP.create('Core.UI.Controls.TextFieldControl');
        expect(textFieldControl.render()).toEqual(100);
    });

    // Spec#  - should be able to access base functions on objects with normal naming convention
    it("should be able to access base functions on objects with normal naming convention",function(){
        // define the base class
        FP.define('ControlBase',{
            // base instance function
            render:function(){
                return 100;
            }
        });
        // define the derived class
        FP.define('TextFieldControl',{
            extend:'ControlBase',
        });

        var textFieldControl = FP.create('TextFieldControl');
        expect(textFieldControl.render()).toEqual(100);
    });

    // Spec# - should create a deep clone of reference properties deifned in config
    it("should create a deep clone of reference properties deifned in config",function(){
        FP.define('Promise',{
            // base instance function
            config:{
                successArray:[]
            }
        });

        var promise1 = FP.create('Promise');
        promise1.successArray.push(1);

        var promise2 = FP.create('Promise');
        promise2.successArray.push(12);

        expect(promise1.successArray.length).toEqual(1);
        expect(promise2.successArray[0]).toEqual(12);
    });

    // Spec# - should confirm if 'has' function is defined on the object
    it("should confirm if 'has' function is defined on the object",function(){
        FP.define('Core.UI.FieldBase');

        var fieldBase = FP.create('Core.UI.FieldBase');

        expect(fieldBase.has).toBeDefined();
    });

    // Spec# - should confirm if config property is defined on the object by using 'has' function
    it("should confirm if config property is defined on the object by using 'has' function",function(){
        FP.define('Core.UI.FieldBase',{
            config:{
                age:10,
                year:1984
            }
        });
        var fieldBase = FP.create('Core.UI.FieldBase');

        expect(fieldBase.has('age')).toEqual(true);
        expect(fieldBase.has('email')).toEqual(false);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Specs for Function Overloading - START
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Spec# - should invoke overloaded function
    it("should invoke overloaded function",function(){
        FP.define('TestClass',{
            config:{
                id:'1'
            },
            overload:[
                // overload group  for 'get'
                {
                    name:'get',
                    functions:[

                    function get(){
                        console.log('get all');
                        },
                    function get(fn,ln){
                        console.log('Get by name: ' + this.id);
                        return this.id;
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

        var testObj = FP.create('TestClass');
        expect(testObj.get).toBeDefined();
        expect(testObj.insert).toBeDefined();
        expect(testObj.get('f','s')).toEqual("1");
    });

    // More Specs to follow
});