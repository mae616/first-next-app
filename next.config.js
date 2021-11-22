module.exports = {
  reactStrictMode: true,
  target: 'serverless',
  webpack: (config) => {
    config.entry = async () => {
      const entries = { ...(await originalEntry()) }
      entries['./scripts/build-rss'] = './scripts/build-rss.js'
      return entries
    }
  }
}
