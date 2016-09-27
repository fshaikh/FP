// var initCore = (function(){
//     var globalScope;

//     // Before any spec is run, Jasmine calls this function.
//     beforeEach(function(){
//         if(globalScope)
//             return;
//         globalScope = this;
//         FP.setGlobalScope(globalScope);
//     });

//     return{
//         globalScope:globalScope
//     };
// })();

var sharedScope;

