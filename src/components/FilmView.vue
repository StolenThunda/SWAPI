<template>
  <q-card class="my-card">
      <q-card-section class="text-center ">
        <div class="text-h5 font-jedi">{{ title }}</div>
        <div class="text-subtitle">Director: {{ director }}</div>
        <div class="text-caption">Producer: {{ producer }}</div>
        <q-separator dark inset />
      </q-card-section>
      <q-card-section class="text-body1 font-jedi">
        {{ opening_crawl }}
      </q-card-section>

      <q-card-section v-if="relatedFields">
        <q-list
          dense
          class="bg-primary q-ma-xs"
        >
          <q-expansion-item
          v-for="field in relatedFields"
          :key="field[0]"
            accordion
            expand-separator
            switch-toggle-side
            :group="film.title"
            :label="field[0]"
            class="q-mb-xs text-capitalize text-weight-bolder text-white"
            dense
          >
            <template #header class="">
              <q-badge color="accent" floating transparent align="middle"
                >{{ field[1].length }}
              </q-badge>
              <!-- <q-space /> -->
              <div class="text-h6 absolute-center text-uppercase">
              {{ field[0] }}
              </div>
            </template>
            <related-data-view
               :category="field[0]"
              :arrayOfIDs="field[1]"
              v-for="(field, index) in relatedFields"
              :key="field[0] + index">
            </related-data-view>
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
</template>
<script>
import RelatedDataView from './RelatedDataView.vue';

export default {
  components: { RelatedDataView },
  props: ['title', 'director', 'producer', 'opening_crawl'],
  created() {
    // convert $attrs to data
    Object.entries(this.$attrs).forEach(([k, v]) => {
      this[k] = v;
    });
  },
  computed: {
    relatedFields() {
      const fieldEntries = Object.entries(this.datum);
      const relationalFields = fieldEntries.filter(
        ([, v]) => Array.isArray(v) && v.length,
      );
      return relationalFields;
    },
  },
};
</script>
