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
  // TODO: make dynamic
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: enMessages,
    de: deMessages,
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

/**
 * @source https://stackoverflow.com/a/63910611/2699732
 * @copyright Daniel<https://stackoverflow.com/users/197546/daniel>
 * @licence CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0/
 */
app.directive('click-outside', {
  mounted(el, binding) {
    el.clickOutsideEvent = function (event: CustomEvent) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
})

app.directive('editable-focus', {
  mounted(el) {
    const range = document.createRange()
    const sel = window.getSelection()

    if (range && sel) {
      range.setStart(el, 0)
      range.collapse(true)

      sel.removeAllRanges()
      sel.addRange(range)
    }
  },
})

// TODO: make dynamic
dayjs.locale('en')

app.mount('#app')
