/**
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const g_const = require('../config/global.const');
const MapUtils = require('./map.utils');

const opCode = {
    OP_EQ:1, OP_NE:2, OP_GT:3, OP_GE:4, OP_LT:4, OP_LE:5,
    OP_LIKE:6, OP_NOT_LIKE:7,
    OP_IN:8, OP_NOT_IN:9,
    OP_BETWEEN:10, OP_NOT_BETWEEN:11,
    OP_JOIN:12,
    OP_COMPOSITE_IN:13,
    OP_NOT_COMPOSITE_IN:14
};

const priorities = [
    opCode.OP_EQ, opCode.OP_IN, opCode.OP_COMPOSITE_IN, opCode.OP_JOIN, 
    opCode.OP_BETWEEN, opCode.OP_NE, opCode.OP_LIKE
];

const opcodes = {};
opcodes["="] = opCode.OP_EQ;
opcodes["!="] = opCode.OP_NE;
opcodes[">"] = opCode.OP_GT;
opcodes[">="] = opCode.OP_GE;
opcodes["<"] = opCode.OP_LT;
opcodes["<="] = opCode.OP_LE;
opcodes["LIKE"] = opCode.OP_LIKE;
opcodes["NOT LIKE"] = opCode.OP_NOT_LIKE;
opcodes["IN"] = opCode.OP_IN;
opcodes["NOT IN"] = opCode.OP_NOT_IN;
opcodes["BETWEEN"] = opCode.OP_BETWEEN;
opcodes["NOT BETWEEN"] = opCode.OP_NOT_BETWEEN;
opcodes["JOIN"] = opCode.OP_JOIN;
opcodes["COMPOSITE-IN"] = opCode.OP_COMPOSITE_IN;
opcodes["NOT COMPOSITE-IN"] = opCode.OP_NOT_COMPOSITE_IN;

const regexp1 = /^.*`.*? .*?`.*$/
const regexp2 = /^(.*?`.*`[^ ]*?) .*$/
const regexp3 = /^.*?`.*`[^ ]*? (.*)$/

function keyname_and_op(key, is_wrapable=false) {
    if (key.includes(" ")) {	// is '<keyname> <op>' ?
        if (is_wrapable) {		// only for RDB ?
            //
            // if key column name has space then it should be
            // wrapped by `...`
            //
            if (key.match(regexp1)) {
                const keyColumnName = key.replace(regexp2, "$1");
                let op = key.replace(regexp3, "$1");

                if (op === key)	{ // if not include space after re2 
//console.log("for "+key+": op is not given. use default '=' instead");
                    op = "=";	//null;	// then there is no op. use default '='.
                }
                return [keyColumnName, op];
            }
        }

        // never include space in <key-column>
        const keyop = key.split(" ");
        // for op with space like 'keyname NOT IN' or 'keyname NOT LIKE'.
        const op = keyop.slice(1).join(" ");
        return [keyop[0], op];
    } 
    else {
        if (key.includes("-")) {
            // this is control key such as 'start-row', ...
            return [key, null];
        } 
        else {
            return [key, "="];	//null);
        }
    }
};

function make_query(cname, opcode, value, compositeCols, qb) {
    switch(opcode) {
    case opCode.OP_BETWEEN:
        qb.between(cname, value[0], value[1]);
        break;
    case opCode.OP_NOT_BETWEEN:
        qb.notBetween(cname, value[0], value[1]);
        break;

    case opCode.OP_IN:
    case opCode.OP_NOT_IN:
        if (typeof value === "string") {
            value = value.split(g_const.RE_COMMA);
        }
        if (opcode == opCode.OP_IN) {
            qb.in(cname, value);
        } else {
            qb.notIn(cname, value);
        }
        break;

    case opCode.OP_LIKE:
        qb.like(cname, value);
        break;
    case opCode.OP_NOT_LIKE:
        qb.notLike(cname, value);
        break;

    case opCode.OP_JOIN:	
        qb.join(cname, value);
        break;

    case opCode.OP_COMPOSITE_IN:
        if (typeof value === "string") {
            value = value.split(g_const.RE_COMMA);
        }
        compositeCols[cname] = value;
        break;

    case opCode.OP_EQ:
        qb.eq(cname, value);
        break;
    case opCode.OP_NE:
        qb.ne(cname, value);
        break;
    case opCode.OP_GT:
        qb.gt(cname, value);
        break;
    case opCode.OP_GE:
        qb.ge(cname, value);
        break;
    case opCode.OP_LT:
        qb.lt(cname, value);
        break;
    case opCode.OP_LE:
        qb.le(cname, value);
        break;

    default:
    }
}

exports.key_and_op = (key, is_wrapable) => {
    return keyname_and_op(key, is_wrapable);
}

exports.parse = (params, is_wrapable, qb) => {
    let keys = Object.keys(params);
    if (keys.length === 0) {
        return;	// do nothing.
    }

    let compositeCols = {};
    const buf = [];
    // step #0. get all operand and operators.
    keys.forEach(key => {
        const [cname, op] = keyname_and_op(key, is_wrapable);
        if (!op)
            return;
        const value = params[key];
        const opcode = opcodes[op.toUpperCase()];
        if (!opcode) {
            throw new Error("Invalid op '"+op+"' in '"+key+"'.");
        }

        buf.push([cname, opcode, value]);
    });

    // generate conditions via order of priorities. 
    priorities.forEach(stepCode => {
        buf.forEach(arr => {
            let opcode = arr[1];
            if (isToThisStepOp(stepCode, opcode)) {
                make_query(arr[0], opcode, arr[2], compositeCols, qb);
            }
        });
        if (!MapUtils.isEmpty(compositeCols)) {
            qb.compositeIn(compositeCols);
            compositeCols = {};
        }
    });
};

function isToThisStepOp(stepCode, currCode) {
    if (stepCode == opCode.OP_NE) {
        return !priorities.includes(currCode);
    }
    else {
        return stepCode === currCode;
    }
}
