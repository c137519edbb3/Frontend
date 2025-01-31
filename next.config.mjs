/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    output: 'standalone',
    experimental: {
        outputStandalone: true,
    }
};

export default nextConfig;
