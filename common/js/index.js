const alwaysDisplayWrap = document.querySelector('.always-display');
const koDay = ['일', '월', '화', '수', '목', '금', '토'];

let alwaysDisplay = {
    data : {
        count : 0,
        interval : null
    },

    timeSetting : () => {
        let date = new Date();
        let timeText = date.getHours() + ':' + date.getMinutes();
        let dateText = date.getMonth() + 1 + '월 ' + date.getDate() + '일 ' + koDay[date.getDay()] + '요일';

        document.querySelector('#phone .always-display .time-box .time').innerHTML = timeText;
        document.querySelector('#phone .always-display .time-box .date').innerHTML = dateText;
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
        clearInterval(interval);
    }
}

window.onload = () => {
    alwaysDisplay.timeSetting();

    document.querySelector('.always-display .finger-print').addEventListener('mousedown', () => { alwaysDisplay.fingerDown() });
    document.querySelector('.always-display .finger-print').addEventListener('mouseup', () => { alwaysDisplay.fingerUp() });
}