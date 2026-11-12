import { glyphs, type GlyphName } from './smufl';

// A small engraver for the page's decorative scores. Units are staff spaces: the top
// staff line is y = 0 and the bottom line is y = 4. Rules follow SMuFL engraving defaults.
const STAFF_LINE = 0.13;
const STEM = 0.12;
const STEM_LENGTH = 3.5;
const BEAM = 0.5;
const THIN_BARLINE = 0.16;
const THICK_BARLINE = 0.5;
const BARLINE_GAP = 0.4;
const LEDGER = 0.16;
const LEDGER_EXTENSION = 0.4;
const LETTERS = 'CDEFGAB';

export type NoteValue = 1 | 2 | 4 | 8;

export interface ScoreNote {
  pitches: string[];
  value: NoteValue;
  dotted?: boolean;
  /** Notes with the same beam id inside one measure share a beam. */
  beam?: string;
  fermata?: boolean;
  /** Index of the sounding note in the played motif. */
  index?: number;
}

export interface ScoreRest {
  rest: true;
  value: NoteValue;
  dotted?: boolean;
}

export type ScoreEvent = ScoreNote | ScoreRest;

export interface ScoreMeasure {
  events: ScoreEvent[];
  /** Closing barline; defaults to a single barline. */
  barline?: 'single' | 'final' | 'repeat' | 'none';
  /** Width of an empty measure. */
  width?: number;
}

export interface ScoreOptions {
  clef?: boolean;
  /** Pitches of the sharps in the key signature, e.g. ['F5']. */
  sharps?: string[];
  time?: [number, number];
  measures?: ScoreMeasure[];
  /** Horizontal start of the content. */
  x?: number;
  /** Space after the header before the first measure. */
  lead?: number;
  /** Stretch the note spacing so the staff ends exactly here (a justified system). */
  justify?: number;
}

export interface EngravedScore {
  markup: string;
  /** Right edge of the content. */
  width: number;
  /** Horizontal start of every measure and the barline position closing it. */
  measures: { start: number; end: number }[];
  /** Notehead centre of every indexed note. */
  notes: Record<number, { x: number; y: number }>;
  /** Where the staff lines should stop: the closing barline, or the end of open content. */
  staffEnd: number;
  used: GlyphName[];
}

/** Staff spaces below the top line of a treble staff: F5 = 0, E4 = 4. */
export function trebleY(pitch: string) {
  const match = /^([A-G])(\d)$/.exec(pitch);
  if (!match) throw new Error(`Unknown pitch: ${pitch}`);
  const step = LETTERS.indexOf(match[1]) + Number(match[2]) * 7;
  return (LETTERS.indexOf('F') + 5 * 7 - step) / 2;
}

const n = (value: number) => {
  const text = value.toFixed(3).replace(/\.?0+$/, '');
  return text === '-0' ? '0' : text;
};

const isRest = (event: ScoreEvent): event is ScoreRest => 'rest' in event;
const quarters = (event: ScoreEvent) => (4 / event.value) * (event.dotted ? 1.5 : 1);
/** Spacing grows with the square root of the duration, as in engraved editions. */
const spacing = (event: ScoreEvent) => 1.6 + 2.6 * Math.sqrt(quarters(event));

export function engrave(options: ScoreOptions): EngravedScore {
  if (options.justify === undefined) return layout(options, 1);
  const natural = layout(options, 1);
  const flexible = (options.measures ?? []).flatMap((measure) => measure.events).reduce((sum, event) => sum + spacing(event), 0);
  return layout(options, flexible ? 1 + (options.justify - natural.staffEnd) / flexible : 1);
}

