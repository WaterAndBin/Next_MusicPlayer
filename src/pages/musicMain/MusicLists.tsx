import { useState, forwardRef, type ReactNode, useImperativeHandle } from 'react';
import Image from 'next/image';
import type { MusicListsRef } from '@/types/components/MusicLists';

const MusicLists = forwardRef((_, ref): ReactNode => {
  const [status, setStatus] = useState<boolean>(false);
  /**
   * 按钮宽度
   */
  const buttonWidth: number = 14;
  /**
   * 按钮高度
   */
  const buttonHeight: number = 14;

  const arrs = Array.from({ length: 10 }, (_, index) => ({ index }));

  useImperativeHandle(
    ref,
    (): MusicListsRef => ({
      setStatus: () => setStatus(!status)
    })
  );

  console.log('MusicLists渲染了');

  return (
    <div
      style={{ opacity: status ? '1 ' : '0', transform: `translate(${status ? '0,0' : '-8%,0'})` }}
      className="scroll-container ml-2 h-36 w-40 origin-top-left overflow-y-auto overflow-x-hidden rounded-lg border-4 border-solid border-black transition-all duration-[270ms]"
    >
      {arrs.map((_, index) => (
        <div key={index} className="my-1 flex h-6 cursor-pointer items-center justify-center p-1 hover:bg-gray-100">
          <div className="flex-1 truncate text-[13px]">测试大大阿斯顿阿斯顿</div>
          <div className="mr-2 text-[12px]">123</div>
          <Image src="/svg/stop.svg" alt="stop" width={buttonWidth} height={buttonHeight} priority className="pr-1"></Image>
        </div>
      ))}
    </div>
  );
});

MusicLists.displayName = 'MusicLists';

export default MusicLists;
