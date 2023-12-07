function getObjProp(obj, path, fallback) {
    const pathProps = path.split(".");
    let prop = obj;
    for (let i = 0; i < pathProps.length; i++) {
        const pathProp = pathProps[i];
        if (prop && prop.hasOwnProperty(pathProp)) {
            prop = prop[pathProp];
        } else {
            return fallback;
        }
    }
    return prop;
}
