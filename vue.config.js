module.exports = {
  chainWebpack(config) {
    config.plugins.delete('prefetch')
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_functions.scss";
          @import "@/scss/_mq.scss";
          @import "@/scss/_variables.scss";
          @import "@/scss/_mixins.scss";
        `
      }
    }
  }
}
