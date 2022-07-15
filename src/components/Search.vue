<script>
export default {
  setup() { },
  methods: {
    // API doc: https://developers.google.com/books/docs/v1/using
    checkData(data) {
      const isEmptyItems = data?.totalItems === 0
      if (data?.items || isEmptyItems) {
        // success
        this.setResult(data)
      } else {
        // error
        this.errorAdapter(data)
      }
    },
    errorAdapter(data) {
      if (data?.error) {
        // google error
        this.setError({
          message: data.error.message,
          code: data.error.code,
        })
      } else if (data?.name) {
        // fetch error
        this.setError({
          message: data.message,
          code: data.name,
        })
      } else {
        // unidentified result
        this.setError({
          message: 'Неизвестная ошибка',
          code: 'Unknown error',
        })
      }
    },
    send(url) {
      fetch(url)
        .then((response) => { return response.json() })
        .then((data) => { this.checkData(data) })
        .catch((error) => { this.checkData(error) })
    },
    onSubnit() {
      if (this.result) {
        this.clearResult()
      }
      if (this.error) {
        this.clearError()
      }
      try {
        const formData = new FormData(this.$refs.form);
        const url = new URL(this.api)

        let query = formData.get('search')

        if (query === '') {
          throw new Error('Пустой запрос');
        }

        if (formData.get('category') !== this.params.category.default) {
          query += `+${this.params.category.name}:${formData.get('category')}`

        }

        url.searchParams.set(this.params.search.name, query)
        if (formData.get('sort') !== this.params.sort.default) {
          url.searchParams.set(this.params.search.name, formData.get('sort'))
        }

        this.send(url.href)
      } catch (error) {
        this.setError(error)
      }

    },
    clearInput() {
      this.$refs.input.value = null
    }
  }
}
</script>

<script setup>
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
import categories from '@/data/categories';
const storeSearch = useSearchStore()
const { result, error } = storeToRefs(storeSearch)
const { api, params, setResult, clearResult, setError, clearError } = storeSearch
</script>

<template>
  <form @submit.prevent="onSubnit" ref="form">
    <fieldset>
      <input @keydown.esc.stop="clearInput" :required="params.search.required" ref="input" type="text" name="search"
        id="search">
      <button type="submit">Найти</button><br>
    </fieldset>
    <fieldset class="search-features">
      <div class="sort-wrap">
        <label>Сортировать по</label>
        <select name="sort" class="sort">
          <option value="relevance" selected>Релевантности</option>
          <option value="newest">Новым</option>
        </select>
      </div>
      <div class="category-wrap">
        <label>Категория</label>
        <select v-if="categories" name="category" class="category">
          <option value="empty" selected>Не выбрана</option>
          <option v-for="[name, caption] in categories" :key="name" :value="name">
            {{ caption }}
          </option>

        </select>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  color: #222;
  background-color: #41b883;
  box-shadow: 0 1px 2px 0 #35495e;
}

fieldset {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border: none;
}

input,
button,
select,
label {
  padding: 5px;
  font: inherit;
  color: inherit;
}

.search-features {
  flex-wrap: wrap;
  gap: 20px;
}
</style>