// 获取元素对象
const stateSet = document.querySelector(".state_set");
const musicHead = document.querySelector(".head");
const musicOBJ = document.querySelector(".Sakura");
const proLine = document.querySelector(".pros");
const timeshow = document.querySelector(".time_show");
const musicLineMoveFa = document.querySelector(".progress");
const musicLineMove = document.querySelector(".pros");
const volumeBtn = document.querySelector(".volume");
const volumeBar = document.querySelector(".volume_range");
const volumePro = document.querySelector(".range");
const musicLast = document.querySelector(".last");
const musicNext = document.querySelector(".next");
const musicBOXbc = document.querySelector(".play_bc > img");
const musicInfoShow = document.querySelector(".music_info");

// 初始化变量
let time = null;
let time2 = null;
let time3 = null;
let time4 = null;
let f1 = false;
let f2 = true;
let i1 = 0;
let nowtime = 0;
let currtime = 0;

// 当前播放音乐索引和音乐列表
let currentTrackIndex = 0;
const musicList = ["缘之空"/*, ""*/];

// 当页面加载完成时触发的方法
window.onload = function () {
    musicPlaySet();
    musicMove();
    musicListen();
    volumeSet();
    musicJump();
}

// 播放或暂停音乐
function musicPlaySet() {
    stateSet.onclick = function () {
        if (f1) {
            musicStop();
        } else {
            stateSet.className = "state_set";
            stateSet.innerHTML = '<img src="./image/index/bilibili3.png" style="max-width: 20px;">'; // 切换成暂停图标
            musicOBJ.play().catch(error => {
                // 捕获播放错误
                console.error('播放音乐时出错：', error);
            });
            musicTime();
            time = setInterval(() => {
                i1++;
                musicHead.style.transform = `rotate(${i1}deg)`;
            }, 20);
            f1 = true;
        }
    }
}

// 显示音乐时间信息
function musicTime() {
    let time = Math.floor(musicOBJ.duration);
    let minute = String(Math.floor(time / 60)).padStart(2, '0');
    let second = String(time % 60).padStart(2, '0');
    time4 = setInterval(() => {
        let muscurrtime = musicOBJ.currentTime;
        let currminute = String(Math.floor(muscurrtime / 60)).padStart(2, '0');
        let currsecond = String(Math.floor(muscurrtime % 60)).padStart(2, '0');
        timeshow.innerText = `${currminute}:${currsecond} / ${minute}:${second}`;
    }, 1);
    time2 = setInterval(() => {
        let movetime = 330 / time;
        nowtime += movetime;
        proLine.style.width = nowtime + "px";
    }, 1000);
}

// 拖动音乐进度条
function musicMove() {
    musicLineMoveFa.onclick = function (event) {
        let clickX = event.clientX - musicLineMoveFa.getBoundingClientRect().left - 66;
        let newTime = clickX / (musicLineMoveFa.offsetWidth / musicOBJ.duration);
        if (isFinite(newTime)) { // 检查新时间是否是有限的
            musicOBJ.currentTime = newTime;
            proLine.style.width = clickX + "px";
            nowtime = clickX;
        }
    }
}

// 监听音乐状态
function musicListen() {
    time3 = setInterval(() => {
        if (musicOBJ.ended) {
            proLine.style.width = "0px";
            stateSet.className = "state_set";
            stateSet.innerHTML = '<img src="./image/index/bilibili2.png" style="max-width: 20px;">'; // 切换成播放图标
            nowtime = 0;
            clearInterval(time);
            clearInterval(time2);
            clearInterval(time3);
            clearInterval(time4);
            f1 = false;
        }
    }, 1000);
}

// 设置音量
function volumeSet() {
    volumePro.autofocus = true;
    volumePro.defaultValue = 100;
    volumePro.step = 1;
    volumePro.max = 100;
    volumePro.min = 0;

    volumeBtn.onclick = function () {
        if (f2) {
            volumePro.disabled = true;
            volumeBtn.className = "volume";
            volumeBtn.innerHTML = '<img src="./image/index/yy.png" style="max-width: 20px;">'; // 切换成静音图标
            musicOBJ.muted = true;
            f2 = false;
        } else {
            volumePro.disabled = false;
            volumeBtn.className = "volume";
            volumeBtn.innerHTML = '<img src="./image/index/yy.png" style="max-width: 20px;">'; // 切换成正常音量图标
            musicOBJ.muted = false;
            f2 = true;
        }
    }

    volumePro.onchange = function () {
        musicOBJ.volume = this.value / 100;
        if (this.value === 0) {
            volumeBtn.className = "volume";
            volumeBtn.innerHTML = '<img src="./image/index/yy.png" style="max-width: 20px;">'; // 切换成静音图标
            f2 = false;
        }
    }
}

// 播放上一首或下一首音乐
function musicJump() {
    musicLast.onclick = function () {
        currentTrackIndex--;
        if (currentTrackIndex < 0) {
            currentTrackIndex = musicList.length - 1;
        }
        playMusicByIndex(currentTrackIndex);
    }

    musicNext.onclick = function () {
        currentTrackIndex++;
        if (currentTrackIndex >= musicList.length) {
            currentTrackIndex = 0;
        }
        playMusicByIndex(currentTrackIndex);
    }

    // 初始化播放第一首音乐
    playMusicByIndex(currentTrackIndex);
}

// 根据索引播放音乐
function playMusicByIndex(index) {
    musicInfoShow.innerText = musicList[index];
    musicOBJ.src = "./music/" + musicList[index] + ".mp3";
    musicBOXbc.src = "./image/index/head/" + musicList[index] + ".jpg";
    musicHead.src = "./image/index/head/" + musicList[index] + ".jpg";
    nowtime = 0;
    musicStop();
}

// 停止音乐播放
function musicStop() {
    stateSet.className = "state_set";
    stateSet.innerHTML = '<img src="./image/index/bilibili2.png" style="max-width: 20px;">'; // 切换成播放图标
    musicOBJ.pause();
    clearInterval(time);
    clearInterval(time2);
    clearInterval(time4);
    f1 = false;
}

// 初始化播放第一首音乐
playMusicByIndex(currentTrackIndex);
