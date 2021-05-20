<template>
  <q-card class="my-card">
     <q-card-section>
      <div class="row no-wrap items-center">
        <div
          class="col-auto text-grey text-h6 text-capitalize q-pt-md column no-wrap "
         >
        <div
            v-for="(k, v) in renderAttrs"
            :key="k + v"
            class="text-capitalize">
          {{ v.replaceAll('_', ' ') }}: {{ k }}
        </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>

export default {
  name: 'PlanetView',
  computed: {
    renderAttrs() {
      const filterKeys = ['id', 'name', 'title', 'edited', 'created'];
      const arrayAttrs = Object.entries(this.$attrs);
      const arrayAsFilter = arrayAttrs.filter(
        ([key, value]) => !Array.isArray(value) && !filterKeys.includes(key),
      );
      const filterObject = Object.fromEntries(arrayAsFilter);
      return filterObject;
    },
  },
};
</script>
