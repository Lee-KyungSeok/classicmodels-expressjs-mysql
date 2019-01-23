/**
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const parser = require('../../utils/key_name_parser');
const assert = require('assert');

describe('classicmodels testing...', () => {
    it('should be pass', () => {
        const [key, op] = parser.key_and_op("city like", true);
//console.log("key = "+key);
//console.log("op = "+op);
        assert.equal(op, "like");
    });
});
