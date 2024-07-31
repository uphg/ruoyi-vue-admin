import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{html,js,ts,jsx,tsx,vue}'],
  },
  presets: [presetUno(), presetAttributify()],
  // rules: [
  //   [
  //     'shadow-base',
  //     {
  //       'box-shadow':
  //         '0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)',
  //     },
  //   ],
  // ],
  theme: {
    colors: {
      primary: 'rgba(var(--c-primary),%alpha)',
    },
  },
})
