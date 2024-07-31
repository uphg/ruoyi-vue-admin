import path from 'node:path'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default function createVitePlugins({ command }) {
  return [
    vue(),
    vueJsx(),
    autoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      dts: 'src/components.d.ts',
      dirs: ['src/components'],
      // file suffixes
      extensions: ['vue', 'jsx', 'tsx'],
      resolvers: [NaiveUiResolver()],
      // resolvable file suffixes
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
    }),
    UnoCSS(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: command === 'build',
    }),
  ]
}
