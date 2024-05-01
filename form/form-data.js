function formDataEntries(formData) {
    let entries = [];
    for (const entry of formData.entries()) {
        entries.push(entry);
    }
    return entries;
}

function formDataFromObj(obj) {
    let data = new FormData();
    for (const key in obj) {
        data.append(key, obj[key]);
    }
    return data;
}