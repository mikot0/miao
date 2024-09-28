class AudioSwitcher {
    constructor(audioList) {
        this.audioList = audioList;
        this.audioElement = new Audio();
        this.audioElement.addEventListener('canplaythrough', () => {
            this.audioElement.play();
        });
    }

    playRandomAudio() {
        const randomIndex = Math.floor(Math.random() * this.audioList.length);
        const randomAudio = this.audioList[randomIndex];

        // Pause the audio if it's currently playing or loading
        if (!this.audioElement.paused) {
            this.audioElement.pause();
        }

        this.audioElement.src = randomAudio;
    }
}

const audioList = [
    './music/wumiao.mp3',
    './music/xiuse.mp3',
    './music/ounijiang.mp3'
];

const audioSwitcher = new AudioSwitcher(audioList);

function handleMouseClick(e) {
    audioSwitcher.playRandomAudio();
}

document.addEventListener('click', handleMouseClick);
