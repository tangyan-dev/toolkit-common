const on = function (key: string | any[], cb: any, context: any, flag: any) {
    let callback = cb
    let callbacks;
    let bind = (key: string) => {
        callbacks = this.callbacksMap[key] || [];
        callback.context = context || null;
        callbacks.push(flag ? (res: any) => {
            callback.call(context || null, res);
            return 'del';
        } : callback);
        this.callbacksMap[key] = callbacks;
    };
    if (typeof callback === 'function') {
        if (typeof key === 'string') {
            bind(key);
        } else if (Array.isArray(key)) {
            for (let i = 0, l = key.length; i < l; i++) {
                let item = key[i];
                typeof item === 'string' && bind(item);
            }
        }
    }
};

export class Observer {
    callbacksMap: {};
    constructor(storage: {}) {
        this.callbacksMap = storage || {};
    }

    on (key: any, callback: any, context: any) {
        on.call(this, key, callback, context);
    }

    once (key: any, callback: any, context: any) {
        on.call(this, key, callback, context, 1);
    }

    off (key: string | number, cb: any, context: any) {
        let callback = cb;
        let i;
        let callBacks = this.callbacksMap[key] || [];
        callback.context = context || null;
        for (i = callBacks.length - 1; i >= 0; i--) {
            if (callback === callBacks[i]) {
                callBacks.splice(i, 1);
                break;
            }
        };
    }

    emit (key: string | number, res: any) {
        let callback;
        let callbacks = this.callbacksMap[key] || [];
        let i = 0;
        let l = callbacks.length;
        for (i; i < l; i++) {
            callback = callbacks[i];
            try {
                if (callback.call(callback.context || null, res) === 'del') {
                    callbacks.splice(i, 1);
                    i--;
                    l--;
                } !callbacks.length && (delete this.callbacksMap[key]);
            } catch (e) {
                console.error(e);
            }
        }
    }
}