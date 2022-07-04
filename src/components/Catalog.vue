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
    <li v-for="item in result.items" :key="item.etag" class="item">{{item.volumeInfo.title}}</li>
  </ul>
</div>
</template>
<style scoped></style>