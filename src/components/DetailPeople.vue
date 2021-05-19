<template>
  <q-dialog v-model="showDialog" style="width: 50vw">
    <q-card class="my-card">
      <q-img :src="'api/' + detail.image">
        <div class="absolute-top text-h2 text-center ellipsis">
          {{ detail.name }}
        </div>
      </q-img>

      <q-card-section>
        <div class="row no-wrap items-center">
          <div
            class="col-auto text-grey text-h6 text-capitalize q-pt-md column no-wrap "
          >
            <div>
              Gender: <q-icon :name="`gender-${detail.gender}`" />{{ detail.gender }}
            </div>
            <div>Birth Year: {{ detail.birth_year }}
              <span v-if="detail.birth_year.includes('BBY')">(Before Battle of Yavin)</span>
              </div>
            <div>Skin Color: {{ detail.skin_color }}
            </div>
            <div>Hair Color: {{ detail.hair_color }}
            </div>
            <div>Eye Color: {{ detail.eye_color }}
            </div>
            <div>Height: {{ detail.height }}
            </div>
            <div>Mass: {{ detail.mass }}
            </div>
            <div>Home World:
              <data-detail category="planets" :arrayOfIDs="new Array(detail.homeworld)" />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div v-for="field in relatedFields" :key="field[0]">
          <data-detail
            :category="field[0]"
            :arrayOfIDs="field[1]"
          />
        </div>
        <!-- <q-separator />
        <div class="text-caption text-grey">
          <details>
            <legend>Statistics</legend>
            <pre>{{ detail }}</pre>
          </details>
        </div> -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import DataDetail from './DataDetail.vue';

export default {
  components: { DataDetail },
  name: 'PeopleDetail',
  props: ['detail'],
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
    rating() {
      return Math.floor(this.detail.hyperdrive_rating);
    },
    relatedFields() {
      const fieldEntries = Object.entries(this.detail);
      const relationalFields = fieldEntries.filter(
        ([, v]) => Array.isArray(v) && v.length,
      );
      return relationalFields;
    },
  },
  methods: {
    arrayify(val) { return [val]; },
  },
};
</script>

<style>
.my-card {
  width: 700px;
  max-width: 80vw;
}
</style>
