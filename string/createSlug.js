/**
 * @borrows latinize()
 * @see https://en.wikipedia.org/wiki/Clean_URL#Slug
 * @see https://en.wikipedia.org/wiki/Slug_(publishing)
 * @see https://www.semrush.com/blog/what-is-a-url-slug/
 * @see https://en.wikipedia.org/wiki/URI_normalization
 */
function createSlug(string, userOptions) {
    
    let defaultOptions = {
        lowercase : true,
        latinize  : true,
        normalize : true,
        nopunc    : true,
        case      : "kebab",
        strip     : [],
    };
    
    let options = {...defaultOptions, ...userOptions};
    
    string = string.trim();
    
    if (options.latinize) {
        string = latinize(string);
    }
    
    if (options.lowercase) {
        string = string.toLowerCase();
    }
    
    if (options.normalize) {
        string = createSlug.normalize(string);
    }
    
    if (options.nopunc) {
        string = createSlug.purgePunctuation(string);
    }
    
    if (["kebab", "snake"].includes(options.case)) {
        string = string.split(/\s+/);
        if (options.case == "kebab") {
            string = string.join("-");
        } else if (options.case == "snake") {
            string = string.join("_");
        }
    }
    
    if (options.strip) {
        for (let letter of options.strip) {
            string = string.replaceAll(letter, "");
        }
    }
    
    return string;
}

createSlug.normalizationMap = [
    [".", " "],
    ["-", " "],
    ["—", " "],
    ["&", " and "],
];

createSlug.normalize = function (str) {
    for (let map of createSlug.normalizationMap) {
        str = str.replaceAll(map[0], map[1]);
    }
    return str;
};

// https://msdn.microsoft.com/en-us/library/windows/desktop/aa365247(v=vs.85).aspx#Naming_Conventions
createSlug.punctuationChars = [
    "<", ">", ":", "\"", "/", "\\", "|", "?", "*",
    "'", "¦", ".", ",", "!",
];

createSlug.purgePunctuation = function (str) {
    for (let item of createSlug.punctuationChars) {
        str = str.replaceAll(item, "");
    }
    return str;
};