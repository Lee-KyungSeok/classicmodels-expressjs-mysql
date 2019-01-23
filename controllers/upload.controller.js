/**
 Copyright(c) 2009-2019 by GGoons.
*/
const { Observable, Observer } = require('rxjs');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const DirUtils = require('../utils/dir.utils');
const UploadUtils = require('../utils/upload.utils');

function move_file(oldpath, newpath) {
    return Observable.create((observer) => {
        fs.rename(oldpath, newpath, err => {
            if (err) {
                return observer.error(err);
            }
            observer.next(newpath);
            observer.complete();
        });
    });
}

function upload_to(req, dir) {
    const form = new formidable.IncomingForm();
    form.uploadDir = dir;
    return Observable.create((observer) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                observer.error(err);
            } else {
                observer.next(files);
                observer.complete();
            }
        });
    });
}

const pure_upload_file = (req, res) => {
    let url;
    let filename;
    return UploadUtils.get_new_filename_and_url()
        .flatMap(([new_url, new_filename, thumbnail_filename]) => {
            url = new_url;
            filename = new_filename;
            return DirUtils.mkdir_p(path.dirname(filename))
        })
        .flatMap(save_dir => upload_to(req, save_dir))
        .flatMap(files => {
            const oldpath = files.upload.path;
            const ext = path.extname(files.upload.name);
            filename = filename + ext;
            url = url + ext;
            return move_file(oldpath, filename);
        })
        .map(x => url)
        ;
  };

exports.upload_ckeditor_file = (req, res) => {
    pure_upload_file(req, res)
        .subscribe(url => {
            const url2 = "http://"+req.hostname+":"+req.connection.localPort+url;
            console.log("Upload success: url = "+url2);
            res.send("{\"uploaded\": true, \"url\": \""+url2+"\"}");
        }, err => {
            console.log("Upload failure: message = "+err);
            res.send("{\"uploaded\": false, \"message\": \"Fail to upload: "+err+"\"}");
        });
};

exports.upload_file = (req, res) => {
    pure_upload_file(req, res)
        .subscribe(url => {
            res.send("{\"url\": \""+url+"\"}");
        }, err => {
            res.status(400).send("Fail to upload: "+err);
        });
};
