/* eslint-disable no-console */
<template>
  <div class="row items-start justify-around">
    <div
      class="q-py-lg font-jedi-outline text-h2 col-12 text-center ellipsis text-lowercase"
    >
      {{ datum.name ? datum.name : datum.title }}
    </div>
    <div class="q-pa-lg col-12 col-md-5 full-height">
      <q-img
        :src="imageSrc"
        :alt="datum.name"
        :title="datum.name"
        spinner-color="primary"
        class=""
        @error="imageLoadError"
        :placeholder-src="placeholder"
        contain
      >
        <template v-slot:loading>
          <q-spinner-gears color="primary" />
        </template>
      </q-img>
      <!-- <q-skeleton v-if="!datum" type="QAvatar" /> -->
    </div>
    <div class="offset-1 col-12 col-md-6">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
      >
        <!-- align="justify" -->
        <q-tab name="main" label="Data" />
        <q-tab name="related" label="Related" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated class="rounded-borders">
        <q-tab-panel name="main">
          <slot name="content">
            <stat-view v-bind="datum" />
          </slot>
        </q-tab-panel>
        <q-tab-panel name="related" class="row flat wrap ">
          <related-data-view
            :category="field[0]"
            :arrayOfIDs="field[1]"
            v-for="(field, index) in relatedFields"
            :key="field[0] + index"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import RelatedDataView from './RelatedDataView.vue';
import StatView from './StatView.vue';
import utility from '../hooks/imageUtilities.js';
import SWAPI from '../hooks/swapi.js';

export default {
  components: {
    StatView,
    RelatedDataView,
  },
  name: 'SlideView',
  props: ['category', 'datum'],
  data: () => ({
    relatedFields: null,
    tab: 'related',
    placeholder: utility.NoImageBase64URL,
  }),
  mounted() {
    const title = this.datum.name ? this.datum.name : this.datum.title;
    // eslint-disable-next-line no-console
    console.log(SWAPI);
    this.relatedFields = SWAPI.relatedFields(this.datum);
    this.$root.$emit('update-breadcrumb', title);
  },
  computed: {
    imageSrc() {
      const title = this.datum.name ? this.datum.name : this.datum.title;
      const defaultImageName = title.replace(/[ /]/g, '_').toLowerCase();
      const imgSrc = `api/${
        this.datum.image ? this.datum.image : `${defaultImageName}.jpg`
      }`;
      return imgSrc;
    },
  },
  methods: {
    imageLoadError(e) {
      // eslint-disable-next-line no-console
      console.log('err', e);
    },
  },
};
</script>

<style lang="sass" scoped>
.relatedFields
  flex-grow: 1
.my-card
  width: 100%
  max-width: 550px
.my-img
  height: 33%
  width: 33%
  max-width: 50%
</style>
