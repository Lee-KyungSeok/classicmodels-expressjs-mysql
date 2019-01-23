/**
 Copyright(c) 2009-2019 by GGoons.
*/
const { Observable } = require('rxjs');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const gm = require('gm');
const env = require('../config/environment');
const DirUtils = require('./dir.utils');

// private functions...

exports.readFromFileUrl = (url) => {
    console.log("UploadUtils.readFromFileUrl(): url="+url);
    const filename = url.replace(env.uploaded_url, env.uploaded_dir);
    const buffer = fs.readFileSync(filename);
//console.log("readFromFileUrl.readFileSync(): "+JSON.stringify(buffer));
    return buffer;
}

exports.create_image_file = (filename, data) => {
    return Observable.create((observer) => {
        fs.writeFile(filename, data, "binary", err => {
            if (err) {
                observer.error(err);
            } else {
                observer.next(filename);
                observer.complete();
            }
        });
    });
}

exports.create_thumb_file = (filename, thumb_filename) => {
    return Observable.create((observer) => {
        gm(filename)
            .thumb(env.THUMB_WIDTH, env.THUMB_HEIGHT, thumb_filename, 70, 
                (err) => {
                    if (err) observer.error(err)
                    else {
                        observer.next(thumb_filename);
                        observer.complete();
                    }
                }
            );
    });
}

exports.create_thumb_file_by_url = (url) => {
    console.log("UploadUtils.create_thumb_file_by_url(): url="+url);
    const filename = url.replace(env.uploaded_url, env.uploaded_dir);
    const thumb_filename = filename + "_thumb";
    return module.exports.create_thumb_file(filename, thumb_filename);
}

exports.get_new_filename_and_url = () => {
    const now = new Date();
    const nowISO = now.toISOString();
    // YYYY-MM-DDTHH:mm:ss.sssZ
    // 012345678901234567890123
    const today = nowISO.substring(0, 10).replace(/-/g, '');
    const hhMMssmmm = nowISO.substring(11,23).replace(/[:\.]/g, '');
    const rv = crypto.randomBytes(4).toString("hex");
    const fname = today+"/"+hhMMssmmm+rv;
    const filename = path.join(env.uploaded_dir, fname);
    const url = filename.replace(env.uploaded_dir, env.uploaded_url).replace(/\\/g, "/");
    const thumb_filename = filename + "_thumb";

    return Observable.of([url, filename, thumb_filename]);
};
