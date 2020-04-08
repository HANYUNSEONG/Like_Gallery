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
        tf : false,
        x : 0,
        y : 0
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

        document.querySelector('.all-app-close').style.visibility = 'visible';
        document.querySelector('.all-app-close').style.opacity = '1';

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
        if(document.getElementById('Apps').classList[0] !== 'tab-on') return false;

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

    dragAppMove : (x, y) => {
        if(Apps.data.tf === false || AppsEl.classList[0] !== 'tab-on') return false;

        if(Apps.data.AppsData.length !== 1)
        {
            if(Apps.data.x > x)
            {
                // left                
                Apps.dragAppMoveOn("left");
            }
            else if(Apps.data.x < x)
            {
                // right
                Apps.dragAppMoveOn("right");
            }
        }

        Apps.data.x = x, Apps.data.y = y;
    },

    dragAppMoveOn : (type) => {
        let xType = type == "left" ? '-' : '+';

        for(let i = 0; i < Apps.data.AppsData.length; i++)
        {
            let el = document.querySelector('#'+Apps.data.AppsData[i])
            el.style.left = Number(el.style.left.split('%')[0]) + (type === "left" ? -2 : 2) + '%';
            
            if(el.style.left === '50%') return false;
        }
    },

    AllAppClose : () => {
        for(let i = 0; i < Apps.data.AppsData.length; i++)
        {
            let app = document.querySelector('#'+Apps.data.AppsData[i]);
            app.style.visibility = 'hidden';
            app.style.opacity = '0';
            app.style.width = '75%';
            app.style.height = '60%';
            app.style.left = '50%';
            app.classList.remove('tab-active');
        }
        AppsEl.style.visibility = 'hidden';
        AppsEl.classList.remove('tab-on');

        document.querySelector('.all-app-close').style.visibility = 'hidden';
        document.querySelector('.all-app-close').style.opacity = '0';

        Apps.data.AppsData = [];
    },

    // Home button event
    HomeBtn : () => {
        if(document.querySelectorAll('.app-active').length === 0) return false;

        let app = document.querySelectorAll('.app-active');

        AppsEl.style.visibility = 'hidden';
        document.querySelector('.all-app-close').style.visibility = 'hidden';
        document.querySelector('.all-app-close').style.opacity = '0';

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

    TabAppClick : (e) => {
        if(AppsEl.classList[0] !== 'tab-on') return false;

        AppsEl.classList.remove('tab-on');

        // 클릭한 앱 첫번째로 올리기
        let idx = Apps.data.AppsData.indexOf(e.target.getAttribute('id'));
        if(idx !== -1) Apps.data.AppsData.splice(idx, 1);
        Apps.data.AppsData.unshift(e.target.getAttribute('id'));

        for(let i = 0; i < Apps.data.AppsData.length; i++)
        {
            document.querySelector('#'+Apps.data.AppsData[i]).style.visibility = 'hidden';
            document.querySelector('#'+Apps.data.AppsData[i]).style.opaicty = '0';
            document.querySelector('#'+Apps.data.AppsData[i]).style.zIndex = '20';
        }

        e.target.style.visibility = 'visible';
        e.target.style.opaicty = '1';
        e.target.style.zIndex = '50';
        e.target.style.width = '100%';
        e.target.style.height = '100%';
        e.target.style.left = '50%';
    }
}

window.onload = () => {
    // var css = "font-size:50px;font-weight:600;color:#fff;background:red;";
    // console.log("%c%s", css, 'LIKE GALLERY');
    
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
    AppsEl.addEventListener('mousemove', (e) => { Apps.dragAppMove(e.pageX, e.pageY) });

    for(let i = 0; i < document.querySelectorAll('#Apps > div').length; i++)
    {
        document.querySelectorAll('#Apps > div')[i].addEventListener('dblclick', (e) => { Apps.TabAppClick(e); })
    }

    // App All Close
    document.querySelector('.all-app-close').addEventListener('mousedown', () => { Apps.AllAppClose() })

    // bottom bar event
    document.querySelector('#bottom-bar div:nth-of-type(1)').addEventListener('mousedown', () => { Apps.AppTab() });
    document.querySelector('#bottom-bar div:nth-of-type(2)').addEventListener('mousedown', () => { Apps.HomeBtn() });
    document.querySelector('#bottom-bar div:nth-of-type(3)').addEventListener('mousedown', () => { Apps.BackBtn() });
}