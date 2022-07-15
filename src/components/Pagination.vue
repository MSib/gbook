<script setup>
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const storeSearch = useSearchStore()
const { pagesCount, currentPage } = storeToRefs(storeSearch)
const {
  params,
  search,
  setSelectedResultsPerPage,
  toFirstPage,
  toLastPage,
  toNextPage,
  toPreviousPage,
} = storeSearch

const itemsPerPage = [
  params.maxResults.min,
  params.maxResults.min + (params.maxResults.max - params.maxResults.min) / 2,
  params.maxResults.max,
]

function onChangePerPageValue(e) {
  setSelectedResultsPerPage(e.target.value)
}
</script>

<template>
  <div v-if="pagesCount && currentPage" class="pagination-wrap">
    <div class="pagination">
      <button @click="toFirstPage" class="pagination__button" type="button"
        aria-label="Перейти к первой странице">&#8676;</button>
      <button @click="toPreviousPage" class="pagination__button" type="button"
        aria-label="Перейти к предыдущей странице">&#8592;</button>
      <p class="pagination__label">{{ currentPage }} из {{ pagesCount }}</p>
      <button @click="toNextPage" class="pagination__button" type="button"
        aria-label="Перейти к следующей странице">&#8594;</button>
      <button @click="toLastPage" class="pagination__button" type="button"
        aria-label="Перейти к последней странице">&#8677;</button>
    </div>
    <div class="per-page">
      <label class="per-page__label">Результатов на странице</label>
      <select @change="onChangePerPageValue" class="per-page__value" name="per-page">
        <option v-for="value in itemsPerPage" :key="value" :value="value"
          :selected="value === params.maxResults.default">
          {{ value }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.pagination-wrap {
  margin: 20px 20px 40px;
  display: grid;
  gap: 20px;
  justify-content: center;
}

.per-page {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px;
}

.per-page__value {
  padding: 5px;
  font: inherit;
  color: inherit;
}

.pagination {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3px;
  font-size: 200%;
  line-height: 1;
}

.pagination__label {
  margin: 0;
}

.pagination__button {
  padding: 0;
  font: inherit;

  border: none;
  background-color: transparent;
}

.pagination__button:active {
  color: #000;
  background-color: #ccc;
}
</style>