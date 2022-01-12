export class Switch {
    config: { timeout: number; };
    status: {};
    constructor(config = { timeout: 3000 }) {
      this.status = {};
      this.config = config;
    }

    isOpen(key: string | number) {
      let status = (this.status[key] || {}).status;
      let isOpen = status === 'finish' || status === undefined;
      if (isOpen) {
        this.status[key] = this.status[key] || {};
        this.status[key].status = 'pending';
        this.status[key].timer = setTimeout(() => {
          this.status[key].status = 'finish';
        }, this.config.timeout);
      }
      return isOpen;
    }

    reset(res: any, key: string | number) {
      this.status[key].status = 'finish';
      this.status[key].timer && clearTimeout(this.status[key].timer);
      this.status[key] = null;
      return res;
    }
  };
