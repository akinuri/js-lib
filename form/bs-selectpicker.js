function initSelectpickers(parent) {
    jQuery(parent).find(".selectpicker").selectpicker();
}

/**
 * Binds the "changed.bs.select" and "input" events together.
 */
function bindSelectpickerEvents(select) {
    if (
        !select
        || select.tagName.toLowerCase() != "select"
        || !select.classList.contains("selectpicker")
    ) {
        return;
    }
    let isInitialized = select.parentElement.classList.contains("bootstrap-select");
    if (isInitialized) {
        jQuery(select).on("changed.bs.select", () => {
            select.dispatchEvent(new Event("input"));
        });
        select.addEventListener("input", () => {
            jQuery(select).selectpicker("refresh");
        });
    } else {
        jQuery(select).on("loaded.bs.select", () => {
            bindSelectpickerEvents(select);
        });
    }
}

function refreshSelectpicker(select) {
    setTimeout(() => {
        if (select.tagName.toLowerCase() != "select") {
            select = select.querySelector(".selectpicker");
        }
        jQuery(select).selectpicker("refresh");
    });
}

function enableSelectPicker(select) {
    let parent = select.parentElement;
    let toggle = select.nextElementSibling;
    select.disabled = false;
    parent.classList.remove("disabled");
    toggle.classList.remove("disabled");
    // jQuery(select).selectpicker("refresh");
}

function disableSelectPicker(select, isRequired = false) {
    let parent = select.parentElement;
    let toggle = select.nextElementSibling;
    if (!isRequired) {
        select.disabled = true;
    }
    parent.classList.add("disabled");
    toggle.classList.add("disabled");
    // jQuery(select).selectpicker("refresh");
}

function resetSelectpicker(child, value = "") {
    let parent = child.closest(".bootstrap-select");
    let select = parent.querySelector("select.selectpicker");
    jQuery(select).selectpicker("val", value);
}

function getSelectpickerSearchText(child) {
    return child
        .closest(".bootstrap-select")
        .querySelector("input[type='search']").value;
}

function getSelectpickerState(clickedIndex, isSelected, previousValue, field) {
    let currentValue = field.value;
    let states = {
        unselect     : !isSelected && currentValue == "",
        firstSelect  : isSelected && previousValue == "" && currentValue != "",
        optionSwitch : isSelected && previousValue != "" && currentValue != "",
        blankSelect  : isSelected && previousValue != "" && currentValue == "",
    };
    let result = {
        text : null,
        states,
    };
    for (let stateName in states) {
        let state = states[stateName];
        if (state === true) {
            result.text = stateName;
            break;
        }
    }
    return result;
}

function getSelectpickerDropdownHeight(child) {
    let parent = child.closest(".bootstrap-select");
    let dropdown = parent.querySelector(".dropdown-menu");
    return dropdown.clientHeight;
}