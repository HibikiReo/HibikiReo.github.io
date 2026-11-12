# Hibiki 的设计与代码笔记

Hibiki 的个人技术博客，写界面设计、前端实践和交互细节。项目使用 Astro、TypeScript 和 Tailwind CSS。

首页是一段简短介绍、最新的四篇文章（最新一篇带封面，其余三篇为列表行）、一个可以操作的示例和作者介绍。全部文章在 `/notes/`，按年份分组，以列表行展示。外层布局随视口展开，没有居中的最大宽度；阅读页的正文与代码填满自适应主列，目录列与主列之间保留正常栏间距。

首页的示例可以操作，也可以切换到代码视图。每篇文章都有独立的静态阅读页，附目录、代码示例和相关阅读。现有文章是可替换的示例内容。

主题文章 `/articles/web-theme-design/` 收录十套网页主题，每套都有独立的亮暗预览、设计说明、色值和可复用的 CSS 变量。液态玻璃预览使用原生 WebGL 2 绘制弧面折射、SDF 液态融合和拖动时的触点形变；文字与控件保留在 HTML 中，并提供磨砂或实色回退。

完整官网设计文章 `/articles/website-design-studies/` 介绍四套独立页面，入口和文章封面使用实际页面截图：

- `/previews/apple/`：虚构桌灯 Oriel。灯体由 CSS 绘制，滚动时点亮并拉远；可以调色温与亮度、随滚动转动灯头、切换四种外壳。
- `/previews/linear/`：虚构协作工具 Relay。工作台随滚动放平，支持列表与看板切换、任务详情和完成操作；看板任务移动、状态、计数与进度条同步更新，刷新后恢复示例。
- `/previews/aesop/`：虚构陶器品牌 Still。滚动把轮盘上的泥团拉成碗，器物目录切换 SVG 器形，烧成曲线随阅读位置画出。
- `/previews/nike/`：虚构运动品牌 Stride。跑道线与大字入场、对向滑动的字幕带、滚动驱动的三段路线图，以及带进度环的出门清单。

每页都有导航、后续内容与页脚，右下角工具栏可以切换方案或返回文章。动效使用原生 CSS、Web Animations API 和按需触发的 `requestAnimationFrame`，没有额外动画依赖；系统减少动态效果时，固定滚动段落显示完成后的状态或按顺序排列，交互仍然可用。预览不加载博客主题。

## 中文与英文

每个页面都有英文和中文两个版本：默认是英文，在 `/`；中文在 `/zh/`，路径其余部分相同。导航栏和预览工具栏里有语言切换链接，指向当前页面的另一种语言。

- `src/i18n.ts`：根据地址判断语言，提供 `t(中文, English)`、带语言前缀的链接和对应页面的地址。
- `src/pages/[...locale]/`：所有页面放在可选的语言段下，同一份模板生成两种语言。
- `src/data/content.en.ts`、`src/data/web-themes.en.ts`：文章和主题说明的英文文本。结构、日期、色值和代码示例仍取自中文数据文件。
- 页面和组件里的界面文字直接写成 `t("中文", "English")`。

## 本地启动

需要 Node.js 24 LTS 和 npm。

```bash
npm install
npm run dev
```

启动后访问 `http://localhost:4321`。

## 生成静态站点

```bash
npm run build
npm run preview
```

构建时先运行 Astro 类型检查，再把静态站点输出到 `dist/`。可以部署到 Cloudflare Pages，也可以用 Nginx 托管。

## 内容和源码位置

