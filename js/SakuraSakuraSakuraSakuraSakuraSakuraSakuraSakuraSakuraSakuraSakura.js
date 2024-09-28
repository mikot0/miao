(function () {
  var originalTitle = document.title;
  var audio = new Audio('./music/hentai!.mp3'); // 替换为你的音频文件路径
  var audioPlaying = false;

  function playAudio() {
    if (!audioPlaying) {
      audio.play();
      audioPlaying = true;
    }
  }

  function pauseAudio() {
    if (audioPlaying) {
      audio.pause();
      audioPlaying = false;
    }
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      document.title = "(つェ⊂)欧奈撒嘛，网站404崩溃了";
      pauseAudio(); // 当用户离开页面时暂停音频
    } else {
      document.title = '姐姐大人~太激烈啦~ ' + originalTitle;
      playAudio(); // 当用户回到页面时播放音频
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('beforeunload', pauseAudio); // 当用户关闭标签时暂停音频
})();
