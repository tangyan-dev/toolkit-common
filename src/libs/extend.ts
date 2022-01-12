/**
* @description:
* @author: manble@live.com
* @created:
*/

import { isObject, isArray } from './type';

export const clone = (data: any) => {
    let newData: any = null;
    if (isObject(data)) {
        newData = {};
        Object.keys(data).forEach(key => {
            newData[key] = clone(data[key]);
        });
    } else if (isArray(data)) {
        newData = [];
        data.forEach((item: any) => {
            newData.push(clone(item));
        });
    } else {
        newData = data;
    }
    return newData;
};

export const extend = function extend(target: any, source: any) {
    let result: { [x: string]: any; } = null;
    if (isObject(target) && isObject(source)) {
        result = target;
        Object.keys(source).forEach((key) => {
            if (isObject(result[key]) && isObject(source[key])) {
                extend(result[key], source[key]);
            } else if (Array.isArray(source[key])) {
                result[key] = clone(source[key]);
            } else {
                if (isObject(source[key])) {
                    result[key] = clone(source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        });
    } else if (isArray(source)) {
        result = clone(source);
    } else {
        result = source;
    }
    return result;
};

export const merge = (target: any, source: any, isShowDifference: boolean = false) => {
    let result = {};
    let difference = {};
    const merge = (target: any, source: any, result: any, difference: any) => {
        if (isObject(target) && isObject(source)) {
            let sourceKeys: Array<any> = Object.keys(source);
            let targetKeys: Array<any> = Object.keys(target);
            sourceKeys.forEach((key) => {
                result[key] = clone(source[key]);
                difference[key] = {};
                merge(target[key], source[key], result[key], difference[key]);
            });
            targetKeys.filter(key => sourceKeys.indexOf(key) === -1).forEach(key => {
                result[key] = clone(target[key]);
                difference[key] = [clone(target[key]), null];
            });
            return;
        }

        if (isArray(target) && isArray(source)) {
            result = [];
            difference = [];
            const targetLen = target.length;
            const sourceLen = source.length;
            const len = Math.max(targetLen, sourceLen);
            for (let i = 0; i < len; i++) {
                result[i] = {};
                difference[i] = {};
                merge(target[i], source[i], result[i], difference[i]);
            }
            return;
        }

        if (!target && source) {
            result = clone(source);
            difference = [null, clone(source)];
            return;
        }

        if (target && !source) {
            result = clone(target);
            difference = [clone(target), null];
            return;
        }
        if (target && source) {
            result = clone(source);
            if (target !== source ) {
                difference = [clone(target), clone(source)];
            }
        }
    };
    merge(target, source, result, difference);
    return {
        result, difference: isShowDifference ? difference : null
    }
};



