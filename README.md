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

## Getting Started

```bash
# Install Dependencies
yarn

# Run the development server
yarn dev
```

## Scripts

**Next.JS**

```bash
# Build
yarn build
SENTRY_AUTH_TOKEN=d604cf7148fa48fd8cb93b7dec6867896593a02a34e544218b3bb8bf28d45dd0 yarn build

# Start server with build files
yarn start
```

**Prettier**

```bash
# Use Prettier to do Format Check for files under ./src
yarn fc

# Use Prettier to do Format Fix for files under ./src
yarn ff
```

**commit**

```bash
# https://www.npmjs.com/package/husky
# https://www.npmjs.com/package/commitizen

commit: yarn cz or npm run cz or feat:

<type>[optional scope]: <description>
[optional body]
[optional footer(s)]

# type *
feat: 
fix: 
docs: 
style: 
refactor: 
perf: 
test: 
chore: 
revert: 
build: 
ci

```