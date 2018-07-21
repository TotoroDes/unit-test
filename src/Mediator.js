class Mediator {
    constructor() {
        this.channels = {};
    }

    publish(eventName, data) {
        if (!Array.isArray(this.channels[eventName])) {
            return this;
        }
        this.channels[eventName].forEach(listener => {
            listener(eventName, data);
        });
        return this;
    }

    subscribe(eventName, callback) {
        if (typeof eventName !== 'string' || typeof callback !== 'function') {
            return this;
        }
        if (!Array.isArray(this.channels[eventName])) {
            this.channels[eventName] = [];
        }
        if (typeof callback === 'function') {
            this.channels[eventName].push(callback);
        }
        return this;
    }

    unsubscribe(eventName, callback) {
        if (!Array.isArray(this.channels[eventName])) {
            return this;
        }
        if (typeof callback === 'undefined') {
            this.channels[eventName] = [];
            return this;
        }

        this.channels[eventName] = this.channels[eventName].filter(listener => listener !== callback);
        return this;
    }
}

window.Mediator = Mediator;