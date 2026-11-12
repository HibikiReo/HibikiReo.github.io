// English text for the ten themes in web-themes.ts. Palettes, fonts and CSS stay in that file.

export const themeTokenLabelsEn: Record<string, string> = {
  bg: "Background",
  surface: "Surface",
  ink: "Body text",
  muted: "Secondary text",
  accent: "Accent",
  line: "Edge",
};

/** Replacements for the Chinese comments in the Liquid Glass CSS, in order. */
export const cssCommentsEn = [
  "/* DOM controls and the CSS fallback only; the full optics are elsewhere.\n   Curved refraction, SDF merging and the spring are in src/scripts/liquid-glass.ts.\n   The canvas draws the local background and material. Text and radio inputs stay in HTML. */",
  "/* The canvas behind draws the material, so no CSS glass is layered on top. */",
];

export const webThemesEn: Record<string, {
  name: string;
  heading: string;
  fit: string;
  type: string;
  layout: string;
  motion: string;
  paragraphs: string[];
}> = {
  liquid: {
    name: "Liquid Glass",
    heading: "Liquid Glass: refraction and deformation",
    fit: "Interactive portfolios, light readers and personal sites that need to separate the control layer",
    type: "Headings use a relaxed system sans-serif. Short labels inside the capsule keep clear letterforms.",
    layout: "Body text and the glass control layer are separate. Warm color bands bend at the curved edge as they pass under the glass.",
    motion: "Hold the menu and drag sideways. The surface rises and stretches near the touch point, merges with the bar, and springs back on release. Clicking and arrow keys work too.",
    paragraphs: [
      "Liquid Glass carries controls on a clear material that bends light. The demo puts the body text on a calm background and runs copper, silver-grey and berry bands under the navigation below. Through the center of the glass the shapes and colors of the background mostly survive. At the curved edge the bands are bent and compressed. Directional highlights on both sides and a thin dark edge suggest thickness, while the center stays clear.",
      "Hold the navigation and drag sideways. The surface rises near the touch point, stretches as it moves, joins smoothly with the bar and returns to its place on release. This continuous outline comes from a smooth union of signed distance fields, so the join shows no seam of two stacked rounded rectangles. The refraction normals change with the outline, so the bands behind bend together with the deformation.",
      "The background, curved refraction, slight dispersion and touch-point lighting are drawn by native WebGL 2 in one local scene, with no page capture and no external images. Text and native radio controls stay in HTML and support clicking and arrow keys. The spring keeps its current position and velocity, and drawing stops once the picture is still. With reduced motion, the stretch and bounce are removed. With reduced transparency or increased contrast, solid controls are used. Where the browser lacks WebGL 2, a frosted CSS version appears, without real refraction.",
    ],
  },
  soft: {
    name: "Soft Relief",
    heading: "Soft Relief: raised and pressed surfaces",
    fit: "Reading lists, personal dashboards, or simple interfaces with few controls",
    type: "Headings use a rounded sans-serif. Body text uses a regular weight to keep contrast with the background.",
    layout: "The reading note rises from a base of the same color. The status slot is pressed in, which sets it apart from the button.",
    motion: "Tick Save and the button changes from raised to pressed, while the label changes to 'Saved'.",
    paragraphs: [
      "This style is called Neumorphism, or Soft UI. Panels, buttons and the base use similar neutral greys, and a light edge and a dark shadow from one light direction show what is raised and what is pressed in, as if the interface were stamped from a single piece of material. Glass is about the relation between a front and a back layer. Here the concern is the height of one surface.",
      "The reading note is raised and the article type sits in a pressed slot. Tick Save and the outer shadow becomes an inner shadow, the outline icon becomes solid, and the label changes from 'Save this note' to 'Saved'. The control is a native checkbox that changes only this preview. It does not save any real article.",
      "With Soft UI I watch for edges that get too faint. This demo keeps a visible outline, dark text and a separate keyboard focus, so controls can be recognized where the shadow is weak. The dark version tones down the light edge to avoid a white glow. With increased contrast, the soft shadows are removed and solid borders separate the controls.",
    ],
  },
  swiss: {
    name: "Swiss Grid",
    heading: "Swiss Grid: layout by alignment",
    fit: "Design archives, research notes and other sites where content is scanned quickly",
    type: "Headings use a bold sans-serif and body text a regular weight. The whole page keeps this pairing.",
    layout: "A left-aligned headline and a red sidebar form an asymmetric grid. The text shares baselines.",
    motion: "States switch directly. The grid explains the structure, with little shadow or floating.",
    paragraphs: [
      "The Swiss International Style often organizes information with a grid and sans-serif type. This preview sets the headline, section names, summaries and hairlines on one set of alignment lines and lets position explain the grouping. The headline is sans-serif too, which separates it from the Songti headline in Editorial. The red area is kept for the sidebar.",
      "On desktop the headline sits on the left, the right lists 'Type, Layout, Interaction', and the summaries at the bottom run along the same horizontal line. In dark mode the grid stays the same, and the light and shade of the red column and the text are adjusted again.",
      "On a narrow screen the sidebar moves to a bar at the bottom and the headline gets the full width. This layout suits sites whose content relations are stable and browsed over a long time. If the site mainly shows images of work, a gallery structure that keeps size differences as the work needs is another option.",
    ],
  },
  brutal: {
    name: "Neo-Brutalism",
    heading: "Neo-Brutalism: thick borders and hard shadows",
    fit: "Indie dev logs, portfolios with a personal style and small creative products",
    type: "Sans-serif headings use a heavy weight. Body text stays plain and readable.",
    layout: "Thick outlines and a hard offset shadow lift the content block. The warm yellow label is slightly out of line, and the reading order stays clear.",
    motion: "Press the entry below and the hard shadow pulls in at once. Open it to see how the button is made.",
    paragraphs: [
      "Neo-Brutalism keeps the strong edges and direct expression of Brutalism and adds bright color blocks and solid offset shadows. This demo uses square corners, thick lines, heavy weights and solid surfaces. Warm yellow appears only on the accent label and the expandable control, and the text on it is always dark.",
      "The layout keeps one headline, one summary and one entry to expand. The hard shadow gives the block its thickness. Press the entry and the control moves in the direction of the shadow offset while the shadow pulls in, like pressing a raised button.",
      "The dark version needs a separate check that lines and hard shadows can be told apart. On a phone you can shorten the shadow offset, but keep the full touch area. Keyboard focus, the gaps between pieces of text and a clear heading hierarchy all stay as well.",
    ],
  },
  pixel: {
    name: "Retro Pixel",
    heading: "Retro Pixel: a small window",
    fit: "Creative coding, indie game dev notes, or a personal site with some nostalgia",
    type: "A monospace font is used for file names and code. Chinese text stays in a readable system font.",
    layout: "The note sits in a small desktop window with pixel graphics, stepped edges and a short status line.",
    motion: "The picture stays still, with no blinking cursor or marquee, so it is easy to stop and read.",
    paragraphs: [
      "Pixel art gets its look from a limited palette, discrete geometry and pixel edges. This demo puts a personal note in a small desktop window with an amber pixel graphic and segmented edges. Body text and Chinese headings stay in a readable regular font, and the window and graphics carry the nostalgia.",
      "The window title is a file-name label and the code area uses monospace type. The square in the corner is only an illustration and does not close anything. The pixel graphic is drawn directly as a small SVG with hard edges. It needs no external image and avoids the blur of scaling up an ordinary picture.",
      "The preview stays still, with no auto-scrolling, blinking cursor or boot noise. Small screens keep the title and code first and shrink the desktop margin around them. For a long article, use the window style only in the index or the opening, and leave enough reading room for the body.",
    ],
  },
  collage: {
    name: "Warm Collage",
    heading: "Warm Collage: two offset papers",
    fit: "Recording a design process, writing creative essays, or archiving inspiration and small pieces",
    type: "Paper headings use Songti and Instrument Serif, captions use sans-serif and code uses monospace.",
    layout: "Two papers of different sizes are slightly offset, with the heading and the code placed in a fixed order.",
    motion: "The papers sit still. Angle and overlap give the handmade feel, with no automatic swaying or drifting.",
    paragraphs: [
      "This composition borrows from collage and Anti-Polish: the papers are slightly rotated, the heading feels a little handmade, and the information runs in its normal order. The background is a warm rose grey, and the paper is neutral white or deep rose charcoal to keep the surface clean.",
      "The design note takes the main position, with a wine-red code paper overlapping beside it and a small strip of tape marking front and back. The rotation angles are fixed and the text is real HTML. A reader sees the heading first, then the code, and last a short archive note.",
      "On desktop the papers can overlap slightly. On a narrow screen, reduce the angle and the overlap to make room for the text. This layout suits writing about a creative process and is a poor fit for dense tables. Two or three fixed offsets are enough, and the papers do not need to move.",
    ],
  },
  print: {
    name: "Editorial",
    heading: "Editorial: type and an article index",
    fit: "Blogs built around long articles, independent magazines and design criticism sites",
    type: "Headings pair Instrument Serif with Chinese Songti. Body text uses sans-serif throughout.",
    layout: "A large headline leads into the body, with a compact index beside it. Hierarchy comes mainly from font size.",
    motion: "Links and selected states respond at once. The body area does not move.",
    paragraphs: [
      "For a site built around articles, I adjust the relation between headings and paragraphs first. This palette uses white, neutral grey and a little vermilion, with clear black-and-white contrast. Vermilion is used only for links, the current section and important information. Body text keeps the regular text color.",
      "English headings use Instrument Serif, which this site already loads, and Chinese uses Songti, which gives the headings a magazine feel. Summaries, dates and body text use sans-serif for continuous reading.",
      "One main article is paired with a secondary index, and the summary is set directly on the page so the text holds up the layout. This structure suits sites meant for reading. When there are many images of work, give them a separate display area so the whole page does not turn into a dense text index.",
    ],
  },
  glass: {
    name: "Warm Grey Glass",
    heading: "Warm Grey Glass: one layer of navigation",
    fit: "Interaction notes, tool-oriented blogs and personal workspaces",
    type: "System sans-serif throughout. Weight and line height separate navigation, headings and summaries.",
    layout: "The article sits on a solid surface, and one translucent navigation layer floats above it.",
    motion: "It responds on press. When the floating layer changes target, it continues from where it is.",
    paragraphs: [
      "This theme uses material to separate the article from floating controls. On a neutral grey background the article sits on a solid surface, and only the navigation is translucent. The layers are easy to tell apart, and you never read body text through several sheets of glass.",
      "The layering and immediate feedback borrow from Apple's interfaces. On the web the frosted look is approximated with backdrop-filter, which differs from the optics of native Liquid Glass on iOS. On a simple background, a light blur with a clear outline and a soft shadow is enough to mark where the floating layer is.",
      "Rounded corners are used mainly on touchable controls, sized by what the control does. The navigation can move smoothly when it switches, while the body keeps its size. When someone chooses reduced transparency, or the browser does not support backdrop blur, the floating layer uses a solid background and reading and operating stay normal.",
    ],
  },
  gallery: {
    name: "Charcoal Gallery",
    heading: "Charcoal Gallery: large work and short captions",
    fit: "Design portfolios, and displays of creative coding and visual case studies",
    type: "DM Sans with a system Chinese sans-serif. Size and weight bring out the headings.",
    layout: "The main piece takes a large area with only a short caption beside it, and the surrounding navigation is kept small.",
    motion: "Details open from near the click and close back along the same path. Nothing floats on its own while browsing.",
    paragraphs: [
      "When browsing a portfolio, readers usually look at the work first and then decide whether to read about the process. Charcoal Gallery gives its largest area to the main piece, and the title and caption each get one place. The dark color is a warm charcoal, so the work is shown on a background with no navy cast.",
      "A low-saturation berry red marks the category and the current state. The images keep their own colors and the rest of the site uses less color, so the two do not compete for attention.",
      "Dark headings can drop the brightness of white a little, while secondary text has to be bright enough to read. The light version adjusts light and shade again and keeps the structure of large work with short captions. When details open, the change of position can be made clear. While browsing, the images stay still.",
    ],
  },
  olive: {
    name: "Olive Journal",
    heading: "Olive Journal: an index and code",
    fit: "Front-end technical notes, component documentation and daily development logs",
    type: "Headings and body text keep a sans-serif. Code and parameters switch to monospace.",
    layout: "A compact index sits beside the main article, so the content structure and a code sample are visible on the first screen.",
    motion: "Jumping to a heading and switching state respond directly. Motion is added only where a change of position is hard to follow.",
    paragraphs: [
      "Olive Journal organizes the page around how technical content is read. A yellowish olive sits on an off-white background, and a compact index ties the article, the contents and the code together.",
      "Body text and headings use sans-serif. Code, parameters and data that need to align use monospace. The current index entry changes both color and weight, which makes the selected state easier to tell. On a phone the index collapses into a horizontal content hint and the article takes the full width.",
      "For a site where you write often and keep returning to your notes, consider this structure first. A stable paragraph hierarchy and a contents list you can jump from make things easy to find, and code that is easy to copy is easy to reuse. Entrance animation can stay simple. The olive color helps people recognize the site.",
    ],
  },
};
