const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint语法检测
  devServer: {
    // open: true, //自动打开
    host: 'localhost', // 打开地址
    port: 2342
  }
})
