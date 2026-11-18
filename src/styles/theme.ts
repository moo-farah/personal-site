export const theme = {
  light: {
    // Base colors
    primary: '#4F46E5',    // Used for primary actions and links
    secondary: '#6B7280',  // Used for secondary text and icons
    accent: '#8B5CF6',     // Used for hover states and highlights
    
    // Background colors
    bg: {
      primary: '#F3F1EC',    // Warm studio paper (Dots-style)
      secondary: '#E7E4DE',  // Used for cards and photo card backs
      tertiary: '#DDD9D2',   // Used for hover states and borders
    },
    
    // Text colors
    text: {
      primary: '#111827',    // Main text color for headings
      secondary: '#4B5563',  // Used for body text and descriptions
      tertiary: '#6B7280',   // Used for subtle text like dates
      inverse: '#FFFFFF',    // Used for text on dark backgrounds
    },
    
    // Border colors
    border: {
      primary: '#E5E7EB',    // Used for card borders and dividers
      secondary: '#D1D5DB',  // Used for hover state borders
    },

    // Navigation
    nav: {
      bg: 'rgba(255, 255, 255, 0.72)',  // In-flow header
      pill: '#2E2E2E',                  // Dots-style scroll-pop capsule
      pillBubble: '#3C3C3C',
      bubble: '#E4E1DB',
      text: '#4B5563',
      textHover: '#111827',
    }
  },
  
  dark: {
    // Base colors
    primary: '#818CF8',    // Used for primary actions and links
    secondary: '#9CA3AF',  // Used for secondary text and icons
    accent: '#A78BFA',     // Used for hover states and highlights
    
    // Background colors
    bg: {
      primary: '#121211',    // Off-black studio (not pure black)
      secondary: '#1C1C1A',  // Used for cards and photo card backs
      tertiary: '#818CF8',   // Used for hover states and borders
    },
    
    // Text colors
    text: {
      primary: '#F9FAFB',    // Main text color for headings
      secondary: '#D1D5DB',  // Used for body text and descriptions
      tertiary: '#9CA3AF',   // Used for subtle text like dates
      inverse: '#111827',    // Used for text on light backgrounds
    },
    
    // Border colors
    border: {
      primary: '#374151',    // Used for card borders and dividers
      secondary: '#4B5563',  // Used for hover state borders
    },

    // Navigation
    nav: {
      bg: 'rgba(18, 18, 17, 0.72)',
      pill: '#2E2E2E',
      pillBubble: '#3C3C3C',
      bubble: '#2A2A28',
      text: '#9CA3AF',
      textHover: '#F9FAFB',
    }
  }
}; 