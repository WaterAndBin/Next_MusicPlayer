import { forwardRef, useState, type ReactNode } from 'react';
import React from 'react';

interface Props {
  status: boolean;
}

const Voice = React.memo(
  forwardRef((props: Props, _): ReactNode => {
    // 初始位置
    const [position, setPosition] = useState(0);

    // 监听鼠标是否按下
    const [isDragging, setIsDragging] = useState(false);

    // 鼠标按下时记录起始位置
    const [startX, setStartX] = useState(10);

    // 监听鼠标移动
    const handleMouseMove = (event: MouseEvent): void => {
      if (!isDragging) return;
      console.log(startX);
      // 计算移动的距离
      const moveX = event.clientY - startX;
      console.log(moveX);
      // 更新位置
      setPosition((prevPosition) => prevPosition + moveX);

      // 防止页面滚动
      event.preventDefault();
    };

    // 鼠标按下时
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      console.log(event.clientY);
      setIsDragging(true);
      setStartX(event.clientY);

      // 绑定鼠标移动和鼠标释放事件到全局
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      // 防止默认行为（如选择文本）
      event.preventDefault();
    };

    // 鼠标释放时
    const handleMouseUp = (): void => {
      setIsDragging(false);

      // 移除事件监听器
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    console.log('Voice渲染了');

    return (
      <div
        style={{ opacity: props.status ? '1 ' : '0', transform: `translate(${props.status ? '0,0' : '-8%,0'})` }}
        className="scroll-container absolute -right-24 -top-1 h-36 w-20 origin-top-left overflow-y-auto overflow-x-hidden rounded-lg border-4 border-solid border-black transition-all duration-[270ms]"
      >
        <div className="flex-default box-border size-full flex-col">
          <div className="mt-2 w-2 flex-[0.9] rounded-[2px] bg-[#d4d3d3]">
            <div style={{ height: `${position}%` }} className="relative flex w-full items-center rounded-[2px] bg-black">
              <div
                className="absolute -bottom-2 -left-1 size-4 cursor-pointer rounded-full bg-black"
                onMouseDown={(event) => handleMouseDown(event)}
              ></div>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xs">5%</div>
          </div>
        </div>
      </div>
    );
  })
);

Voice.displayName = 'Voice';

export default Voice;
