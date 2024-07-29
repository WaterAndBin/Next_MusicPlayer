import { forwardRef, type ReactNode } from 'react';
import React from 'react';

interface Props {
  status: boolean;
}

const Voice = React.memo(
  forwardRef((props: Props, _): ReactNode => {
    console.log('Voice渲染了');

    return (
      <div
        style={{ opacity: props.status ? '1 ' : '0', transform: `translate(${props.status ? '0,0' : '-8%,0'})` }}
        className="scroll-container ml-2 h-36 w-40 origin-top-left overflow-y-auto overflow-x-hidden rounded-lg border-4 border-solid border-black transition-all duration-[270ms]"
      >
        <div>音量</div>
      </div>
    );
  })
);

Voice.displayName = 'Voice';

export default Voice;
