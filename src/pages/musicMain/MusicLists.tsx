import { forwardRef, useContext, type ReactNode } from 'react';
import Image from 'next/image';
import React from 'react';
import songs from '@/utils/songs';
import { AudioContext } from '.';

interface Props {
  status: boolean;
}

const MusicLists = React.memo(
  forwardRef((props: Props, _): ReactNode => {
    const audio = useContext(AudioContext);

    /**
     * 按钮宽度
     */
    const buttonWidth: number = 14;
    /**
     * 按钮高度
     */
    const buttonHeight: number = 14;

    /**
     * 播放按钮的状态
     * @param id 音乐id
     * @param keywords 关键词
     * @returns boolean
     */
    const getAudioStatus = (id: number, keywords: string): boolean => {
      if (keywords == 'stop') {
        if (id !== audio?.songId) {
          return false;
        } else {
          return audio.isPlaying;
        }
      } else {
        if (id !== audio?.songId) {
          return true;
        } else {
          return !audio.isPlaying;
        }
      }
    };

    console.log('MusicLists渲染了');

    return (
      <>
        <div
          style={{ opacity: props.status ? '1 ' : '0', transform: `translate(${props.status ? '0,0' : '-8%,0'})` }}
          className="scroll-container absolute -right-44 -top-1 h-36 w-40 origin-top-left overflow-y-auto overflow-x-hidden rounded-lg border-4 border-solid border-black transition-all duration-[270ms]"
        >
          {songs.map((items, index) => (
            <div key={index}>
              <div
                style={{
                  backgroundColor: items.id == audio?.songId ? 'rgb(229,231,235)' : ''
                }}
                className="my-1 flex h-6 cursor-pointer items-center justify-center p-1 hover:bg-gray-200"
              >
                <div className="flex-1 truncate text-[13px]">{items.title}</div>
                {getAudioStatus(items.id, 'stop') && (
                  <Image
                    onClick={() => audio?.playOrStop(index)}
                    src="/svg/stop.svg"
                    alt="stop"
                    width={buttonWidth}
                    height={buttonHeight}
                    priority
                  ></Image>
                )}
                {getAudioStatus(items.id, 'play') && (
                  <div>
                    <Image
                      onClick={() => {
                        audio?.playOrStop(index);
                      }}
                      src="/svg/play.svg"
                      alt="play"
                      width={buttonWidth}
                      height={buttonHeight}
                      priority
                    ></Image>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  })
);

MusicLists.displayName = 'MusicLists';

export default MusicLists;
