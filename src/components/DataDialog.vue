<template>
  <q-dialog v-model="showDialog">
    <character-view v-if="category === 'people'" v-bind="detail" />
    <film-view v-if="category === 'films'" v-bind="detail" />
  </q-dialog>
</template>

<script>
import CharacterView from './CharacterView.vue';

export default {
  name: 'DataDialog',
  components: { CharacterView },
  props: ['category', 'detail'],
  data: () => ({
    showDialog: false,
  }),
  watch: {
    // eslint-disable-next-line func-names
    'detail.show': function (val) {
      this.showDialog = val;
    },
  },
  computed: {
    relatedFields() {
      const fieldEntries = Object.entries(this.detail);
      const relationalFields = fieldEntries.filter(
        ([, v]) => Array.isArray(v) && v.length,
      );
      return relationalFields;
    },
  },
};
</script>

<style>
.my-card {
  width: 30vw;
  max-width: 60vw;
}
</style>
