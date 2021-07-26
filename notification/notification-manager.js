class NotificationManager {
    
    /**
     * Type of the notification, e.g. "danger", "success", etc.
     */
    type = null;
    
    
    /**
     * Is notification dismissible?
     */
    dismissible = null;
    
    
    /**
     * Additional class(es) for the notification.
     */
    elemClass = null;
    
    
    /**
     * Properties to be used for the context.
     */
    contextProperties = ["type", "dismissible", "class"];
    
    
    /**
     * Default context values.
     */
    contextDefault = [null, null, null];
    
    
    /**
     * Used for keeping track of temporary context.
     */
    tempContextSet = false;
    
    
    /**
     * Context stack. Used for Save and Restore.
     */
    contexts = [];
    
    
    constructor(type = null, dismissible = null, elemClass = null) {
        this.setContext(type, dismissible, elemClass);
    }
    
    
    /**
     * Sets the context for the next (to-be-added) notifications.
     */
    setContext(type = null, dismissible = null, elemClass = null) {
        this.type        = type;
        this.dismissible = dismissible;
        this.elemClass   = elemClass;
    }
    
    
    /**
     * Gets current context values.
     */
    getContext() {
        let context = [];
        this.contextProperties.forEach(prop => {
            context.push(this[prop]);
        });
        return context;
    }
    
    
    /**
     * Stores the current context in the stack.
     */
    saveContext() {
        this.contexts.push(this.getContext());
    }
    
    
    /**
     * Restores the last context.
     */
    restoreContext() {
        if (this.contexts.length) {
            let contextArgs = this.contexts.pop();
            this.setContext.apply(null, contextArgs);
        }
    }
    
    
    /**
     * Sets a temporary context. It'll be cleared after a notification is added.
     */
    setTempContext(type = null, dismissible = null, elemClass = null) {
        this.saveContext();
        this.setSontext($type, $dismissible, $class);
        this.tempContextSet = true;
    }
    
    
    /**
     * Restores the default context.
     */
    resetContext() {
        this.setContext.apply(null, this.contextDefault);
    }
    
    
    /**
     * Returns an arguments array for the Notification class.
     */
    notificationArgs(text, type = null, dismissible = null, id = null, elemClass = null) {
        return [
            text,
            type || this.type,
            typeof dismissible == "boolean" ? dismissible : this.dismissible,
            id,
            elemClass || this.elemClass,
        ];
    }
    
    
    /**
     * Builds a new notification and returns the HTML.
     */
    new(text, type = null, dismissible = null, id = null, elemClass = null) {
        if (this.tempContextSet) {
            this.tempContextSet = false;
            this.restoreContext();
        }
        let notificationArgs = this.notificationArgs(text, id, type, dismissible, elemClass);
        return (new Notification(...notificationArgs)).html();
    }
    
    
    /**
     * Dissmiss the specified notification or notifications in the element.
     * 
     * @param elem Either a string (element id) or an element. Element can be the notification itself, or a parent that contains notification(s).
     */
    dismiss(elem) {
        if (!elem) {
            return
        }
        if (typeof elem == "string") {
            let notif = document.querySelector(elem);
            if (notif && Notification.isNotification(notif)) {
                notif.remove();
            }
        }
        else if (elem instanceof HTMLElement) {
            if (Notification.isNotification(elem)) {
                elem.remove();
            } else {
                let notifications = elem.querySelectorAll("." + Notification.baseClass);
                notifications.forEach(notif => notif.remove());
            }
        }
    }
    
}