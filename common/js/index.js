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

            if(alwaysDisplay.data.count === 1) {
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

let Apps = {
    AppOpen : (e) => {
        let AppIndex = e.target.dataset['index'];
        if(AppIndex === undefined || AppIndex === '') return false;

        let targetApp = document.getElementById(AppIndex);

        document.getElementById('Apps').style.visibility = 'visible';
        targetApp.style.visibility = 'visible';
        targetApp.style.opacity = '1';
        targetApp.classList.add('app-active');

        targetApp.style.width = '100%';
        targetApp.style.height = '100%';
    },

    AppTab : () => {
        let openApp = document.querySelectorAll('.app-active');

        document.getElementById('Apps').style.visibility = 'visible';
        for(let i = 0; i < openApp.length; i++)
        {
            openApp[i].style.width = '75%';
            openApp[i].style.height = '60%';
            openApp[i].classList.add('tab-active');

            openApp[i].style.visibility = 'visible';
            openApp[i].style.opacity = '1';
        }
    },

    dragApp : (tf) => {
        // 켜져있는 되어있는 앱 하나도 없으면 false
        let tabActive = document.querySelectorAll('.tab-active');
        if(tabActive.length === 0) return false;
    },

    HomeBtn : () => {
        if(document.querySelectorAll('.app-active').length === 0) return false;

        document.getElementById('Apps').style.visibility = 'hidden';
        for(let i = 0; i < document.querySelectorAll('.app-active').length; i++)
        {
            document.querySelectorAll('.app-active')[i].style.visibility = 'hidden';
            document.querySelectorAll('.app-active')[i].style.opacity = '0';
            document.querySelectorAll('.app-active')[i].style.width = '75%';
            document.querySelectorAll('.app-active')[i].style.height = '60%';
        }
    }
}

window.onload = () => {
    // start run function
    timeSetting.defaultTimeView()

    // AlwaysDisplay Event
    document.querySelector('.always-display .finger-print').addEventListener('mousedown', () => { alwaysDisplay.fingerDown() });
    document.querySelector('.always-display .finger-print').addEventListener('mouseup', () => { alwaysDisplay.fingerUp() });

    // Apps Event
    for(let i = 0; i < document.querySelectorAll('#main .app-wrap > div').length; i++)
    {
        document.querySelectorAll('#main .app-wrap > div')[i].addEventListener('mousedown', (e) => { Apps.AppOpen(e) });
    }
    document.getElementById('Apps').addEventListener('mousedown', () => { Apps.dragApp(true) });
    document.getElementById('Apps').addEventListener('mouseup', () => { Apps.dragApp(false) });

    // bottom bar event
    document.querySelector('#bottom-bar div:nth-of-type(1)').addEventListener('mousedown', () => { Apps.AppTab() });
    document.querySelector('#bottom-bar div:nth-of-type(2)').addEventListener('mousedown', () => { Apps.HomeBtn() });
}