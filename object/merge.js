/**
 * Merges two objects in various ways.
 * 
 * @requires Object.clone()
 */
Object.merge = function mergeObjects(leftObj, rightObj, options = {}) {
    
    if (!rightObj) {
        return Object.clone(leftObj);
    }
    
    optionsDefaults:
    {
        /*
        options = {
            unique : {
                keepLeft  : true,
                keepRight : true,
            },
            common : {
                scalars : {
                    overwrite : true,
                },
                arrays : {
                    overwrite : false,
                    merge     : !overwrite,
                    unique    : false,
                },
                mixed : {
                    overwrite  : true,
                    ignoreNull : false,
                },
            },
        };
        */
        options.unique ??= {
            keepLeft  : true,
            keepRight : true,
        };
                                          
                                           
        options.common ??= {
            scalars : {
                overwrite : true,
            },
            arrays : {
                overwrite : false,
                merge     : true,
                unique    : false,
            },
            mixed : {
                overwrite : true,
                ignoreNull : false,
            },
        };
        options.common.scalars ??= {
            overwrite : true,
        };
                                                  
        options.common.arrays ??= {
            overwrite : false,
            merge     : true,
            unique    : false,
        };
                                                 
                                              
                                                                       
        options.common.mixed ??= {
            overwrite  : true,
            ignoreNull : false,
        };
        options.unique.keepLeft  ??= true;
        options.unique.keepRight ??= false;
        options.common.scalars.overwrite ??= true;
        options.common.arrays.overwrite ??= false;
        options.common.arrays.merge ??= true;
        options.common.arrays.merge = !options.common.arrays.overwrite;
        options.common.arrays.unique ??= false;
        options.common.mixed.overwrite  ??= true;
        options.common.mixed.ignoreNull ??= false;
    }
    
    let leftObjKeys  = Object.keys(leftObj);
    let rightObjKeys = Object.keys(rightObj);
    let commonKeys   = leftObjKeys.filter(key => rightObjKeys.includes(key));
    
    let result = {};
    
    if (options.unique.keepLeft) {
        let uniqueLeftObjKeys = leftObjKeys.filter(key => !rightObjKeys.includes(key));
        uniqueLeftObjKeys.forEach(key => {
            if (isScalar(leftObj[key])) {
                result[key] = leftObj[key];
            } else {
                result[key] = Object.clone(leftObj[key]);
            }
        });
    }
    
    if (options.unique.keepRight) {
        let uniqueRightObjKeys = rightObjKeys.filter(key => !leftObjKeys.includes(key));
        uniqueRightObjKeys.forEach(key => {
            if (isScalar(rightObj[key])) {
                result[key] = rightObj[key];
            } else {
                result[key] = Object.clone(rightObj[key]);
            }
        });
    }
    
    commonKeys.forEach(key => {
        
        let leftValue  = leftObj[key];
        let rightValue = rightObj[key];
        
        // two scalars
        if (isScalar(leftValue) && isScalar(rightValue)) {
            if (options.common.scalars.overwrite) {
                result[key] = rightValue;
            }
        }
        
        // two arrays
        else if (leftValue instanceof Array && rightValue instanceof Array) {
            if (options.common.arrays.merge) {
                result[key] = leftValue.concat(rightValue);
                if (options.common.arrays.unique) {
                    result[key] = Array.from(new Set(result[key]))
                }
            } else {
                result[key] = rightValue;
            }
        }
        
        // two objects
        else if (typeof leftValue == "object" && typeof rightValue == "object") {
            result[key] = Object.merge(leftValue, rightValue, options);
        }
        
        // mixed
        else {
            if (options.common.mixed.overwrite) {
                if ( (rightValue === null && !options.common.mixed.ignoreNull) ||
                      rightValue !== null )
                {
                    result[key] = rightValue;
                }
            }
        }
        
    });
    
    return result;
};