<template>
  <q-card>
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
           {{ k }}
            </div>
        </div>
        </div>
    </q-card-section>
  </q-card>
</template>

<script>

export default {
  name: 'StatViewer',
  computed: {
    renderAttrs() {
      const filterKeys = ['id', 'name', 'title', 'edited', 'created', 'image', 'show'];
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
