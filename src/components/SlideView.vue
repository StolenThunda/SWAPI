<template>
  <q-page>
  <div class="row items-start justify-around">
    <div
      class="q-py-lg
            font-jedi
            col-12
            text-h5
            text-center
            text-lowercase"
    >
    <div>
      <sup class="text-left">{{ order.index }} of {{ order.total }}</sup>
      </div>
      {{ identity() }}
    </div>
    <div class="q-pa-lg offset-2 col">
      <q-img
        :src="imageSrc()"
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
      <q-skeleton v-if="!datum" type="QAvatar" />
    </div>
    <div class="col-12 col-md-8">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
      >
        <q-tab name="info" label="Statistics" />
        <q-tab name="related" label="Related Data" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated class="rounded-borders">
        <q-tab-panel name="info" class="row flat wrap  flex flex-center">
          <slot class='fit'>
            <stat-view v-bind="datum" class='fit' />
          </slot>
        </q-tab-panel>
        <q-tab-panel name="related" class="row flat wrap  flex flex-center">
          <related-data-view
            :category="field[0]"
            :arrayOfIDs="field[1]"
            v-for="(field, index) in otherFields"
            :key="field[0] + index"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
  </q-page>
</template>

<script>
import utility from '../hooks/imageUtilities.js';
import SWAPI from '../hooks/swapi.js';

export default {
  components: {
    RelatedDataView: () => import('./RelatedDataView.vue'),
    StatView: () => import('./StatView.vue'),
  },
  name: 'SlideView',
  props: ['category', 'datum', 'order'],
  data: () => ({
    otherFields: null,
    tab: 'info',
    placeholder: utility.NoImageBase64URL,
  }),
  mounted() {
    const title = this.datum.name ? this.datum.name : this.datum.title;
    this.otherFields = SWAPI.relatedFields(this.datum);
    this.$root.$emit('update-breadcrumb', title);
  },
  methods: {
    imageSrc() { return utility.ImgSrcFromObject(this.datum); },
    identity() { return this.datum.name ? this.datum.name : this.datum.title; },
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
