import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    api: 'https://www.googleapis.com/books/v1/volumes',
    positionIndex: 0,
    selectedResultsPerPage: null,
    result: null,
    error: null,
    params: {
      positionIndex: {
        name: 'startIndex',
        default: 0,
      },
      maxResults: {
        name: 'maxResults',
        default: 10,
        min: 10,
        max: 40,
      },
      search: {
        name: 'q',
        required: true,
      },
      sort: {
        name: 'orderBy',
        default: 'relevance',
      },
      category: {
        name: 'subject',
        default: 'empty',
      },
    },
  }),
  getters: {
    resultsPerPage: (state) => {
      return state.selectedResultsPerPage ?? state.params.maxResults.default
    },
    pagesCount: (state) => {
      if (state.result?.totalItems) {
        return Math.ceil(state.result?.totalItems / state.resultsPerPage)
      }
      return null
    },
    currentPage: (state) => {
      if (state.positionIndex >= 0 && state.resultsPerPage > 0) {
        return Math.floor(state.positionIndex / state.resultsPerPage) + 1
      } else {
        return undefined
      }
    },
  },
  actions: {
    search() {
      console.log('run search')
    },
    toNextPage() {
      console.log('go to next page')
    },
    toPreviousPage() {
      console.log('go to prev previous')
    },
    toLastPage() {
      console.log('go to last page')
    },
    toFirstPage() {
      console.log('go to first page')
    },
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
    setSelectedResultsPerPage(val) {
      this.selectedResultsPerPage = val
    },
    clearSelectedResultsPerPage() {
      this.selectedResultsPerPage = null
    },
    setPositionIndex(val) {
      this.positionIndex = val
    },
    clearPositionIndex() {
      this.positionIndex = 0
    },
  },
})
