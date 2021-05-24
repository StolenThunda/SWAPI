/* eslint-disable vue/no-mutating-props */
<template>
    <q-card class="my-card">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ name }}
          </div>
          <div
            class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
          >
            Crew: {{ crew }}
            <q-icon name="person" :title="crew + ' crew member(s)'" />
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
        <div>Cost: {{ cost_in_credits }}</div>
        Known Pilots: {{ pilots.length || 0 }}
        <related-data-view
          v-if="pilots.length"
          v-bind="retrievePilotInfo" /> <q-separator />
         </div>
        <div class="text-caption text-grey">
          <details>
            <legend>Statistics</legend>
            <pre>{{ $attrs }}</pre>
          </details>
        </div>
      </q-card-section>
    </q-card>
</template>

<script>
import RelatedDataView from './RelatedDataView.vue';

export default {
  components: { RelatedDataView },
  name: 'StarshipDetail',
  data: () => ({
    showDialog: false,
  }),
  watch: {
    // eslint-disable-next-line func-names
    show(val) {
      this.showDialog = val;
    },
  },
  created() {
    // convert $attrs to data
    Object.entries(this.$attrs).forEach(([k, v]) => {
      this[k] = v;
    });
  },
  mounted() {
    this.showDialog = this.show;
  },
  computed: {
    rating() {
      return Math.ceil(this.hyperdrive_rating);
    },
    retrievePilotInfo() {
      return { category: 'people', arrayOfIDs: this.pilots };
    },
  },
};
</script>

<style></style>
