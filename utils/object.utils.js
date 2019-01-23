/*
 Copyright(c) 2009-2019 by GGoons.
*/

exports.safeGet = safeGet(first, firstName, chain, defaultValue) => {
    try {
        let cmd: string = chain.replace(firstName, "first");
        return eval(cmd);
    }
    catch(e) {
        return defaultValue;
    }
};
