import type { Locale } from '../i18n';

export const siteStudies = [
  {
    id: 'apple',
    brand: 'Oriel',
    name: 'Apple 式产品官网',
    shortName: '产品',
    href: '/previews/apple/',
    title: '一盏灯，从点亮到看清每个细节',
    description: '虚构桌灯 Oriel 的产品页。灯体由 CSS 绘制，滚动点亮并拉远，可以调色温与亮度、转动灯头、切换四种外壳。',
    cover: '/images/site-studies/cover-apple.jpg',
    background: '#000000',
    ink: '#f5f5f7',
    accent: '#2997ff',
  },
  {
    id: 'linear',
    brand: 'Relay',
    name: 'Linear 式软件官网',
    shortName: '软件',
    href: '/previews/linear/',
    title: '直接打开工作台，把一件事做完',
    description: '虚构协作工具 Relay 的官网。工作台随滚动放平，可以切换列表与看板、打开任务详情并标记完成。',
    cover: '/images/site-studies/cover-linear.jpg',
    background: '#08090a',
    ink: '#f0f0f1',
    accent: '#b5aedb',
  },
  {
    id: 'aesop',
    brand: 'Still',
    name: 'Aesop 式品牌官网',
    shortName: '器物',
    href: '/previews/aesop/',
    title: '一团泥、三件器物与慢下来的阅读',
    description: '滚动把轮盘上的泥团拉成一只碗，器物目录切换手绘器形，烧成曲线随阅读画出，介绍一间陶器工作室。',
    cover: '/images/site-studies/cover-aesop.jpg',
    background: '#e8e6e0',
    ink: '#302e2a',
    accent: '#69694e',
  },
  {
    id: 'nike',
    brand: 'Stride',
    name: 'Nike 式运动专题',
    shortName: '运动',
    href: '/previews/nike/',
    title: '跑道、大字，与沿着滚动展开的路',
    description: '画出来的跑道线、对向滑动的字幕带、滚动驱动的三段路线图与带进度环的出门清单，构成一页跑步专题。',
    cover: '/images/site-studies/cover-nike.jpg',
    background: '#ffffff',
    ink: '#111111',
    accent: '#ed4526',
  },
] as const;

export type SiteStudyId = typeof siteStudies[number]['id'];
export const siteStudyArticleHref = '/articles/website-design-studies/';

const siteStudiesEn: Record<SiteStudyId, { name: string; shortName: string; title: string; description: string }> = {
  apple: {
    name: "Apple-style product site",
    shortName: "Product",
    title: "One lamp, from switching on to every detail",
    description: "A product page for the fictional desk lamp Oriel. The lamp is drawn in CSS. It lights up and pulls back as you scroll, and you can set its color temperature and brightness, turn its head and switch between four finishes.",
  },
  linear: {
    name: "Linear-style software site",
    shortName: "Software",
    title: "Open the workspace and finish one task",
    description: "A site for the fictional collaboration tool Relay. The workspace flattens as you scroll, and you can switch between list and board, open task details and mark a task done.",
  },
  aesop: {
    name: "Aesop-style brand site",
    shortName: "Objects",
    title: "A lump of clay, three pieces and slower reading",
    description: "A site for a pottery studio. Scrolling pulls a lump of clay on the wheel into a bowl, the catalogue switches between drawn shapes, and a firing curve draws itself as you read.",
  },
  nike: {
    name: "Nike-style sports feature",
    shortName: "Sport",
    title: "A track, big type and routes that unfold as you scroll",
    description: "A one-page running feature with drawn lane lines, bands of type sliding in opposite directions, three route maps driven by scrolling and a checklist with a progress ring.",
  },
};

export function getSiteStudies(locale: Locale) {
  return siteStudies.map((study) => (locale === 'en'
    ? { ...study, ...siteStudiesEn[study.id], cover: study.cover.replace('.jpg', '-en.jpg') }
    : { ...study, href: `/zh${study.href}` }));
}
