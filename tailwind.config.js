/*
 * @Author: zxt0805 zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-10 16:10:00
 * @FilePath: /wave-app-webiste/tailwind.config.js
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
        gray333: '#333333',
        gray3e: '#3E3E3E',
        gray66: '#666666',
        gray99: '#999999',
        grayed:'#EDEDED',
        gragfb:'#FBFBFB',
        grayea:'#EAEAEA',
        grayc7:'#C7C7C7',
        gray8c:'#8C939A',
        grayf8: '#F8F8F8',
        graye7: '#E7E7E7',
        gray9c: '#9C9C9C',
        grayf5: '#F5F5F5',
        grayf3: '#F3F3F3',
        grayd8: '#D8D8D8',
        gray3d: '#3D3D3D',
        grayef: '#EFEFEF',
        grayfb: '#EBEBEB',
        blackText: '#0B140E',
        black08:'#08140E',
        grayText: '#969797',
        greenText: '#01A533',
        green57: '#57AC6E',
        reddd: '#DD332F',
        redb6: '#B64D4D',
        blue1d: '#1D8AC5',
        yellowf7: '#F7A400'
      },
      backgroundImage: { 
        'bg-checked':"url('/assets/image/icon_select.png')",
        'bg-checked-hover':"url('/assets/image/icon_selected.png')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@headlessui/tailwindcss')
  ],
}
