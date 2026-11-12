import { webThemes, type WebThemeId } from './web-themes';
import { webThemesEn } from './web-themes.en';
import { articlesEn, codeTextEn } from './content.en';
import type { Locale } from '../i18n';
import type { SiteStudyId } from './site-studies';

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  code?: { language: string; source: string };
  theme?: WebThemeId;
  siteStudy?: SiteStudyId;
}

export interface Article {
  id: string;
  date: string;
  datetime: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  tags: string[];
  visual: 'motion' | 'layout' | 'code' | 'themes' | 'sites';
  sections: ArticleSection[];
}

export const articles: Article[] = [
  {
    id: 'website-design-studies',
    date: '2026.11.12',
    datetime: '2026-11-12',
    category: '整站设计',
    title: '从 Apple 到 Nike：四套带交互的官网设计',
    summary: '滚动点亮的桌灯、能操作的协作工作台、轮盘上成形的碗和横向展开的跑步路线。四套完整预览，图形全部用代码画成。',
    readTime: '8 分钟',
    tags: ['官网设计', '滚动动画', '交互实现'],
    visual: 'sites',
    sections: [
      {
        heading: '设计一整页，也包括它怎样动',
        paragraphs: [
          '只看截图，官网像是配色、字体加几块图文。往下滚才知道产品什么时候靠近，下一段怎样接上，按钮改变了哪部分画面。所以这次我把页面怎么动和它长什么样放在一起做。',
          '这次分别参考 Apple、Linear、Aesop 和 Nike 的官网做了四套整页预览，借的是编排方式。四个品牌都是虚构的：桌灯 Oriel、协作工具 Relay、陶器工作室 Still 和跑步专题 Stride。页面里没有照片，灯、碗、跑道和路线图都用 CSS 与 SVG 画成。',
          '每节下面都有独立页面的链接。进入预览后，右下角的小工具栏可以切换方案或回到文章，不占据品牌导航的位置。入口上的图片截自实际页面，滚动和点击之后的变化要打开才看得到。',
        ],
      },
      {
        heading: 'Apple 式：一盏随滚动点亮的灯',
        paragraphs: [
          'Oriel 是一盏虚构的桌灯，圆形灯头、细灯杆、圆底座，全部用 CSS 画出来。首屏是一圈没点亮的灯环，占满画面。往下滚，灯先亮起来，镜头再拉远到整盏灯，标题最后出现。进度由滚动决定，停下来画面也停住，往回滚灯会重新暗下去。',
          '接着是一间可以调光的小房间。拖动色温和亮度，墙面、桌面和书脊的颜色跟着变，也可以直接点阅读、专注、夜晚三个预设。设计章节把灯固定在视野里，滚动时灯头慢慢转到侧面，三条说明依次点亮。外壳有月白、石墨、陶土、苔绿四种，切换后整页的灯一起换色。',
          '参数用数字滚动的方式出现，细节卡片里的旋钮和天色只在进入视野时播放。产品名、参数和文案都是为这次练习编的。',
        ],
        siteStudy: 'apple',
      },
      {
        heading: 'Linear 式：把软件放大到可以操作',
        paragraphs: [
          '协作工具的官网要说明打开软件之后怎样工作。Relay 的标题逐行升起，紧接着是一个由侧栏、任务区和详情栏组成的工作台。它刚出现时向后仰着，随着滚动放平到正面，任务行一条一条落位。',
          '可以在列表与看板之间切换，选择不同任务，再点击“标记为完成”。完成状态会同时更新到两种布局；在看板里，任务会移动到完成列，计数和进度条也随之改变。移动带动画，能看出任务是从哪一列过去的。',
          '往下的一句话会随滚动逐字变亮。活动记录左侧的线跟着阅读位置画下去，迭代计划里的时间条依次展开。所有操作只发生在本地示例中，刷新后恢复，不需要注册或提交个人信息。',
        ],
        siteStudy: 'linear',
      },
      {
        heading: 'Aesop 式：给制作过程留出时间',
        paragraphs: [
          'Still 是一间虚构的陶器工作室。英文标题沿左侧展开，右侧是一只转动的轮盘，上面放着一团泥。向下滚动，泥团慢慢变宽、开口，最后成为一只碗；往回滚，它又收回成泥团。整页的过渡都比另外三套慢。',
          '器物目录把器形、选择与使用说明放在一起。切换浅口碗、浅沿盘、深釉碗，画面里的器物换成对应的轮廓和釉色，旁边的文字一起更新。三件器物都是 SVG 画的侧面图。',
          '后半页介绍制作：一条烧成曲线随阅读位置画出来，从入窑升到 1230 度，保温，再冷却。之后是拉坯、修坯、烧成三步，以及使用与养护的问答。石灰底、灰绿页脚、宋体中文与衬线英文组成整套版式。',
        ],
        siteStudy: 'aesop',
      },
      {
        heading: 'Nike 式：跑道线、大字和三段路线',
        paragraphs: [
          'Stride 的首屏是黑底上的六条橙红色跑道线，打开时依次画出，大字从下方切入。继续滚动，线条和文字以不同速度移开。下面是一条橙红色的字幕带，两行字随滚动朝相反方向滑动。',
          '中间的场景段落由纵向滚动驱动横向移动。跑道、街区、一起跑，三幅路线图依次进入同一块视野，进入时路线从起点画到终点，文字逐行出现；也可以点击顶部按钮直接去看某个场景。',
          '出门清单旁边有一个进度环，每勾一项前进一格，三项勾完后整块变成黑色。手记里的数字在进入视野时滚动到位。Archivo Black 只用在英文大字上，中文靠粗体分出层级。',
        ],
        siteStudy: 'nike',
      },
      {
        heading: '停下来，再往回滚一遍',
        paragraphs: [
          '打开预览后，可以在转场中途停下来，再往回滚。灯应该跟着进度暗下去，碗应该收回成泥团；运动专题也应该沿原来的方向退回上一个场景。切换任务、外壳或器物时，留意发生变化的是否就是刚才选择的对象。',
          '这些动效使用原生 CSS、Web Animations API 和按需触发的 requestAnimationFrame，没有额外引入动画库。脚本只把滚动位置写成两个 CSS 变量，具体怎么动由各页的样式决定。循环播放的装饰离开视野就暂停。系统启用“减少动态效果”时，固定滚动的段落直接显示完成后的样子，运动场景按顺序排列，按钮、目录与任务操作仍然可用。',
          '四套预览不加载博客的主题脚本，各自保留自己的外观。文章与独立页面之间用普通链接连接；右下角始终有返回文章的入口，也可以直接分享某一套预览的地址。',
        ],
      },
    ],
  },
  {
    id: 'web-theme-design',
    date: '2026.11.12',
    datetime: '2026-11-12',
    category: '主题设计',
    title: '十套网页主题：配色、排版与实现笔记',
    summary: '液态玻璃、柔塑浮雕、编辑刊物与橄榄手记等十套主题，各有自己的配色、字体、布局、材质和交互。可以切换亮暗预览，查看设计取舍和 CSS 变量。',
    readTime: '20 分钟',
    tags: ['主题设计', 'CSS', 'Design Tokens'],
    visual: 'themes',
    sections: [
      {
        heading: '先放进内容，再选主题',
        paragraphs: [
          '做网页主题时，我通常先放进一篇真实文章、一段代码和一张作品预览，看看读者应该先注意到什么。持续写作的博客要方便找文章，作品集要先展示设计，技术手记则要便于回查。用途不同，页面里的阅读顺序也会不同。',
          '只换背景和按钮颜色，内容的主次往往没变；字体分工明确、阅读顺序清楚的网站，用色很少也认得出来。',
          '这十套方案都用于设计与代码内容，分别尝试了不同的材质、字体、网格、边界，以及像素和拼贴构图。每套预览可以单独切换亮暗外观，展开后能看到可复用的 CSS 变量。切换只影响当前预览，博客主题保持不变。十套方案的背景都避开了蓝色、深蓝和米白。',
        ],
      },
      ...webThemes.map((theme) => ({ heading: theme.heading, paragraphs: theme.paragraphs, theme: theme.id })),
      {
        heading: '按用途命名主题变量',
        paragraphs: [
          '写 CSS 时，我会按用途给颜色命名。这十套方案共用六个角色：背景、内容面、正文、辅助文字、强调和边界。组件引用对应的变量，切换主题时集中替换这六组值，就不用逐个寻找写死的颜色。',
          '使用这些样式时，先给容器加上 theme-root 类，通过 data-design 选择方案，通过 data-mode 选择亮暗模式。把每套预览下展开的变量与下面的基础样式放在一起即可。字体文件需要在自己的项目里加载；缺少对应字体时，浏览器会按字体栈选用后备字体。',
          '十套主题共用变量名，各自的结构仍然保留：液态玻璃有共享操作层，浮雕使用内外阴影，瑞士网格重在对齐，粗野主义采用硬边界，还有像素窗口、拼贴纸片，以及刊物、普通玻璃、画廊和手记的不同布局。容器、按钮和代码区域的圆角也可以分别设定。',
        ],
        code: { language: 'HTML / CSS', source: '<main class="theme-root" data-design="print" data-mode="light">\n  <h1>设计与代码笔记</h1>\n  <article class="surface">从真实内容开始设计。</article>\n</main>\n\n.theme-root {\n  background: var(--theme-bg);\n  color: var(--theme-ink);\n  font-family: system-ui, sans-serif;\n  line-height: 1.8;\n}\n\n.theme-root :is(h1, h2, h3) {\n  font-family: var(--theme-display);\n}\n\n.theme-root .surface {\n  background: var(--theme-surface);\n  border: 1px solid var(--theme-line);\n  border-radius: var(--theme-radius);\n}\n\n.theme-root a { color: var(--theme-accent); }\n.theme-root small { color: var(--theme-muted); }\n.theme-root a:focus-visible {\n  outline: 2px solid var(--theme-accent);\n  outline-offset: 4px;\n}' },
      },
      {
        heading: '暗色要重新分配明暗',
        paragraphs: [
          '浅色背景上的阴影容易看见，换成暗色后往往就不明显了。此时可以调整表面明度、轮廓和间距，让按钮、代码块与悬浮层仍然分得开。',
          '强调色也要为暗色背景另选一版。浅色里清楚的深朱红放到炭灰上可能太暗，因此这里用了更亮、更柔和的对应颜色。普通文字以至少 4.5:1 的对比度为目标，大号文字按 3:1 检查。玻璃上的文字要放到实际叠加后的背景里检查，两块独立色样的对比度不能代表最终结果。',
          '换到暗色后，内容的主次应当和亮色一致，具体色值则可以调整。我会先看正文和背景，再看辅助文字、链接、焦点轮廓与选中状态。选中项还需要文字、字重或形状上的提示，方便分辨。',
        ],
      },
      {
        heading: '先处理反馈，再处理材质和运动',
        paragraphs: [
          '我会先做按下时的轻微反馈，让状态变化容易看懂，再考虑面板怎样展开。连续点击时，界面应该立刻接着响应。如果运动需要保留当前位置和速度，就用可以中途改目标的弹簧；普通的颜色切换用现有样式就够了。',
          '磨砂导航可以先写实色基础样式，浏览器支持背景模糊时再加上透明材质。液态玻璃还会让背景在弧面边缘折射，轮廓随触点变形，融合处平滑连接。上面的示例在局部 WebGL 场景里计算这些效果。CSS backdrop-filter 回退只提供磨砂外观，没有同样的光学效果。',
          '减少透明度、提高对比度和减少动态效果需要分别处理。减少动态效果时，去掉拉伸与回弹，选中状态仍然要清楚；用户选择实色或更强对比度时，也应该能继续阅读和操作。',
        ],
        code: { language: 'CSS', source: '.floating-nav {\n  background: var(--theme-surface);\n  border: 1px solid var(--theme-line);\n}\n\n@supports (backdrop-filter: blur(16px)) {\n  .floating-nav {\n    background: color-mix(in srgb, var(--theme-surface) 88%, transparent);\n    backdrop-filter: blur(16px);\n  }\n}\n\n@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {\n  .floating-nav {\n    background: var(--theme-surface);\n    backdrop-filter: none;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .theme-control { transition: none; }\n  .theme-control:active { transform: none; }\n}' },
      },
      {
        heading: '在不同屏幕上读一遍',
        paragraphs: [
          '把长标题、代码和真实摘要都放进页面，再用手机检查换行，用键盘操作控件，也把窗口拉到大屏尺寸看一看。截图看不出的拥挤或空白，实际读起来常常就会发现。宽屏可以多用一些空间，字号和内容却不必一起等比放大。',
          '我会特别检查正文与目录的距离：外层 Grid 如果分了一列很宽的空间，正文内部却又限制了较小的最大宽度，目录就可能远远停在列的另一端。正文、代码与目录最好按同一套列宽安排；窄屏变成单列后，再调整辅助内容的位置。',
          '需要把操作层从内容里分出来时，可以试液态玻璃；重视按下的触觉感，可以看柔塑浮雕。瑞士网格便于快速扫描，新粗野主义适合直接、强烈的表达。创意编码或怀旧内容可以用复古像素，讲创作过程则可以试暖色拼贴。',
          '以文章为主时，编辑刊物更合适；只需要一层轻磨砂浮层，可以用暖灰玻璃。炭黑画廊把空间留给作品，橄榄手记则适合经常阅读和回查的技术内容。',
        ],
      },
    ],
  },
  {
    id: 'natural-web-motion',
    date: '2026.06.18',
    datetime: '2026-06-18',
    category: '交互动效',
    title: '网页动效：从按下反馈到弹簧动画',
    summary: '从按钮的按下反馈说起，记录动画中途转向、展开路径和减少动态效果的处理。',
    readTime: '4 分钟',
    tags: ['Motion', 'JavaScript', '交互设计'],
    visual: 'motion',
    sections: [
      {
        heading: '按钮按下时就该回应',
        paragraphs: [
          '手指按下按钮时，界面就应该给一点反馈。等到松手后才播放动画，中间那段没有回应的时间会让人怀疑有没有点到，曲线再好看也补不上。',
          '可以把轻微缩放放在 :active 上，按下时快速缩小，松开后慢慢恢复。缩放几个百分点就够了，按钮的位置保持稳定。',
        ],
        code: { language: 'CSS', source: '.button {\n  transition: scale 360ms cubic-bezier(.22, 1, .36, 1);\n}\n\n.button:active {\n  scale: .97;\n  transition-duration: 70ms;\n}' },
      },
      {
        heading: '动画中途也能转向',
        paragraphs: [
          '面板还没完全展开，用户就可能再次点击把它关掉。界面应该从眼前的位置直接转向关闭状态，让这次操作立即生效。',
          '简单的状态切换可以用 CSS transition，它能从当前呈现值继续过渡。连续改变目标、还想保留运动速度时，弹簧模型更合适：把位置和速度存成状态，随时修改目标值即可。',
          '不涉及手势惯性时，我通常从临界阻尼开始。它会平稳接近目标，省去额外的回弹。',
        ],
      },
      {
        heading: '让展开和收起沿同一条路径',
        paragraphs: [
          '点开卡片详情时，可以让面板从触发位置附近展开；面板从底部出来，关闭时就收回底部。来回沿着相同的路径，读者比较容易记住内容的位置。',
          '导航切换时，我也会让同一块选中背景移到新栏目。比起各个栏目分别闪一下，连续移动更容易看清选中了哪里，也能少分散一点阅读时的注意力。',
        ],
      },
      {
        heading: '减少运动后，状态仍然要清楚',
        paragraphs: [
          '开始写动效时就处理 prefers-reduced-motion。用户选择减少动态效果后，用直接切换或短暂淡入淡出替代位移、缩放和弹簧，保留能看清的状态反馈。',
          '检查每段动画是否帮人看懂操作。如果它只是让画面热闹，可以缩小幅度，或者直接删去。',
        ],
        code: { language: 'CSS', source: '@media (prefers-reduced-motion: reduce) {\n  .button { transition: none; }\n  .button:active { scale: 1; }\n}' },
      },
    ],
  },
  {
    id: 'css-layout-rhythm',
    date: '2026.06.12',
    datetime: '2026-06-12',
    category: '界面设计',
    title: '用间距和层级安排阅读顺序',
    summary: '把常用间距设成几档变量，再安排标题、正文和卡片的位置，看看页面怎样变得容易读。',
    readTime: '4 分钟',
    tags: ['CSS', 'Typography', 'Layout'],
    visual: 'layout',
    sections: [
      {
        heading: '排版前，先写下阅读顺序',
        paragraphs: [
          '我会先写下读者打开页面后的阅读顺序，再去选字体。比如个人博客首页，要先说明这里写什么，然后让人找到感兴趣的文章。',
          '字号、正文宽度和内容组之间的距离会一起影响这个顺序。标题变大时，往往还要收紧字距，并调整它和正文之间的留白，所以这些值需要放在一起看。',
        ],
      },
      {
        heading: '给常用间距设几档数值',
        paragraphs: [
          '先设几档常用间距，让元素从中取值。相关内容靠近，不同内容组之间多留一些空白；同一层级尽量用相同的间距，读者就容易分清哪些内容是一组。',
          '变量可以按用途或尺度命名，组件用得上、维护时看得懂就够了。',
        ],
        code: { language: 'CSS', source: ':root {\n  --space-1: .5rem;\n  --space-2: 1rem;\n  --space-3: 1.5rem;\n  --space-4: 2.5rem;\n}\n\n.article {\n  display: grid;\n  gap: var(--space-3);\n  max-width: 65ch;\n}' },
      },
      {
        heading: '窄屏时，重新安排辅助内容',
        paragraphs: [
          '换到手机上，可以把桌面的辅助侧栏移到正文之后，也可以收紧作品缩略图的尺寸。标题和摘要仍然要读得清楚，不能跟着所有元素一起等比缩小。',
          'Grid 的弹性列可以用 minmax(0, 1fr)，避免长内容把子项撑开；字号与留白则用 clamp() 限定范围。',
        ],
        code: { language: 'CSS', source: '.content-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 18rem;\n  gap: clamp(2rem, 5vw, 5rem);\n}\n\n@media (max-width: 52rem) {\n  .content-grid { grid-template-columns: 1fr; }\n}' },
      },
    ],
  },
  {
    id: 'from-design-to-browser',
    date: '2026.06.06',
    datetime: '2026-06-06',
    category: '前端开发',
    title: '拿到设计稿后，我先做页面结构',
    summary: '我通常先拆内容结构，再整理重复使用的样式变量，最后检查交互。记录把静态设计稿做成网页时的工作顺序。',
    readTime: '5 分钟',
    tags: ['Astro', 'TypeScript', '工作流'],
    visual: 'code',
    sections: [
      {
        heading: '先分清导航、文章和装饰',
        paragraphs: [
          '我会先把设计稿里的内容放进浏览器，分清导航、文章和装饰分别属于哪里。结构确定后，再去调整阴影、圆角这些视觉细节。',
          '进入文章用链接，执行局部操作用按钮。先选符合用途的语义化元素，就少了用 div 拼好形状后再补行为的步骤。',
        ],
        code: { language: 'HTML', source: '<main>\n  <section aria-labelledby="articles-title">\n    <h2 id="articles-title">最新文章</h2>\n    <article>\n      <h3><a href="/articles/my-note/">一篇实践笔记</a></h3>\n      <p>先让内容可以被阅读，再调整它的外观。</p>\n    </article>\n  </section>\n</main>' },
      },
      {
        heading: '把重复用到的样式提成变量',
        paragraphs: [
          '背景、正文颜色、边框和内容宽度会在许多组件里重复出现。我把这些值放进 CSS 自定义属性，切换主题或微调样式时就能在一处修改。',
          '拆组件时也看哪里已经重复了。首页和文章页共用的导航可以独立出来；只出现一次、结构又简单的段落，留在页面里就好。',
        ],
        code: { language: 'CSS', source: ':root {\n  --background: #f3f3f3;\n  --surface: #ffffff;\n  --text: #242424;\n  --content-width: 78rem;\n}\n\n.page-shell {\n  width: min(calc(100% - 2.5rem), var(--content-width));\n  margin-inline: auto;\n}' },
      },
      {
        heading: '用类型描述文章内容',
        paragraphs: [
          '用 TypeScript 接口描述文章的数据结构，列表和阅读页就可以读取同一份内容。标题、摘要、日期与正文只维护一处，各个页面按需取用。',
          '静态博客可以先沿用项目里的数据和静态路由。等到文章数量多起来，或者需要编辑流程时，再考虑 Markdown 内容集合和其他内容管理方式。',
        ],
      },
      {
        heading: '用键盘和手机宽度检查页面',
        paragraphs: [
          '把窗口缩到手机宽度，用键盘走过导航，打开文章，再关闭弹窗，看看焦点回到了哪里。实际操作一遍，常常能发现对照截图时没注意到的问题。',
          '外观对上以后，我还会拿真机把文章读一遍，把控件挨个点一遍。',
        ],
      },
    ],
  },
];

export function getArticles(locale: Locale): Article[] {
  if (locale !== 'en') return articles;
  return articles.map((article) => {
    const { sections, ...text } = articlesEn[article.id];
    let next = 0;
    return {
      ...article,
      ...text,
      sections: article.sections.map((section) => {
        const { heading, paragraphs } = section.theme ? webThemesEn[section.theme] : sections[next++];
        const code = section.code && { ...section.code, source: codeTextEn.reduce((source, [zh, en]) => source.replace(zh, en), section.code.source) };
        return { ...section, heading, paragraphs, code };
      }),
    };
  });
}
