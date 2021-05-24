/* eslint-disable max-len */
<template>
     <!-- <q-scroll-area
      :thumb-style="thumbStyle"
      style="height: 200px; max-width: 300px;"
    > -->
  <q-dialog v-model="showDialog" class="shadow-12 rounded-borders">
    <div class="row flex justify-around items-start">
      <slot name="head">
        <div class="full-width text-h4 text-center bg-primary text-white q-pa-md">
          {{ detail.name ? detail.name : detail.title }}
        </div>
        <q-img
          style="width: 25vw;"
          class='fit'
          :placeholder-src="placeholder"
          :src="getImage"
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
     <!-- </q-scroll-area> -->
</template>

<script>
import StatView from './StatView.vue';
import libImages from '../hooks/imageUtilities.js';

export default {
  name: 'DataDialog',
  components: { StatView },
  props: ['category', 'detail'],
  data: () => ({
    showDialog: false,
    placeholder: libImages.NoImageBase64URL,
    thumbStyle: {
      right: '4px',
      borderRadius: '5px',
      backgroundColor: '#027be3',
      width: '5px',
      opacity: 0.75,
    },
  }),
  watch: {
    // eslint-disable-next-line func-names
    'detail.show': function (val) {
      this.showDialog = val;
    },
  },
  computed: {
    getImage() { return libImages.ImgSrcFromObject(this.detail); },
  },
  methods: {
    imgError: (e) => libImages.loadError(e),
  },
};
</script>

<style>
.my-card {
  width: 30vw;
  max-width: 60vw;
}

</style>
