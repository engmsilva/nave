const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [{ plugin: CracoAntDesignPlugin,
    options: {
      customizeTheme: {
        "@primary-color": "#212121",
        "@link-color": "#212121",
        "@layout-header-background": "#FFFFFF",
        "@layout-header-height": "85px",
        "@layout-header-padding": "0 30px"
      }
    }
   }]
};