<template>
  <q-card>
    <q-card-section>
      <details>
        <legend>Debug Details</legend>
        <!-- <pre>
        {{ JSON.stringify($attrs, null, 2) }}
        </pre> -->
        <related-data-view
          :category="field[0]"
            :arrayOfIDs="field[1]"
            v-for="(field, index) in relatedFields"
            :key="field[0] + index" />
      </details>
    </q-card-section>
    <q-card-section>
      <div
        class="text-grey text-h6 text-capitalize q-pt-md column text-center no-wrap "
      >
        <div
          v-for="(k, v) in renderAttrs"
          :key="k + v"
          class="text-capitalize row"
        >
          <div class="col-6">{{ v.replaceAll("_", " ") }}:</div>
          <div class="col-6">
            {{ v === "homeworld" ? homeplanet : k }}
            <!-- {{ k }} -->
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import SWAPI from '../hooks/swapi.js';

export default {
  name: 'StatViewer',
  components: {
    RelatedDataView: () => import('./RelatedDataView'),
  },
  data: () => ({
    homeplanet: '',
  }),
  computed: {
    renderAttrs() {
      const filterKeys = [
        'id',
        'name',
        'title',
        'edited',
        'created',
        'image',
        'show',
      ];
      const arrayAttrs = Object.entries(this.$attrs);
      const arrayAsFilter = arrayAttrs.filter(
        ([key, value]) => !Array.isArray(value) && !filterKeys.includes(key),
      );
      const filterObject = Object.fromEntries(arrayAsFilter);
      return filterObject;
    },
    relatedFields() {
      return SWAPI.relatedFields(this.$attrs);
    },
  },
  async created() {
    this.homeplanet = await this.getHomeWorld(this.$attrs.homeworld);
  },
  methods: {
    async getHomeWorld(id = this.$attrs.homeworld) {
      // eslint-disable-next-line no-return-await
      return await SWAPI.fetchOne('planets', id, 'name').then((planet) => {
        // eslint-disable-next-line no-console
        console.log('planet', planet);
        return planet;
      });
    },
  },
};
</script>
