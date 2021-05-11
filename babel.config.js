module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "import",
        {
          libraryName: "react-use",
          camel2DashComponentName: false,
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
