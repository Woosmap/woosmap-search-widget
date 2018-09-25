function makeRequest(obj, resolve, reject) {
    var xhr = new window.XMLHttpRequest();
    xhr.open(obj.method || "GET", obj.url);
    if (obj.headers) {
        Object.keys(obj.headers).forEach(function (key) {
            xhr.setRequestHeader(key, obj.headers[key]);
        });
    }
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
        } else {
            reject(xhr.statusText);
        }
    };
    xhr.onerror = function () { reject(xhr.statusText); };
    xhr.send(obj.body);

    return xhr;
}


function get(url, resolve, reject) {
    makeRequest({ url: url }, resolve, reject);
}

module.exports = {
    get: get
};