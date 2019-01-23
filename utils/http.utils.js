/**
 Copyright(c) 2009-2019 by GGoons.
*/

const http = require('http');
const https = require('https');
const url = require('url');

exports.replaceParamsTo = (req, baseUri, ...replaceValues) => {
    let params = {};
    Object.assign(params, req.params, req.query, req.body);
    if (replaceValues.length > 0) {
        Object.assign(params, replaceValues);
    }
    const res = baseUri.replace(/\{(\w+)\}/g, (all, key) => params.hasOwnProperty(key) ? params[key] : all);
    return Observable.of(res);
};

exports.request = (options, data=null, expect_json_result=true) => {
    return Observable.create((observer) => {
        const net = options.protocol === 'https:' ? https : http;
        const req = net.request(options, (res) => {
            if (res.statusCode != 200) {
                observer.error(new Error('Request failed. response code is ' + res.statusCode));
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    if (expect_json_result) {
                        const parsedData = JSON.parse(rawData);
                        //console.log(parsedData);
                        observer.next(parsedData);
                    } else {
                        observer.next(rawData);
                    }
                    observer.complete();
                } catch (e) {
                    //console.error(e.message);
                    observer.error(e.message);
                }
            });
        });

        req.on('error', (err) => observer.error(err));
        if (data) {
            req.write(data);
        }
        req.end();
    });
};

/**
 * send HTTP request to given url by given method.
 */
exports.send = (method, uri, head=null, data=null, config={}) => {
    const options = url.parse(uri);
    options.method = method;
    options.headers = {};
    if (head) {
        Object.assign(options.headers, head);
    }
    if (!config['form']) {
        options.headers['Content-Type'] = 'application/json';
    }
    if (data) {
        options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    return module.exports.request(options, data, config['json_response'] || true);
};

// we assume that data format for all request is JSON.
// if your request is NOT, then call send or request method directly.

// will deprecate
exports.json = (uri, head=null) => {
    return module.exports.get(uri, head);
}

exports.get = (uri, head=null) => {
    return module.exports.send('GET', uri, head, null);
};

exports.post = (uri, data, head=null) => {
    const json = ((data && typeof data !== 'string') ? JSON.stringify(data) : data);
    return module.exports.send('POST', uri, head, json);
};

exports.put = (uri, data, head=null) => {
    const json = ((data && typeof data !== 'string') ? JSON.stringify(data) : data);
    return module.exports.send('PUT', uri, head, json);
};

exports.delete = (uri, data=null, head=null) => {
    const json = ((data && typeof data !== 'string') ? JSON.stringify(data) : data);
    return module.exports.send('DELETE', uri, head, json);
};

exports.postForm = (uri, data, head=null) => {
    return module.exports.send('POST', uri, head, data, {form: true, json_response: false});
};
// will deprecate
exports.postData = (uri, data, head=null) => {
    return module.exports.postForm(uri, data, head);
};
