import '@/styles/globals.css';

// 新创建的 `pages/_app.js` 文件中必须有此默认的导出（export）函数
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
