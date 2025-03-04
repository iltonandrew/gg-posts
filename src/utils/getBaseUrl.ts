export const getBaseUrl = () => {
  console.log(process.env.VERCEL_URL);
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};
