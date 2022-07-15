<script setup>
import Pagination from '@/components/Pagination.vue'
import { useAppStore } from '@/stores/app'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
import { stringsArrayToString } from '@/utils'

const storeApp = useAppStore()
const storeSearch = useSearchStore()
const { result } = storeToRefs(storeSearch)
const { setResult, setOpenBook } = storeApp

function openBook(e) {
  const etag = e.target.dataset.etag
  const filtered = result.value.items.filter((item) => item.etag === etag)
  const arr = filtered.length > 0 ? filtered[0] : null
  setOpenBook(arr)
}
</script>
<template>
  <div v-if="result" class="total">
    <p v-if="result?.totalItems === 0" class="total__empty">Ничего не нашлось</p>
    <p v-else-if="result?.totalItems" class="total__result">Результатов: {{ result?.totalItems }}</p>
  </div>

  <div v-if="result?.items" class="catalog-wrap">
    <ul class="catalog">
      <li v-for="item in result.items" :key="item.etag" class="item">
        <img v-if="item.volumeInfo?.imageLinks?.thumbnail" :src="item.volumeInfo?.imageLinks?.thumbnail" width="240"
          class="item__cover" alt="">
        <button @click="openBook" :data-etag="item.etag" class="item__title">{{ item.volumeInfo.title }}</button>
        <p v-if="item.volumeInfo?.categories" class="item__categories">Категории: {{
            stringsArrayToString(item.volumeInfo.categories)
        }}</p>
        <p v-if="item.volumeInfo?.authors" class="item__authors">Авторы: {{
            stringsArrayToString(item.volumeInfo.authors)
        }}</p>
      </li>
    </ul>
    <Pagination />
  </div>
</template>
<style scoped>
.total {
  font-style: italic;
}

.total__empty {
  padding: 20px;
}

.total__result {
  padding: 20px 20px 0;
  font-style: italic;
  font-size: 75%;
}

.catalog-wrap {
  display: grid;
}

.catalog {
  margin: 20px;
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  align-items: start;
  list-style: none;
}

.item {
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 4px;
  box-shadow: inset -2px -2px 12px 0 #eee, 2px 2px 6px 0 #ccc;
}

p {
  margin: 0;
  padding: 0;
}

.item__cover {
  width: 140px;
  margin-bottom: 20px;
}

.item__title {
  margin-bottom: 20px;
  padding: 0;
  font: inherit;
  color: inherit;
  background-color: transparent;
  border: none;
  text-align: center;
}

.item__title::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.item__categories {
  font-size: 70%;
  margin-bottom: 20px;
}

.item__authors {
  font-size: 70%;
}
</style>