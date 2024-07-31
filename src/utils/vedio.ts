import songs from './songs';

class YeVedio {
  audio: HTMLAudioElement; // 音乐播放器实体
  isPlaying: boolean; // 是否播放
  volume: number; // 音量
  index: number; // 音乐索引
  url: string; // 音乐地址
  singer: string; // 歌手
  title: string; // 歌标题

  constructor(audio: HTMLAudioElement) {
    this.audio = audio;
    this.isPlaying = false;
    this.volume = 5;
    this.index = 0;
    this.url = '';
    this.singer = '';
    this.title = '';
    /* 开启一个定时器，因为浏览器一些原则，若用户没有与浏览器交互，是不给自动播放音乐的 */
    // this.playMusic();
    const timer = setInterval(() => {
      this.playMusic();
      if (this.isPlaying) {
        clearInterval(timer);
      }
    }, 1000);
  }

  /**
   * 暂停或者开始
   */
  playOrStop = (): void => {
    this.isPlaying ? this.audio.pause() : this.audio.play();
    this.isPlaying = !this.isPlaying;
  };

  /**
   * 播放音乐
   */
  playMusic = (i?: number): void => {
    const num = i ?? this.index;
    this.url = songs[num].url;
    this.singer = songs[num].singer;
    this.title = songs[num].title;
    /* 设置音乐播放地址 */
    this.audio.src = this.url;
    this.setVolume();
    this.audio
      .play()
      .then(() => {
        /* 重置为true */
        this.isPlaying = true;
      })
      .catch((err) => console.error(err));
  };

  /**
   * 设置音量大小
   */
  setVolume = (): void => {
    this.audio.volume = this.volume / 100;
  };

  /**
   * 下一首歌
   */
  nextSongs = (): void => {
    if (this.index + 1 > songs.length - 1) {
      this.index = 0;
    } else {
      this.index = this.index + 1;
    }
    this.playMusic();
  };

  /**
   * 上一首歌
   */
  prevSongs = (): void => {
    if (this.index - 1 < 0) {
      this.index = songs.length - 1;
    } else {
      this.index = this.index - 1;
    }
    this.playMusic();
  };
}

export default YeVedio;