function layout(options: ScoreOptions, stretch: number): EngravedScore {
  const used = new Set<GlyphName>();
  const parts: string[] = [];
  const glyph = (name: GlyphName, x: number, y: number, extra = '') => {
    used.add(name);
    parts.push(`<use href="#smufl-${name}" x="${n(x)}" y="${n(y)}"${extra}/>`);
  };
  const rect = (x: number, y: number, width: number, height: number, className?: string) => {
    parts.push(`<rect${className ? ` class="${className}"` : ''} x="${n(x)}" y="${n(y)}" width="${n(width)}" height="${n(height)}"/>`);
  };

  let x = options.x ?? 0;
  if (options.clef) {
    x += 0.8;
    glyph('gClef', x, 3);
    x += glyphs.gClef.w + 0.7;
  }
  for (const sharp of options.sharps ?? []) {
    glyph('accidentalSharp', x, trebleY(sharp));
    x += glyphs.accidentalSharp.w + 0.25;
  }
  if (options.time) {
    x += 0.6;
    const [top, bottom] = options.time.map((digit) => `timeSig${digit}` as GlyphName);
    const width = Math.max(glyphs[top].w, glyphs[bottom].w);
    glyph(top, x + (width - glyphs[top].w) / 2, 1);
    glyph(bottom, x + (width - glyphs[bottom].w) / 2, 3);
    x += width;
  }
  x += options.lead ?? 1.6;

  const measures: EngravedScore['measures'] = [];
  const notes: EngravedScore['notes'] = {};
  let staffEnd = x;
  for (const measure of options.measures ?? []) {
    const start = x;
    const placed: { event: ScoreNote; x: number; ys: number[] }[] = [];
    if (!measure.events.length) x += measure.width ?? 8;
    for (const event of measure.events) {
      if (isRest(event)) {
        const name = ({ 1: 'restWhole', 2: 'restHalf', 4: 'restQuarter', 8: 'rest8th' } as const)[event.value];
        glyph(name, x, event.value === 1 ? 1 : 2);
      } else {
        const ys = event.pitches.map(trebleY);
        placed.push({ event, x, ys });
        if (event.index !== undefined) notes[event.index] = { x: x + noteheadWidth(event) / 2, y: ys[0] };
      }
      x += spacing(event) * stretch;
    }
    renderNotes(placed, glyph, rect, parts);
    const end = x - 0.6;
    measures.push({ start, end });
    const closing = measure.barline ?? 'single';
    x = renderBarline(closing, end, rect, glyph);
    staffEnd = closing === 'single' ? end + THIN_BARLINE : closing === 'none' ? x + 0.6 : x;
  }

  return { markup: parts.join(''), width: x, measures, notes, staffEnd, used: [...used] };
}

function noteheadName(note: ScoreNote): GlyphName {
  if (note.value === 1) return 'noteheadWhole';
  return note.value === 2 ? 'noteheadHalf' : 'noteheadBlack';
}

const noteheadWidth = (note: ScoreNote) => glyphs[noteheadName(note)].w;

/** Stems point away from the note farthest from the middle line. */
function stemsUp(ys: number[]) {
  const above = Math.max(0, ...ys.map((y) => 2 - y));
  const below = Math.max(0, ...ys.map((y) => y - 2));
  return below > above;
}

type Draw = (name: GlyphName, x: number, y: number, extra?: string) => void;
type Rect = (x: number, y: number, width: number, height: number, className?: string) => void;