- `src/data/content.ts`：维护文章。文章正文按章节组织，章节里有段落、代码块，也可以插入主题预览或完整官网预览链接。
- `src/data/web-themes.ts`：维护十套主题的亮暗配色与设计说明，包括液态玻璃、柔塑浮雕、瑞士网格、新粗野主义、复古像素、暖色拼贴、编辑刊物、暖灰玻璃、炭黑画廊和橄榄手记。
- `src/data/site-studies.ts`：维护四套官网预览的名称、入口、简介和基础配色。
- `src/layouts/PreviewLayout.astro`：独立官网预览的页面骨架与切换工具栏，不加载博客的全局样式和主题脚本。
- `src/pages/[...locale]/previews/`：四套完整官网页面，各自使用独立的布局与样式。
- `src/scripts/site-previews.ts`：把滚动位置写成 `--progress` 与 `--view` 两个 CSS 变量，处理入场、数字滚动，以及调光、外壳、器物目录、清单和任务操作。
- `src/components/OrielLamp.astro`：用 CSS 绘制的 Oriel 桌灯，外壳颜色、光色、亮度和灯头角度由自定义属性控制。
- `src/components/WebsitePreviewLink.astro`：文章内打开完整官网预览的链接入口。
- `src/pages/[...locale]/index.astro`：首页，展示最新四篇文章和一个交互示例。
- `src/pages/[...locale]/notes.astro`：全部文章，按年份分组的列表。
- `src/components/ArticleRow.astro`：首页与列表页共用的文章列表行。
- `src/pages/[...locale]/articles/[slug].astro`：读取文章数据，生成各篇阅读页。
- `src/components/SiteHeader.astro`、`SiteFooter.astro`：首页与阅读页共用的导航和页脚。
- `src/components/InteractivePreview.astro`：首页的交互示例与代码视图。
- `src/components/ArticleVisual.astro`：文章列表里的设计、代码和交互主题缩略图。
- `src/components/ThemeShowcase.astro`：主题预览共用的亮暗控件、色值与 CSS 变量；也负责编辑刊物、暖灰玻璃、炭黑画廊和橄榄手记的布局。
- `src/components/ThemeStudyPreview.astro`：柔塑浮雕、瑞士网格、新粗野主义、复古像素和暖色拼贴的预览，以及液态玻璃组件入口。
- `src/components/LiquidGlassPreview.astro`、`src/scripts/liquid-glass.ts`：液态玻璃的局部光学场景，计算边缘折射、SDF 形变融合、可中途改目标的解析弹簧和指针拖动。文字与原生单选框留在 HTML 中，静止后停止绘制。WebGL 2 不可用时显示 CSS 磨砂导航；减少透明度或提高对比度时使用实色控件。
- `src/styles/global.css`：全宽首页与阅读页样式，定义中性白灰、炭灰和砖橙配色。
- `src/styles/themes.css`：深色主题、响应式布局，以及透明度和对比度偏好适配。
- `src/styles/motion.css`：入场、按压和弹窗动效，以及减少动态效果的样式。
- `src/scripts/motion.ts`：临界阻尼弹簧、导航选中标记、阅读进度。
- `src/scripts/home.ts`：交互示例、键盘操作和链接复制。
- `src/scripts/theme.ts`：切换浅色、深色主题，保存本地偏好。

## 配色与交互

站点浅色主题使用纯中性浅灰和白色，深色主题使用不偏蓝的中性炭灰，两者都避开米白、蓝色和深蓝背景。链接及少量重点信息用砖橙。

导航采用轻磨砂材质。选中下划线和示例开关使用可中途改变目标的弹簧。系统启用“减少动态效果”时，去掉位移与缩放。

## 字体与音乐装饰

页脚有一处乐谱小装饰。乐谱字形来自 Bravura（© Steinberg Media Technologies GmbH），按 SIL Open Font License 1.1 使用，许可证保存在 `licenses/BRAVURA-OFL.txt`。字体使用本地资源，不依赖外部图片或字体服务。

运动专题的英文大字使用本地 Archivo Black，版权归 The Archivo Black Project Authors，按 SIL Open Font License 1.1 使用，许可证见 `licenses/ARCHIVO-BLACK-OFL.txt`。

四套官网预览不使用照片或第三方图片，品牌、产品与数据均为虚构，画面由 CSS 与 SVG 绘制。`public/images/site-studies/` 里的 `cover-apple.jpg`、`cover-linear.jpg`、`cover-aesop.jpg` 与 `cover-nike.jpg` 是本项目对应预览页面的浏览器截图，供文章入口和封面使用；带 `-en` 后缀的四张截自英文页面。
