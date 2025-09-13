// Centralized color palette for the app
// Usage example: colors.dark.vibrantAccent

class AppColors {
  // Dark theme palette
  static dark = {
    background: '#0F172A', // slate-900
    primary: '#CBD5E1', // slate-300 (used for text/icons on dark bg)
    vibrantAccent: '#22D3EE', // cyan-400
  } as const;

  // Light theme palette (not yet used here, but available)
  static light = {
    background: '#FFFFFF',
    primary: 'red', // slate-700
    vibrantAccent: '#0EA5E9', // sky-500
  } as const;
}

// Export as `colors` to match existing usage in components
export const colors = AppColors;

export type Theme = 'dark' | 'light';

