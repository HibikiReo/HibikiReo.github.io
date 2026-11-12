import type { ScoreMeasure } from '../lib/notation';

/**
 * Étude No. 001, "A small beginning": an original E minor pentatonic motif.
 * The same nine notes are engraved on the hero sheet and synthesized on play,
 * so the score you see is exactly the music you hear (3/4, ♩ = 72).
 */
export interface MotifNote {
  pitch: string;
  frequency: number;
  /** Seconds from the start. */
  onset: number;
  /** Length of the envelope's release in seconds. */
  release: number;
}

export const motif: MotifNote[] = [
  { pitch: 'E4', frequency: 329.63, onset: 0, release: 0.9 },
  { pitch: 'G4', frequency: 392, onset: 0.42, release: 0.9 },
  { pitch: 'B4', frequency: 493.88, onset: 0.84, release: 1.1 },
  { pitch: 'E5', frequency: 659.25, onset: 1.47, release: 1.1 },
  { pitch: 'D5', frequency: 587.33, onset: 2.1, release: 0.9 },
  { pitch: 'B4', frequency: 493.88, onset: 2.52, release: 0.9 },
  { pitch: 'A4', frequency: 440, onset: 2.94, release: 0.9 },
  { pitch: 'G4', frequency: 392, onset: 3.36, release: 1.2 },
  { pitch: 'E4', frequency: 329.63, onset: 4.2, release: 1.8 },
];

/** The last note fades out at six seconds. */
export const MOTIF_DURATION = 6;

/** Bar 1: E4 G4 | B4. E5. D5 — bar 2: B4 A4 G4 E4 (fermata). */
export const motifMeasures: ScoreMeasure[] = [
  {
    events: [
      { pitches: ['E4'], value: 8, beam: 'a', index: 0 },
      { pitches: ['G4'], value: 8, beam: 'a', index: 1 },
      { pitches: ['B4'], value: 8, dotted: true, beam: 'b', index: 2 },
      { pitches: ['E5'], value: 8, dotted: true, beam: 'b', index: 3 },
      { pitches: ['D5'], value: 8, beam: 'b', index: 4 },
    ],
  },
  {
    events: [
      { pitches: ['B4'], value: 8, beam: 'c', index: 5 },
      { pitches: ['A4'], value: 8, beam: 'c', index: 6 },
      { pitches: ['G4'], value: 4, index: 7 },
      { pitches: ['E4'], value: 4, fermata: true, index: 8 },
    ],
  },
];
