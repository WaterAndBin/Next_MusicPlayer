import React, { useState, createContext, useRef } from 'react';
import MusicBody from './MusicBody';

export const AudioContext = createContext({});

const MusicMain = React.memo(() => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [audioPlay, setAudioPlay] = useState<boolean>(false);

  class AudioMethod {
    playMusic = (): void => {
      if (audioRef.current) {
        audioPlay ? audioRef.current.pause() : audioRef.current.play();
        setAudioPlay(!audioPlay);
      }
    };
  }

  return (
    <main className="flex-default h-screen w-screen">
      <AudioContext.Provider value={{ AudioMethod }}>
        <MusicBody></MusicBody>
        <audio src="/mp3/STEREO DIVE FOUNDATION - Daisy.ogg" ref={audioRef}></audio>
      </AudioContext.Provider>
    </main>
  );
});

MusicMain.displayName = 'MusicMain';

export default MusicMain;
