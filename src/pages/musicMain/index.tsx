import Image from 'next/image';
import { type ReactNode } from 'react';
import './musicMain.scss';
import Progress from './Progress';
import MusicLists from './MusicLists';

function MusicMain(): ReactNode {
  /**
   * 按钮宽度
   */
  const buttonWidth: number = 20;
  /**
   * 按钮高度
   */
  const buttonHeight: number = 20;

  return (
    <main className="flex-default h-screen w-screen">
      <div className="flex h-36 w-60 flex-col rounded-lg border-4 border-solid border-black p-[0.4rem]">
        <div className="flex-[0.3]">
          <div className="truncate text-xl font-semibold" title="最佳损友asdasdasdasd">
            最佳损友asdasdasdasd
          </div>
          <div className="text-sm font-semibold text-[#706f6f]">陈奕迅</div>
        </div>
        {/* 进度 */}
        <div className="flex w-full flex-[0.55] items-center">
          <Progress></Progress>
        </div>
        <div className="flex flex-[0.15]">
          {/* 音量 */}
          <div className="flex flex-[0.1] justify-center">
            <Image src="/svg/voice.svg" alt="voice" width={buttonWidth} height={buttonHeight} priority></Image>
          </div>
          {/* 播放按钮 */}
          <div className="flex flex-[0.8] justify-center">
            <Image src="/svg/prev.svg" alt="prev" width={buttonWidth - 6} height={buttonHeight - 6} priority className="mr-2"></Image>
            <Image src="/svg/stop.svg" alt="stop" width={buttonWidth} height={buttonHeight} priority></Image>
            <Image src="/svg/next.svg" alt="next" width={buttonWidth - 6} height={buttonHeight - 6} priority className="ml-2"></Image>
          </div>
          {/* 列表按钮 */}
          <div className="flex flex-[0.1] justify-center">
            <Image src="/svg/lists.svg" alt="lists" width={buttonWidth} height={buttonHeight} priority></Image>
          </div>
        </div>
      </div>
      <MusicLists></MusicLists>
    </main>
  );
}

export default MusicMain;
