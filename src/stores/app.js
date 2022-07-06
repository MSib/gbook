import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  // arrow function recommended for full type inference
  state: () => ({
    api: 'https://www.googleapis.com/books/v1/volumes',
    result: null,
    error: null,
    openBook: null,
    appElement: null,
  }),
  getters: {
    // apiPlus: (state) => `${state.api}+`,
  },
  actions: {
    setResult(data) {
      this.result = data
    },
    clearResult() {
      this.result = null
    },
    setError(error) {
      this.error = error
    },
    clearError() {
      this.error = null
    },
    setOpenBook(book) {
      this.openBook = book
    },
    clearOpenBook() {
      this.openBook = null
    },
    setAppElement(elem) {
      this.appElement = elem
    },
  },
})
