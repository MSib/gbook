<script setup>
import Search from '@/components/Search.vue'
import Catalog from '@/components/Catalog.vue'
import Error from '@/components/Error.vue'
import Book from '@/components/Book.vue'

import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const storeApp = useAppStore()
const { openBook } = storeToRefs(storeApp)
const { clearOpenBook } = storeApp

storeApp.$subscribe(checkSubscribeEvent)

function checkSubscribeEvent(storeEvent) {
  const { key, newValue, oldValue } = storeEvent.events
  if (key === 'openBook' && newValue === null && oldValue !== null) {
    document.body.removeEventListener('keydown', onCloseBook)
  }
  if (key === 'openBook' && newValue !== null && oldValue === null) {
    document.body.addEventListener('keydown', onCloseBook)
  }
}

function onCloseBook(e) {
  const keyCodeEscape = 27
  if (e.keyCode === keyCodeEscape) {
    clearOpenBook()
  }
}
</script>
<template>
  <div ref="app" :class="{ 'app--openbook': openBook }" :inert="openBook" class="app">
    <Search />
    <Error />
    <Catalog />
  </div>
  <Book v-if="openBook" class="open-book" />
</template>
<style>
.app {
  position: relative;
  transition: filter 0.2s ease-out;
}

.app--openbook {
  filter: blur(2px);
}

.open-book {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #0005;
  padding: 30px;
}

@media (max-width: 400px) {
  .open-book {
    padding: 20px;

  }
}
</style>