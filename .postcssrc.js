module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') > -1 ? 37.5 : 75
      },
      propList: ['*'],
      // 要忽略的文件
      exclude: 'github-markdown'
    }
  }
}
