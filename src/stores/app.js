import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  // arrow function recommended for full type inference
  state: () => ({
    openBook: null,
  }),
  actions: {
    setOpenBook(book) {
      this.openBook = book
    },
    clearOpenBook() {
      this.openBook = null
    },
  },
})
