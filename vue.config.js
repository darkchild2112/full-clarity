// vue.config.js
module.exports = {
    chainWebpack: config => {
      config.module
        .rule('images')
          .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }))
    }
  };

  module.exports = {
    chainWebpack: (config) => {
      const svgRule = config.module.rule('svg');
  
      svgRule.uses.clear();
  
      svgRule
        .use('vue-loader')
        .loader('vue-loader') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
        .end()
        .use('vue-svg-loader')
        .loader('vue-svg-loader');
    },
  };