### Description

这是一个通用 toolkit 集合, 支持 node 和浏览器端.

### Usage

```js
const { Breaker, char, Compose, dateTool, extend, list, number, Observer, Retry, Switch, to, type } = require('@tangyansoft/toolkit-common');
```

---

- `Breaker` 熔断 `new Breaker(options)` 返回一个 Object.
  - `options` 对象, 熔断参数:
