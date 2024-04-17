import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/components/**/*.{ts,tsx,mdx}',
    './src/app/**/*.{ts,tsx,mdx}',
    './src/contexts/**/*.{ts,tsx,mdx}',
    './src/types/**/*.{ts,tsx,mdx}',
    './src/utils/**/*.{ts,tsx,mdx}',
    './src/actions/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#252638',
        'secondary': '#3D3E54',
        'tertiary': '#212232',
        'subtitle': '#494C4F',
        'blue-primary': '#0A79BE',
        'blue-secondary': '#0069D9',
        'red-primary': '#DC3545',
        'red-secondary': '#A80000',
        'line-primary': '#6E6E6E',
        'line-secondary': '#BDBDBD',
        'line-tertiary': "#545454",
        'main': "#1B4154",
        'button': "#4F4F4F",
        'commentary': "#5C5B5B",
        'gray-primary': "#E0E0E0",
        'gray-secondary': "#D0D0D0",
        'gray-tertiary': "#666666",
        'title': "#212529",
        'duration': "#9A9A9A",
        'approve': "#5CB85C",
        'reject': "#F0AD4E",
        'disable': "#D3D3D3",
        'sky-primary': "#EBF5FF",
        'sky-secondary': "#B8DBFF",
      },
      boxShadow: {
        'common': '0 0 18px 0 rgba(0, 0, 0, 0.20)',
        'double': '0 0 18px 0 rgba(0, 0, 0, 0.40)',
      },
      transitionProperty: {
        'height': 'height',
        'width': 'width',
      },
    },
  },
  plugins: [],
};
export default config;
