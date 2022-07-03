<script>
export default {
  setup() { },
  data() {
    return {
      data: undefined,
      error: undefined,
      api: 'https://www.googleapis.com/books/v1/volumes'
    }
  },
  methods: {
  // API doc: https://developers.google.com/books/docs/v1/using
    send(url) {
      fetch(url)
        .then((response) => { return response.json() })
        .then((data) => { this.data = data; console.log(data); })
        .catch((error) => { this.error = error; console.log(error); })
    },
    onSubnit() {
      const formData = new FormData(this.$refs.form);
      const url = new URL(this.api)
      url.searchParams.set('q', formData.get('search'))
      this.send(url.href)
    }
  }
}
</script>

<template>
  <form @submit.prevent="onSubnit" ref="form">
    <input type="text" name="search" id="search">
    <button type="submit">Найти</button>
    <!-- ⬇️ TODO -->
    <!-- sort -->
    <!-- subject (categories) -->
    <!-- etc? -->
  </form>
  <!-- example list, for debug only -->
  <ul v-if="data?.items">
    <li v-for="item in data.items" :key="item.etag">{{ item.volumeInfo.title }}</li>
  </ul>
  <p v-else-if="data?.error" class="error">
    Error: ({{ data.error.code }}) {{ data.error.message }}
  </p>
  <p v-else-if="error" class="error">
    Ошибка запроса
  </p>
</template>

<style scoped>
form {
  padding: 20px;
  display: flex;
  justify-content: center;
  color: #222;
  background-color: #41b883;
  box-shadow: 0 1px 2px 0 #35495e;
}

input,
button {
  padding: 5px;
  font: inherit;
  color: inherit;
}

.error {
  margin: 0;
  padding: 20px;
  background-color: tomato;
  color: #fff;
  text-align: center;
}
</style>