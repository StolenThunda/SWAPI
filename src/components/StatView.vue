<template>
  <q-card>
    <!-- <q-card-section>
      Stat View
      <details>
        <legend>Debug Details</legend>
        <pre>
        {{ JSON.stringify($attrs, null, 2)}}
        </pre>
      </details>
    </q-card-section> -->
     <q-card-section>
        <div
          class="text-grey text-h6 text-capitalize q-pt-md column text-center no-wrap "
         >
        <div
            v-for="(k, v) in renderAttrs"
            :key="k + v"
            class="text-capitalize row">
            <div class="col-6">
              {{ v.replaceAll('_', ' ') }}:
            </div>
            <div class="col-6">
           {{ v === 'homeworld' ? getHomeWorld(k) : k }}
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
  data: () => ({
    homeworld: '',
  }),
  computed: {
    renderAttrs() {
      const filterKeys = ['id', 'name', 'title', 'edited', 'created', 'image', 'show'];
      const arrayAttrs = Object.entries(this.$attrs);
      const arrayAsFilter = arrayAttrs.filter(
        ([key, value]) => !Array.isArray(value) && !filterKeys.includes(key),
      );
      const filterObject = Object.fromEntries(arrayAsFilter);
      if (filterObject.homeworld) filterObject.homeplanet = this.getHomeWorld();
      return filterObject;
    },
  },
  methods: {
    async getHomeWorld(id = this.$attrs.homeworld) {
      // eslint-disable-next-line no-return-await
      return await SWAPI.fetchOne('planets', id, 'name')
        .then((planet) => {
          // eslint-disable-next-line no-console
          console.log('planet', planet);
          return planet;
        });
      // eslint-disable-next-line no-console
    },
  },
};
</script>
