export const POST_CONSTANTS = {
  MAX_TEXT_LENGTH: 140,
  GRID_COLUMNS: 3,
  MEDIA_ASPECT_RATIO: 1,
  SUPPORTED_MEDIA_TYPES: ['image', 'video'],
  SHARE_PLATFORMS: ['twitter', 'linkedin', 'copy'] as const
} as const;

export const MEDIA_PREVIEW_CONFIG = {
  maxWidth: 1080,
  maxHeight: 1080,
  quality: 0.8,
  format: 'image/jpeg'
} as const;