/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_API: process.env.SUPABASE_API,
    SUPABASE_SERVICE: process.env.SUPABASE_SERVICE
  },
}
