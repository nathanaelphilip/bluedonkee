module.exports = {
  devServer: {
    host: process.env.VUE_APP_LOCAL_HOST
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_mixins.scss";
        `
      }
    }
  }
};
