module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@common': './src/common',
          '@constants': './src/constants',
          '@constraints': './src/constraints',
          '@db': './src/db',
          '@middlewares': './src/middlewares',
          '@models': './src/models',
          '@modules': './src/modules',
          '@sockets': './src/sockets',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
