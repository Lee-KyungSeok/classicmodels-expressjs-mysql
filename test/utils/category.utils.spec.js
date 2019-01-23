/**
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const CategoryUtils = require('../../utils/category.utils');
const assert = require('assert');

const menu_items = [
    [1, "food", null, null],
    [2, "electron", null, null],

    [4, "fish", 1, "food"],
    [5, "meet", 1, "food"],
    [6, "cake", 1, "food"],
    [7, "cream", 1, "food"],

    [8, "PC", 2, "electron"],
    [9, "audio", 2, "electron"],
    [10, "mobile", 2, "electron"],

    [11, "desktop", 8, "PC"],
    [12, "server", 8, "PC"],
    [13, "workstasion", 8, "PC"]
];

describe('category.utils testing...', () => {
    it('should be get tree for categories.', () => {
        const top = CategoryUtils.make_category(menu_items);
        let subs = top.subs;
        assert.equal(subs.length, 2, "expect 2 keys in top category BUT [" + subs.length + "]");

        let keys = subs.map(row => row.name);
        assert.ok(keys.includes("food"), "expect food in top category.");
        assert.ok(keys.includes("electron"), "expect electron in top category.");
        const foods = top.subs.find(row => row.name === "food");
        subs = foods.subs;
        assert.equal(subs.length, 4, "expect 4 keys in food category.");
        keys = subs.map(row => row.name);
        assert.ok(keys.includes("fish"), "expect fish in food category.");
        assert.ok(keys.includes("meet"), "expect meet in food category.");
        assert.ok(keys.includes("cake"), "expect cake in food category.");
        assert.ok(keys.includes("cream"), "expect cream in food category.");

        const electrons = top.subs.find(row => row.name === "electron");
        subs = electrons.subs;
        assert.equal(subs.length, 3, "expect 3 keys in electron category.");
        keys = subs.map(row => row.name);
        assert.ok(keys.includes("PC"), "expect PC in electron category.");
        assert.ok(keys.includes("audio"), "expect audio in electron category.");
        assert.ok(keys.includes("mobile"), "expect mobile in electron category.");

        const pcs = subs.find(row => row.name === "PC");
        subs = pcs.subs;
        assert.equal(subs.length, 3, "expect 3 keys in PC category.");
        keys = subs.map(row => row.name);
        assert.ok(keys.includes("desktop"), "expect desktop in PC category.");
        assert.ok(keys.includes("server"), "expect server in PC category.");
        assert.ok(keys.includes("workstasion"), "expect workstasion in PC category.");
    });

    it('should be make pulldown menu for categories.', () => {
        const top = CategoryUtils.make_category(menu_items);
        let keys = Object.keys(top);
        const ss = [];
        ss.push("<button mat-button [matMenuTriggerFor]=\"categories\">Category</button>");
        const gen = (map) => {
            ss.push("<mat-menu #"+map.name+"=\"matMenu\">");
            map.subs.forEach(sub => {
                if (sub.subs.length === 0) {
                    ss.push("  <button mat-menu-item>"+sub.name+"</button>");
                } else {
                    ss.push("  <button mat-menu-item [matMenuTriggerFor]=\""+sub.name+"\">"+sub.name+"</button>");
                }
            });
            ss.push("</mat-menu>");
            map.subs.forEach(sub => {
                if (sub.subs.length > 0) {
                    gen(sub);
                }
            });
        };
        gen(top);
        console.log(ss.join("\n"));
    });
});

/*
*/
