/* eslint-disable no-console */
<template>
  <div class="row full-height flex justify-evenly">
   <q-img
     :src="imageSrc"
     spinner-color="white"
     class="col full-height"
     contain>
     </q-img>
      <q-card class="my-card ">

      <q-card-section class="text-center ">
        <div class="text-h5">{{ film.title }}</div>
        <div class="text-subtitle1">Director: {{ film.director }}</div>
        <div class="text-subtitle2">Producer: {{ film.producer }}</div>
      <q-separator dark inset />
      </q-card-section>
      <q-card-section class="text-body1">
        {{ film.opening_crawl }}
      </q-card-section>

       <q-card-section v-if="relatedFields">
        <q-list v-for="field in relatedFields" :key="field[0]" dense class="bg-primary q-ma-xs">
          <q-expansion-item
        expand-icon-toggle
        expand-separator
        :label="field[0]"
        class="text-capitalize text-weight-bold"
      >
      <base-carousel :category="field[0]" :items="field[1]">
        {{ field[1] }}
      </base-carousel>>

          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import BaseCarousel from './BaseCarousel.vue';

export default {
  components: { BaseCarousel },
  name: 'FilmBlurb',
  props: ['film'],
  computed: {
    imageSrc() {
      const defaultImageName = this.film.title.replaceAll(' ', '_').toLowerCase();
      const imgSrc = `api/${this.film.imag ? this.film.image : `${defaultImageName}.jpg`}`;
      console.log(defaultImageName, imgSrc);
      return imgSrc;
    },
    relatedFields() {
      const fieldEntries = Object.entries(this.film);
      const relationalFields = fieldEntries.filter(([, v]) => Array.isArray(v));
      return relationalFields;
      // return Object.fromEntries(relationalFields);
    },
  },
  methods: {

  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 550px
.my-img
  height: 75%
  width: 75%
  max-width: 90%
</style>
