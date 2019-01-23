/**
 Copyright(c) 2009-2019 by GGoons.
*/
const crypto = require('crypto');
const secretCode = "6369bfef-553e-4649-979f-aa5da0d83728";

exports.encrypt = (data, algo="sha256") => {
    const encrypted = crypto.createHash(algo)
        .update(data)
        .digest('hex');
//console.log("encrypt data '"+data+"' is "+encrypted);
    return encrypted;
};

exports.secret_code = () => secretCode;
