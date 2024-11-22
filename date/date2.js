function getISODateOnly(date) {
    date = date || new Date();
    var day = date.getDate().toString().padStart(2, 0);
    var month = (date.getMonth() + 1).toString().padStart(2, 0);
    var year = date.getFullYear();
    let dateOnly = [year, month, day].join("-");
    return dateOnly;
}

function getISOTimeOnly(date, seperator = ":") {
    date = date || new Date();
    var hour = date.getHours().toString().padStart(2, 0);
    var minute = date.getMinutes().toString().padStart(2, 0);
    var second = date.getSeconds().toString().padStart(2, 0);
    let timeOnly = [hour, minute, second].join(seperator);
    return timeOnly;
}

