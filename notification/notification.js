class Notification {
    
    
    /**
     * Class to be added to the HTML output.
     */
    static baseClass = null
    
    
    /**
     * Prefix for the type and dismissible classes.
     */
    static classPrefix = null;
    
    
    /**
     * This class will be added to the output if the notification is dismissible.
     */
    static dismissibleClass = null;
    
    
    /**
     * This element will be added to the output if the notification is dismissible.
     */
    static dismissibleElement = null;
    
    
    /**
     * A list of possible notification types.
     * @see Notification.getVarsFromElement()
     */
    static types = [];
    
    
    /**
     * Notification text.
     */
    text = null;
    
    
    /**
     * Notification type.
     */
    type = null;
    
    
    /**
     * Determines if the notification will be dismissible.
     */
    dismissible = null;
    
    
    /**
     * Id for the notification output.
     */
    id = null;
    
    
    /**
     * Additional class for the notification output.
     */
    elemClass = null;
    
    
    
    constructor(text, type = null, dismissible = null, id = null, elemClass = null) {
        this.text        = text;
        this.type        = type;
        this.dismissible = dismissible;
        this.id          = id;
        this.elemClass   = elemClass;
    }
    
    
    
    static fromObject(obj) {
        obj = Object.merge({
            text        : null,
            type        : null,
            dismissible : null,
            id          : null,
            elemClass   : null,
        // }, obj, {mixMatch : "overwrite"});
        }, obj, {
            unique : {
                keepRight : false,
            },
        });
        if (!obj.text) {
            return null;
        }
        return new Notification(obj.text, obj.type, obj.dismissible, obj.id, obj.elemClass);
    }
    
    
    
    /**
     * Sets the default values (context) for the notifications.
     */
    static setDefaults(defaults) {
        for (let [property, value] of Object.entries(defaults)) {
            Notification[property] = value;
        }
    }
    
    
    
    /**
     * Generates the output HTML.
     */
    html() {
        
        let html = elem("div", {"class" : Notification.baseClass});
        
        if (this.type) {
            html.classList.add(Notification.classPrefix + this.type);
        }
        
        html.append(this.text);
        
        if (this.dismissible) {
            html.classList.add(Notification.classPrefix + Notification.dismissibleClass);
            html.append(Notification.dismissibleElement.cloneNode(true));
        }
        
        if (this.id) {
            html.id = this.id;
        }
        
        if (this.elemClass) {
            let classes = this.elemClass.split(" ");
            for (let elemClass of classes) {
                html.classList.add(elemClass);
            }
        }
        
        return html;
    }
    
    
    
    /**
     * Checks if an element is a notification.
     */
    static isNotification(element) {
        let prefixPattern = new RegExp("\\b" + Notification.classPrefix + "\\w+\\b");
        return element.classList.contains(Notification.baseClass) && prefixPattern.test(element.className);
    }
    
    
    
    /**
     * Extracts Notification arguments from an already existing Notification element in the page.
     */
    static getVarsFromElement(element) {
        
        let vars = {
            text        : null,
            type        : null,
            dismissible : null,
            id          : null,
            class       : null,
        };
        
        vars.text = element.textContent;
        
        let classPrefix = Notification.classPrefix || "";
        
        let types = Notification.types.map(type => classPrefix + type);
        
        for (let type of types) {
            if (element.classList.contains(type)) {
                vars.type = type.replace(classPrefix, "");
                break;
            }
        }
        
        vars.dismissible = element.classList.contains(classPrefix + Notification.dismissibleClass);
        vars.id          = element.id || null;
        
        let classList = Array.from(element.classList);
        
        classList = classList.filter(cls => {
            if (cls == Notification.baseClass) {
                return false;
            }
            else if (cls == classPrefix + Notification.dismissibleClass) {
                return false;
            }
            else if (types.includes(cls)) {
                return false;
            }
            return true;
        });
        
        vars.class = classList.join(" ");
        
        return vars;
    }
    
    
    
}