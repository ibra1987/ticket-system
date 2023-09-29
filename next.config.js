/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    USERS_URL: process.env.USERS_URL,
  },
};

module.exports = nextConfig;
