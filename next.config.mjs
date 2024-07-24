/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  /* 重定向路由节点 */
  async redirects() {
    return [
      {
        source: '/', // 传入的路径
        destination: '/musicMain', // 传出对应的路径
        permanent: true
      }
    ];
  }
};

export default nextConfig;
