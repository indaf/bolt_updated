export type Direction = 'left-right' | 'right-left' | 'top-bottom' | 'bottom-top';
export type Color = 'black' | 'green' | 'blue' | 'red';
export type Shape = 'circle' | 'square' | 'triangle' | 'cross';
export type Target = Color | Shape;

export interface Instruction {
  id: string;
  direction: Direction;
  target: Target;
  timestamp: number;
}

export interface DirectionConfig {
  value: Direction;
  label: string;
  symbol: string;
}

export interface TargetConfig {
  value: Target;
  label: string;
  type: 'color' | 'shape';
}