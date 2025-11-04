// Centralized color palette for the app
// Usage example: colors.dark.vibrantAccent

class AppColors {
  // Dark theme palette
  static dark = {
    secondary: '#1e40af', // used for header
    background: '#a1a1aa',
    primary: '#CBD5E1', // (used for text/icons on dark bg)
    vibrantAccent: '#065f46',
  } as const;

  // Light theme palette (not yet used here, but available)
  static light = {
    secondary: '#1e40af', // used for header
    background: '#FFFFFF',
    primary: '#CBD5E1', // (used for text/icons on dark bg)
    vibrantAccent: '#ef4444',
  } as const;
}

// Export as `colors` to match existing usage in components
export const colors = AppColors;

export type Theme = 'dark' | 'light';
