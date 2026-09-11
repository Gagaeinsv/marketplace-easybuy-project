  /**
   * @type {import('next').NextConfig}
   */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    optimizePackageImports: ['react-hot-toast', 'swiper', 'formik', 'yup', 'react-bootstrap'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://89.168.115.138:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
