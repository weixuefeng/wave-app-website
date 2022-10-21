/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-12 20:16:46
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-10-12 20:21:35
 * @FilePath: /nextjs-starter-boilerplate/next.config.wizardcopy.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  reactStrictMode: true,
  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true, 
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
