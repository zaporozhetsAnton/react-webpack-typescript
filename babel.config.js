module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // don't forget to install core-js package so useBuiltIns works without any additional plugins
        corejs: 3,
        targets: '>0.25%',
      },
    ],
    '@babel/preset-react',
  ],
};
