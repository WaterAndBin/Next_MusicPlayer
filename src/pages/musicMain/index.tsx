import React, { createContext, useState, useRef } from 'react';
import MusicBody from './MusicBody';
import songs from '@/utils/songs';
import type { YeAudioType } from '@/types/components/Audio';

export const AudioContext = createContext<YeAudioType | null>(null);

const MusicMain = React.memo(() => {
  /* audio实例对象 */
  const audioRef = useRef<HTMLAudioElement>(null);
  /* 是否播放 */
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  /* 音量大小 */
  const [volume] = useState<number>(5);
  /* 歌标题 */
  const [title, setTitle] = useState<string>('');
  /* 歌手 */
  const [singer, setSinger] = useState<string>('');
  /* 歌曲id */
  const [songId, setSongId] = useState<number>(-1);
  /* 音乐索引 */
  const index = useRef<number>(0);
  /* 音乐地址 */
  const url = useRef<string>('');

  /**
   * 播放音乐
   * @param i 索引
   */
  const playMusic = (i?: number): void => {
    if (!audioRef.current) return;
    const num = i ?? index.current;
    url.current = songs[num].url;
    /* 设置音乐播放地址 */
    audioRef.current.src = url.current;
    audioRef.current
      .play()
      .then(() => {
        /* 重置为true */
        setIsPlaying(true);
        setAudioVolume();
        setSinger(songs[num].singer);
        setTitle(songs[num].title);
        setSongId(songs[num].id);
        if (i) {
          index.current = i;
        }
      })
      .catch((err) => console.error(err));
  };

  /**
   * 设置音量大小
   */
  const setAudioVolume = (): void => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
  };

  /**
   * 暂停或者开始
   */
  const playOrStop = (i?: number): void => {
    if (!audioRef.current) return;
    if (i !== undefined && i != index.current) {
      playMusic(i);
      return;
    }
    if (url.current == '') {
      playMusic();
      return;
    }
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  /**
   * 下一首歌
   */
  const nextSongs = (): void => {
    if (index.current + 1 > songs.length - 1) {
      index.current = 0;
    } else {
      index.current = index.current + 1;
    }
    playMusic();
  };

  /**
   * 上一首歌
   */
  const prevSongs = (): void => {
    if (index.current - 1 < 0) {
      index.current = songs.length - 1;
    } else {
      index.current = index.current - 1;
    }
    playMusic();
  };

  return (
    <main className="flex-default h-screen w-screen">
      <AudioContext.Provider value={{ isPlaying, songId, volume, title, singer, playMusic, playOrStop, nextSongs, prevSongs, setAudioVolume }}>
        <MusicBody></MusicBody>
        <audio src="" ref={audioRef}></audio>
      </AudioContext.Provider>
    </main>
  );
});

MusicMain.displayName = 'MusicMain';

export default MusicMain;
