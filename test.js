var scrapeBanno = require('./scrapeBanno.js');
var assert = require('assert');

/*Incorrect Input Tests*/

describe('topThreeBadInput', function() {
    it('should return an error message if the input is not a string', function() {
        assert.equal(scrapeBanno.topThree(100), "Incorrect input: requires a string")
    });
});

describe('countPNGBadInput', function() {
    it('should return an error message if the input is not a string', function() {
        assert.equal(scrapeBanno.countPNG(100), "Incorrect input: requires a string")
    });
});

describe('getStrOccuranceBadInput', function() {
    it('should return an error message if the input is not a string', function() {
        assert.equal(scrapeBanno.getStrOccurance(100), "Incorrect input: requires a string")
    });
});

describe('getTwitterHandleBadInput', function() {
    it('should return an error message if the input is not a string', function() {
        assert.equal(scrapeBanno.getTwitterHandle(100), "Incorrect input: requires a string")
    });
});

describe('getProductCountBadInput', function() {
    it('should return an error message if the input is not a string', function() {
        assert.equal(scrapeBanno.getProductCount(100), "Incorrect input: requires a string")
    });
});

/*No target Tests*/

describe('countPNGNoTarget', function() {
    it('should return 0 if there are none', function() {
        assert.equal(scrapeBanno.countPNG("This is a test string"), 0)
    })
})

describe('getStrOccuranceNoTarget', function() {
    it('should return 0 if there are none', function() {
        assert.equal(scrapeBanno.getStrOccurance("This is a test string"), 0)
    })
})

describe('getTwitterHandleNoTarget', function() {
    it('should return "Unable To Locate" message if there are none', function() {
        assert.equal(scrapeBanno.getTwitterHandle("This is a test string"), "Unable to locate Twitter handle.")
    })
})

describe('getProductCounteNoTarget', function() {
    it('should return 0 if there are none', function() {
        assert.equal(scrapeBanno.getStrOccurance("This is a test string"), 0)
    })
})

/* */