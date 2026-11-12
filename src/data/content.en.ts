// English text for the articles in content.ts.
// Structure, ids, dates and code samples come from content.ts; theme sections come from web-themes.en.ts.

interface SectionText { heading: string; paragraphs: string[]; }

export const articlesEn: Record<string, {
  category: string;
  title: string;
  summary: string;
  readTime: string;
  tags: string[];
  /** Sections without a theme, in order. */
  sections: SectionText[];
}> = {
  'website-design-studies': {
    category: "Site design",
    title: "From Apple to Nike: four interactive site designs",
    summary: "A desk lamp that lights up as you scroll, a workspace you can operate, a bowl forming on a wheel and running routes that unfold sideways. Four full previews, with every graphic drawn in code.",
    readTime: "8 min read",
    tags: ["Site design", "Scroll animation", "Interaction"],
    sections: [
      {
        heading: "Designing a whole page includes how it moves",
        paragraphs: [
          "In a screenshot, a company site looks like colors, type and a few blocks of text and images. You only find out when the product comes closer, how the next section joins on and which part of the picture a button changes once you scroll. So this time I designed how each page moves together with how it looks.",
          "I made four full-page previews, borrowing the way the Apple, Linear, Aesop and Nike sites arrange a page. All four brands are fictional: the desk lamp Oriel, the collaboration tool Relay, the pottery studio Still and the running feature Stride. The pages contain no photographs. The lamp, the bowls, the track and the route maps are drawn in CSS and SVG.",
          "Each section below links to its own page. Inside a preview, a small toolbar at the bottom right switches between designs or returns to this article, so it stays out of the brand's navigation. The image on each link is a screenshot of the real page. You have to open it to see what scrolling and clicking do.",
        ],
      },
      {
        heading: "Apple style: a lamp that lights up as you scroll",
        paragraphs: [
          "Oriel is a fictional desk lamp with a round head, a thin stem and a round base, all drawn in CSS. The first screen is an unlit ring that fills the view. As you scroll, the lamp turns on, the camera pulls back to show the whole lamp, and the title appears last. Scrolling sets the progress: stop and the picture stops, scroll back and the lamp dims again.",
          "Next comes a small room where you can adjust the light. Drag the color temperature and brightness and the wall, the desk and the book spines change color with them. You can also pick one of three presets: Reading, Focus and Night. The design section pins the lamp in view. As you scroll, the head turns to its side and three notes light up in turn. The shell comes in moon white, graphite, clay and moss, and switching changes every lamp on the page.",
          "The specs count up to their values, and the dial and the sky in the detail cards play only while they are on screen. I made up the product name, the specs and the copy for this exercise.",
        ],
      },
      {
        heading: "Linear style: software large enough to operate",
        paragraphs: [
          "A collaboration tool's site has to explain how work goes once the software is open. Relay's headline rises line by line, followed by a workspace made of a sidebar, a task area and a detail panel. It starts tilted back, flattens to face you as you scroll, and the task rows settle in one at a time.",
          "You can switch between the list and the board, select different tasks and click 'Mark as done'. The done state updates in both layouts. On the board the task moves to the Done column, and the counts and the progress bar change with it. The move is animated, so you can see which column the task came from.",
          "Further down, one sentence brightens character by character as you scroll. The line beside the activity log draws itself along with your reading position, and the bars in the cycle plan open one after another. Everything happens in a local demo that resets on refresh. Nothing asks you to sign up or submit personal information.",
        ],
      },
      {
        heading: "Aesop style: giving the making some time",
        paragraphs: [
          "Still is a fictional pottery studio. The English headline runs down the left, and on the right a wheel turns with a lump of clay on it. Scroll down and the clay widens, opens and ends up as a bowl. Scroll back and it closes into a lump again. Every transition on this page is slower than on the other three.",
          "The catalogue puts the shape, the selector and the usage notes together. Switch between the shallow bowl, the low-rim plate and the dark-glaze bowl and the drawing changes to the matching outline and glaze, with the text beside it. All three pieces are side views drawn in SVG.",
          "The second half is about making. A firing curve draws itself as you read: it climbs from loading to 1230 degrees, holds, then cools. After that come the three steps of throwing, trimming and firing, and questions about use and care. The layout uses a limestone background, a grey-green footer, Songti for Chinese and a serif for English.",
        ],
      },
      {
        heading: "Nike style: lane lines, big type and three routes",
        paragraphs: [
          "Stride opens with six orange-red lane lines on black. They draw themselves one after another when the page loads, and the big type cuts in from below. Keep scrolling and the lines and the text move away at different speeds. Below is an orange-red band where two rows of type slide in opposite directions as you scroll.",
          "In the middle section, vertical scrolling drives horizontal movement. Three route maps (track, streets and running together) enter the same view in turn. As each arrives, its route draws from start to finish and the text appears line by line. The buttons at the top jump straight to a scene.",
          "A progress ring sits beside the checklist. It advances one step for each item you tick, and the whole block turns black when all three are done. The numbers in the notes count up when they come into view. Archivo Black is used only for the big English type. Chinese text relies on bold weights for hierarchy.",
        ],
      },
      {
        heading: "Stop, then scroll back",
        paragraphs: [
          "Once a preview is open, stop halfway through a transition and scroll back. The lamp should dim with the progress and the bowl should close into a lump of clay. The running feature should return to the previous scene the way it came. When you switch a task, a finish or a piece, check that what changed is the thing you just picked.",
          "The motion uses native CSS, the Web Animations API and requestAnimationFrame called on demand, with no animation library. The script only writes the scroll position into two CSS variables, and each page's styles decide what moves. Looping decoration pauses when it leaves the view. With 'Reduce motion' on, the pinned sections show their finished state, the running scenes stack in order, and the buttons, the catalogue and the task actions still work.",
          "The four previews do not load the blog's theme script, so each keeps its own look. Ordinary links connect the article and the pages. The bottom right corner always has a way back to the article, and you can share the address of any single preview.",
        ],
      },
    ],
  },
  'web-theme-design': {
    category: "Theme design",
    title: "Ten web themes: notes on color, layout and implementation",
    summary: "Ten themes, including Liquid Glass, Soft Relief, Editorial and Olive Journal, each with its own colors, type, layout, material and interaction. Switch each preview between light and dark, and read the design choices and CSS variables.",
    readTime: "20 min read",
    tags: ["Theme design", "CSS", "Design Tokens"],
    sections: [
      {
        heading: "Put the content in first, then pick a theme",
        paragraphs: [
          "When I make a web theme I usually start by putting in a real article, a block of code and a project preview, then ask what a reader should notice first. A blog that is written regularly needs articles to be easy to find. A portfolio shows the design first. A technical journal has to be easy to look things up in. Different uses give a page a different reading order.",
          "Changing only the background and button colors usually leaves the order of importance where it was. A site whose type has clear roles and whose reading order is clear stays recognizable with very little color.",
          "All ten themes are for design and code content. They try different materials, type, grids and edges, plus pixel and collage compositions. Each preview switches between light and dark on its own, and expands to show reusable CSS variables. Switching affects only that preview and leaves the blog theme alone. None of the ten backgrounds uses blue, navy or cream.",
        ],
      },
      {
        heading: "Name theme variables by role",
        paragraphs: [
          "When I write CSS I name colors by what they do. The ten themes share six roles: background, surface, body text, secondary text, accent and edge. Components refer to the matching variable, so switching themes means replacing those six values in one place, with no hunt for hard-coded colors.",
          "To use the styles, add the theme-root class to a container, choose a theme with data-design and choose light or dark with data-mode. Put the variables shown under each preview together with the base styles below. You need to load the font files in your own project. If a font is missing, the browser picks a fallback from the font stack.",
          "The ten themes share variable names and keep their own structures. Liquid Glass has a shared control layer, Soft Relief uses inner and outer shadows, the Swiss grid depends on alignment and Neo-Brutalism uses hard edges. Then there are the pixel window, the collage papers, and the different layouts of Editorial, Warm Grey Glass, Charcoal Gallery and Olive Journal. The corner radius of containers, buttons and code areas can each be set separately.",
        ],
      },
      {
        heading: "Dark mode needs its own light and shade",
        paragraphs: [
          "Shadows that show clearly on a light background often fade on a dark one. There you can adjust surface lightness, outlines and spacing so buttons, code blocks and floating layers still read as separate.",
          "The accent color needs a second version for dark backgrounds too. A deep vermilion that is clear on a light page can be too dark on charcoal, so I used a brighter, softer counterpart. I aim for a contrast ratio of at least 4.5:1 for body text and check large text against 3:1. Text on glass has to be checked against the background as it is composited. The contrast of two separate swatches does not tell you the final result.",
          "In dark mode the order of importance should match the light version, while the color values can change. I look at body text and background first, then secondary text, links, focus outlines and selected states. A selected item also needs a cue in its text, weight or shape so it is easy to tell apart.",
        ],
      },
      {
        heading: "Feedback first, then material and motion",
        paragraphs: [
          "I start with a slight response on press so that a state change is easy to understand, and only then think about how a panel opens. When someone clicks repeatedly, the interface should respond at once each time. If the motion has to keep its current position and velocity, I use a spring whose target can change midway. Ordinary color changes need nothing more than the existing styles.",
          "For a frosted navigation bar, write a solid base style first and add the translucent material when the browser supports backdrop blur. Liquid Glass also refracts the background at its curved edge, deforms its outline around the touch point and joins shapes smoothly where they merge. The demo above computes these effects in a local WebGL scene. The CSS backdrop-filter fallback gives only a frosted look, without the same optics.",
          "Reduced transparency, increased contrast and reduced motion each need their own handling. With reduced motion, remove the stretch and the bounce and keep the selected state clear. When someone chooses solid colors or stronger contrast, they should still be able to read and operate the page.",
        ],
      },
      {
        heading: "Read it on different screens",
        paragraphs: [
          "Put a long title, some code and a real summary into the page. Check the line breaks on a phone, operate the controls with a keyboard and stretch the window to a large screen. Crowding or empty space that a screenshot hides often shows up when you read the page. A wide screen can use more space, but font size and content do not have to scale up with it.",
          "I pay particular attention to the distance between the body and the table of contents. If the outer grid gives one column a lot of space while the body inside it has a small max-width, the contents list can end up far away at the other end of the column. It works best to lay out the body, the code and the contents on the same set of column widths, then move the secondary content once a narrow screen becomes a single column.",
          "If you need to separate a control layer from the content, try Liquid Glass. If the feel of pressing matters, look at Soft Relief. The Swiss grid is easy to scan, and Neo-Brutalism suits direct, strong statements. Retro Pixel fits creative coding or nostalgic content, and Warm Collage fits writing about a creative process.",
          "When articles come first, Editorial is the better fit. If you only need one lightly frosted floating layer, use Warm Grey Glass. Charcoal Gallery leaves the space to the work, and Olive Journal suits technical content that is read and revisited often.",
        ],
      },
    ],
  },
  'natural-web-motion': {
    category: "Motion",
    title: "Web motion: from press feedback to spring animation",
    summary: "Starting from a button's press feedback, notes on changing direction mid-animation, the path a panel opens along, and reduced motion.",
    readTime: "4 min read",
    tags: ["Motion", "JavaScript", "Interaction design"],
    sections: [
      {
        heading: "A button should respond the moment it is pressed",
        paragraphs: [
          "The interface should give some feedback as soon as a finger presses a button. If the animation waits for release, the gap with no response makes people wonder whether the tap registered, and a nicer curve does not make up for it.",
          "You can put a slight scale on :active: shrink quickly on press and recover slowly on release. A few percent is enough, and the button stays where it is.",
        ],
      },
      {
        heading: "Changing direction mid-animation",
        paragraphs: [
          "Someone may click again to close a panel before it has finished opening. The interface should turn toward the closed state from wherever it is, so the action takes effect at once.",
          "A CSS transition handles simple state changes, because it continues from the currently rendered value. When the target changes repeatedly and you want to keep the velocity, a spring model fits better: store position and velocity as state and change the target whenever you need to.",
          "When no gesture momentum is involved, I usually start from critical damping. It approaches the target smoothly with no extra bounce.",
        ],
      },
      {
        heading: "Open and close along the same path",
        paragraphs: [
          "When a card's details open, the panel can expand from near the place that triggered it. A panel that comes up from the bottom goes back to the bottom when it closes. Using the same path both ways makes it easier for a reader to remember where the content lives.",
          "When the navigation changes, I also move one selected background to the new section. Compared with each section flashing separately, continuous movement makes it clearer what is selected and pulls a little less attention away from reading.",
        ],
      },
      {
        heading: "With less motion, the state still has to be clear",
        paragraphs: [
          "Handle prefers-reduced-motion from the moment you start writing motion. When someone chooses reduced motion, replace movement, scaling and springs with a direct switch or a short fade, and keep feedback that makes the state visible.",
          "Check whether each animation helps people understand the action. If it only makes the screen busier, shrink it or delete it.",
        ],
      },
    ],
  },
  'css-layout-rhythm': {
    category: "UI design",
    title: "Setting the reading order with spacing and hierarchy",
    summary: "Turn common spacing into a few variables, then place headings, body text and cards, and see how the page becomes easier to read.",
    readTime: "4 min read",
    tags: ["CSS", "Typography", "Layout"],
    sections: [
      {
        heading: "Write down the reading order before laying out type",
        paragraphs: [
          "I write down the order a reader will follow after opening the page, and only then choose fonts. A personal blog's home page, for example, first has to say what the blog is about, then help people find an article they care about.",
          "Font size, body width and the distance between groups of content all affect that order together. When a heading gets larger, you usually have to tighten its letter spacing and adjust the space between it and the body, so these values need to be looked at together.",
        ],
      },
      {
        heading: "Set a few steps for common spacing",
        paragraphs: [
          "Set a few common spacing steps and let elements take their values from them. Keep related content close and leave more space between different groups. Use the same spacing within one level where you can, and readers can tell which items belong together.",
          "Variables can be named by use or by scale. It is enough that components can use them and that they make sense during maintenance.",
        ],
      },
      {
        heading: "On narrow screens, rearrange the secondary content",
        paragraphs: [
          "On a phone you can move the desktop sidebar below the body, or tighten the size of project thumbnails. Headings and summaries still have to be readable, so they cannot shrink in proportion with everything else.",
          "For a flexible Grid column, minmax(0, 1fr) stops long content from stretching its cell. Use clamp() to keep font size and spacing within a range.",
        ],
      },
    ],
  },
  'from-design-to-browser': {
    category: "Front-end development",
    title: "When I get a design file, I build the page structure first",
    summary: "I usually break down the content structure first, then collect the style variables that repeat, and check interaction last. Notes on the order of work when turning a static design into a web page.",
    readTime: "5 min read",
    tags: ["Astro", "TypeScript", "Workflow"],
    sections: [
      {
        heading: "Separate navigation, articles and decoration first",
        paragraphs: [
          "I start by putting the content of the design into the browser and working out where the navigation, the articles and the decoration each belong. Once the structure is settled, I adjust visual details such as shadows and corner radius.",
          "Use a link to open an article and a button for a local action. Choosing the semantic element that fits the purpose first saves the step of building the shape out of divs and adding behavior afterwards.",
        ],
      },
      {
        heading: "Turn repeated styles into variables",
        paragraphs: [
          "Background, text color, borders and content width come up in many components. I put these values into CSS custom properties, so switching a theme or fine-tuning a style means changing one place.",
          "When splitting components, I also look at where repetition already exists. The navigation shared by the home page and article pages can stand alone. A paragraph that appears once and has a simple structure can stay in the page.",
        ],
      },
      {
        heading: "Describe article content with types",
        paragraphs: [
          "Describe the article data with a TypeScript interface, and the list and the reading page can read the same content. Title, summary, date and body are maintained in one place, and each page takes what it needs.",
          "A static blog can start with data kept in the project and static routes. Once there are many articles, or you need an editing workflow, consider Markdown content collections or another way of managing content.",
        ],
      },
      {
        heading: "Check the page with a keyboard and at phone width",
        paragraphs: [
          "Shrink the window to phone width, move through the navigation with the keyboard, open an article and close a dialog, and see where focus returns. Doing it once often turns up problems you missed when comparing against the screenshot.",
          "After the look matches, I read the article through on a real device and tap every control.",
        ],
      },
    ],
  },
};

/** Chinese sample text inside code blocks, and its English replacement. */
export const codeTextEn: [string, string][] = [
  ['设计与代码笔记', 'Notes on design and code'],
  ['从真实内容开始设计。', 'Start the design from real content.'],
  ['最新文章', 'Latest notes'],
  ['一篇实践笔记', 'A practical note'],
  ['先让内容可以被阅读，再调整它的外观。', 'Make the content readable first, then adjust how it looks.'],
];
