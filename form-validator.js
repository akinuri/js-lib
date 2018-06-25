// ======================================== HELPERS

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// ======================================== FormValidator

function FormValidator(formElement) {
    this.form = formElement;
    this.fields = {};
    this.errors = {};
}

FormValidator.prototype.addField = function addField(fieldName, options) {
    if (this.form.elements[fieldName]) {
        this.fields[fieldName] = options;
        this.fields[fieldName]["elem"] = this.form.elements[fieldName];
    }
};

FormValidator.prototype.addError = function addField(fieldName, errorMessage) {
    if (!this.errors.hasOwnProperty(fieldName)) { this.errors[fieldName] = []; }
    this.errors[fieldName].push(errorMessage);
};

FormValidator.prototype.validate = async function validateForm() {
    this.errors = {};
    var self = this;
    
    await asyncForEach(Object.keys(self.fields), async function (fieldName) {
        var field = self.fields[fieldName];
        
        if (field.hasOwnProperty("required") && field.required && field.elem.value.length == 0) {
            self.addError(fieldName, "This field is required.");
            // break;
        }
        
        if (field.hasOwnProperty("minLength") && field.elem.value.length < field.minLength) {
            self.addError(fieldName, "Input length should not be less than " + field.minLength + " characters.");
            // break;
        }
        
        if (field.hasOwnProperty("maxLength") && field.elem.value.length > field.maxLength) {
            self.addError(fieldName, "Input length should not be greater than " + field.maxLength + " characters.");
            // break;
        }
        
        if (field.hasOwnProperty("ajax")) {
            // FormValidator can't possibly know what the call will return, so we can't add the error here
            // it has to be done manually
            await field.ajax(self, field, fieldName);
        }
        
    });
    
    if (Object.keys(self.errors).length != 0) {
        // warn the user
        console.log("errors: ", self.errors);
    }
};
