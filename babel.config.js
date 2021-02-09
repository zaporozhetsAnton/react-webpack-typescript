module.exports = {
  plugins: ['lodash'],
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // don't forget to install core-js package so useBuiltIns works without any additional plugins
        corejs: { version: 3, proposals: true },
        targets: 'defaults',
        bugfixes: true,
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
};
