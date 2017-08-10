/**
 * Test Suite containing spec for FP.EventEmitter class
 */
describe("FP.EventEmitter",function(){
    // Spec# 1 : should be able test whether FP object is available
    it("should be able test whether FP object is available",function(){
        expect(FP).toBeDefined();
    });

    // Spec# 2: should be able to verify if FP.EventEmitter class is defined
    it("should be able to verify if FP.EventEmitter class is defined",function(){
        expect(FP.EventEmitter).toBeDefined();
    });

    // Spec# 3: should be able to create an instance of FP.EventEmitter class
    it("should be able to create an instance of FP.EventEmitter class",function(){
        var eventEmitter = _createEventEmitter();
        expect(eventEmitter).not.toBeNull();
    });

    // Spec# 4 - should be able to register events using on function
    it("should be able to register events using on function",function(){
        var eventEmitter = _createEventEmitter();

       function firstHandler(){
           console.log('first handler');
       }

       function secondHandler(){
           console.log('second handler');
       }

        eventEmitter.on('begin',firstHandler);
        eventEmitter.on('begin',secondHandler);

        var listenersCount = eventEmitter.listenersCount('begin');
        expect(listenersCount).toEqual(2);
    });

    // Spec# 5 - should be able to call listeners based on key
    it("should be able to call listeners based on key",function(){
        var eventEmitter = _createEventEmitter();
        var before = 10;
       function firstHandler(){
           before = 20;
       }
       eventEmitter.on('begin',firstHandler);
       eventEmitter.emit('begin');
       expect(before).toEqual(20);

    });

    // Spec# 5 - should be able to call listeners with arguments based on key
    it("should be able to call listeners with arguments based on key",function(){
        var eventEmitter = _createEventEmitter();
        var before = 10;
       function firstHandler(data){
           before = data;
       }
       eventEmitter.on('begin',firstHandler);
       eventEmitter.emit('begin',30);
       expect(before).toEqual(30);

    });

    function _createEventEmitter(){
        return FP.create('FP.EventEmitter');
    }
});