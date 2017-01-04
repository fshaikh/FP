// Test Suite containing specs for FP.LRUCache class
describe("FP.LRUCache",function(){
    var lruCache;

    // Before any spec is run, Jasmine calls this function.
    beforeEach(function(){
        this.lruCache = null;
    });

    // Spec# 1 : should be able test whether FP object is available
    it("should be able test whether FP object is available",function(){
        expect(FP).toBeDefined();
    });

    // Spec# 2: should be able to verify if FP.LRUCache class is defined
    it("should be able to verify if FP.LRUCache class is defined",function(){
        expect(FP.LRUCache).toBeDefined();
    });

    // Spec# 3: should be able to create an instance of FP.LRUCache class
    it("should be able to create an instance of FP.LRUCache class",function(){
        var lruCache = _createCache();
        expect(lruCache).not.toBeNull();
    });

    // Spec# 4- should be able to set capacity on an instance of FP.LRUCache class
    it("should be able to set capacity on an instance of FP.LRUCache class",function(){
        var capacity = 10;
        var lruCache = _createCache(capacity);
        expect(lruCache.getCapacity()).toEqual(capacity);
    });

    // Spec# 5 - should be able to add an object to cache
    it("should be able to add an object to cache",function(){
        var capacity = 10;
        var lruCache = _createCache(capacity);
        lruCache.set("1",1);
        lruCache.set("2",2);
        lruCache.set("3",3);
        expect(lruCache.getCurrentNodeCount()).toEqual(3);
    });

    // Spec# 6 - should be able to get an object from cache based on key
    it("should be able to get an object from cache based on key",function(){
        var capacity = 10;
        var lruCache = _createCache(capacity);
        lruCache.set("1",1);
        lruCache.set("2",2);
        lruCache.set("3",3);
        expect(lruCache.get("3")).toEqual(3);
    });

    // Spec# 7 - should check if the capacity is never exceeded
    it("should check if the capacity is never exceeded",function(){
        var capacity = 3;
        var lruCache = _createCache(capacity);
        lruCache.set("1",1);
        lruCache.set("2",2);
        lruCache.set("3",3);
        lruCache.set("4",4);
        lruCache.set("5",5);
        lruCache.set("6",4);
        lruCache.set("7",5);
        expect(lruCache.getCurrentNodeCount()).toEqual(capacity);
    });

    // Spec# 8 - should be able to add an object to cache when capacity is reached
    it("should be able to add an object to cache",function(){
        var capacity = 3;
        var lruCache = _createCache(capacity);
        lruCache.set("1",1);
        lruCache.set("2",2);
        lruCache.set("3",3);
        lruCache.set("4",4);
        lruCache.set("5",5);
        expect(lruCache.get("5")).toEqual(5);
    });

    // Spec# 9 - should evict the least recently used object (get) when cache is full
    it("should evict the least recently used object (get) when cache is full",function(){
        var capacity = 3;
        var lruCache = _createCache(capacity);
        lruCache.set("1",1);
        lruCache.set("2",2);
        lruCache.set("3",3);

        lruCache.get("2");
        lruCache.set("4",4);
        expect(lruCache.get("1")).toBeNull();
    });

    function _createCache(capacity){
        return FP.create('FP.LRUCache',{capacity:capacity});
    }

});