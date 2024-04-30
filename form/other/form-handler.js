/**
 * What should a form handler be able to do?
 *
 * - group similar fields together
 *   - fields (data)
 *   - hiddens (data)
 *   - buttons (control)
 *   - radios (control)
 *   - text fields (visible/editable fields)
 * - save the initial state (data) of the form
 * - detect if the state of the form (data) has changed
 * - add event listener IF a specific element is present
 * - ???
 */
class FormHandler {
    
    
    // #region ==================== CONSTRUCT
    
    constructor(form) {
        
        this.form = form;
        
        /**
         * All fields that contains a value.
         */
        this.fields = {};
        
        
        /**
         * Hidden inputs.
         */
        this.hiddens = {};
        
        
        /**
         * Buttons.
         */
        this.buttons = {};
        
        
        /**
         * Radios.
         */
        this.radios = {};
        
        
        /**
         * Checkboxes.
         */
        this.checkboxes = {};
        
        
        /**
         * Fields with visible texts.
         */
        this.textFields = {};
        
        
        /**
         * Valid element/control groups.
         */
        this.groups = ["fields", "hiddens", "buttons", "radios", "checkboxes", "textFields"];
        
        
        /**
         * Values of the fields.
         */
        this.values = {};
        
        
        /**
         * Element to focus.
         */
        this.focusField = null;
        
        
        /**
         * Stores the errors that relate to the corresponding field.
         * @see FormHandler.saveErrors()
         */
        this.errors = {};
        
        
        this.reload();
    }
    
    //#endregion
    
    
    // #region ==================== STATE
    
    /**
     * Resets all the field groups and the stored values.
     */
    reset() {
        this.fields     = {};
        this.hiddens    = {};
        this.buttons    = {};
        this.radios     = {};
        this.checkboxes = {};
        this.textFields = {};
        this.values     = {};
    }
    
    /**
     * Analyzes the form to group the fields and collects the initial values.
     */
    reload() {
        this.reset();
        this.groupFields();
        this.saveFieldValues();
    }
    
    //#endregion
    
    
    // #region ==================== FIELDS
    
    /**
     * Groups all form fields according to their types.
     */
    groupFields() {
        
        var self = this;
        
        /**
         * Fields that are mapped with integer keys; not with a name or id.
         */
        let fieldNames = Object.getOwnPropertyNames(this.form.elements).filter(item => /\D+/.test(item));
        
        fieldNames.forEach(fieldName => {
            
            let field = self.form.elements[fieldName];
            
            if (field instanceof HTMLElement) {
                
                let tagName = field.tagName.toLowerCase();
                
                if (field.name || field.id) {
                    
                    self.fields[fieldName] = field;
                    
                    if (["input", "textarea", "select"].includes(tagName)) {
                        
                        if (["text", "number", "password", "email", "date", "tel", "textarea", "select-one"].includes(field.type)) {
                            self.textFields[fieldName] = field;
                        }
                        else if (field.type == "hidden") {
                            self.hiddens[fieldName] = field;
                        }
                        else if (field.type == "checkbox") {
                            self.checkboxes[fieldName] = field;
                        }
                        else if (["button", "submit"].includes(field.type)) {
                            self.buttons[fieldName] = field;
                        }
                        
                    }
                    else if (tagName == "button") {
                        self.buttons[fieldName] = field;
                    }
                    
                }
                
            }
            else if (field instanceof RadioNodeList) {
                self.fields[fieldName] = field;
                self.radios[fieldName] = field;
            }
            
        });
    }
    
    //#endregion
    
    
    // #region ==================== FIELD VALUES
    
    /**
     * Gets the current values of the form fields.
     */
    getFieldValues() {
        let values = {};
        for (let fieldName in this.fields) {
            let field = this.fields[fieldName];
            if (field instanceof HTMLInputElement && "type" in field && field.type.toLowerCase() == "checkbox") {
                let value = field.checked ? field.value || "on" : "off";
                values[fieldName] = value;
            } else {
                values[fieldName] = field.value;
            }
        }
        return values;
    }
    
    /**
     * Sets the values of the form fields.
     */
    setFieldValues(values, fieldPrefix = null) {
        
        let self = this;
        let keys = Object.keys(values);
        
        keys.forEach(key => {
            
            let keyPrefixed = key;
            if (fieldPrefix) {
                keyPrefixed = fieldPrefix + key;
            }
            
            if (self.fields.hasOwnProperty(keyPrefixed)) {
                
                let field = self.fields[keyPrefixed];
                
                if (field instanceof HTMLSelectElement) {
                    let optionFound = false;
                    Array.from(field.options).forEachBreakable(option => {
                        if (option.value == values[key].toString()) {
                            optionFound = true;
                            option.selected = true;
                            return true;
                        }
                    });
                    if (!optionFound) {
                        Array.from(field.options).forEachBreakable(option => {
                            if (option.textContent.trim() == values[key].toString()) {
                                option.selected = true;
                                return true;
                            }
                        });
                    }
                }
                else if (field instanceof RadioNodeList) {
                    if (values[key]) {
                        field.value = values[key];
                    } else {
                        field.forEach(node => node.checked = false);
                    }
                }
                else if ("tagName" in field && field.tagName.toLowerCase() == "input" && field.type == "checkbox") {
                    if (values[key] && values[key] !== "off") {
                        field.checked = true;
                    } else {
                        field.checked = false;
                    }
                }
                else {
                    field.value = values[key];
                }
                
                field.dispatchEvent(new Event("input"));
            }
        });
        
    }
    
