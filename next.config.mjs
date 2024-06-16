/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "nfdidemo.cuongdesign.net",
        }],
    },
};

export default nextConfig;
