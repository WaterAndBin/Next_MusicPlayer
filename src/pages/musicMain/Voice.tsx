import type { MusicListsRef } from '@/types/components/MusicLists';
import { forwardRef, useImperativeHandle, useState, type ReactNode } from 'react';

const Voice = forwardRef((props, ref): ReactNode => {
  const [status, setStatus] = useState<boolean>(false);
  useImperativeHandle(
    ref,
    (): MusicListsRef => ({
      setStatus: () => setStatus(!status)
    })
  );

  console.log('Voice渲染了');

  return (
    <div
      style={{ opacity: status ? '1 ' : '0', transform: `translate(${status ? '0,0' : '-8%,0'})` }}
      className="scroll-container ml-2 h-36 w-40 origin-top-left overflow-y-auto overflow-x-hidden rounded-lg border-4 border-solid border-black transition-all duration-[270ms]"
    >
      <div>音量</div>
    </div>
  );
});

Voice.displayName = 'Voice';

export default Voice;
