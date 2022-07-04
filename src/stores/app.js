import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  // arrow function recommended for full type inference
  state: () => ({
    api: 'https://www.googleapis.com/books/v1/volumes',
    result: undefined,
    error: undefined,
  }),
  getters: {
    // apiPlus: (state) => `${state.api}+`,
  },
  actions: {
    setResult(data) {
      this.result = data
    },
    clearResult() {
      this.result = undefined
    },
    setError(error) {
      this.error = error
    },
    clearError() {
      this.error = undefined
    },
  },
})
