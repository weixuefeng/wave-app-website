<<<<<<< HEAD
<!--
 * @Author: zxt0805 zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: zxt0805 zhuxiaotong@diynova.com
 * @LastEditTime: 2022-10-28 10:18:23
 * @FilePath: /wave-app-website/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Next.JS Starter Boilerplate

A Next.js starter kit template with Next.js 12 + React 18 + Typescript + Tailwind CSS 3 + Heroicons + Headless UI.

Other tools included: Autoprefixer, Sass, PostCSS, ESLint, Prettier.

Live preview for this repo: https://nextjs-starter.aris.ac
=======
# Wave-app-website
>>>>>>> 1f223d5a8e47431e05318d959c1d9d86453c178f

## Getting Started

### 项目基础框架
nextjs + tailwindcss + redux + react-i18n + sentry

<<<<<<< HEAD
```bash
# Build
yarn build
SENTRY_AUTH_TOKEN=d604cf7148fa48fd8cb93b7dec6867896593a02a34e544218b3bb8bf28d45dd0 yarn build

# Start server with build files
yarn start
=======
### 目录结构说明
>>>>>>> 1f223d5a8e47431e05318d959c1d9d86453c178f
```
├── package.json
├── postcss.config.js
├── prettier.config.js
├── public
│   ├── assets
│   │   └── image
│   │       └── logo.png
│   ├── favicon.ico
│   └── icon-512x512.png
├── sentry.client.config.js
├── sentry.properties
├── sentry.server.config.js
├── src
│   ├── appConfig.ts    # meta信息配置
│   ├── components      # 存放组件，页面中使用的组件都在这里，根据不同页面，不同功能分类
│   │   ├── HeadGlobal.tsx
│   │   ├── Links
│   │   │   ├── SkipLink.tsx
│   │   │   └── index.ts
│   │   ├── Theme
│   │   │   ├── ThemeToggleButton.tsx
│   │   │   ├── ThemeToggleList.tsx
│   │   │   └── index.ts
│   │   ├── footer
│   │   │   └── footer.tsx
│   │   ├── header
│   │   │   └── header.tsx
│   │   ├── home
│   │   │   ├── BannerComponent.tsx
│   │   │   ├── HomeDataComonent.tsx
│   │   │   └── UserComponent.tsx
│   │   └── layout
│   │       ├── ThemeToggleButton.tsx
│   │       └── normalLayout.tsx
│   ├── constants    # 常量定义
│   │   ├── setting.ts
│   │   └── url.ts
│   ├── contexts     # 全局上下文，暂时没有使用
│   │   └── DemoContext.tsx
│   ├── hooks        # 存放所有 hooks
│   │   └── use-popper.ts
│   ├── i18n         # 国际化文件
│   │   ├── index.ts
│   │   └── locale
│   │       ├── en
│   │       │   └── index.ts
│   │       ├── index.ts
│   │       └── zh
│   │           └── index.ts
│   ├── localstorage  # 本地存储
│   │   └── localstorage.tsx
│   ├── model         # 存放数据模型
│   │   ├── asset.ts
│   │   ├── banner.ts
│   │   ├── base.ts
│   │   ├── navModel.ts
│   │   └── user.ts 
│   ├── pages        # 页面路由配置
│   │   ├── 404.js
│   │   ├── _app.tsx
│   │   ├── _error.js
│   │   ├── api      # api 代理层
│   │   │   └── proxy.ts
│   │   ├── index.tsx 
│   │   ├── login.tsx
│   │   ├── sentry_sample_error.js
│   │   └── test.tsx
│   ├── reducer      
│   │   └── userReducer.ts
│   ├── services
│   │   └── http.ts
│   ├── store
│   │   └── store.ts
│   ├── styles     # 样式表
│   │   ├── login.scss
│   │   └── style.scss
│   └── utils
│       ├── class-names.ts
│       └── sign_utils.ts
├── tailwind.config.js
├── tsconfig.json
└── yarn.lock
```
### 环境配置:
node-version: 16.10

.env.cn.dev 中国版 dev 环境
.env.dev 全球版 dev 环境
.env.test 全球版 testnet 环境
.env.prod 全球版正式环境

### 开始开发
- 获取代码: `git clone git@gitlab.weinvent.org:wave/business/wave-app-webiste.git`
- 配置环境: `cp .env.dev .env.local`
- 获取依赖: `yarn && yarn start`

......
- 格式化代码: `yarn ff`

### 构建
- `SENTRY_AUTH_TOKEN=d604cf7148fa48fd8cb93b7dec6867896593a02a34e544218b3bb8bf28d45dd0 yarn build`

### 部署:
```
pm2 start npm --name "wave-app-website" -- start
```
