import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { i18nPlugin } from '@voerkai18n/vue'
import { i18nScope } from './languages'
import VueViewer from 'v-viewer'
import '@/styles/main.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'guanhe',
    themes: {
      guanhe: {
        dark: false,
        colors: {
          primary: '#0B3C5D',
          secondary: '#1565C0',
          accent: '#F9A825',
          background: '#FFFFFF',
          surface: '#F4F6F8',
          'on-primary': '#FFFFFF'
        }
      }
    }
  }
})

const app = createApp(App)
app.use(router)
app.use(i18nPlugin, { i18nScope })
// 插件注册的全局属性名为 t，补一个 $t 别名供模板使用（同样响应式）
app.config.globalProperties.$t = app.config.globalProperties.t
app.use(vuetify)
app.use(VueViewer)
app.mount('#app')
