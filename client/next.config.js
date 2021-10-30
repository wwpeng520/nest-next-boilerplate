/* eslint-disable */
const withAntdLess = require('next-plugin-antd-less');
const path = require('path');
const fs = require('fs');
const lessToJS = require('less-vars-to-js');

const antdModifyVars = lessToJS(fs.readFileSync(path.resolve(__dirname, 'styles/variables.less'), 'utf8'));

// const useWebpack5 = true; // 是否使用 webpack5 打包
module.exports = withAntdLess({
  modifyVars: { ...antdModifyVars },
  // lessVarsFilePath: './client/styles/variables.less',
  lessVarsFilePathAppendToEndOfContent: true,
  distDir: '../build/client',
  // webpack5: useWebpack5,
  webpack(config) {
    // if (!useWebpack5) {
    //   config.module.rules.push({test:/\.(png|jpg|gif|ico|svg|woff)$/, use: ['url-loader']})
    // }
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(process.cwd()),
      // '@/components': path.resolve(__dirname, 'components'),
      // '@/pages': path.resolve(__dirname, 'pages'),
      // '@/utils': path.resolve(__dirname, 'utils'),
    };
    return config;
  },
  env: {},
});
