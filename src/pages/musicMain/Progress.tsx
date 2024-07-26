import React from 'react';
import { forwardRef, type ReactNode } from 'react';

const Progress = React.memo(
  forwardRef((props, ref): ReactNode => {
    console.log('Progress渲染了');
    console.log(props);

    return (
      <div className="w-full">
        <div className="h-1 bg-[#d4d3d3]">
          <div className="relative flex h-1 w-[10%] items-center bg-black after:absolute after:left-full after:size-2 after:cursor-pointer after:rounded-full after:bg-black"></div>
        </div>
        <div className="mt-2 flex">
          <div className="text-xs">00:01</div>
          <div className="flex-1"></div>
          <div className="text-xs">01:00</div>
        </div>
      </div>
    );
  })
);

export default Progress;
