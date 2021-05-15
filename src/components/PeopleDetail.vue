<template>
  <div class="text-center flex justify-center" @click="show = !show">
    {{ detail.name }}
    <q-avatar>
      <q-img :src="'api/' + detail.image" contain>
        <template v-slot:loading>
          <q-spinner-gears color="white" />
        </template>
      </q-img>
    </q-avatar>
    <q-dialog v-model="show">
    <q-card class="my-card">
      <q-img :src="'api/' + detail.image"/>

      <q-card-section>
        <!-- <q-btn
          fab
          color="primary"
          icon="rocket"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        /> -->

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ detail.name }}
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="person" :title="detail.crew + ' crew members'" />
            {{ detail.crew }}
          </div>
        </div>

        <q-rating v-model="rating" :max="5" size="32px" title="Hyper Drive Rating" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
         Cost: {{ detail.cost_in_credits }}
        </div>
        <data-detail :category="people" :items="detail.pilots" />
              <q-separator />
        <div class="text-caption text-grey">
          <details>
            <legend>Statistics</legend>
          <pre>{{detail}}</pre>
          </details>
        </div>
      </q-card-section>
    </q-card>
    </q-dialog>
  </div>
</template>

<script>
import DataDetail from './DataDetail.vue';

export default {
  components: { DataDetail },
  name: 'StarshipDetail',
  props: ['detail'],
  data: () => ({
    show: false,
  }),
  computed: {
    rating() {
      return Math.floor(this.detail.hyperdrive_rating);
    },
  },
};
</script>

<style></style>
