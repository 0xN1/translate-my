/** @type {import('next').NextConfig} */

const withSerwist = require("@serwist/next").default({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});
const nextConfig = {};

module.exports = withSerwist(nextConfig);
