/* eslint-disable max-len */
<template>
  <q-dialog v-model="showDialog" class="shadow-12 rounded-borders">
    <div class="row flex justify-around items-start">
      <slot name="head">
        <div class="full-width text-h4 text-center bg-primary text-white q-pa-md">
          {{ detail.name ? detail.name : detail.title }}
        </div>
        <q-img
          style="width: 25vw;"
          class='fit'
          v-if="detail.image"
          :placeholder-src="placeholder"
          :src="'api/' + detail.image"
          @error="imgError"
        >
          <template v-slot:loading>
            <q-spinner-gears color="primary" />
          </template>
        </q-img>
      </slot>
      <slot>
        <stat-view v-bind="detail" class="fit" />
      </slot>
    </div>
  </q-dialog>
</template>

<script>
import StatView from './StatView.vue';
import utility from '../hooks/imageUtilities.js';

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
  methods: {
    imgError: (e) => utility.loadError(e),
  },
};
</script>

<style>
.my-card {
  width: 30vw;
  max-width: 60vw;
}
</style>
