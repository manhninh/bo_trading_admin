const {getThemeVariables} = require('antd/dist/theme');
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: getThemeVariables({
              dark: false, // Enable dark mode
            }),
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
