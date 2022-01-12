export const list = {
    random: (arr: ConcatArray<any>, len: number) => {
        let result = [];
        if (Array.isArray(arr)) {
            if (arr.length < len) {
                return arr;
            }
            let newArr = [].concat(arr);
            let count = 0;
            while (count < len) {
                count++;
                result.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
            }
        }
        return result;
    },
    average: (arr: string | any[], segment: number) => {
        let result: any[] = [];
        let count = 0;
        const tiled = (arr: any[]) => {
            arr.forEach((_, idx) => {
                result[idx] = result[idx] + 1;
            });
        };
        if (Array.isArray(arr)) {
            let len = Math.floor(arr.length / segment);
            result = Array.from({ length: segment }).map(() => len);
            arr.length % segment && tiled(arr.slice(len * segment, arr.length), segment);
            result = result.map(item => {
                count += item;
                return arr.slice(count - item, count);
            });
            return result;
        }
    }
};
