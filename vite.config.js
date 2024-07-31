import process from 'node:process'
import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite.plugins'

function getProxyConfig({ baseApi = '/dev-api', baseURL }) {
  return {
  // https://cn.vitejs.dev/config/#server-proxy
    [baseApi]: {
      target: baseURL,
      changeOrigin: true,
      rewrite: p => p.replace(new RegExp(`^${baseApi}`), ''),
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV, VITE_APP_BASE_URL } = env

  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    plugins: createVitePlugins({ command }),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置别名
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      open: true,
      proxy: getProxyConfig({ baseURL: VITE_APP_BASE_URL }),
    },
    preview: {
      host: true,
      open: true,
      proxy: getProxyConfig({ baseURL: VITE_APP_BASE_URL }),
    },
  }
})
