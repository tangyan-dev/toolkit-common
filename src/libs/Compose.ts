
'use strict';

export class Compose {
    middleware: any;
    constructor() {
        this.middleware = [];
    }
    use(fn: Function) {
        typeof fn === 'function' ? this.middleware.push(fn) : console.error('"fn" must be a function');
        return this;
    }
    exec(context: any, next: any) {
        let index = -1;
        let exec = (i: number) => {
            let fn = this.middleware[i];
            i === this.middleware.length && (fn = next);
            if (i <= index) {
                return Promise.reject('next() called multiple times');
            }
            index = i;
            if (typeof fn !== 'function') {
                return Promise.resolve(context);
            }
            try {
                return Promise.resolve(fn(context, () => exec(i + 1)));
            } catch (err) {
                Promise.reject(err);
            }
        };
        return exec(0);
    }
};


