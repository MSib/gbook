<script setup>
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const storeApp = useAppStore()
const { openBook } = storeToRefs(storeApp)
const { clearOpenBook } = storeApp

</script>
<template>
  <div @click.self="clearOpenBook" class="book-wrap">
    <div class="book">
      {{ openBook.volumeInfo.title }}
      <button @click="clearOpenBook" type="button">❌</button>
    </div>
  </div>
</template>
<style scoped>
.book-wrap {
  display: flex;
  margin: auto;
}

.book {
  margin: auto;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
}
</style>