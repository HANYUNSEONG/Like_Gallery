const alwaysDisplayWrap = document.querySelector('.always-display');
const date = new Date();
const koreanDayName = ['일', '월', '화', '수', '목', '금', '토'];
const koDay = koreanDayName[date.getDay()];

// 전체 날짜, 시간 관련
let timeSetting = {
    defaultTimeView : () => {
        // date setting
        let month = date.getMonth() + 1;
        let ddate = date.getDate();

        // time setting
        let hours = date.getHours();
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

        // alwaysDisplay Time Setting
        document.querySelector('#phone .always-display .time-box .time').innerHTML = hours + ':' + minutes;
        document.querySelector('#phone .always-display .time-box .date').innerHTML = month + '월 ' + ddate + '일 ' + koDay + '요일';

        // Home top-bar Time Setting
        document.querySelector('#phone #top-bar .time').innerHTML = hours + ':' + minutes;
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
    // start run function
    timeSetting.defaultTimeView()

    // AlwaysDisplay Event
    document.querySelector('.always-display .finger-print').addEventListener('mousedown', () => { alwaysDisplay.fingerDown() });
    document.querySelector('.always-display .finger-print').addEventListener('mouseup', () => { alwaysDisplay.fingerUp() });
}