// Element define
const alwaysDisplayWrap = document.querySelector('.always-display');
const AppsEl = document.getElementById('Apps');

// util
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
        AppsData : [],
        tf : false
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

        AppsEl.style.visibility = 'visible';
        targetApp.style.visibility = 'visible';
        targetApp.style.opacity = '1';

        targetApp.classList.add('app-active');

        targetApp.style.width = '100%';
        targetApp.style.height = '100%';
    },

    // Tab button event
    AppTab : () => {
        if(Apps.data.AppsData.length === 0) return false;

        AppsEl.style.visibility = 'visible';
        AppsEl.style.backgroundColor = 'rgba(0, 0, 0, .4)';
        AppsEl.classList.add('tab-on');

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
        Apps.data.tf = tf;
        // 켜져있는 되어있는 앱 하나도 없으면 false
        let tabActive = document.querySelectorAll('.tab-active');
        if(tabActive.length === 0) return false;

        if(tf === true)
        {
            document.body.style.cursor = 'pointer';
            document.body.style.userSelect = 'none';
        }
        else
        {
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        }
    },

    dragAppMove : () => {
        if(Apps.data.tf === false || AppsEl.classList[0] !== 'tab-on') return false;
        console.log(123)
    },

    // Home button event
    HomeBtn : () => {
        if(document.querySelectorAll('.app-active').length === 0) return false;

        let app = document.querySelectorAll('.app-active');

        AppsEl.style.visibility = 'hidden';
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

    },

    TabAppClick : () => {
        if(AppsEl.classList[0] !== 'tab-on') return false;
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
        document.querySelectorAll('#main .app-wrap > div')[i].addEventListener('mousedown', (e) => { Apps.AppOpen(e); });
    }

    AppsEl.addEventListener('mousedown', () => { Apps.dragApp(true) });
    AppsEl.addEventListener('mouseup', () => { Apps.dragApp(false) });
    AppsEl.addEventListener('mousemove', () => { Apps.dragAppMove() });

    for(let i = 0; i < document.querySelectorAll('#Apps > div').length; i++)
    {
        document.querySelectorAll('#Apps > div')[i].addEventListener('mousedown', () => { Apps.TabAppClick(); })
    }

    // bottom bar event
    document.querySelector('#bottom-bar div:nth-of-type(1)').addEventListener('mousedown', () => { Apps.AppTab() });
    document.querySelector('#bottom-bar div:nth-of-type(2)').addEventListener('mousedown', () => { Apps.HomeBtn() });
    document.querySelector('#bottom-bar div:nth-of-type(3)').addEventListener('mousedown', () => { Apps.BackBtn() });
}