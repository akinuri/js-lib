/**
 * Measures the time a function takes to execute.
 */
function measure(callback) {
    
    let start = performance.now();
    
    if (typeof callback == "function") {
        callback();
    }
    
    let finish = performance.now();
    
    let elapsed = finish - start;
    
    return elapsed;
}
