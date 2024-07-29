import { forwardRef, type ReactNode } from 'react';
import Image from 'next/image';
import React from 'react';

interface Props {
  status: boolean;
}

const MusicLists = React.memo(
  forwardRef((props: Props, _): ReactNode => {
    /**
     * 按钮宽度
     */
    const buttonWidth: number = 14;
    /**
     * 按钮高度
     */
    const buttonHeight: number = 14;

    const arrs = Array.from({ length: 10 }, (_, index) => ({ index }));

    console.log('MusicLists渲染了');

    return (
      <>
        <div
          style={{ opacity: props.status ? '1 ' : '0', transform: `translate(${props.status ? '0,0' : '-8%,0'})` }}
          className="scroll-container absolute -right-44 -top-1 h-36 w-40 origin-top-left overflow-y-auto overflow-x-hidden rounded-lg border-4 border-solid border-black transition-all duration-[270ms]"
        >
          {arrs.map((_, index) => (
            <div key={index} className="my-1 flex h-6 cursor-pointer items-center justify-center p-1 hover:bg-gray-100">
              <div className="flex-1 truncate text-[13px]">最佳损友</div>
              <div className="mr-2 text-[12px]">陈奕迅</div>
              <Image src="/svg/stop.svg" alt="stop" width={buttonWidth} height={buttonHeight} priority className="pr-1"></Image>
            </div>
          ))}
        </div>
      </>
    );
  })
);

MusicLists.displayName = 'MusicLists';

export default MusicLists;
