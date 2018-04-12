// WIP
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
// https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml

var HTTPStatusCodes = {
    Continue                    : 100,
    SwitchingProtocols          : 101,
    Processing                  : 102,
    EarlyHints                  : 103,
    
    OK                          : 200,
    Created                     : 201,
    Accepted                    : 202,
    NonAuthoritativeInformation : 203,
    NoContent                   : 204,
    ResetContent                : 205,
    PartialContent              : 206,
    MultiStatus                 : 207,
    AlreadyReported             : 208,
    
    BadRequest                  : 400,
    Unauthorized                : 401,
    PaymentRequired             : 402,
    Forbidden                   : 403,
    NotFound                    : 404,
    MethodNotAllowed            : 405,
    NotAcceptable               : 406,
    
    
};

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
            if (request.status == HTTPStatusCodes.OK) {
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
                
                switch (request.status) {
                    case HTTPStatusCodes.OK:
                        if (options.success)
                            options.success.call(this);
                        break;
                    case HTTPStatusCodes.NotFound:
                        if (options.fail)
                            options.fail.call(this);
                        break;
                }
                
            }
            
        };
        
    }
    
    request.open(options.method, url, options.async, options.user, options.password);
    
    request.send(options.data);
    
    return request;
    
}
