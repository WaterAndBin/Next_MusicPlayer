import { type ReactNode } from 'react';

function MusicMain(): ReactNode {
  // const getData = async (): Promise<any> => {
  //   console.log('网络请求了');
  //   const res = await fetch('http://127.0.0.1:9090/test');
  //   return res.json();
  // };
  // getData();

  return (
    <main className="flex-default h-screen w-screen bg-red-100">
      <div className="h-20 w-48 border-2 border-solid border-black">123123</div>
      <button>网络请求</button>
    </main>
  );
}

export default MusicMain;
