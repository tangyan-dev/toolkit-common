export const number = {
    thousandth: (num: any) => {
        let numStr = String(num);
        if (/\d+\.?(\d+)?/.test(numStr)) {
            numStr = numStr.replace(/[^.]+/, $1 => $1.replace(/(\d)(?=(\d{3})+\b)/g, '$1,'));
            !/\./.test(numStr) && (numStr += '.00');
        } else {
            numStr = '';
        }
        return numStr;
    }
};