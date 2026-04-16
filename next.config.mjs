const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://46.63.68.116:5000/api/:path*',
      },
    ]
  },
}

export default nextConfig