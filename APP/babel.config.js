module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@api': './src/api',
          '@atoms': './src/atoms',
          '@components': './src/components',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@images': './assets/images',
          '@models': './src/models',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
