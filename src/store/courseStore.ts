import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CourseItem } from '../types/course';

interface CourseStore {
  courses: CourseItem[];
  addArticle: (article: Omit<CourseItem, 'id' | 'lastModified'>) => CourseItem;
  updateArticle: (id: string, data: Partial<CourseItem>) => void;
  deleteArticle: (id: string) => void;
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set) => ({
      courses: [],

      addArticle: (article) => {
        const newArticle = {
          ...article,
          id: crypto.randomUUID(),
          lastModified: Date.now()
        };
        
        set((state) => ({
          courses: [...state.courses, newArticle]
        }));
        
        return newArticle;
      },

      updateArticle: (id, data) => set((state) => ({
        courses: state.courses.map(article => 
          article.id === id 
            ? { 
                ...article, 
                ...data, 
                lastModified: Date.now() 
              }
            : article
        )
      })),

      deleteArticle: (id) => set((state) => ({
        courses: state.courses.filter(article => article.id !== id)
      })),
    }),
    {
      name: 'course-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return { courses: [] };
        }
        return persistedState;
      },
      partialize: (state) => ({
        courses: state.courses.map(({ id, name, content, isPrivate, authorId }) => ({
          id,
          name,
          content,
          isPrivate,
          authorId
        }))
      })
    }
  )
);