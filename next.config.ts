import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : { 
    domains : ["cdn.sanity.io","lh3.googleusercontent.com"]
  }, 
  eslint : {
    ignoreDuringBuilds : true 
  }
};

export default nextConfig;
