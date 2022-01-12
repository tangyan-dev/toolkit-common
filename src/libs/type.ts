const _type = (str: string) => (data: any) => (str === Object.prototype.toString.call(data).slice(8, -1));

export const isObject = _type('Object');
export const isPlainObject = _type('Object');
export const isFunction = _type('Function');
export const isArray = _type('Array');
export const isString = _type('String');
export const isNumber = (num: any) => _type('Number')(num) && !Object.is(num, NaN);
export const isNull = _type('Null');
export const isUndefined = _type('Undefined');
export const isError = _type('Error');