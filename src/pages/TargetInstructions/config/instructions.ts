import { DirectionConfig, TargetConfig } from '../types';

export const DIRECTIONS: DirectionConfig[] = [
  { value: 'left-right', label: 'de gauche à droite', symbol: '→' },
  { value: 'right-left', label: 'de droite à gauche', symbol: '←' },
  { value: 'top-bottom', label: 'de haut en bas', symbol: '↓' },
  { value: 'bottom-top', label: 'de bas en haut', symbol: '↑' },
];

export const TARGETS: TargetConfig[] = [
  { value: 'circle', label: 'rond', type: 'shape' },
  { value: 'triangle', label: 'triangle', type: 'shape' },
  { value: 'cross', label: 'croix', type: 'shape' },
  { value: 'square', label: 'carré', type: 'shape' },
  { value: 'black', label: 'noir', type: 'color' },
  { value: 'green', label: 'vert', type: 'color' },
  { value: 'blue', label: 'bleu', type: 'color' },
  { value: 'red', label: 'rouge', type: 'color' },
];