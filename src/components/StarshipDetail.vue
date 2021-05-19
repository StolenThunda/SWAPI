/* eslint-disable vue/no-mutating-props */
<template>
  <q-dialog v-model="showDialog">
    <q-card class="my-card">
      <q-img :src="'api/' + detail.image" />

      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ detail.name }}
          </div>
          <div
            class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
          >
            <q-icon name="person" :title="detail.crew + ' crew member(s)'" />
            {{ detail.crew }}
          </div>
        </div>

      </q-card-section>
      <q-card-section class="q-pt-none">
         <div
            class="col-auto text-grey text-h6 text-capitalize q-pt-md column no-wrap "
          >
          <div>
            HyperDrive Rating: <q-rating
          v-model="rating"
          :max="5"
          size="32px"
          title="Hyper Drive Rating"
        />
          </div>
        <div>Cost: {{ detail.cost_in_credits }}</div>
        Known Pilots: {{ detail.pilots.length || 0 }}
        <data-detail
          v-if="detail.pilots.length"
          v-bind="pilots" /> <q-separator />
         </div>
        <div class="text-caption text-grey">
          <details>
            <legend>Statistics</legend>
            <pre>{{ detail }}</pre>
          </details>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import DataDetail from './DataDetail.vue';

export default {
  components: { DataDetail },
  name: 'StarshipDetail',
  props: {
    detail: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    showDialog: false,
  }),
  watch: {
    // eslint-disable-next-line func-names
    'detail.show': function (val) {
      this.showDialog = val;
    },
  },
  mounted() {
    this.showDialog = this.show;
  },
  computed: {
    rating() {
      return Math.ceil(this.detail.hyperdrive_rating);
    },
    pilots() {
      return { category: 'people', arrayOfIDs: this.detail.pilots };
    },
  },
};
</script>

<style></style>
