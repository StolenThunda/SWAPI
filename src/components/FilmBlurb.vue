/* eslint-disable no-console */
<template>
  <div class=" row full-height ">
   <q-img
     :src="imageSrc"
     spinner-color="white"
     class="col full-height"
     contain />
      <q-card class="my-card col-10 full-height">

      <q-card-section class="text-center">
             <div class="text-h5">{{ film.title }}</div>
        <div class="text-subtitle2">Director {{ film.director }}</div>
        <div class="text-subtitle2">Producer: {{ film.producer }}</div>
      </q-card-section>
      <q-separator dark inset />
      <q-card-section class="text-body1">
        {{ film.opening_crawl }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'FilmBlurb',
  props: ['film'],
  computed: {
    imageSrc() {
      const defaultImageName = this.film.title.replaceAll(' ', '_').toLowerCase();
      const imgSrc = `api/${this.film.imag ? this.film.image : `${defaultImageName}.jpg`}`;
      console.log(this.film.image, defaultImageName, imgSrc);
      return imgSrc;
    },
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
