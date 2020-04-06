const alwaysDisplayWrap = document.querySelector('.always-display');
const koDay = ['일', '월', '화', '수', '목', '금', '토'];
const date = new Date();

// 전체 날짜, 시간 관련
let timeSetting = {
    default : {
        month : date.getMonth() + 1,
        ddate : date.getDate(),
        day : date.getDay(),
        koDay : koDay[date.getDay()],
        hours : date.getHours(),
        minutes : date.getMinutes()
    },

    alwaysDisplayTime : () => {
        document.querySelector('#phone .always-display .time-box .time').innerHTML = timeSetting.default.hours + ':' + timeSetting.default.minutes;
        document.querySelector('#phone .always-display .time-box .date').innerHTML = timeSetting.default.month + '월 ' + timeSetting.default.ddate + '일 ' + timeSetting.default.koDay + '요일';;
    }
}

// AlwaysDisplay
let alwaysDisplay = {
    data : {
        count : 0,
        interval : null
    },

    fingerDown : () => {
        document.querySelector('.always-display .finger-print').style.opacity = '.3';
        interval = setInterval(() => {
            alwaysDisplay.data.count++;

            if(alwaysDisplay.data.count == 1) {
                alwaysDisplayWrap.style.opacity = '0';
                alwaysDisplayWrap.style.visibility = 'hidden';
            }
        }, 1000);
    },

    fingerUp : () => {
        alwaysDisplay.count = 0;
        document.querySelector('.always-display .finger-print').style.opacity = '1';
        clearInterval(interval);
    }
}

window.onload = () => {
    timeSetting.alwaysDisplayTime()

    document.querySelector('.always-display .finger-print').addEventListener('mousedown', () => { alwaysDisplay.fingerDown() });
    document.querySelector('.always-display .finger-print').addEventListener('mouseup', () => { alwaysDisplay.fingerUp() });
}