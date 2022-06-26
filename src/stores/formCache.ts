import { defineStore } from 'pinia'

type State = {
  exploreFilter: string
}

export const useFormStore = defineStore('useFormStore', {
  state: (): State => ({
    exploreFilter: '',
  }),
})
