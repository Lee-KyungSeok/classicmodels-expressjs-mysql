/**
 Copyright(c) 2009-2019 by GGoons.
*/
const { Observable, Observer } = require('rxjs');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

exports.grab = (dir, force=true) => {
    return Observable.create((observer) => {
        fs.access(dir, err => {
            if (err) {
                if (force) {
                    module.exports.mkdir_p(dir)
                        .subscribe(
                            dir => {
                                observer.next([dir, []]);
                                observer.complete();
                            },
                            err => observer.error(err)
                        );
                } else {
                    observer.error(err);
                }
            } else {
                fs.readdir(dir, (err, files) => {
                    if (err) observer.error(err)
                    else {
                        observer.next([dir, files]);
                        observer.complete();
                    }
                });
            }
        })
    });
};

exports.mkdir_p = (dir, options={}) => {
    const isIgnoreError = options.hasOwnProperty("ignore_error") && options.ignore_error;
    return Observable.create((observer) => {
        mkdirp(dir, err => {
            if (err && !isIgnoreError) {
                return observer.error(err);
            }
            observer.next(dir);
            observer.complete();
        });
    });
}