function renderNotes(placed: { event: ScoreNote; x: number; ys: number[] }[], glyph: Draw, rect: Rect, parts: string[]) {
  const groups = new Map<string, typeof placed>();
  for (const item of placed) {
    const key = item.event.beam ? `beam:${item.event.beam}` : `single:${groups.size}`;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }

  for (const group of groups.values()) {
    const beamed = group.length > 1;
    const up = stemsUp(group.flatMap((item) => item.ys));
    const stemmed = group[0].event.value !== 1;
    // The beam follows the outer notes, limited to a gentle slant, and clears every notehead.
    const reference = group.map((item) => (up ? Math.min(...item.ys) : Math.max(...item.ys)));
    const interval = reference[reference.length - 1] - reference[0];
    const slant = beamed ? Math.sign(interval) * Math.min(Math.abs(interval) * 0.5, 1) : 0;
    const stemX = group.map((item) => (up ? item.x + noteheadWidth(item.event) - STEM / 2 : item.x + STEM / 2));
    const span = stemX[stemX.length - 1] - stemX[0] || 1;
    const t = stemX.map((value) => (value - stemX[0]) / span);
    const base = up
      ? Math.min(...reference.map((y, i) => y - STEM_LENGTH - slant * t[i]))
      : Math.max(...reference.map((y, i) => y + STEM_LENGTH - slant * t[i]));
    const beamY = (i: number) => base + slant * t[i];

    group.forEach((item, i) => {
      const { event } = item;
      const head = noteheadName(event);
      const width = glyphs[head].w;
      parts.push(`<g class="score-note"${event.index !== undefined ? ` data-note="${event.index}"` : ''}>`);
      for (const y of item.ys) {
        renderLedgers(item.x, width, y, rect);
        glyph(head, item.x, y);
        if (event.dotted) glyph('augmentationDot', item.x + width + 0.3, Number.isInteger(y) ? y - 0.5 : y);
      }
      if (stemmed) {
        const end = beamed ? beamY(i) : up ? Math.min(...item.ys) - STEM_LENGTH : Math.max(...item.ys) + STEM_LENGTH;
        const from = up ? Math.max(...item.ys) - 0.168 : Math.min(...item.ys) + 0.168;
        const left = stemX[i] - STEM / 2;
        rect(left, Math.min(from, end), STEM, Math.abs(end - from));
        if (!beamed && event.value === 8) glyph(up ? 'flag8thUp' : 'flag8thDown', left, up ? end - 0.04 : end + 0.132);
      }
      if (event.fermata) {
        const top = Math.min(0, ...item.ys.map((y) => y - 0.5), stemmed && up ? beamed ? beamY(i) : Math.min(...item.ys) - STEM_LENGTH : 0);
        glyph('fermataAbove', item.x + width / 2 - glyphs.fermataAbove.w / 2, top - 0.75);
      }
      parts.push('</g>');
    });

    if (beamed) {
      const first = stemX[0] - STEM / 2;
      const last = stemX[stemX.length - 1] + STEM / 2;
      const y0 = beamY(0) + slant * ((first - stemX[0]) / span);
      const y1 = beamY(group.length - 1) + slant * ((last - stemX[stemX.length - 1]) / span);
      const inner = up ? BEAM : -BEAM;
      parts.push(`<path class="score-beam" d="M${n(first)} ${n(y0)}L${n(last)} ${n(y1)}L${n(last)} ${n(y1 + inner)}L${n(first)} ${n(y0 + inner)}Z"/>`);
    }
  }
}

function renderLedgers(x: number, width: number, y: number, rect: Rect) {
  const lines: number[] = [];
  for (let line = 5; line <= y; line++) lines.push(line);
  for (let line = -1; line >= y; line--) lines.push(line);
  for (const line of lines) rect(x - LEDGER_EXTENSION, line - LEDGER / 2, width + LEDGER_EXTENSION * 2, LEDGER, 'score-ledger');
}

function renderBarline(type: NonNullable<ScoreMeasure['barline']>, x: number, rect: Rect, glyph: Draw) {
  if (type === 'none') return x;
  if (type === 'single') {
    rect(x, 0, THIN_BARLINE, 4, 'score-barline');
    return x + THIN_BARLINE + 1.2;
  }
  if (type === 'repeat') {
    glyph('repeatDots', x, 4);
    x += glyphs.repeatDots.w + 0.16;
  }
  rect(x, 0, THIN_BARLINE, 4, 'score-barline');
  rect(x + THIN_BARLINE + BARLINE_GAP, 0, THICK_BARLINE, 4, 'score-barline');
  return x + THIN_BARLINE + BARLINE_GAP + THICK_BARLINE;
}

/** Five staff lines between two horizontal positions. */
export function staffLines(from: number, to: number) {
  return [0, 1, 2, 3, 4]
    .map((line) => `<rect x="${n(from)}" y="${n(line - STAFF_LINE / 2)}" width="${n(to - from)}" height="${STAFF_LINE}"/>`)
    .join('');
}

/** Glyph outlines referenced by `<use href="#smufl-…">`. */
export function glyphDefinitions(names: Iterable<GlyphName>) {
  return [...new Set(names)].map((name) => `<path id="smufl-${name}" d="${glyphs[name].d}"/>`).join('');
}
