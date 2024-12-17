import { Direction, Target } from './types';
import { directions, colors, shapes, directionLabels, targetLabels, targetGrid } from './constants';

export function getRandomInstruction() {
  const direction = directions[Math.floor(Math.random() * directions.length)];
  const useShape = Math.random() < 0.5;
  const target = useShape 
    ? shapes[Math.floor(Math.random() * shapes.length)]
    : colors[Math.floor(Math.random() * colors.length)];
  
  return {
    direction,
    target,
    text: `Tirez sur les ${targetLabels[target]} ${directionLabels[direction]}`
  };
}

export function getExpectedSequence(direction: Direction, target: Target): number[] {
  const positions = targetGrid
    .filter(cell => {
      if (typeof target === 'string' && (target === 'red' || target === 'black' || target === 'green' || target === 'blue')) {
        return cell.color === target;
      }
      return cell.shape === target;
    })
    .map(cell => cell.position);

  switch (direction) {
    case 'left-right': {
      return positions.sort((a, b) => {
        const colA = (a - 1) % 4;
        const colB = (b - 1) % 4;
        return colA - colB || a - b;
      });
    }
    case 'right-left': {
      return positions.sort((a, b) => {
        const colA = (a - 1) % 4;
        const colB = (b - 1) % 4;
        return colB - colA || a - b;
      });
    }
    case 'top-bottom': {
      return positions.sort((a, b) => {
        const rowA = Math.floor((a - 1) / 4);
        const rowB = Math.floor((b - 1) / 4);
        return rowA - rowB || a - b;
      });
    }
    case 'bottom-top': {
      return positions.sort((a, b) => {
        const rowA = Math.floor((a - 1) / 4);
        const rowB = Math.floor((b - 1) / 4);
        return rowB - rowA || a - b;
      });
    }
    default:
      return [];
  }
}