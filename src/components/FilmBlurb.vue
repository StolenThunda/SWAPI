/* eslint-disable no-console */
<template>
  <div class="row full-height flex justify-evenly items-center">
    <q-img
      :src="imageSrc"
      spinner-color="white"
      class="col full-height"
      contain
    >
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
        <q-list
          v-for="field in relatedFields"
          :key="field[0]"
          dense
          class="bg-primary q-ma-xs"
        >
          <q-expansion-item
            accordion
            expand-separator
            switch-toggle-side
            :group="film"
            :label="field[0]"
            class="text-capitalize text-weight-bolder"
            dense
          >
            <template #header class="text-center items-center">
              <q-badge color="accent" floating transparent
                >{{ field[1].length }}
              </q-badge>
              <!-- <q-space /> -->
              <div class="q-pr-md">
              {{ field[0] }}
              </div>
            </template>
            <data-detail :category="field[0]" :arrayOfIDs="field[1]">
            </data-detail>
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import DataDetail from './DataDetail.vue';

export default {
  components: { DataDetail },
  name: 'FilmBlurb',
  props: ['film'],
  computed: {
    imageSrc() {
      const defaultImageName = this.film.title
        .replace(/[ /]/g, '_')
        .toLowerCase();
      const imgSrc = `api/${
        this.film.image ? this.film.image : `${defaultImageName}.jpg`
      }`;
      return imgSrc;
    },
    relatedFields() {
      const fieldEntries = Object.entries(this.film);
      const relationalFields = fieldEntries.filter(([, v]) => Array.isArray(v));
      return relationalFields;
    },
  },
  methods: {},
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
