export class Breaker {
    options: any
    breakers: any
    constructor(options = {}) {
        this.options = Object.assign(
            {
                maxFailures: 500,
                retryTimePeriod: 5000,
            },
            options
        );
        this.breakers = {};
    }

    create(name: string, options = {}) {
        let key = name
        if (key && !this.breakers[key]) {
            this.breakers[key] = {
                status: 'CLOSED',
                maxFailures: options.maxFailures || this.options.maxFailures,
                retryTimePeriod: options.retryTimePeriod || this.options.retryTimePeriod,
                failureCount: 0,
                lastFailureTime: null,
            };
        }
    }

    setStatus(name: string) {
        let key = name;
        if (key && this.breakers[key]) {
            const { maxFailures, failureCount, retryTimePeriod, lastFailureTime } = this.breakers[key]
            if (maxFailures <= failureCount) {
                if (Date.now() - lastFailureTime > retryTimePeriod) {
                    this.breakers[key].status = 'HALF-OPEN'
                    return;
                }
                this.breakers[key].status = 'OPEN';
                return;
            }
            this.breakers[key].status = 'CLOSED';
        }
    }

    getStatus(name: string) {
        let key = name;
        return (this.breakers[key] || {}).status || 'CLOSED';
    }

    record(name: string, err: any) {
        let key = name;
        if (key && this.breakers[key]) {
            this.setStatus(key);
            err ? this.breakers[key].failureCount++ : this.breakers[key].failureCount > 0 && this.breakers[key].failureCount--;
            err && (this.breakers[key].lastFailureTime = Date.now());
        }
    }

    reset(name: string) {
        let key = name
        if (key && this.breakers[key]) {
            this.breakers[key].failureCount = 0
            this.breakers[key].lastFailureTime = null
            this.breakers[key].status = 'CLOSED'
        }
    }
}