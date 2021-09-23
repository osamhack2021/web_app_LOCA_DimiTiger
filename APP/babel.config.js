module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
          '@images': './assets/images',
        },
      },
      'react-native-reanimated/plugin',
    ],
  ],
};
