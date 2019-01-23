/**
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const StringUtils = require('../../utils/string.utils');
const assert = require('assert');

describe('string.utils testing...', () => {
    it('should be equals base64', () => {
        const s0 = "Hello, there?"
        const s1 = StringUtils.encodeBase64(s0);
//console.log("base64 s1 = "+s1);
        const s2 = StringUtils.decodeBase64(s1);
        assert.equal(s0, s2, "expect s2 equals s0 BUT "+s2);
    });

    it('should be equals base64Url', () => {
        const s0 = "Hello, there?"
        const s1 = StringUtils.encodeBase64Url(s0);
//console.log("base64Url s1 = "+s1);
        const s2 = StringUtils.decodeBase64(s1);
        assert.equal(s0, s2, "expect s2 equals s0 BUT "+s2);
        assert.ok(!s1.includes('='), "encoded base64Url should not contains '=' BUT it is.");
    });

    it('should convert to number', () => {
        const s0 = "10"
        const s1 = StringUtils.toNumberOrNumberArray(s0);
        assert.equal(s1, 10, "expect 10 BUT "+s1);
    });

    it('should convert to numbers', () => {
        const s0 = "10, 20"
        const s1 = StringUtils.toNumberOrNumberArray(s0);
        assert.ok((s1 instanceof Array), "expect Array BUT "+typeof s1);
        assert.equal(s1.length, 2, "expect length of array 2 BUT "+s1.length);
        assert.equal(s1[0], 10, "expect first number is 10 BUT "+s1[0]);
        assert.equal(s1[1], 20, "expect last number is 20 BUT "+s1[1]);
    });
});
