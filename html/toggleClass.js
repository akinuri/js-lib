(function () {
    console.warn("HTMLElement.prototype has been extended with a method: toggleClass(classname1 [, className2])");
    HTMLElement.prototype.toggleClass = function (className1, className2) {
        if (className1) {
            if (className2) {
                if (this.classList.contains(className1)) {
                    this.classList.remove(className1);
                    if (!this.classList.contains(className2)) {
                        this.classList.add(className2);
                    }
                } else {
                    this.classList.add(className1);
                    if (this.classList.contains(className2)) {
                        this.classList.remove(className2);
                    }
                }
            } else {
                if (this.classList.contains(className1)) {
                    this.classList.remove(className1);
                } else {
                    this.classList.add(className1);
                }
            }
        }
    };
})();