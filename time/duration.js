function strToDur(str) {
    let dur_h = 0;
    let dur_m = 0;
    let dur_s = 0;
    const match = str.match(/(?:(\d+)h ?)?(?:(\d+)m ?)?(?:(\d+)s)?/);
    if (match) {
        dur_h = parseInt(match[1]) || dur_h;
        dur_m = parseInt(match[2]) || dur_m;
        dur_s = parseInt(match[3]) || dur_s;
    }
    const dur = {
        h: dur_h,
        m: dur_m,
        s: dur_s,
    };
    return dur;
}

function durToStr(dur) {
    const parts = [];
    if (dur.h !== 0) {
        parts.push(dur.h + 'h');
    }
    if (dur.m !== 0 || dur.h !== 0) {
        parts.push(dur.m + 'm');
    }
    if (dur.s !== 0 || dur.m !== 0 || dur.h !== 0) {
        parts.push(dur.s + 's');
    }
    const result = parts.join(' ');
    return result;
}

function secToDur(sec) {
    let dur_h = Math.floor(sec / (60 * 60));
    sec -= dur_h * 60 * 60;
    let dur_m = Math.floor(sec / 60);
    sec -= dur_m * 60;
    const dur_s = sec;
    const dur = {
        h: dur_h,
        m: dur_m,
        s: dur_s,
    };
    return dur;
}

function durToSec(dur) {
    return (dur.h * 60 * 60) + (dur.m * 60) + dur.s;
}