    /**
     * Saves the initial values of the form fields.
     */
    saveFieldValues() {
        this.values = this.getFieldValues();
    }
    
    /**
     * Reset form fields to their initial values.
     */
    resetFieldValues() {
        this.setFieldValues(this.values);
    }
    
    //#endregion
    
    
    // #region ==================== CHANGE DETECTION
    
    /**
     * Compares two values objects and checks whether they are identical.
     */
    valuesDiffer(values1, values2) {
        for (let fieldName in values1) {
            if (fieldName in values2) {
                if (values1[fieldName] != values2[fieldName]) {
                    return true;
                }
            }
        }
        return false;
    }
    
    /**
     * Detects whether the number of fields has changed.
     */
    fieldsChanged() {
        // detects "inserts"
        let fieldNames = Object.getOwnPropertyNames(this.form.elements).filter(item => /\D+/.test(item));
        for (let fieldName of fieldNames) {
            let field = this.form.elements[fieldName];
            if (field instanceof HTMLElement || field instanceof RadioNodeList) {
                if (field.name != "") {
                    if ( !(fieldName in this.fields) ) {
                        return true;
                    }
                }
            }
        }
        // detects "deletes"
        for (let fieldName in this.fields) {
            if ( !(fieldName in this.form.elements) ) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Detects whether the field values has changed.
     */
    valuesChanged() {
        return this.valuesDiffer(this.values, this.getFieldValues());
    }
    
    /**
     * Detects whether the form has changed.
     */
    hasChanged() {
        return this.fieldsChanged() || this.valuesChanged();
    }
    
    /**
     * Detects whether the form has changed.
     */
    isEmpty() {
        let values = Object.values(this.getFieldValues());
        for (let value of values) {
            if (value) {
                return false;
            }
        }
        return true;
    }
    
    //#endregion
    
    
    // #region ==================== EVENT LISTENER
    
    /**
     * Adds an event listener to a specific field.
     */
    addEventListener() {
        let target = null, eventType, callback;
        switch (arguments.length) {
            case 2:
                target = this.form;
                [eventType, callback] = arguments;
                break;
            case 3:
                [target, eventType, callback] = arguments;
                let group, fieldName;
                [group, fieldName] = target.split(".");
                if (!this.groups.includes(group) || !(fieldName in this[group])) {
                    return false;
                }
                target = this[group][fieldName];
        }
        if (!target) return false;
        target.addEventListener(eventType, callback.bind(target));
        return true;
    }
    
    //#endregion
    
    
    // #region ==================== FIELD FOCUS
    
    /**
     * Checks/detects if there's a field to focus.
     */
    detectFocusField(fieldName, focus = false) {
        if (fieldName) {
            if (fieldName in this.fields) {
                this.focusField = this.fields[fieldName];
                if (focus) this.focusField.focus();
            }
        } else {
            let elements = Array.from(this.form.elements);
            for (let i = 0; i < elements.length; i++) {
                let field = elements[i];
                let tagName = field.tagName.toLowerCase();
                if (["input", "textarea"].includes(tagName)) {
                    if (["text", "number", "password", "email", "textarea"].includes(field.type)) {
                        this.focusField = field;
                        if (focus) this.focusField.focus();
                        break;
                    }
                }
                
            }
        }
    }
    
    /**
     * Focuses a field.
     */
    focus() {
        if (this.focusField) {
            this.focusField.focus();
            try {
                this.focusField.selectionStart = this.focusField.selectionEnd = this.focusField.value.length;
            } catch {}
        }
    }
    
    //#endregion
    
    
    // #region ==================== MISC
    
    /**
     * Checks whether a field group exists AND a field exists in that group.
     */
    has(groupName, fieldName) {
        return this.groups.includes(groupName) && this[groupName].hasOwnProperty(fieldName);
    }
    
    /**
     * Loops a group of fields.
     */
    forEach(group, callback) {
        if (!group || !callback) {
            return false;
        }
        if (!this.groups.includes(group)) {
            return false;
        }
        for (let fieldName in this[group]) {
            callback(this[group][fieldName], fieldName);
        }
    }
    
    //#endregion
    
    
    // #region ==================== ERRORS
    
    // getErrors(callback) {
        
    //     let errors = {};
        
    //     for (let fieldName in this.fields) {
    //         let field = this.fields[fieldName];
    //         let error = callback(field, fieldName);
    //         if (Object.keys(error).length) {
    //             errors[fieldName] = error;
    //         }
    //     }
        
    //     return errors;
    // }
    
    // saveErrors(callback) {
    //     this.errors = this.getErrors(callback);
    // }
    
    // printErrors(errors, callback) {
    //     for (let fieldName in this.fields) {
    //         if (fieldName in errors) {
    //             let field = this.fields[fieldName];
    //             callback(field, fieldName);
    //         }
    //     }
    // }
    
    //#endregion
    
    
    // #region ==================== FORM DATA
    
    getFormData() {
        let data = [];
        Array.from(new FormData(this.form).entries()).forEach(e => data.push(e))
        return data;
    }
    
    //#endregion
    
    
}