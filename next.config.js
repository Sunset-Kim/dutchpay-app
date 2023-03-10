/** @type {import('next').NextConfig} */

function getDomainHost() {
  if (process.env.HOST && process.env.PROTOCOL && process.env.PORT) {
    if (process.env.PROTOCOL === "http" && process.env.PORT === "80") {
      return `${process.env.PROTOCOL}://${process.env.HOST}`;
    }
    if (process.env.PROTOCOL === "https" && process.env.PORT === "443") {
      return `${process.env.PROTOCOL}://${process.env.HOST}`;
    }
    return `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`;
  }
  return "http://localhost:3000";
}

const DOMAIN_HOST = getDomainHost();

const nextConfig = {
  env: {
    DOMAIN_HOST,
  },
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    publicApiKey: process.env.publicApiKey || "",
    authDomain: process.env.FIREBASE_AUTH_HOST || "",
    projectId: process.env.projectId || "",
  },
};

module.exports = nextConfig;
