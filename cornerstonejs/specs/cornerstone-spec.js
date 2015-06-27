
;

describe("cs", function() {
    it("cs should exist", function() {
        expect(cs.VERSION).toBe('0.0.1');
    });
});

describe("helper methods", function() {
    describe("hasValue", function() {
        it("should return false on null", function() {
            expect(cs.hasValue(null)).toBe(false);
        });

        it("should return false on undefined", function() {
            expect(cs.hasValue(null)).toBe(false);
        });

        it("should return true for other things", function() {
            expect(cs.hasValue(true)).toBe(true);
            expect(cs.hasValue(false)).toBe(true);
            expect(cs.hasValue({})).toBe(true);
            expect(cs.hasValue([])).toBe(true);
            expect(cs.hasValue(new Object())).toBe(true);
            expect(cs.hasValue(new Array())).toBe(true);
            expect(cs.hasValue(-1)).toBe(true);
            expect(cs.hasValue(0)).toBe(true);
            expect(cs.hasValue(100)).toBe(true);
            expect(cs.hasValue(1.1)).toBe(true);
            expect(cs.hasValue('')).toBe(true);
        });
    });

    describe("isArray", function() {
        it("should return false for null and undefined", function() {
            expect(cs.isArray(null)).toBe(false);
            expect(cs.isArray(undefined)).toBe(false);
        });

        it("should return false for an object", function() {
            expect(cs.isArray({})).toBe(false);
        });

        it("should return true for an array", function() {
            expect(cs.isArray([])).toBe(true);
            expect(cs.isArray(new Array())).toBe(true);
        });
    });

    describe("isObject", function() {
        it("should return false for null and undefined", function() {
            expect(cs.isObject(null)).toBe(false);
            expect(cs.isObject(undefined)).toBe(false);
        });

        it("should return true for an array (an array is an object)", function() {
            expect(cs.isObject([])).toBe(true);
        });

        it("should return true for an array (an array is an object)", function() {
            expect(cs.isObject([])).toBe(true);
            expect(cs.isObject(new Array())).toBe(true);
        });
    });

    describe("each", function() {
        it("should not call callback if null or undefined", function() {
            var called = false;

            cs.each(null, function() {
                called = true;
            });

            expect(called).toBe(false);
        });

        it("should not call the callback if the array is empty", function() {
           var called = false;

            cs.each([], function() {
                called = true;
            });

            expect(called).toBe(false);
        });

        it("should throw an error if the callback is null or undefined", function() {
            function func() {
                cs.each([], null);
            }
            
            expect(func).toThrowError("callback is not valid");
        });

        it("should throw an error if the callback is not a function", function() {
            function func() {
                cs.each([], {});
            }

            expect(func).toThrowError("callback is not valid");
        });

        it("should call the callback for each item in the array", function() {
            var count = 0;

            cs.each(['1','2'], function() {
                count++;
            });

            expect(count).toBe(2);
        });

        it("should call the callback for each field on an object", function() {
            var count = 0;

            cs.each({ one: 1, two: 2, three: 3}, function() {
                count++;
            });

            expect(count).toBe(3);
        });

        it("should provide the array as 'this' in the callback", function() {
            var array = ['1','2'];

            cs.each(array, function() {
                expect(array).toBe(this);
            });

            // Test with a newly created array that is not the array above
            cs.each(array, function() {
                expect(['1','2']).not.toBe(this);
            });
        });

        it("should provide the object as 'this' in the callback", function() {
            var obj = { one: 1, two: 2, three: 3};

            cs.each(obj, function() {
                expect(obj).toBe(this);
            });

            // Test with a newly created object that is not the object above
            cs.each(obj, function() {
                expect({ one: 1, two: 2, three: 3}).not.toBe(this);
            });
        });
    });

});
