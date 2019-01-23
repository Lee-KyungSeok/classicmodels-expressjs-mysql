/**
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const dateUtils = require('../../utils/date.utils');
const assert = require('assert');

const TEST_HOURS = 12;

describe('date.utils testing...', () => {
    it('should be after 10 hours', () => {
        const t0 = new Date('2018-12-08T15:10:00Z');
        const t1 = new Date(t0.getTime());
        const afterHours = dateUtils.hoursAfter(TEST_HOURS, t1);
console.log("now = "+t0+", after "+TEST_HOURS+" hours = "+afterHours);
        assert.equal(t0.getHours()+TEST_HOURS, afterHours.getHours(), 
        	"expect after "+TEST_HOURS+" hours from "+t0.getHours()+" BUT "+afterHours.getHours());
    });

});
