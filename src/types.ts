export type Direction = 'left-right' | 'right-left' | 'top-bottom' | 'bottom-top';
export type Color = 'red' | 'black' | 'green' | 'blue';
export type Shape = 'circle' | 'square' | 'triangle' | 'cross';
export type Target = Color | Shape;
export type GameState = 'waiting' | 'countdown' | 'playing' | 'finished';

export interface TargetCell {
  position: number;
  shape: Shape;
  color: Color;
}