const getAllDay = (year = new Date().getFullYear()) => {
    return Array.from({ length: 12 }).map((_: any, idx: number) => {
        let num = 31;
        let month = idx + 1;
        month === 2 && (num = year % 4 ? 28 : 29);
        [4, 6, 9, 11].includes(month) && (num = 30);
        return Array.from({ length: num }).map((_: any, idx: number) => [year, month, idx + 1]);
    });
};

const getAllWeek = (year = new Date().getFullYear()) => {
    return getAllDay(year).map((list: any[]) => {
        let week = () => Array.from({ length: 7 });
        let result: any[] = [];
        let count = 0;
        result[count] = week();
        list.forEach((item: [any, any, any]) => {
            let [year, month, day] = item;
            let idx = new Date(`${year}-${month}-${day} 15:00:00`).getDay();
            result[count][idx] = item;
            if (idx === 6) {
                ++count;
                result[count] = week();
            }
        });
        return result;
    });
};


export const dateTool = {
    format: (timestamp: string, tpl = 'yyyy-MM-dd hh:mm:ss') => {
        let format = tpl;
        (date => [
            ['y+', date.getFullYear()],
            ['M+', date.getMonth() + 1],
            ['d+', date.getDate()],
            ['h+', date.getHours()],
            ['m+', date.getMinutes()],
            ['s+', date.getSeconds()],
            ['S+', date.getMilliseconds()],
            ['q+', Math.floor((date.getMonth() + 3) / 3)],
        ])(new Date(parseInt(timestamp, 10) || 0)).forEach((item: any, idx) => {
            format = format.replace(new RegExp(item[0]), match => {
                let val = String(item[1]);
                !idx && (val = val.substr(val.length - match.length));
                match.length > val.length && (val = `0${val}`);
                return val;
            });
        });
        return format;
    },

    //timestamp('2021-10-01 12:00:00') === 1633060800000
    timestamp: function (date: string) {
        let list, item: any[] = [];
        if (date) {
            list = date.split(' ');
            for (let i = 0, l = list.length; i < l; i++) {
                /-/.test(list[i]) && (item = item.concat(list[i].split('-')));
                /:/.test(list[i]) && (item = item.concat(list[i].split(':')));
            }
            for (let j = 0; j < 6; j++) {
                item[j] = j == 1 ? (Number(item[j]) - 1) : Number(item[j]) || 0;
            }
        }
        return new Date(item[0], item[1], item[2], item[3], item[4], item[5]).getTime();
    },

    // time(100000) == 00:01:40
    time: function (milliseconds: number) {
        let hour, min, sec, ms = milliseconds;
        hour = parseInt(ms / (60 * 60 * 1000));
        ms = ms % (60 * 60 * 1000);
        min = parseInt(ms / (60 * 1000));
        ms = ms % (60 * 1000);
        sec = Math.floor(ms / 1000);
        (hour < 10) && (hour = '0' + hour);
        (min < 10) && (min = '0' + min);
        (sec < 10) && (sec = '0' + sec);

        return (hour + ':' + min + ':' + sec);
    },

    // 计时(正计时，倒计时) 00:00:00 setInterval(function(){stopwatch(1480406800086)}, 1000);
    // end > start ? 正计时 : 倒计时
    stopwatch: function (start: any, end: any) {
        if (String(parseInt(start, 10)) == 'NaN') {
            return '';
        }
        end = String(parseInt(end, 10)) != 'NaN' ? end : new Date().getTime();

        return this.time(end - start);
    },

    getAllDay,

    getAllWeek,

    getWeek: function () {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        let week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
            - 3 + (week1.getDay() + 6) % 7) / 7);
    }
};
