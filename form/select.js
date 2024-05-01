function getOptionByValue(select, value) {
    for (let option of Array.from(select.options)) {
        if (option.hasAttribute("value") && option.value == value) {
            return option;
        }
    }
    return null;
}

function getSelectValue(select) {
    if (select.multiple) {
        return Array.from(select.selectedOptions).map(opt => opt.value);
    } else {
        return select.value || null;
    }
}

function selectOptionsByValues(select, values, dispatch = false) {
    if (values === null || typeof values == "undefined") {
        return 0;
    }
    let isMultiple = values instanceof Array;
    if (!isMultiple) values = [values];
    values = values.map(value => value.toString());
    let selected = [];
    if (values.length) {
        let options = Array.from(select.options);
        for (let option of options) {
            if (option.hasAttribute("value")) {
                if (values.includes(option.value)) {
                    selected.push(true);
                    option.selected = true;
                    option.setAttribute("selected", "selected");
                    if (!isMultiple) break;
                }
            }
        }
    }
    // optional, handles bootstrap-select
    if (selected.length && select.classList.contains("selectpicker")) {
        if (window.hasOwnProperty("jQuery") && document.body.contains(select)) {
            jQuery(select).selectpicker("refresh");
        }
    }
    if (selected.length && dispatch) {
        select.dispatchEvent(new Event("change"));
    }
    return selected.length;
}

function selectOptionsByTexts(select, texts, dispatch = false) {
    if (texts === null || typeof texts == "undefined") {
        return 0;
    }
    let isMultiple = texts instanceof Array;
    if (!isMultiple) texts = [texts];
    texts = texts.map(text => text.toString());
    let selected = [];
    if (texts.length) {
        let options = Array.from(select.options);
        for (let option of options) {
            if (texts.includes(option.textContent.trim())) {
                selected.push(true);
                option.selected = true;
                option.setAttribute("selected", "selected");
                if (!isMultiple) break;
            }
        }
    }
    // optional, handles bootstrap-select
    if (selected.length && select.classList.contains("selectpicker")) {
        if (window.hasOwnProperty("jQuery")) {
            jQuery(select).selectpicker("refresh");
        }
    }
    if (selected.length && dispatch) {
        select.dispatchEvent(new Event("change"));
    }
    return selected.length;
}

function hideSelectOptions(select, values) {
    if (values && !(values instanceof Array)) {
        values = [values];
    }
    // optional, handles bootstrap-select
    let isSelectpicker = select.classList.contains("selectpicker");
    let options = Array.from(select.options);
    for (let option of options) {
        let isOptionPlaceholder =
            isSelectpicker && option.classList.contains("bs-title-option");
        if (isOptionPlaceholder) {
            continue;
        }
        if (option.hasAttribute("value") && values.includes(option.value)) {
            option.hidden = true;
        }
    }
}

function unhideSelectOptions(select, values) {
    if (values && !(values instanceof Array)) {
        values = [values];
    }
    let options = Array.from(select.options);
    if (values) {
        for (let option of options) {
            if (option.hasAttribute("value") && values.includes(option.value)) {
                option.hidden = false;
            }
        }
    } else {
        for (let option of options) {
            option.hidden = false;
        }
    }
}