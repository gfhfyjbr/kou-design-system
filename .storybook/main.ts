import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    config.resolve ??= {}
    config.resolve.dedupe = Array.from(new Set([
      ...(config.resolve.dedupe ?? []),
      'react',
      'react-dom',
    ]))
    return config
  },
}

export default config
