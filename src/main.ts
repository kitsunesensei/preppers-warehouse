import devtools from '@vue/devtools'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import dayjs from '@/plugins/dayjs'

import './assets/sass/global.sass'
import * as enMessages from './locales/en.json'
import * as deMessages from './locales/de.json'

if (import.meta.env.DEV) {
  devtools.connect()
}

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: enMessages,
    de: deMessages,
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
