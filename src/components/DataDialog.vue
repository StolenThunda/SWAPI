/* eslint-disable max-len */
<template>
  <q-dialog v-model="showDialog">
    <div class="row flex justify-around items-start">
      <slot name="head">
       <q-img
       v-if="detail.image"
      :placeholder-src="placeholder"
      :src="'api/' + detail.image">
          <template v-slot:loading>
            <q-spinner-gears color="primary" />
          </template>
          <!-- style="width: 25vw;" -->
          <div class="fixed-top text-h4 text-center bg-primary text-white">
            {{ detail.name ? detail.name : detail.title }}
            <details class="bg-primary full-width text-body1">
              <pre>{{ detail }}</pre>
            </details>
          </div>
        </q-img>
      </slot>
      <slot>
        <div
          v-if="!detail.image"
          class="full-width text-h4 text-center bg-primary text-white">
            {{ detail.name ? detail.name : detail.title }}
            <details class="bg-primary full-width text-body1">
              <pre>{{ detail }}</pre>
            </details>
          </div>
        <stat-view v-bind="detail" />
      </slot>
    </div>
  </q-dialog>
</template>

<script>
import StatView from './StatView.vue';
import utility from '../hooks/utility.js';

export default {
  name: 'DataDialog',
  components: { StatView },
  props: ['category', 'detail'],
  data: () => ({
    showDialog: false,
    placeholder: utility.NoImageBase64URL,
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
