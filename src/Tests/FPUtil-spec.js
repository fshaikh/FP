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

});