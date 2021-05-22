/* eslint-disable no-console */
<template>
  <q-page>
    <div
      class="q-py-lg font-jedi-outline text-h2 text-center ellipsis text-lowercase"
    >
      {{ datum.name }}
    </div>
    <div
      class="row full-height flex justify-center items-stretch content-around"
    >
      <q-img
        :src="imageSrc"
        :alt="datum.name"
        :title="datum.name"
        spinner-color="primary"
        class="my-img col flex-center offset-2"
        @error="imageLoadError"
        :placeholder-src="placeholder"
        contain
      >
        <template v-slot:loading>
          <q-spinner-gears color="primary" />
        </template>
      </q-img>
      <div class="offset-2 col">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="main" label="Data" />
          <q-tab name="related" label="Related" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated class="shadow-2 rounded-borders">
          <q-tab-panel name="main">
            <slot name="content">
            <stat-view v-bind="datum" />
            </slot>
          </q-tab-panel>
          <q-tab-panel name="related">
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
  </q-page>
</template>

<script>
import RelatedDataView from './RelatedDataView.vue';
import StatView from './StatView.vue';
import utility from '../hooks/imageUtilities.js';

export default {
  components: {
    StatView,
    RelatedDataView,
  },
  name: 'SlideView',
  props: ['category', 'datum'],
  data: () => ({
    tab: 'related',
    placeholder: utility.NoImageBase64URL,
  }),
  mounted() {
    const title = this.datum.name ? this.datum.name : this.datum.title;
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
    relatedFields() {
      const fieldEntries = Object.entries(this.datum);
      const relationalFields = fieldEntries.filter(
        ([, v]) => Array.isArray(v) && v.length,
      );
      return relationalFields;
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
