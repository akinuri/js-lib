class ScriptLoader {
    
    scripts = {};
    isTrackingLoads = null;
    allScriptsLoadedAt = null;
    container = null;
    
    constructor(scripts = {}) {
        this.scripts = scripts;
        this.container = document.createElement("div");
        this.container.className = "script-loader";
        if (Object.values(scripts).length) {
            this.load();
        }
    }
    
    trackLoads() {
        if (this.isTrackingLoads) return;
        this.isTrackingLoads = true;
        window.addEventListener("ScriptLoaded", () => {
            if (this.areAllScriptsLoaded()) {
                this.allScriptsLoadedAt = performance.now();
                window.dispatchEvent(new CustomEvent("AllScriptsLoaded", {detail: {loader: this}}));
            }
        });
    }
    
    areAllScriptsLoaded() {
        return Object.values(this.scripts).every(config => config.loaded);
    }
    
    load() {
        this.trackLoads();
        for (let scriptURL in this.scripts) {
            let config = this.scripts[scriptURL];
            if (config.loaded != true) {
                fetch(scriptURL, {cache: "no-store"})
                    .then((response) => response.text())
                    .then((text) => {
                        let script = document.createElement("script");
                        script.textContent = text;
                        this.container.append(script);
                        if (!this.container.parentElement && document.body) {
                            document.body.append(this.container);
                        }
                        config.loaded = true;
                        config.loadedAt = performance.now();
                        window.dispatchEvent(new CustomEvent("ScriptLoaded", {detail: {loader: this, src: scriptURL}}));
                    });
            }
        }
    }
    
    onAllLoaded(callback) {
        if (this.areAllScriptsLoaded() && this.allScriptsLoadedAt != null) {
            callback();
        } else {
            window.addEventListener("AllScriptsLoaded", callback);
        }
    }
    
}