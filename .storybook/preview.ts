// .storybook/preview.ts
import '../src/styles/globals.css';

const preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0A0A0A' },
        { name: 'surface', value: '#111111' },
      ],
    },
  },
};

export default preview;