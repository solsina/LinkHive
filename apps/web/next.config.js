/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add alias for local packages
    config.resolve.alias = {
      ...config.resolve.alias,
      '@linkhive/ui': require('path').resolve(__dirname, '../../packages/ui/dist'),
      '@linkhive/config': require('path').resolve(__dirname, '../../packages/config'),
      '@linkhive/database': require('path').resolve(__dirname, '../../packages/database'),
    };
    
    // Ignore SQL files
    config.module.rules.push({
      test: /\.sql$/,
      use: 'ignore-loader',
    });
    
    return config;
  },
};

module.exports = nextConfig;
