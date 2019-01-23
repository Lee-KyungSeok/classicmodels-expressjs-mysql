/*
 Copyright(c) 2009-2019 by GGoons.
*/

exports.minus = (a, b) => {
    return a.filter(x => b.indexOf(x) < 0);
};
