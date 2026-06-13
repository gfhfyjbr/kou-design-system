import type { Preview } from '@storybook/react-vite'
import { ToastProvider } from '../src'
import '../src/styles/kou.css'
import '../stories/storybook.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Foundation', 'Primitives', 'Kou Views'],
      },
    },
  },
  decorators: [
    Story => (
      <ToastProvider>
        <div className="sb-kou-stage">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
}

export default preview
