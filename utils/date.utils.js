/**
 Copyright(c) 2009-2019 by GGoons.
*/

exports.secondsAgo = (num, now=null) => {
    now = now || new Date();
    now.setSeconds(now.getSeconds() - num);
    return now;
};

exports.minutesAgo = (num, now=null) => {
    now = now || new Date();
    now.setMinutes(now.getMinutes() - num);
    return now;
};

exports.hoursAgo = (num, now=null) => {
    now = now || new Date();
    now.setHours(now.getHours() - num);
    return now;
};

exports.daysAgo = (num, now=null) => {
    now = now || new Date();
    now.setDate(now.getDate() - num);
    return now;
};

exports.weeksAgo = (num, now=null) => {
    now = now || new Date();
    now.setDate(now.getDate() - (num*7));
    return now;
};

exports.monthsAgo = (num, now=null) => {
    now = now || new Date();
    now.setMonth(now.getMonth() - num);
    return now;
};

exports.yearsAgo = (num, now=null) => {
    now = now || new Date();
    now.setFullYear(now.getFullYear() - num);
    return now;
};

exports.secondsAfter = (num, now=null) => {
    now = now || new Date();
    now.setSeconds(now.getSeconds() + num);
    return now;
};

exports.minutesAfter = (num, now=null) => {
    now = now || new Date();
    now.setMinutes(now.getMinutes() + num);
    return now;
};

exports.hoursAfter = (num, now=null) => {
    now = now || new Date();
    now.setHours(now.getHours() + num);
    return now;
};

exports.daysAfter = (num, now=null) => {
    now = now || new Date();
    now.setDate(now.getDate() + num);
    return now;
};

exports.weeksAfter = (num, now=null) => {
    now = now || new Date();
    now.setDate(now.getDate() + (num*7));
    return now;
};

exports.monthsAfter = (num, now=null) => {
    now = now || new Date();
    now.setMonth(now.getMonth() + num);
    return now;
};

exports.yearsAfter = (num, now=null) => {
    now = now || new Date();
    now.setFullYear(now.getFullYear() + num);
    return now;
};

exports.duration = (ms1, ms2) => {
    return Math.abs(ms1 - ms2);
}

exports.milliSecondToSecond = (ms) => {
    return ms / 1000;
}

exports.milliSecondToMinute = (ms) => {
    return ms / (1000*60);
}

exports.milliSecondToHour = (ms) => {
    return ms / (1000*60*60);
}

exports.isInSeconds = (t, toSeconds) => {
    const duration = module.exports.duration(Date.now(), t.getTime());
    const diffInSeconds = module.exports.milliSecondToSecond(duration);
    return diffInSeconds <= toSeconds;
};

exports.isInMinutes = (t, toMinutes) => {
    const duration = module.exports.duration(Date.now(), t.getTime());
    const diffInMinutes = module.exports.milliSecondToMinute(duration);
    return diffInMinutes <= toMinutes;
};

exports.isInHours = (t, toHours) => {
    const duration = module.exports.duration(Date.now(), t.getTime());
    const diffInHours = module.exports.milliSecondToHour(duration);
    return diffInHours <= toHours;
};
