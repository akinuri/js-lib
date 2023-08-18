function reflectInputToText(inputEl, textEl) {
    inputEl.addEventListener("input", () => {
        let value = (inputEl.value || "");
        if (["number", "range"].includes(inputEl.type)) {
            let valuePrecision = getPrecision(inputEl.step || 1);
            value = parseFloat(value) || 0;
            value = value.toFixed(valuePrecision);
        }
        value += textEl.dataset.reflectSuffix || "";
        textEl.textContent = value;
    });
}