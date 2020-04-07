const alwaysDisplayWrap = document.querySelector('.always-display');
let date = new Date();
const koreanDayName = ['일', '월', '화', '수', '목', '금', '토'];
const koDay = koreanDayName[date.getDay()];

// 전체 날짜, 시간 관련
let timeSetting = {
    defaultTimeView : () => {
        // date setting
        date = new Date();
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
    data : {
        AppsData : []
    },

    AppOpen : (e) => {
        let AppIndex = e.target.dataset['index'];
        if(AppIndex === undefined || AppIndex === '') return false;

        let targetApp = document.getElementById(AppIndex);
        let targetId = targetApp.getAttribute('id');
        if(Apps.data.AppsData.includes(targetId) == false)
        {
            Apps.data.AppsData.unshift(targetId);
        }
        else
        {
            let idx = Apps.data.AppsData.indexOf(targetId);
            if(idx !== -1) Apps.data.AppsData.splice(idx, 1);
            Apps.data.AppsData.unshift(targetId);
        }

        document.getElementById('Apps').style.visibility = 'visible';
        targetApp.style.visibility = 'visible';
        targetApp.style.opacity = '1';

        targetApp.classList.add('app-active');

        targetApp.style.width = '100%';
        targetApp.style.height = '100%';
    },

    // Tab button event
    AppTab : () => {
        if(Apps.data.AppsData.length === 0) return false;

        document.getElementById('Apps').style.visibility = 'visible';
        document.getElementById('Apps').style.backgroundColor = 'rgba(0, 0, 0, .4)';

        for(let i = 0; i < Apps.data.AppsData.length; i++)
        {
            let openApp = document.querySelector('#'+Apps.data.AppsData[i]);
            openApp.style.width = '65%';
            openApp.style.height = '60%';
            openApp.classList.add('tab-active');

            openApp.style.visibility = 'visible';
            openApp.style.opacity = '1';
            openApp.style.left = (i + 1) * 70 - 20 + '%';
        }
    },

    dragApp : (tf) => {
        // 켜져있는 되어있는 앱 하나도 없으면 false
        let tabActive = document.querySelectorAll('.tab-active');
        if(tabActive.length === 0) return false;
    },

    // Home button event
    HomeBtn : () => {
        if(document.querySelectorAll('.app-active').length === 0) return false;

        let app = document.querySelectorAll('.app-active');

        document.getElementById('Apps').style.visibility = 'hidden';
        for(let i = 0; i < app.length; i++)
        {
            app[i].style.visibility = 'hidden';
            app[i].style.opacity = '0';
            app[i].style.width = '75%';
            app[i].style.height = '60%';
            app[i].style.left = '50%';
            app[i].classList.remove('tab-active');            
        }
    },

    // Back button event
    BackBtn : () => {

    }
}

window.onload = () => {
    // start run function
    timeSetting.defaultTimeView();
    setInterval(() => { timeSetting.defaultTimeView() }, 1000);

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
    document.querySelector('#bottom-bar div:nth-of-type(3)').addEventListener('mousedown', () => { Apps.BackBtn() });
}