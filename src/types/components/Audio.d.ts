// 定义YeAudio的类型
export interface YeAudioType extends InstanceAudioType {
  isPlaying: boolean; // 播放状态
  volume: number; // 音量
  singer: string; // 歌手名字
  title: string; // 歌曲名字
  songId: number; // 歌曲id
}

export interface InstanceAudioType {
  playOrStop: (i?: number) => void; // 播放或暂停
  playMusic: (i?: number) => void; // 播放音乐
  setAudioVolume?: () => void; // 设置音量
  nextSongs: () => void; // 下一首歌
  prevSongs: () => void; // 上一首歌
}
