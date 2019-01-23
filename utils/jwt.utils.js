/**
 Copyright(c) 2009-2019 by GGoons.
*/
const jwt = require('jsonwebtoken');
const jwt_secret = "d25433c0afcd4f20adea61d365fff207";

exports.generateTo = (model, cb) => {
    jwt.sign(model, jwt_secret, {expiresIn: '14d'}, cb);
};

exports.verify = (token, cb) => {
    jwt.verify(token, jwt_secret, (err, model) => {
        if (err) {
            if (err.name == "TokenExpiredError") {
                throw new Error("Expired.");
            } else {
                throw new Error("Error: "+err);
            }
        }

        cb(model);
    });
};
