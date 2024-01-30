export const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1331"
    : process.env.NEXT_PUBLIC_VERCEL_URL;
