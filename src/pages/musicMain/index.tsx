import Image from 'next/image';
import { useRef, useState, type ReactNode } from 'react';
import './musicMain.scss';
import Progress from './Progress';
import MusicLists from './MusicLists';
import type { MusicListsRef } from '@/types/components/MusicLists';
import Voice from './Voice';

interface Status {
  voiceStatus: boolean;
  listsStatus: boolean;
}

const statusData: Status = {
  voiceStatus: false,
  listsStatus: false
};

function MusicMain(): ReactNode {
  /* dom */
  const musicListsRef = useRef<MusicListsRef>(null);
  const voiceRef = useRef<MusicListsRef>(null);
  /* 各状态 */
  const [status, setStatus] = useState<Status>({
    ...statusData
  });
  const [backStatus, setBackStatus] = useState<Status>({
    ...statusData
  });
  const previous = useRef(0);

  /**
   * 按钮宽度
   */
  const buttonWidth: number = 20;
  /**
   * 按钮高度
   */
  const buttonHeight: number = 20;

  /**
   * 重置状态
   * @param keywords 关键词
   */
  const resetStatus = (keywords: keyof Status): void => {
    let newArrs = status;
    /* 节流，防止一点调用，就一直重复渲染 */
    const now = Date.now();
    if (now - previous.current < 200) {
      return;
    }
    previous.current = now;

    /* 循环对象，将里面true的都设置为false */
    for (const key in newArrs) {
      if (keywords !== key && newArrs[key as keyof Status]) {
        newArrs = { ...newArrs, [key]: false };
      }
    }

    newArrs = { ...newArrs, [keywords]: !status[keywords] };
    /* 备用数据，不然的话dom结构消失没动画，这是一个可以优化的地方 */
    if (backStatus[keywords]) {
      setTimeout(() => {
        setBackStatus({ ...newArrs });
      }, 200);
    } else {
      setBackStatus({ ...newArrs });
    }
    /* 只能再次异步， 等页面渲染完再重新赋值，重新更新页面。 */
    setTimeout(() => {
      setStatus({ ...newArrs });
    });
  };

  console.log('musicMain渲染了');

  return (
    <main className="flex-default h-screen w-screen">
      <div className="relative flex h-36 w-60 flex-col rounded-lg border-4 border-solid border-black p-[0.4rem]">
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
            <Image
              src="/svg/voice.svg"
              onClick={() => resetStatus('voiceStatus')}
              alt="voice"
              width={buttonWidth}
              height={buttonHeight}
              priority
            ></Image>
          </div>
          {/* 播放按钮 */}
          <div className="flex flex-[0.8] justify-center">
            <Image src="/svg/prev.svg" alt="prev" width={buttonWidth - 6} height={buttonHeight - 6} priority className="mr-2"></Image>
            <Image src="/svg/stop.svg" alt="stop" width={buttonWidth} height={buttonHeight} priority></Image>
            <Image src="/svg/next.svg" alt="next" width={buttonWidth - 6} height={buttonHeight - 6} priority className="ml-2"></Image>
          </div>
          {/* 列表按钮 */}
          <div className="flex flex-[0.1] justify-center">
            <Image
              src="/svg/lists.svg"
              onClick={() => resetStatus('listsStatus')}
              alt="lists"
              width={buttonWidth}
              height={buttonHeight}
              priority
            ></Image>
          </div>
        </div>
        <div className="absolute -right-44 -top-1">
          {backStatus.listsStatus && <MusicLists ref={musicListsRef} status={status.listsStatus}></MusicLists>}
        </div>
        <div className="absolute -right-44 -top-1">{backStatus.voiceStatus && <Voice ref={voiceRef} status={status.voiceStatus}></Voice>}</div>
      </div>
    </main>
  );
}

export default MusicMain;
