<script setup>
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { stringsArrayToString } from '@/utils'

const storeApp = useAppStore()
const { openBook } = storeToRefs(storeApp)
const { clearOpenBook } = storeApp

// ["NOT_MATURE", "MATURE"]
const matureRating = "MATURE"
</script>
<template>
  <div @click.self="clearOpenBook" class="book-wrap">
    <div class="book">
      <div class="book__inner">
        <!-- imageLinks {smallThumbnail, thumbnail} -->
        <figure v-if="openBook.volumeInfo?.imageLinks?.thumbnail" class="book__cover">
          <img :src="openBook.volumeInfo?.imageLinks.thumbnail"
            class="book__image" alt="">
        </figure>
        <dl class="book__list">
          <!-- title -->
          <div v-if="openBook.volumeInfo?.title" class="book__title book__info">
            <dt>Название</dt>
            <dd>{{ openBook.volumeInfo.title }}</dd>
          </div>
          <!-- authors -->
          <div v-if="openBook.volumeInfo?.authors" class="book__info">
            <dt>Авторы</dt>
            <dd>{{ stringsArrayToString(openBook.volumeInfo.authors) }}</dd>
          </div>
          <!-- categories -->
          <div v-if="openBook.volumeInfo?.categories" class="book__info">
            <dt>Категории</dt>
            <dd>{{ stringsArrayToString(openBook.volumeInfo.categories) }}</dd>
          </div>
          <!-- publishedDate -->
          <div v-if="openBook.volumeInfo?.publishedDate" class="book__info">
            <dt>Дата публикации</dt>
            <dd>{{ openBook.volumeInfo.publishedDate }}</dd>
          </div>
          <!-- pageCount -->
          <div v-if="openBook.volumeInfo?.pageCount" class="book__info">
            <dt>Кол-во страниц</dt>
            <dd>{{ openBook.volumeInfo.pageCount }}</dd>
          </div>
          <!-- averageRating -->
          <div v-if="openBook.volumeInfo?.averageRating" class="book__info">
            <dt>Рейтинг</dt>
            <dd>{{ openBook.volumeInfo.averageRating }}</dd>
          </div>
          <!-- ratingsCount -->
          <div v-if="openBook.volumeInfo?.ratingsCount" class="book__info">
            <dt>Кол-во оценок</dt>
            <dd>{{ openBook.volumeInfo.ratingsCount }}</dd>
          </div>
          <!-- language -->
          <div v-if="openBook.volumeInfo?.language" class="book__info">
            <dt>Язык</dt>
            <dd>{{ openBook.volumeInfo.language }}</dd>
          </div>
        </dl>
      </div>

      <dl class="book__list book__list--description">
        <!-- description -->
        <div v-if="openBook.volumeInfo?.description" class="description">
          <dt>Описание книги</dt>
          <dd>{{ openBook.volumeInfo.description }}</dd>
        </div>

      </dl>
      <p v-if="openBook.volumeInfo?.maturityRating === matureRating" class="book__maturity-rating"
        aria-label="Рейтинг 18+">18+</p>
      <button @click="clearOpenBook" class="close" type="button"></button>
    </div>
  </div>
</template>
<style scoped>
.book-wrap {
  display: flex;
  margin: auto;
  overflow: auto;
}

.book {
  position: relative;
  margin: auto;
  padding: 40px;
  max-width: 900px;
  border-radius: 12px;
  background-color: #fff;
}

@media (max-width: 400px) {
  .book {
    padding: 20px;
  }
}

.close {
  position: absolute;
  right: -24px;
  top: -24px;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background-color: #ccc;
}

@media (max-width: 400px) {
  .close {
    right: -18px;
    top: -18px;
    width: 36px;
    height: 36px;
  }
}


.close:hover {
  background-color: #ddd;
}

.close:active {
  background-color: #eee;
}

.close::before,
.close::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 20px;
  height: 3px;
  background-color: #333;
}

.close::before {
  transform: translate(-50%, -50%) rotateZ(45deg);
}

.close::after {
  transform: translate(-50%, -50%) rotateZ(135deg);
}

.book__inner {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}
@media (max-width: 700px) {
  .book__inner {
    flex-direction: column;
}
}
.book__cover {
  margin: 0 auto;
  width: 140px;
  flex-shrink: 0;
}

.book__image {
  width: 100%;
}

.book__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
}

.book__list--description {
  width: 100%;
}

dd {
  margin: 0;
}

.book__info {
  display: flex;
  gap: 20px;
}

@media (max-width: 500px) {
  .book__info {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-bottom: 20px;
  }
}

.book__info dt {
  min-width: 200px;
  color: #555;
}

.book__info dd {
  flex-grow: 1;
}

.description dt {
  font-weight: bold;
  margin-bottom: 10px;
}

.description dd {
  text-align: justify;
}

.description dd::first-letter {
  padding-left: 30px;
}
.book__maturity-rating {
  position: absolute;
  margin: 0;
  padding: 10px;
  color: #fff;
  background-color: #f44;
  border-radius: 0 0 50% 0;
}
</style>