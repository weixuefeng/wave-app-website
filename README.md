# Wave-app-website

## Getting Started

### 项目基础框架
nextjs + tailwindcss + redux + react-i18n + sentry

```bash
# Build
yarn build
SENTRY_AUTH_TOKEN=d604cf7148fa48fd8cb93b7dec6867896593a02a34e544218b3bb8bf28d45dd0 yarn build
```

### 目录结构说明

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


### 接口说明:

- MyListing:
  - getOrderOnSale
- My Offer
  - getOrderOffer