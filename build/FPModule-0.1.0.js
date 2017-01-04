module.exports = (function () {
   
// Usage:

// 1. Set global scope explicitly using setGlobalScope function
// FP.setGlobalScope(window);   // If running in browser environment
// FP.setGlobalScope(GLOBAL);   // If running in node environment
// FP.setGlobalScope(this);     // If running in test frameworks


// 2. Define a class. Class name must be a valid JavaScript variable 
// FP.define('ClassName',{
//     // declare whether class is singleton. Valid Values : true/false
//     singleton:false,

//     // declare base class using 'extend' property. Must be a valid and existing class
//     extend:'BaseClassName',

//     // declare list of classes to be used for mixins using 'mixin' property. Array containing class names . Must be a valid and existing class
//     mixin:[], 

//     // Mark the object as sealed so that no objects can derive from
//     sealed: true/false,  // Throws an exception

//     // Mark the class as static to define a static class
//     staticClass: true/false,

//     // Define Instance Properties using 'config'.
//     config:{
//         instanceMember:''
//     },

//     // Define Instance functions
//     instanceFunc:function(){},

//     // Define Static properties and functions using 'static'
//     static:{
//         // Static Properties
//         instances:1,

//         // Static Functions
//         setInstance:function(val){
//             this.instances = val;
//         },
//         getInstances:function(){
//             return this.instances;
//         }
//     }

// });

// 3. Create a class instance
// var classObj = FP.create('ClassName',{
//                     // Pass instance properties here
//                     instanceMember:''
//                });
// 3. Invoke Instance functions
// 4. Access static properties
// 5. Invoke static functions
// 6. Access base class functions/properties
// 7. Invoke mixin functions



// root namespace
var FP = FP || {};

(function(root){
    "use strict";
    
    // data structure to hold all class definitions.
    var classesCache = {};

    // stores the global scope
    var globalScope = null;

    // proxy function name for user-defined constructor function
    var ctorProxyName = "constructorProxy";

    // Prefixes for getter/setter/apply functions
    var getterFunctionPrefix = "get";
    var setterFunctionPrefix = "set";
    var applyFunctionPrefix = "apply";

    // Type constant
    var arrayType = '[object Array]';
    var objectType = '[object Object]';

    var _version = "0.1.0"; // Current FP version
   

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //    private  functions - START
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Returns the global scope based on the hosting environment
    var getGlobalScope = function(){
        if(globalScope){
            return globalScope;
        }

        // if node, return GLOBAL. if browser environment, return self (self is an alias for window object. For web worker support, use self) . Ref:https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
        globalScope = ((typeof self === "object" && self.self === self && self) ||
                (typeof global === "object" && global.global === global && global));

        return globalScope;
    };


    // Helper method to create constructor for base/derived classes
    var getConstructor = function(className,options,isExtend){
        var ctor;
        if(isExtend){
            ctor =  createChildConstructor(className,options.extend);
        }else{
            ctor =  createConstructor(className);
        }
        // set the class name. Setting on prototype rather than on each instance
        ctor.prototype._className = className;

        // add default config properties on prototype
        if(options && options.config){
            addProperties(ctor.prototype,options.config);
        }
        return ctor;
    };

    // Helper method to create constructor function
    var createConstructor = function(className){
        var constructorFunction = function (data){
                // apply defaults - This is no longer required since we are now adding the default config properties at prototype and create time properties at object level.
                // data = applyDefaults(className,data);

               // add instance members
               addProperties(this,data);

               // invoke the constructor if its defined
               invokeConstructor(this,data);
        };
        return constructorFunction;
    };


    // Helper method to create derived constructor function
    var createChildConstructor = function(className,parentClassName){
        // get the parent class name
        var parentClassObject = getClassObject(parentClassName);
        if(parentClassObject){
            // constructor function for derived objects
            var constructor = function(data){
                // apply defaults
                // data = applyDefaults(className,data);

                // Constructor stealing to invoke base object constructor
                parentClassObject.data.ctor.call(this,data);

                // set the class name
                this._className = className;

                //inject "base" instance property on the derived object. This will refernece the base objects prototype
                this.base = getPrototype(getPrototype(this));
            };
            // Setup the prototype chain. Set the prototype to the parent instance
            constructor.prototype = getBasePrototype(parentClassObject);//
            return constructor;
        }
    };

    

    // This function invokes the constructor function defined on the object
    var invokeConstructor = function(obj,data){
        // If no constructor is defined , return early
        if(!obj[ctorProxyName]){
            return;
        }
        obj[ctorProxyName].call(obj,data);
    };

    // helper function to get the class object from the classes data structure.
    var getClassObject = function(className){
        var classObject = classesCache[className];
        return classObject;
    };

    // This function adds the class object to the cache
    var addClassObject = function(classObject){
        classesCache[classObject.className] = classObject;
    };

    // Helper method to add instance functions
    var addInstanceFunctions = function(ctor,options){
        addFunctions(ctor.prototype,options);

        // inject getter/setter functions for all config properties
        if(options && options.config){
            injectGetSetFunctions(ctor.prototype,options.config);
        }

        // inject 'has' function on each prototpye
        injectHasFunction(ctor.prototype);
    };

    // Helper function to add static properties and static functions
    var addStaticMembers = function(className,ctor,options){
        var staticConfig = options? options.static : null;
        // If no static present, return early
        if(!staticConfig){
            return;
        }
        
        addStaticProperties(ctor,staticConfig);
        addStaticFunctions(ctor,staticConfig);

        // get global scope
        //getGlobalScope()[className] = ctor;
    };

    // Helper method to add static properties
    var addStaticProperties = function(ctor,options){
        addProperties(ctor,options);
    };

    // Helper method to add static functions
    var addStaticFunctions = function(ctor,options){
        addFunctions(ctor,options);
    };

    // Helper method to add mixin
    var addMixin = function(destinationObj,options){
        // if no mixin is configured, return early
        if(!options || !options.mixin){
            return;
        }
        
        var mixins = options.mixin; // Array of mixins
        var length = mixins.length;
        for(var i=0; i<length;i++){
            addMixinCore(mixins[i],destinationObj.prototype);
        }
    };

    // Core mixin function to configure the mixin
    var addMixinCore = function(source,destinationObj){
        // Get the class object definition for the mixin
        var mixinSource = getClassObject(source);
        // if not defined, return early
        if(!mixinSource){
            return;
        }
        
        // get the source object functions
        var sourceObj = mixinSource.data.options;
        for(var func in sourceObj){
            if(sourceObj.hasOwnProperty(func)){
                // copy to destination object
                destinationObj[func] = sourceObj[func];
            }
        }
    };

    // This function sets the object as a singleton
    var setAsSingleton = function(ctor,options){
        if(!options || !options.singleton || options.singleton === false){
            return;
        }
        
        // What pattern to follow can be decided based on a strategy. The current strategy is to use "Classic Singleton" pattern
        applyClassicSingletonStrategy(ctor,options);
    };

    // This function makes an object as singleton by applying "Classic Singleton" pattern
    var applyClassicSingletonStrategy = function(ctor,options){
        // 1. add instance static property
        ctor.instance = null;
        // 2. add getInstance static function
        ctor.getInstance = function(options){
                var instance = ctor.instance;
                if(ctor.instance){
                    return ctor.instance;
                }
                ctor.instance = createInstance(ctor,options);
                return ctor.instance;
         };
    };

    // This function creates object instance for the passed in object and options
    var createInstance = function(obj,options){
        return new obj(options);
    };
   

    // Helper function to add functions to a source object
    var addFunctions = function(sourceObj,options){
        for(var property in options){
            if(options.hasOwnProperty(property) && typeof options[property] === "function"){
                if(property === "constructor"){
                    sourceObj[ctorProxyName] = options[property];
                }else{
                    sourceObj[property] = options[property];
                }
            }
        }
    };

    // Helper function to add properties to a source object
    var addProperties = function(sourceObj,options){
        for(var property in options){
             if(options.hasOwnProperty(property)){
                 sourceObj[property] = options[property];
                //Do a deep copy using "structured deep clone" algorithm.
                //sourceObj[property] = deepClone(options[property]);
             }
        }
    };

    // This function applies default values of instance properties when they are not explicitly set during create.
    // If user has defined default values for the instance properties and they are not overrien in create, we need to set the default values for such properties.
    // For eg: 
    // config:{
                // prop1: 'val1',
                // prop2: 0
            //}
    // FP.create('',{prop2:100});
    // prop1 must be set to val1 and not undefined.
    var applyDefaults = function(className,data){
            // get the class definition from the cache 
            var classObject = classesCache[className];
            // set the config value
            var configProperties = classObject.data.options ? classObject.data.options.config:null;
            // If the user has not set any config in create, handle it
            data = data || {};
            if(configProperties){
                // iterate all the defined properties
                for(var property in configProperties){
                     if(!configProperties.hasOwnProperty(property)){
                         continue;
                     }
                     // check if the user has provided the property in config
                     if(data.hasOwnProperty(property)){
                         continue;
                     }
                     // user has not defined so add with the default values
                     data[property] = configProperties[property];
                }
           }
           return data;
    };

    // This function determines if the parent class is marked as sealed. If it is do not allow the class to be defined
    var isParentSealed = function(className,options){
        // get parent class object
        var parentClassObject = classesCache[options.extend];
        if(!parentClassObject){
            return true;
        }

        // check if parent is marked as sealed
        if(parentClassObject.data.options && parentClassObject.data.options.sealed){
            return true;
        }
        return false;
    };

    // This function injects getter functions for all config properties defined on the object
    var injectGetSetFunctions = function(sourceObj,configProps){
        if(!configProps || typeof configProps !== "object"){
            return;
        }
        for(var property in configProps){
            if(!configProps.hasOwnProperty(property)){
                continue;
            }

            // make it camel casing
            var camelCaseProperty = property;
            camelCaseProperty = camelCaseProperty.replace(camelCaseProperty.charAt(0),camelCaseProperty.charAt(0).toLocaleUpperCase());

            // add getter function
            var getterFunctionName = getterFunctionPrefix + camelCaseProperty; 
            sourceObj[getterFunctionName] = getGetterFunction(property);

            // add setter function
            var setterFunctionName = setterFunctionPrefix + camelCaseProperty;
            sourceObj[setterFunctionName] = getSetterFunction(property,camelCaseProperty);

            injectGetSetFunctions(sourceObj,configProps[property]);
        }
    };

    // Returns getter function implementation
    var getGetterFunction = function(property){
        return function(){
            return this[property];
        };
    };

    // Returns setter function implementation
    var getSetterFunction = function(property,camelCasePropertyName){
        return function(value){
            // variable to hold the new value
            var newVal = value;
            // check if apply* is defined on the object
            var applyFunctionName = applyFunctionPrefix + camelCasePropertyName;
            if(this[applyFunctionName]){
                // invoke the apply* function passing the value being set by the user
                newVal = this[applyFunctionName].call(this,value);
            }
            // set the value of the config property. If the apply* function has not returned a value which implies user has business logic to not set it,
            // set to the current value in the object, else set the new value returned by the apply* function.
            this[property] = typeof newVal === "undefined" ? this[property] : newVal;
        };
    };

    // inject 'has' function. Using this clients can determine if a specific config property is defined on the object or not. 
        // NOTE: This only checks the own properties and does not navigate the prototype chain
    var injectHasFunction = function(sourceObj){
        sourceObj.has = function(propertyName){
            if(propertyName === null || propertyName === undefined){
                return false;
            }

            if(this.hasOwnProperty(propertyName)){
                return true;
            }
            return false;
        };
    };

    // This function returns the prototype of a given object. Provides polyfill in case of older JS environments
    var getPrototype = function(obj){
        var proto;
        // First resolution is to use standard ES5 function for retrieving the prototype of an object
        if(typeof Object.getPrototypeOf !== "undefined"){
            proto = Object.getPrototypeOf(obj);
        }else{
            // Polyfill(nonstandard mechanism) for retrieving the prototype of an object. Linters will flag the use of __proto__. Hence explicit ignoring the line
            proto = obj.__proto__;   // jshint ignore:line
        }

        return proto;
    };

    // This function returns the prototype object to be set to derived object to set up inheritance(prototype chain). Provides polyfill in case of older JS environments
    var getBasePrototype = function(parentClassObject){
        var parentPrototypeObj;
        if(typeof Object.create === "undefined"){
            parentPrototypeObj = new parentClassObject.data.ctor();
        }else{
            parentPrototypeObj = Object.create(parentClassObject.data.ctor.prototype);
        }
        return parentPrototypeObj;
    };

    // This function defines a static class
    var defineStaticClass = function(className,options){
        // create the constructor function
        var ctor = getConstructor(className,options,false);

        // add static members
        addStaticProperties(ctor,options.config);

        // add static functions
        addStaticFunctions(ctor,options);

        // register the static class definition
        registerClassDefinition(className,ctor,options);

        // register all the objects if class is defined using namespaced-naming convention
       registerNamespaceClasses(className,options,ctor);
    };

    // This function adds overloaded functions
    var addOverloadFunctions = function(className,ctor,options){
        // If no options defined or overload config, return early
        if(!options || !options.overload){
            return;
        }

        var overloadConfig = options.overload;
        addOVerloadFunctionCore2(overloadConfig,className,ctor.prototype);
    };

    // This function adds the overloads using the cache approach. 
    // 1. Create a cache object in the source object
    // 2. Add the key as the overload group name and value as the array of object {length, fn}
    // 3. Add an interceptor for each overload group
    // 4. When client invokes the overload function, interceptor gets invoked. 
    // 5. Retreive the callee details and lookup the function in the cache using the callee as the lookup key
    // This approach cannot be used when using strict mode since arguments.callee and arguments.caller are deprecated and throw TypeError.
    // var addOverloadFunctionCore1 = function(overloadConfig,className,sourceObj){
    //     sourceObj.overloadCache = {};
    //     for (var index = 0; index < overloadConfig.length; index++) {
    //         var funcGroup = overloadConfig[index];
    //         var overloadGroupName = funcGroup.name;
    //         var overloadFunctions = funcGroup.functions;
    //         var keyName = className + '_' + overloadGroupName;
    //         var length = overloadFunctions.length;

    //         for(var i = 0;i < length;i++){
    //                var fn = overloadFunctions[i];
                   
    //                sourceObj.overloadCache[keyName] = {
    //                    length : fn.length,
    //                    fn     : fn
    //                };

    //                sourceObj[overloadGroupName] = function(){
    //                    // this is the interceptor/dispatcher for overload functions
    //                    var key = className + fn.name;
    //                    console.log(fn.name);
    //                };
    //         }
    //     } 
    // };

    // This function adds the overloads using the scope chain/closure approach.
    var addOVerloadFunctionCore2 = function(overloadConfig,className,sourceObj){
        // iterate the overloads config
        for (var index = 0; index < overloadConfig.length; index++) {
            var funcGroup = overloadConfig[index];
            var overloadGroupName = funcGroup.name;
            var overloadFunctions = funcGroup.functions;
            var length = overloadFunctions.length;

            // Add the overload function for each defined in this overload group
            for(var i = 0;i < length;i++){
                   addOFunc(sourceObj,overloadGroupName,overloadFunctions[i]);  
            }
        } 
    };

    // This function adds the interceptor function for each of the overload group 
    var addOFunc = function(sourceObj,fnName,fnObj){
        var prevFunc = sourceObj[fnName];
        sourceObj[fnName] = function(){
            if(fnObj.length === arguments.length){
                return fnObj.apply(this,arguments);
            }else if(typeof prevFunc === "function"){
                return prevFunc.apply(this,arguments);
            }
        };
    };

    // This function registers the class definition
    var registerClassDefinition = function(className,ctor,options){
        // create the class object, passing class name, constructor, options
        var classObject = createClassObject(className,ctor,options);

        // add to the cache
        addClassObject(classObject);
    };

    // Helper method to create class object
    var createClassObject = function(className,ctor,options){
        return {
                className:className,   // class name
                data:{
                     // constructor function
                     ctor:ctor,
                     // object containing class definition (members,functions,statics,mixins,extend,etc)
                     options:options
                }
         };
    };

    // This function registers the classes which are defined using namespaced naming convention
    var registerNamespaceClasses = function(className,options,ctor){    
        var isNamespaced = className.indexOf('.') !== -1 ? true : false;
        if(!isNamespaced){
            // add to global scope and return
            getGlobalScope()[className] = ctor;
            return;
        }

       
        var classes = className.split('.');
        var length = classes.length;
        var globalScope = getGlobalScope();
        var parent = globalScope;
        for(var index = 0;index < length ;index++){
            var classId = classes[index];
            var classObject;

            if(!parent[classId]){
                parent[classId] = index === length - 1 ? ctor : {};
            }
            parent = parent[classId];
        }
    };

    // This function does a deep clone. Required when adding properties defined in config for reference types.
    // NOTE: Not tested for cyclic references  :)
    var deepClone = function(value){
      // if value is null or undefined, return the same
      if(value === null || value === undefined){
        return value;
      }

      var clonedObj, index;
      var sourceType = toString.call(value);

      // handle array types
      if(sourceType === arrayType){
          index = value.length;
          clonedObj = [];

          while(index--){
            clonedObj[index] = deepClone(value[index]);
          }
      }else if(sourceType === objectType){
        clonedObj = {};
        for(var prop in value){
          clonedObj[prop] = deepClone(value[prop]);
        }
      }

      return clonedObj || value;
    };
    

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //    private functions - END
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //    public functions - START
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // define function to create a class
    root.define = function(className, options){
        // if a class is defined as static, take charge early. Other options to be ignored.
        var isStaticClass = options? options.staticClass? true:false:false;
        if(isStaticClass){
            defineStaticClass(className,options);
            return;
        }
        var isExtend = options? options.extend ? true : false : false;

        // check if extend and parent is marked as sealed. 
        if(isExtend && isParentSealed(className,options)){
            // throw an exception
            throw "Parent object is marked as sealed.";
        }
        
        // create the constructor function
        var ctor = getConstructor(className,options,isExtend);
        
        //  add instance functions
        addInstanceFunctions(ctor,options);

        // add overloaded functions
        addOverloadFunctions(className,ctor,options);
       
       // add static members
       addStaticMembers(className,ctor,options);

       // add mixinSource
       addMixin(ctor,options);

       // add singleton,if configured
       setAsSingleton(ctor,options);

        // add the definition to the cache
        registerClassDefinition(className,ctor,options);

        // register all the objects if class is defined using namespaced-naming convention
       registerNamespaceClasses(className,options,ctor);
    };

    // factory to create objects
    root.create = function(className,options){
        var classObj = getClassObject(className);
        if(classObj){
            // if not singleton, return normal way using "new"
            if(!classObj.data.options || !classObj.data.options.singleton || classObj.data.options.singleton === false){
                return createInstance(classObj.data.ctor,options);
            }
            // Singleton object, take charge using getInstance
            return classObj.data.ctor.getInstance(options);
        }
        return null;
    };

    root.getClasses = function(){
        return classesCache;
    };

    // set global scope depending on the runtime environment. If this function is not called, the framework will try to deduce the global scope depending on the
    // runtime environment. 
    root.setGlobalScope = function(scope){
        globalScope = scope;
    };

    root.VERSION = _version;

    // Define exception classes


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //    public functions - END
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //    FP.Util - START
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    FP.define('FP.Util',{
        staticClass:true,

        // This functions test for NaN equality
        isNaN:function(value){
            // NaN type is surprisingly "number". If the passed in value is not a number, return
            if(typeof value !== "number"){
                return false;
            }
            // Unique charactersistic of NaN is that NaN is not equal to NaN :)
            return value !== value ? true:false;
        },

        // This function determines if passed in value is an integer
        isInteger : function(value){
            // if ECMAScript 6 function is available, use it
            if(Number.isInteger){
              return Number.isInteger(value);
            }

            if(value === null || value === undefined){
                return false;
            }
            
            if(typeof value !== 'number'){
              return false;
            }

            return value % 1 === 0;
        },

        // This function determines if the passed in value is an object
        // Reference - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#Using_toString()_to_detect_object_class
        isObject:function(value){
          // null is of type "object" in JS. This condition handles that scenario
          if(value === null || value === undefined){
            return false;
          }
          
          // This ia better way of testing for object type since it discards array and function types.
          return toString.call(value) === '[object Object]';
        }
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //    FP.Util - END
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //    FP.LRUCache - START
    //  Implements a cache based on Least Recently Used eviction strategy
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // This class represents node of a doubly linked list
    FP.define('FP.LRUCache.Node',{
        config:{
            key:{},
            value:{},
            previous:null,
            next:null
        }
    });

    // Class which implements a cache with LRU eviction strategy. It works the following way:
    //     All cache items are nodes of a doubly linked list
    //     For O(1) insertions/reads, hash table is used to store <cache key> : <Reference to Node in the DLL>
    
    //     1. Client sets initial capacity for the cache
    //     2. When an item is added to the cache, it is placed at the head of the list
    FP.define('FP.LRUCache',{
        config:{
            nodeEntries:{}, // map containing key as key and reference to cache Node as value
            capacity:5 ,    // cache size. When the cache size exceeds the capacity, LRU eviction is done
            head:null,
            tail:null,
            currentNodeCount:0
        },

        constructor:function(data){
            if(data == null){  // jshint ignore:line
                return;
            }
            this.capacity = data.capacity;

        },

        /**
         * Add entry to the cache.
         * key - must be a string value
         * value - any JavaScript type instance
         */
        set:function(key,value){
            var node;
            if(!this.nodeEntries.hasOwnProperty(key)){
                // If cache has reached capacity, evict LRU node
                if(this.capacity === this.currentNodeCount){
                   this._evictLRUNode();
                }

                // 1. Create the node
                node = this._createNode(key,value);
                // 2. Move the node to the start of the list
                this._moveNodeToHead(node);
                // 3. Add key entry to hash table
                this.nodeEntries[key] = node;
                this.currentNodeCount++;
            }else{
                // key already present,so replace it.
                var existingNode = this.nodeEntries[key];
                // set the value in the hash table
                existingNode.value = value;
                //   2. Move the node to the start of the list
                this._moveNodeToHead(existingNode);
            }
        },

        get:function(key){
            // check if key is present in the cache. If not return null.
            if(!this.nodeEntries.hasOwnProperty(key)){
                return null;
            }
            
            var node = this.nodeEntries[key];
            // move the node to head since its accessed most Recently
            this._moveNodeToHead(node);
            return node.value;
        },

        /**
         * Creates a node containing key and value.
         */
        _createNode:function(key,value){
            var node = FP.create('FP.LRUCache.Node');
            node.setKey(key);
            node.setValue(value);

            return node;
        },

        /**
         * Moves the recently accessed node to the head of the list
         */
        _moveNodeToHead:function(node){
            // If this is the first node, set head and tail to the node
            if(this.head === null){
                this.head = node;
                this.tail = node;
                return;
            }

            // If the node has a previous node, change the previous node's next pointer to point to node's next node.
            //         
            if(node.previous !== null){
                node.previous.next = node.next;
            }

            // If the node has next node, change its previous pointer to point to node's previous 
            if(node.next !== null)
            {
                node.next.previous = node.previous;
            }

            // If this is the tail, change the tail to be the previous node. That marks the previous node as LRU
            if(this.tail === node)
            {
                this.tail = node.previous;
            }

            // Do head pointer manipulation
            node.next = this.head;
            this.head.previous = node;
            this.head = node;
            node.previous = null;
        },

        _evictLRUNode:function(){
             //   evict the least recently used node. That will be the tail node
             var temp = this.tail;
             this.tail = this.tail.previous;

              // Remove the entry from the hash table
              delete this.nodeEntries[temp.key];
              this.tail.next = null;
              temp = null;
              this.currentNodeCount--;
        }
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //    FP.LRUCache - END
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     // Freeze the root object to prevent inadvertent changes to the root object by consumers of the library.
    if(Object.freeze){
        Object.freeze(FP);
    }
})(FP);
   
    return {
        FP : FP
        };
})();