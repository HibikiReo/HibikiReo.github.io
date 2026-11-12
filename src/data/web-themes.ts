import type { Locale } from '../i18n';
import { webThemesEn, themeTokenLabelsEn, cssCommentsEn } from './web-themes.en';

export type WebThemeId = 'liquid' | 'soft' | 'swiss' | 'brutal' | 'pixel' | 'collage' | 'print' | 'glass' | 'gallery' | 'olive';
export type ThemeToken = 'bg' | 'surface' | 'ink' | 'muted' | 'accent' | 'line';
type Palette = Record<ThemeToken, string>;

interface WebTheme {
  id: WebThemeId;
  name: string;
  heading: string;
  fit: string;
  type: string;
  layout: string;
  motion: string;
  displayFont: string;
  radius: string;
  defaultMode: 'light' | 'dark';
  light: Palette;
  dark: Palette;
  paragraphs: string[];
  css?: string;
}

export const themeTokenLabels: { token: ThemeToken; label: string }[] = [
  { token: 'bg', label: '背景' },
  { token: 'surface', label: '内容面' },
  { token: 'ink', label: '正文' },
  { token: 'muted', label: '辅助文字' },
  { token: 'accent', label: '强调' },
  { token: 'line', label: '边界' },
];

export const webThemes: WebTheme[] = [
  {
    id: 'liquid',
    name: '液态玻璃',
    heading: '液态玻璃的折射与形变',
    fit: '交互作品集、轻量阅读器，以及需要区分操作层次的个人网站',
    type: '标题用舒展的系统无衬线字体，胶囊里的短标签保留清楚的字形。',
    layout: '正文和玻璃操作层分开，暖色带经过玻璃时在弧面边缘弯折。',
    motion: '按住菜单左右拖动，触点附近会隆起并拉长，与操作栏融合，松手后回弹。也能点击或用方向键切换。',
    displayFont: 'system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',
    radius: '1.75rem',
    defaultMode: 'light',
    light: { bg: '#E8E8E8', surface: '#FFFFFF', ink: '#292929', muted: '#575757', accent: '#93432D', line: '#A3A3A3' },
    dark: { bg: '#1F1F1F', surface: '#393939', ink: '#F7F7F7', muted: '#D0D0D0', accent: '#EEB394', line: '#777777' },
    paragraphs: [
      'Liquid Glass 用一层清透、会弯折光线的材质承载操作。示例把正文放在平静的背景上，让铜色、银灰与莓红色带穿过下方导航。透过玻璃中心，背景形状和颜色大致保留；到了弧面边缘，色带会被拉弯、压缩。两侧有方向的高光配合细暗边表现厚度，中心保持通透。',
      '在导航上按住并左右拖动，表面会在触点附近隆起，随移动拉长，再与操作栏平滑连在一起，松手后回到原位。这段连续轮廓由有符号距离场的平滑并集生成，连接处不会留下两个圆角矩形叠放的接缝。折射法线也随轮廓改变，所以形变时后面的色带会一起弯折。',
      '背景、弧面折射、轻微色散和触点光照都由原生 WebGL 2 在同一个局部场景里绘制，无需截取网页或加载外部图片。文字与原生单选控件留在 HTML 中，支持点击和方向键切换。弹簧保留当前位置与速度，画面静止后停止绘制。选择减少动态效果时，去掉拉伸和回弹；选择减少透明度或提高对比度时，改用实色控件。浏览器不支持 WebGL 2 时显示 CSS 磨砂版本，没有真实折射。',
    ],
    css: `/* 以下是 DOM 控件与 CSS 回退，不是完整的光学实现。
   真正的弧面折射、SDF 融合和弹簧见 src/scripts/liquid-glass.ts；
   Canvas 只绘制局部背景与材质，文字和单选框留在 HTML。 */
.theme-root .liquid-menu {
  position: relative;
  border: 0;
  border-radius: 999px;
  background: color-mix(in srgb, var(--theme-surface) 18%, transparent);
  backdrop-filter: blur(2px);
  box-shadow: inset 0 1px 0 #ffffffcc,
    inset 0 -1px 0 #ffffff66,
    0 0 0 .5px #00000040;
}
.theme-root [data-optics="webgl"] .liquid-menu {
  /* 材质由后面的 Canvas 绘制，不再叠一层 CSS 玻璃。 */
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;
}
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
  .theme-root .liquid-menu {
    background: var(--theme-surface);
    backdrop-filter: none;
    box-shadow: 0 0 0 1px var(--theme-ink);
  }
}`,
  },
  {
    id: 'soft',
    name: '柔塑浮雕',
    heading: '柔塑浮雕的凸起和凹陷',
    fit: '阅读收藏页、个人仪表盘，或控件不多的简洁界面',
    type: '标题选圆润的无衬线字体，正文用常规字重，保证文字与背景的对比。',
    layout: '阅读便笺从同色底板上凸起，状态槽向内凹，与按钮形成高低区别。',
    motion: '勾选收藏后，按钮从凸起变为内凹，文字同时改为“已收藏”。',
    displayFont: 'system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',
    radius: '1.5rem',
    defaultMode: 'light',
    light: { bg: '#E7E7E7', surface: '#FFFFFF', ink: '#303030', muted: '#595959', accent: '#934331', line: '#858585' },
    dark: { bg: '#303030', surface: '#444444', ink: '#F4F4F4', muted: '#C7C7C7', accent: '#F0B29D', line: '#8B8B8B' },
    paragraphs: [
      '这套风格叫 Neumorphism，也常称为 Soft UI。面板、按钮和底板采用相近的中性灰，同一光照方向上的亮边与暗影表现凸起和凹陷，看起来像从同一块材料里压出界面。玻璃强调前后两层的关系，这里更在意同一表面的高低。',
      '阅读便笺是凸起的，文章类型放在内凹槽里。勾选收藏后，外投影变成内投影，轮廓图标变为实心，文字从“收藏这篇笔记”改为“已收藏”。控件是原生复选框，只改变当前预览，不会保存真实文章的收藏。',
      '做 Soft UI 时，我会留意边界会不会太淡。这个示例保留可见轮廓、深色文字和独立的键盘焦点，阴影不明显时也能认出控件。暗色版减弱了亮边，避免出现白色光晕；提高对比度时则移除柔影，用实体边界区分控件。',
    ],
    css: `.theme-root .soft-raised {
  background: var(--theme-bg);
  border: 1px solid var(--theme-line);
  border-radius: var(--theme-radius);
  box-shadow: -8px -8px 20px var(--theme-surface),
    8px 8px 20px color-mix(in srgb, var(--theme-bg) 72%, black);
}
.theme-root .soft-inset {
  background: var(--theme-bg);
  box-shadow: inset 4px 4px 9px color-mix(in srgb, var(--theme-bg) 72%, black),
    inset -4px -4px 9px var(--theme-surface);
}
@media (prefers-contrast: more) {
  .theme-root :is(.soft-raised, .soft-inset) { box-shadow: none; }
}`,
  },
  {
    id: 'swiss',
    name: '瑞士网格',
    heading: '瑞士网格：用对齐安排版面',
    fit: '设计档案、研究笔记等需要快速浏览内容的网站',
    type: '标题采用粗体无衬线字，正文用常规字重，整页沿用这组字体关系。',
    layout: '左对齐大标题与红色侧栏组成非对称网格，文字共用基线。',
    motion: '状态直接切换，结构主要靠网格交代，少用阴影和漂浮效果。',
    displayFont: '"DM Sans Variable", "PingFang SC", "Microsoft YaHei", sans-serif',
    radius: '0',
    defaultMode: 'light',
    light: { bg: '#FFFFFF', surface: '#EEEEEE', ink: '#242424', muted: '#575757', accent: '#A62F29', line: '#AEAEAE' },
    dark: { bg: '#222222', surface: '#333333', ink: '#F3F3F3', muted: '#C7C7C7', accent: '#EC9F94', line: '#707070' },
    paragraphs: [
      '瑞士国际主义常用网格和无衬线排版组织信息。这套预览把大标题、栏目名、摘要与细线直接排在同一组对齐线上，用位置交代分组。标题也采用无衬线字，与编辑刊物里的宋体标题有所区别；红色区域专门留给侧栏内容。',
      '桌面上，主标题在左，右侧列出“排版、布局、交互”，底部摘要沿着同一条横线排列。换成暗色后，网格结构不变，重新调整红色栏和文字的明暗关系。',
      '窄屏时，侧栏移成底部横栏，主标题可以用完整宽度。这种布局适合内容关系稳定、需要长期浏览的站点。若主要展示作品图像，也可以改用画廊结构，按作品需要保留尺寸差异。',
    ],
    css: `.theme-root .swiss-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 1.5rem;
  border-top: 2px solid var(--theme-ink);
}
.theme-root .swiss-grid h1 {
  font-weight: 700;
  letter-spacing: -.05em;
  line-height: 1.15;
}
.theme-root .swiss-index {
  background: var(--theme-accent);
  color: var(--theme-bg);
}
@media (max-width: 42rem) {
  .theme-root .swiss-grid { grid-template-columns: 1fr; }
}`,
  },
  {
    id: 'brutal',
    name: '新粗野主义',
    heading: '新粗野主义的粗边框与硬阴影',
    fit: '独立开发日志、有个人风格的作品集和小型创意产品',
    type: '无衬线标题用高字重，正文保持朴素易读。',
    layout: '用粗轮廓和硬偏移阴影托起内容块，暖黄标签稍微错位，阅读顺序保持清楚。',
    motion: '按下下方入口时，硬阴影立即收回；展开后可以看按钮的做法。',
    displayFont: '"DM Sans Variable", "PingFang SC", "Microsoft YaHei", sans-serif',
    radius: '0',
    defaultMode: 'light',
    light: { bg: '#EDEDED', surface: '#FFFFFF', ink: '#252525', muted: '#535353', accent: '#E8B153', line: '#252525' },
    dark: { bg: '#262626', surface: '#343434', ink: '#F3F3F3', muted: '#C7C7C7', accent: '#E8B153', line: '#F3F3F3' },
    paragraphs: [
      '新粗野主义沿用 Brutalism 的强边界与直接表达，加入鲜明色块和实体偏移阴影。这个示例采用方角、粗线、高字重与实色表面。暖黄只出现在强调标签和可展开控件上，上面的文字一直用深色。',
      '版面只保留一个主标题、一段摘要和一个展开入口，内容块靠硬阴影显出厚度。按下入口时，控件向阴影偏移的方向移动，阴影同时收回，看起来像按下一块垫高的按钮。',
      '暗色版需要另外检查线条和硬阴影能否分清。到了手机上，可以缩短阴影的偏移距离，但要保留完整的触摸面积。键盘焦点、文字之间的空隙和清楚的标题层级也都要保留。',
    ],
    css: `.theme-root .brutal-panel {
  background: var(--theme-surface);
  border: 3px solid var(--theme-ink);
  border-radius: 0;
  box-shadow: 7px 7px 0 var(--theme-ink);
}
.theme-root .brutal-control {
  background: var(--theme-accent);
  color: #252525;
  border: 2px solid var(--theme-ink);
  box-shadow: 4px 4px 0 var(--theme-ink);
}
.theme-root .brutal-control:active {
  translate: 4px 4px;
  box-shadow: none;
}
@media (prefers-reduced-motion: reduce) {
  .theme-root .brutal-control:active { translate: none; }
}`,
  },
  {
    id: 'pixel',
    name: '复古像素',
    heading: '复古像素的小窗口',
    fit: '创意编码、独立游戏开发笔记，或带一点怀旧感的个人网站',
    type: '等宽字体用于文件名与代码，中文仍用易读的系统字体。',
    layout: '笔记放进桌面小窗口，配上像素图形、阶梯边缘和短状态行。',
    motion: '画面保持静止，省去闪烁光标和跑马灯，方便停下来阅读。',
    displayFont: 'system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',
    radius: '0',
    defaultMode: 'dark',
    light: { bg: '#E1E1E1', surface: '#F7F7F7', ink: '#332C24', muted: '#62584C', accent: '#8A481B', line: '#5D5144' },
    dark: { bg: '#292622', surface: '#37312B', ink: '#F2EDE7', muted: '#C9BDAE', accent: '#F0B65B', line: '#B29C80' },
    paragraphs: [
      'Pixel Art 用有限的颜色、离散几何和像素边界形成自己的样子。这个示例把个人笔记放进桌面小窗口，配上琥珀色像素图形和分段边缘。正文与中文标题保留易读的常规字体，怀旧感主要由窗口和图形承担。',
      '窗口标题是文件名式标签，代码区域用等宽字，角上的方块只是图示，没有关闭功能。像素图形由小尺寸 SVG 直接绘制，保留硬边缘，无需外部图片，也避免了把普通图片放大后的模糊感。',
      '预览保持静止，没有自动滚动、光标闪烁和开机噪点。小屏优先保留标题与代码，缩小外围桌面的留白。长篇文章可以只在索引或开头使用这种窗口样式，正文另留足够的阅读空间。',
    ],
    css: `.theme-root .pixel-window {
  background: var(--theme-surface);
  border: 2px solid var(--theme-line);
  box-shadow: 4px 0 0 var(--theme-line), 0 4px 0 var(--theme-line),
    -4px 0 0 var(--theme-line), 0 -4px 0 var(--theme-line),
    7px 7px 0 color-mix(in srgb, var(--theme-ink) 24%, transparent);
}
.theme-root .pixel-icon {
  image-rendering: pixelated;
  shape-rendering: crispEdges;
}
.theme-root .pixel-window :is(code, .filename) {
  font-family: ui-monospace, monospace;
}`,
  },
  {
    id: 'collage',
    name: '暖色拼贴',
    heading: '暖色拼贴：两张错位的纸片',
    fit: '记录设计过程、写创作随笔，或归档灵感与小作品',
    type: '纸片标题用宋体和 Instrument Serif，说明用无衬线字，代码用等宽字。',
    layout: '两张不同大小的纸片略微错开，按固定顺序安排标题与代码。',
    motion: '纸片静止摆放，通过角度和交叠表现手作感，不自动晃动或漂移。',
    displayFont: '"Instrument Serif", "Songti SC", "STSong", serif',
    radius: '.15rem',
    defaultMode: 'light',
    light: { bg: '#D9B7BE', surface: '#FFFFFF', ink: '#38262A', muted: '#62434B', accent: '#833C39', line: '#AD7C86' },
    dark: { bg: '#302629', surface: '#413137', ink: '#F8EEF0', muted: '#D2B8BE', accent: '#E8AE9A', line: '#8F686F' },
    paragraphs: [
      '这套构图借鉴了拼贴和 Anti-Polish：纸片稍微旋转，标题带一点手作感，信息按正常顺序排列。背景是偏暖的玫瑰灰，纸面选中性白或深玫瑰炭灰，保留干净的表面。',
      '设计便笺占主要位置，旁边叠一张酒红色代码纸片，一小条贴纸点出前后层次。旋转角度是固定的，文字用真实 HTML 排版。读者先看标题，再看代码，最后读到归档短注。',
      '桌面上可以让纸片略微交叠，窄屏时就收小角度和重叠面积，给文字腾出空间。这种布局适合讲创作过程，密集表格则不太合适。错位固定两三处就够了，纸片不需要动。',
    ],
    css: `.theme-root .collage-paper {
  position: relative;
  padding: 1.5rem;
  background: var(--theme-surface);
  border: 1px solid var(--theme-line);
  box-shadow: 0 8px 20px #00000018;
  rotate: -3deg;
}
.theme-root .collage-code {
  position: relative;
  background: #7D3342;
  color: #FFFFFF;
  rotate: 5deg;
}
@media (max-width: 30rem) {
  .theme-root .collage-paper { rotate: -1deg; }
  .theme-root .collage-code { rotate: 2deg; }
}`,
  },
  {
    id: 'print',
    name: '编辑刊物',
    heading: '编辑刊物的字体与文章索引',
    fit: '以长文为主的博客、独立刊物和设计评论网站',
    type: '标题搭配 Instrument Serif 与中文宋体，正文统一用无衬线字体。',
    layout: '用大标题引出正文，旁边安排紧凑索引，主要靠字号区分层级。',
    motion: '链接和选中状态立即给出反馈，正文区域保持不动。',
    displayFont: '"Instrument Serif", "Songti SC", "STSong", serif',
    radius: '.25rem',
    defaultMode: 'light',
    light: { bg: '#FFFFFF', surface: '#F1F1F1', ink: '#252525', muted: '#5C5C5C', accent: '#A2342B', line: '#D0D0D0' },
    dark: { bg: '#242424', surface: '#2F2F2F', ink: '#F3F3F3', muted: '#C0C0C0', accent: '#EFAB9F', line: '#525252' },
    paragraphs: [
      '以文章为主的网站，我会先调整标题和段落的关系。这套配色用白色、中性灰和少量朱红，保持清楚的黑白反差。链接、当前栏目与重点信息才用朱红，正文沿用常规文字色。',
      '英文标题采用本站已加载的 Instrument Serif，中文搭配宋体，给标题一点刊物的感觉。摘要、日期与正文用无衬线字体，方便连续阅读。',
      '一篇主文章配一组次要目录，摘要直接排在页面上，由文字撑起版面。这种结构适合阅读为主的站点。作品图片多时，可以另外留出展示区域，避免整页都变成密集的文字索引。',
    ],
  },
  {
    id: 'glass',
    name: '暖灰玻璃',
    heading: '暖灰玻璃的单层导航',
    fit: '交互笔记、偏工具用途的博客和个人工作台',
    type: '统一使用系统无衬线字体，用字重与行高区分导航、标题和摘要。',
    layout: '文章放在实色表面上，一层半透明导航浮在上方。',
    motion: '按下就回应；浮层改变目标时，从当前位置接着移动。',
    displayFont: 'system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',
    radius: '1.25rem',
    defaultMode: 'light',
    light: { bg: '#E6E6E6', surface: '#FFFFFF', ink: '#2C2C2C', muted: '#5D5D5D', accent: '#9A4D37', line: '#C5C5C5' },
    dark: { bg: '#292929', surface: '#373737', ink: '#F3F3F3', muted: '#C9C9C9', accent: '#EDB197', line: '#626262' },
    paragraphs: [
      '这套方案用材质区分文章与浮动操作。中性灰底色上，文章放在实色表面，只有导航采用半透明材质。前后层次能看清，读正文时也不用隔着多层玻璃。',
      '层次和即时反馈借鉴了 Apple 界面，网页上的磨砂感则通过 backdrop-filter 近似实现，与 iOS 原生 Liquid Glass 的光学效果有区别。背景简单时，轻度模糊配合清楚轮廓与柔和投影，就足以标出浮层的位置。',
      '圆角主要用于可触摸控件，按控件用途选择大小。导航切换时可以平滑移动，正文保持原来的尺寸。用户选择减少透明度，或者浏览器不支持背景模糊时，浮层改用实色背景，保留正常的阅读和操作。',
    ],
  },
  {
    id: 'gallery',
    name: '炭黑画廊',
    heading: '炭黑画廊：大幅作品与简短说明',
    fit: '设计作品集，以及创意编程和视觉案例展示',
    type: 'DM Sans 搭配系统中文无衬线字体，通过字号和字重突出标题。',
    layout: '主作品占大面积，旁边只留简短说明，外围导航收小。',
    motion: '详情从点击位置附近展开，关闭时沿原路收回，浏览中不自动漂浮。',
    displayFont: '"DM Sans Variable", "PingFang SC", "Microsoft YaHei", sans-serif',
    radius: '.6rem',
    defaultMode: 'dark',
    light: { bg: '#F2F2F2', surface: '#FFFFFF', ink: '#252525', muted: '#606060', accent: '#7C3349', line: '#D5D5D5' },
    dark: { bg: '#252323', surface: '#302C2C', ink: '#F4F2F2', muted: '#C8BDBD', accent: '#E6A6B5', line: '#5A4C50' },
    paragraphs: [
      '浏览作品集时，读者通常先看作品，再决定要不要读过程。炭黑画廊把最大的一块空间留给主作品，标题和说明各自占一个位置。暗色选偏暖的炭灰，让作品在不带深蓝倾向的背景上展示。',
      '作品分类和当前状态用低饱和莓红标示。作品图像保留各自的颜色，网站其余部分减少用色，避免与作品互相争抢注意力。',
      '暗色标题可以稍微收低白色的亮度，辅助文字则要亮到足够辨认。亮色版重新调整明暗，保留大幅作品配简短说明的结构。打开详情时可以让位置变化清楚一些，浏览作品时让图片保持静止。',
    ],
  },
  {
    id: 'olive',
    name: '橄榄手记',
    heading: '橄榄手记的索引和代码',
    fit: '前端技术笔记、组件说明与日常开发记录',
    type: '标题和正文沿用无衬线字体，代码与参数改用等宽字体。',
    layout: '紧凑索引放在主文章旁边，首屏就能看到内容结构和代码示例。',
    motion: '目录定位、状态切换直接响应，只有位置变化难以理解时再加动效。',
    displayFont: '"DM Sans Variable", "PingFang SC", "Microsoft YaHei", sans-serif',
    radius: '.35rem',
    defaultMode: 'light',
    light: { bg: '#F4F4F4', surface: '#FFFFFF', ink: '#2E3228', muted: '#626854', accent: '#596534', line: '#CFD2C8' },
    dark: { bg: '#272A24', surface: '#33372D', ink: '#EFF1EA', muted: '#BBC3AD', accent: '#C2CB96', line: '#56604A' },
    paragraphs: [
      '橄榄手记按技术内容的阅读方式组织页面。灰白底色上配偏黄的橄榄色，用紧凑索引把文章、目录和代码联系起来。',
      '正文和标题使用无衬线字，代码、参数以及需要对齐的数据使用等宽字。索引当前条目同时改变颜色和字重，选中状态更容易分辨。手机上，索引收成横向内容提示，文章占完整宽度。',
      '经常写作、反复回查笔记的站点，可以先考虑这套结构。稳定的段落层级和可定位目录方便找内容，容易复制的代码便于再次使用；入场动画可以简单一些。橄榄色则用来帮助辨认网站。',
    ],
  },
];

export function getThemes(locale: Locale): WebTheme[] {
  if (locale !== 'en') return webThemes;
  return webThemes.map((theme) => {
    let next = 0;
    const css = theme.css?.replace(/\/\*[\s\S]*?\*\//g, (comment) => (/[\u4e00-\u9fff]/.test(comment) ? cssCommentsEn[next++] : comment));
    return { ...theme, ...webThemesEn[theme.id], css };
  });
}

export function getTokenLabels(locale: Locale) {
  return locale === 'en' ? themeTokenLabels.map(({ token }) => ({ token, label: themeTokenLabelsEn[token] })) : themeTokenLabels;
}
