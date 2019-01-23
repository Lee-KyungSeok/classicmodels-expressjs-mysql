/*
 Copyright(c) 2009-2019 by GGoons.
*/

class DataValidateException {
    constructor(msg, errors) {
        this.message = msg;
        this.errors = errors;
    }
}

module.exports = DataValidateException;
