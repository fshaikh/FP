// Test Suite containing Specs for FP.Util class
describe("FP.Util",function(){

    // Spec# 1 : should be able test whether FP object is available
    it("should be able test whether FP object is available",function(){
        expect(FP).toBeDefined();
    });

    // Spec# 2: should be able to verify if FP.Util class is defined
    it("should be able to verify if FP.Util class is defined",function(){
        expect(FP.Util).toBeDefined();
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //    Specs for isNaN function - START
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Spec# 3 : should verify if isNaN function is defined
    it("should verify if isNaN function is defined",function(){
        expect(FP.Util.isNaN).toBeDefined();
    });

    // Spec# 4: should return true when passing a NaN value
    it("should return true when passing a NaN value",function(){
        expect(FP.Util.isNaN(10/"a")).toEqual(true);
    });

    // Spec# 5 : should return false when passing a number value
    it("should return false when passing a number value",function(){
        expect(FP.Util.isNaN(10)).toEqual(false);
    });


    ////////////////////////////////////////////////////////////////////////////////////////////////
    //    Specs for isNaN function - END
    ////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //    Specs for isObject function - START
    ////////////////////////////////////////////////////////////////////////////////////////////////
        // Spec# 6 : should return true when determining if value is an object
    it("should return true when passing object",function(){
        expect(FP.Util.isObject({})).toEqual(true);
    });
     ////////////////////////////////////////////////////////////////////////////////////////////////
    //    Specs for isObject function - END
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // Spec# 7: should return true when an integer value is passed
    it("should return true when an integer value is passed",function(){
        var value = 12;

        expect(FP.Util.isInteger(value)).toEqual(true);
    });

    // Spec# 8: should return false when an floating point value is passed
    it("should return false when an floating point value is passed",function(){
        var value = 12.23;

        expect(FP.Util.isInteger(value)).toEqual(false);
    });

    // Spec# 9: should return false when non number value is passed
    it("should return false when non number value is passed",function(){
        var value = "12.23";

        expect(FP.Util.isInteger(value)).toEqual(false);
    });

        // Spec# 10: should return false when null/undefined is passed
    it("should return false when null/undefined is passed",function(){
        var value;

        expect(FP.Util.isInteger(value)).toEqual(false);
    });

});