function getRadios(name) {
    return Array.from(document.querySelectorAll(`input[type=radio][name=${name}]`));
}

function getRadioByValue(name, value) {
    let radios = getRadios(name);
    for (const radio of radios) {
        if (radio.value == value) {
            return radio;
        }
    }
    return null;
}

function getRadioValue(name) {
    let value = null;
    let radios = getRadios(name);
    for (const radio of radios) {
        if (radio.checked) {
            value = radio.value;
            break;
        }
    }
    return value;
}

function onRadio(name, event, callback) {
    let radios = getRadios(name);
    radios.forEach(radio => {
        radio.addEventListener(event, callback);
    });
}