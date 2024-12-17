import React from 'react';
import { CourseItem } from '../../types/course';
import { CourseItemComponent } from './CourseItem';

interface CourseListProps {
  items: CourseItem[];
  selectedItem: CourseItem | null;
  onItemSelect: (item: CourseItem) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: Partial<CourseItem>) => void;
  isAdmin: boolean;
  currentUserId?: string;
  activeSection: 'public' | 'private';
}

export function CourseList({
  items,
  selectedItem,
  onItemSelect,
  onDelete,
  onEdit,
  isAdmin,
  currentUserId,
  activeSection
}: CourseListProps) {
  const filteredItems = items.filter(item => 
    activeSection === 'public' ? !item.isPrivate : item.isPrivate
  );

  return (
    <div className="space-y-1">
      {filteredItems.map((item) => (
        <CourseItemComponent
          key={item.id}
          item={item}
          selectedItem={selectedItem}
          onItemSelect={onItemSelect}
          onDelete={onDelete}
          onEdit={onEdit}
          canEdit={isAdmin || (item.authorId === currentUserId)}
        />
      ))}
    </div>
  );
}