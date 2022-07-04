<script setup>
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const storeApp = useAppStore()
const { error } = storeToRefs(storeApp)
const { clearError } = storeApp

function close() {
  clearError()
}
</script>
<template>
  <div v-if="error" class="error-wrap">
    <p class="error">
      Error: ({{ error.code }}) {{ error.message }}
    </p><button @click="close" type="button" aria-label="Закрыть уведомление об ошибке">❌</button>
  </div>
</template>
<style scoped>
.error-wrap {
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: tomato;
  color: #fff;
  text-align: center;
}

.error {
  flex-grow: 1;
  text-align: center;
}

button {
  padding: 5px;
}
</style>