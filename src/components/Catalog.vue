<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const storeApp = useAppStore()
const { result } = storeToRefs(storeApp)
const { setResult } = storeApp
</script>
<template>
  <div class="catalog-wrap">
    <ul v-if="result?.items" class="catalog">
      <li v-for="item in result.items" :key="item.etag" class="item">
      <img :src="item.volumeInfo.imageLinks.thumbnail" width="240" class="item__cover" alt="">
      <p class="item__title">{{ item.volumeInfo.title }}</p>
      <p class="item__subtitle">{{ item.volumeInfo.subtitle }}</p>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.catalog {
  margin: 20px;
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  list-style: none;
}
.item {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #f4f4f4;
  border-radius: 4px;
  box-shadow: inset -2px -2px 12px 0 #eee, 2px 2px 6px 0 #ccc;
}
.item__cover {
  width: 140px;
}
.item__title {
  margin: 0;
  padding: 0;
}
.item__subtitle {
  margin: 0;
  padding: 0;
  font-size: 70%;
  font-style: italic;
}
</style>