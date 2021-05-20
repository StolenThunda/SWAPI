/* eslint-disable no-console */
<template>
<q-page>
  <div class="font-jedi-outline text-h2 text-center ellipsis text-lowercase">
              {{ datum.name }}
            </div>
  <div class="row full-height flex justify-around items-start">
    <q-img
      :src="imageSrc"
      spinner-color="primary"
      class="my-img"
      contain
    >
      <!-- style="max-width: 25vw;height: 70vh" -->
    <template v-slot:loading>
              <q-spinner-gears color="primary" />
            </template>
    </q-img>
    <div>
      <detail-view v-bind="datum" />
      <div v-for="(field, index) in relatedFields" :key="field[0] + index">
        <data-detail :category="field[0]" :arrayOfIDs="field[1]" />
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
import DataDetail from './DataDetail.vue';
import DetailView from './DetailView.vue';

export default {
  components: {
    DataDetail,
    DetailView,
  },
  name: 'DataView',
  props: ['category', 'datum'],
  mounted() {
    const title = this.datum.name ? this.datum.name : this.datum.title;
    this.$root.$emit('update-breadcrumb', title);
  },
  computed: {
    imageSrc() {
      const title = this.datum.name ? this.datum.name : this.datum.title;
      const defaultImageName = title
        .replace(/[ /]/g, '_')
        .toLowerCase();
      const imgSrc = `api/${
        this.datum.image ? this.datum.image : `${defaultImageName}.jpg`
      }`;
      return imgSrc;
    },
    relatedFields() {
      const fieldEntries = Object.entries(this.datum);
      const relationalFields = fieldEntries.filter(([, v]) => Array.isArray(v) && v.length);
      return relationalFields;
    },
  },
  methods: {},
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
