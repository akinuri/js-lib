// WIP
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
// https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml

function ajax(url, options) {
    
    options.method   = options.method   || "GET";
    options.async    = options.async    || true;
    options.user     = options.user     || null;
    options.password = options.password || null;
    options.data     = options.data     || null;
    
    var request = new XMLHttpRequest();
    
    if (options.start) {
        request.onloadstart = options.start.bind(request);
    }
    
    if (options.progress) {
        request.onprogress = function (e) {
            if (request.status == 200) {
                options.progress.call(request);
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
    
    request.open(options.method, url, options.async, options.user, options.password);
    
    request.send(options.data);
    
    return request;
    
}
