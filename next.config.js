module.exports = {
  reactStrictMode: true,
  target: 'serverless',
  webpack: (config, options) => {
    if (!options.dev && options.isServer) {
      const originalEntry = config.entry
      config.entry = async () => {
        const entries = { ...(await originalEntry()) }
        entries['./scripts/build-rss'] = './scripts/build-rss.js'
        return entries
      }
    }
    return config
  }
}
