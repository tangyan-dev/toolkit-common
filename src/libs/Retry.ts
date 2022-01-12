export class Retry {
    options: any
    timeouts: any
    count: number
    fn: (arg0: number) => void
    timer: any
    errors: any
    status: string
    constructor(options = {}) {
        this.options = Object.assign(
            {
                factor: 2,
                minTimeout: 200,
                maxTimeout: 2000,
                retries: 2,
            },
            options
        );
        const { factor, retries, minTimeout, maxTimeout } = this.options;
        this.timeouts = Array.from({ length: retries })
            .map((_: any, idx: number) => Math.min(maxTimeout, Math.round(minTimeout * Math.pow(factor, idx))))
            .sort((a: number, b: number) => a - b);
        this.count = 0;
        this.errors = [];
        this.status = 'RETRY';
    }

    start(fn: (arg0: number) => void) {
        this.fn = fn;
        fn(this.count);
    }

    stop() {
        this.status = 'STOP';
        this.timer && clearTimeout(this.timer);
    }

    retry(err: any) {
        this.timer && clearTimeout(this.timer);
        if (!err || this.count >= this.options.retries) {
            return false
        }
        err && this.errors.push(err);
        this.count++;
        const timeout = this.timeouts.shift();
        this.timer = setTimeout(() => {
            this.status !== 'STOP' && this.fn(this.count)
        }, timeout);
        return true;
    }

    error() {
        return this.errors[this.errors.length - 1];
    }
}