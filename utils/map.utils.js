/**
 Copyright(c) 2009-2019 by GGoons.
*/

/**
* changeKey(params, "customerName LIKE", "customerName", "customer_name"); => params["customer_name LIKE"] = data.
*/
exports.changeKey = (map, key, key1, key2) => {
    if (key.includes(" ") && key.startsWith(key1)) {
        map[key2 + key.split(" ").slice(1).join('')] = map[key];
        delete map[key];
    }
};

exports.compact = (map) => {
    const map2 = {};
    Object.keys(map).filter(x => map[x]).forEach(key => map2[key] = map[key]);
    return map2;
}

exports.extract = (map, keys) => {
    const map2 = {};
    keys.forEach((key) => map2[key] = map[key]);
    return map2;
}

exports.isEmpty = (map) => {
    return Object.keys(map).length == 0;
};

exports.putIfEquals = (map, key, val, data) => {
    if (key === val) {
        map[key] = data;
        return true;
    }

    return false;
}

exports.putIfStartsWith = (map, key, val, data) => {
    if (key.startsWith(val)) {
        map[key] = data;
        return true;
    }

    return false;
};

    /**
     * replace values to newValues in params.
     */
exports.replaceValues = (params, values, newValues) => {
    let value;
    if (values.length == 0) {
        return;	// do nothing.
    }
    if (values.length != newValues.length) {
        throw new Error("Argument length mismatch");
    }

    const replaces = [];
    Object.keys(params).forEach(key => {
        let orgValue = params[key];
        values.forEach((value, i) => {
            if (orgValue === value) {
                replaces.push([key, newValues[i]]);
            }
        });
    });

    replaces.forEach(arr => params[arr[0]] = arr[1]);
};

    /**
    * save key and new key to change after found all.
    */
exports.saveKeyToChangeIfEquals = (keys, key, vname, sqlname, callback) => {
    if (key === vname) {
        keys[key] = [null, sqlname];
        if (callback) {
            callback(key);
        }
        return true;
    }
    return false;
};

    /**
    * save key and new key to change after found all.
    */
exports.saveKeyToChangeIfStartsWith = (keys, key, vname, sqlname, callback) => {
    if (key.startsWith(vname)) {
        keys[key] = [vname, sqlname];
        if (callback) {
            callback(key);
        }
        return true;
    }
    return false;
};
