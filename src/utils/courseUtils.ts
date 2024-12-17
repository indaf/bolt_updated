import { CourseItem } from '../types/course';

export const findItemById = (items: CourseItem[], id: string): CourseItem | null => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const findParentAndItem = (items: CourseItem[], id: string): { parent: CourseItem[] | null; item: CourseItem | null } => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return { parent: items, item: items[i] };
    }
    if (items[i].children) {
      const result = findParentAndItem(items[i].children, id);
      if (result.item) {
        return result;
      }
    }
  }
  return { parent: null, item: null };
};

export const removeItemFromParent = (items: CourseItem[], id: string): CourseItem[] => {
  return items.reduce<CourseItem[]>((acc, item) => {
    if (item.id === id) return acc;
    
    if (item.children) {
      return [...acc, {
        ...item,
        children: removeItemFromParent(item.children, id)
      }];
    }
    
    return [...acc, item];
  }, []);
};

export const updateItemInTree = (items: CourseItem[], id: string, updater: (item: CourseItem) => CourseItem): CourseItem[] => {
  return items.map(item => {
    if (item.id === id) {
      return updater(item);
    }
    if (item.children) {
      return {
        ...item,
        children: updateItemInTree(item.children, id, updater)
      };
    }
    return item;
  });
};

export const reorderItems = (
  items: CourseItem[],
  sourceId: string,
  destinationId: string,
  sourceIndex: number,
  destinationIndex: number
): CourseItem[] => {
  const newItems = [...items];

  // Get source item and its parent array
  const sourceResult = sourceId === 'root' 
    ? { parent: newItems, item: newItems[sourceIndex] }
    : findParentAndItem(newItems, sourceId);

  if (!sourceResult.parent || !sourceResult.item) return items;

  // Remove item from source
  sourceResult.parent.splice(sourceResult.parent.indexOf(sourceResult.item), 1);

  // Get destination parent array
  const destinationParent = destinationId === 'root'
    ? newItems
    : findItemById(newItems, destinationId)?.children || [];

  // Insert item at new position
  if (destinationId === 'root') {
    newItems.splice(destinationIndex, 0, sourceResult.item);
  } else {
    destinationParent.splice(destinationIndex, 0, sourceResult.item);
  }

  return newItems;
};