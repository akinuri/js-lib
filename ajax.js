// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
// https://developer.mozilla.org/en-US/docs/Web/API/FormData
// https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml

function ajax(url, options) {
    
    options.method   = options.method   || "GET";
    options.async    = options.async    || true;
    options.user     = options.user     || null;
    options.password = options.password || null;
    options.data     = options.data     || null;
    
    let request = new XMLHttpRequest();
    
    request.open(options.method, url, options.async, options.user, options.password);
    
    if (options.headers) {
        for (let header in headers) {
            let value = headers[header];
            xhr.setRequestHeader(header, value);
        }
    }
    
    if (options.start) {
        request.onloadstart = options.start.bind(request);
    }
    
    if (options.progress) {
        request.upload.onprogress = function (e) {
            if (event.lengthComputable) {
                options.progress.call(request, e);
            }
        };
    }
    
    if (options.after) {
        request.onloadend = function () {
            options.after.call(this);
        };
    }
    
    if (options.success || options.fail) {
        
        request.onreadystatechange = function () {
            
            if (request.readyState == XMLHttpRequest.DONE) {
                
                if (request.status == 200) {
                    if (options.success)
                        options.success.call(this);
                } else {
                    if (options.fail)
                        options.fail.call(this);
                }
                
            }
            
        };
        
    }
    
    if (options.timeout) {
        request.timeout = options.timeout;
    }
    
    if (options.data && !(options.data instanceof FormData)) {
        let data = new FormData();
        for (let key in options.data) {
            data.append(key, options.data[key]);
        }
        options.data = data;
    }
    
    request.send(options.data);
    
    return request;
}