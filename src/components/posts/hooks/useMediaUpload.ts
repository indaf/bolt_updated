import { useState } from 'react';
import { MEDIA_PREVIEW_CONFIG } from '../constants';

export function useMediaUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const optimizeImage = async (file: File): Promise<File> => {
    const { maxWidth, maxHeight, quality, format } = MEDIA_PREVIEW_CONFIG;
    
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: format }));
            }
          },
          format,
          quality
        );
      };
      img.src = URL.createObjectURL(file);
    });
  };

  return {
    isUploading,
    setIsUploading,
    createPreview,
    optimizeImage
  };
}