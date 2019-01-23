/*
 Copyright(c) 2009-2019 by GGoons.
*/

/**
* @param arr => [[id, 'name', parent-id, 'parent-name'], ...]
*               parent-id and parent-name can be null.
* @return top-category => {'name':[sub1, sub2, ...]} | sub1=>{'subname':[detail1, detail2, ...] | name}, ...
*/
exports.make_category = (arr) => {
    let top = {id:-1, name:"categories", subs:[]};
    let map = {};
    arr.forEach(row => {
        const sname = row[1];
        const pname = row[3];
        map[sname] = map[sname] || {id:row[0], name:sname, subs:[]};
        if (pname) {
            map[pname] = map[pname] || {id:row[2], name:pname, subs:[]};
            map[pname].subs.push(map[sname]);
        } else {
            top.subs.push(map[sname]);
        }
    });

    return top;
};
