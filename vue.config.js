module.exports = {
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
  },
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/sitemap.xml'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
