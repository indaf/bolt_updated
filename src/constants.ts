import { Direction, Color, Shape, TargetCell } from './types';

export const directions: Direction[] = ['left-right', 'right-left', 'top-bottom', 'bottom-top'];
export const colors: Color[] = ['red', 'black', 'green', 'blue'];
export const shapes: Shape[] = ['circle', 'square', 'triangle', 'cross'];

export const directionLabels = {
  'left-right': 'de gauche à droite',
  'right-left': 'de droite à gauche',
  'top-bottom': 'de haut en bas',
  'bottom-top': 'de bas en haut',
};

export const targetLabels = {
  'red': 'rouges',
  'black': 'noires',
  'green': 'vertes',
  'blue': 'bleues',
  'circle': 'ronds',
  'square': 'carrés',
  'triangle': 'triangles',
  'cross': 'croix',
};

export const targetGrid: TargetCell[] = [
  { position: 1, shape: 'circle', color: 'red' },
  { position: 2, shape: 'cross', color: 'green' },
  { position: 3, shape: 'triangle', color: 'black' },
  { position: 4, shape: 'square', color: 'blue' },
  { position: 5, shape: 'triangle', color: 'black' },
  { position: 6, shape: 'square', color: 'blue' },
  { position: 7, shape: 'circle', color: 'red' },
  { position: 8, shape: 'cross', color: 'green' },
  { position: 9, shape: 'square', color: 'green' },
  { position: 10, shape: 'circle', color: 'black' },
  { position: 11, shape: 'cross', color: 'blue' },
  { position: 12, shape: 'triangle', color: 'red' },
  { position: 13, shape: 'cross', color: 'blue' },
  { position: 14, shape: 'triangle', color: 'red' },
  { position: 15, shape: 'square', color: 'green' },
  { position: 16, shape: 'circle', color: 'black' },
];