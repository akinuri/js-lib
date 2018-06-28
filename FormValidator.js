// ======================================== HELPERS

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// ======================================== FormValidator

function FormValidator(formElement, locale) {
    this.form   = formElement;
    this.fields = {};
    this.locale = locale || "en";
    this.errors = {};
}

FormValidator.errorMessages = {
    required : {
        en : "This field is required.",
        tr : "Bu alan zorunludur.",
    },
    minLength : {
        en : "Input length should not be less than {0} characters.",
        tr : "Girdi uzunluğu en az {0} karakter olmalıdır.",
    },
    maxLength : {
        en : "Input length should not be greater than {0} characters.",
        tr : "Girdi uzunluğu en fazla {0} karakter olmalıdır.",
    },
    match : {
        en : "Passwords do not match.",
        tr : "Şifreler birbirini tutmuyor.",
    },
};

FormValidator.prototype.addField = function addField(fieldName, options) {
    if (this.form.elements[fieldName]) {
        this.fields[fieldName] = options;
        this.fields[fieldName]["elem"] = this.form.elements[fieldName];
    }
};

FormValidator.prototype.addFields = function addFields(fields) {
    for (var fieldName in fields) {
        var options = fields[fieldName];
        this.addField(fieldName, options);
    }
};

FormValidator.prototype.addError = function addField(fieldName, errorMessage) {
    if (!this.errors.hasOwnProperty(fieldName)) { this.errors[fieldName] = []; }
    this.errors[fieldName].push(errorMessage);
};

FormValidator.prototype.validate = async function validateForm() {
    this.errors = {};
    var self   = this;
    
    await asyncForEach(Object.keys(self.fields), async function (fieldName) {
        var field = self.fields[fieldName];
        
        if (field.hasOwnProperty("required") && field.required && field.elem.value.length == 0) {
            self.addError(fieldName, FormValidator.errorMessages.required[self.locale]);
        }
        
        if (field.hasOwnProperty("minLength") && field.elem.value.length < field.minLength) {
            self.addError(fieldName, FormValidator.errorMessages.minLength[self.locale].replace("{0}", field.minLength));
        }
        
        if (field.hasOwnProperty("maxLength") && field.elem.value.length > field.maxLength) {
            self.addError(fieldName, FormValidator.errorMessages.maxLength[self.locale].replace("{0}", field.maxLength));
        }
        
        if (field.hasOwnProperty("match")) {
            var targetFieldName = field["match"];
            var targetField     = self.fields[targetFieldName];
            if (field.elem.value != targetField.elem.value) {
                self.addError(fieldName, FormValidator.errorMessages.match[self.locale]);
            }
        }
        
        if (field.hasOwnProperty("ajax")) {
            await field.ajax(self, field, fieldName);
        }
        
    });
    
    return this.errors;
};
