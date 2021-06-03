<template>
  <q-card class="my-card">
    <!-- <q-card-section>
      <pre>{{$props}}</pre>
    </q-card-section> -->
    <q-card-section>
      <div class="row no-wrap items-center">
        <div
          class="col-auto text-grey text-h6 text-capitalize q-pt-md column no-wrap "
        >
          <div class="row">
            <span>Gender: {{ gender }}</span>
            <q-icon
              class="text-h4  col-6"
              :name="`mdi-gender-${gender}`"
              v-if="['male', 'female'].includes(gender)" />
          </div>
          <div>
            Birth Year: {{ birth_year }}
            <span v-if="birth_year.includes('BBY')"
              >(Before Battle of Yavin)</span
            >
          </div>
          <div>Skin Color: {{ skin_color }}</div>
          <div>Hair Color: {{ hair_color }}</div>
          <div>Eye Color: {{ eye_color }}</div>
          <div>Height: {{ height }}</div>
          <div>Mass: {{ mass }}</div>
          <div>Home World:</div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <slot name="relatedFields"></slot>
    </q-card-section>
  </q-card>
</template>

<script>

export default {
  name: 'CharacterView',
  props: [
    'name',
    'gender',
    'birth_year',
    'skin_color',
    'hair_color',
    'eye_color',
    'height',
    'mass',
    'homeworld',
    'image',
    'id',
  ],
  mounted() {
    this.$root.$emit('update-breadcrumb', this.name);
  },
};
</script>
