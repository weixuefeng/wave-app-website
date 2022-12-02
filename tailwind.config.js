/*
 * @Author: zxt0805 zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 19:56:59
 * @FilePath: /wave-app-webiste/tailwind.config.js
 */
module.exports = {
  content: [
    // './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,css,scss}',
  ],
  darkMode: 'class', // 'media' is the default, change to 'class' if you want to use dark mode in with class names
  theme: {
    extend: {
      lineHeight: {
        leading10: '10px',
      },
      fontSize: {
        font40xl: ['2.55rem'],
        font22xl: ['1.375rem'],
        font32xl: ['2rem'],
        font7: ['0.35rem']
      },
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
        graye3: '#E3E3E3',
        grayec: '#ECECEC',
        blackText: '#0B140E',
        black17:'#171718',
        black56: '#565656',
        black08:'#08140E',
        black53:'#535353',
        black68:'#686868',
        grayText: '#969797',
        greenText: '#01A533',
        green57: '#57AC6E',
        reddd: '#DD332F',
        redb6: '#B64D4D',
        blue1d: '#1D8AC5',
        yellowf7: '#F7A400',
        gray666: '#666666',
        grayc1: '#c1c1c1',
        graycb: '#cbcbcb',
        gray999: '#999999',
        gray333: '#333333',
        grayED: '#EDEDED',
        grayEA: '#eaeaea',
        grayee: '#eeeeee',
        grayc4: '#C4C4C4',
        gray56: '#565656',
        white: '#fff',
        whitef0: '#f0f0f0',
        grey7f7f: '#7F7F7F',
        grayf1: '#F1F1F1',
        grayfb: '#FBFBFB',
        grayf5: '#f5f5f5',
        grayf9: '#f9f9f9',
        graybf: '#bfbfbf',
        grayef: '#EFEFEF',
        grayc8: '#C8C8C8 ',
        gray6a: '#6a6a6a',
        green2d: '#2DD867',
        green00: '#00B548',
        greenIcon: '#00C6A8',
        greenLight: '#DBFFF9',
        greenMain: '#00D237',
        greenDark: '#00bb31',
        greenf2: '#F2F8F4',
        yellowf7: '#F7A400'
      },
      border: {
        imgcol: 'border-image: -webkit-linear-gradient(top left, #CFFFFA 0%, #B5EAFF 32%, #FEBCE6 69%, #FFAFB1 100%)100 100 100 100;'
      },
      backgroundImage: { 
        'bg-checked':"url('/assets/image/icon_select.png')",
        'bg-checked-hover':"url('/assets/image/icon_selected.png')",
        'featbg': "url('/assets/image/fbg.png')",
        'featbgh5': "url('/assets/image/featbg.png')",
        'prev': "url('/assets/image/prev.png')",
        'next': "url('/assets/image/next.png')",
        'code': "url('/assets/image/code-bg.png')",
        'store-h5':"url('/assets/image/store-h5.png')",
        'play-h5':"url('/assets/image/play-h5.png')",
        'apk-h5':"url('/assets/image/apk-h5.png')",
        'footer-telegram': "url('/assets/image/telegram.png')",
        'footer-telegram-hover': "url('/assets/image/telegram_hover.png')",
        'footer-twitter': "url('/assets/image/twitter.png')",
        'footer-twitter-hover': "url('/assets/image/twitter_hover.png')",
        'footer-discord': "url('/assets/image/discord.png')",
        'footer-discord-hover': "url('/assets/image/discord_hover.png')",
        'wallet-active': "url('/assets/image/icon_seleted.png')",
        'language-active': "url('/assets/image/icon_language_active.png')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@headlessui/tailwindcss')
  ],
}
