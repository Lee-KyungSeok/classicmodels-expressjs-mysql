/**
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
//const q = require('q');
const sinon = require('sinon');
const env = require('../../config/environment');
const DirUtils = require('../../utils/dir.utils');
const UploadUtils = require('../../utils/upload.utils');

describe('upload testing...', () => {
    it('should be called mkdir_p', () => {
        UploadUtils.get_new_filename_and_url()
            .subscribe(([url, filename, thumb_filename]) => {
                //console.log("url: "+url);
                //console.log("filename: "+filename);
                //console.log("thumb_filename: "+thumb_filename);
                assert.ok(url.startsWith(env.uploaded_url), 
                    "expect url starts with env.uploaded_url BUT "+url);
                assert.ok(filename.startsWith(env.uploaded_dir), 
                    "expect filename starts with env.uploaded_dir BUT "+filename);
                assert.ok(thumb_filename.startsWith(env.uploaded_dir),
                    "expect thumb_filename starts with env.uploaded_dir BUT "+thumb_filename);
            },
            err => console.log(err))
            ;
    });
});
