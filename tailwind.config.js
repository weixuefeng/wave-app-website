/*
 * @Author: zxt0805 zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: zxt0805 zhuxiaotong@diynova.com
 * @LastEditTime: 2022-10-31 16:17:59
 * @FilePath: /wave-app-website/tailwind.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  content: [
    // './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,css,scss}',
  ],
  darkMode: 'class', // 'media' is the default, change to 'class' if you want to use dark mode in with class names
  theme: {
    extend: {
      colors: {
        whitef0: '#f0f0f0',
        gray6a: '#6a6a6a',
        graye8: '#E8E8E8',
        blackText: '#0B140E',
        grayText: '#969797',
        greenText: '#01A533'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
