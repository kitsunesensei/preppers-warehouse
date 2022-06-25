import { mount } from '@vue/test-utils'
import PageNavigation from './PageNavigation.vue'

describe('PageNavigation', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(PageNavigation)
    expect(wrapper.vm).toBeTruthy()
  })
})
