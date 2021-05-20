<template>
  <q-page>
    <q-toolbar inset>
   <q-breadcrumbs class="text-grey">
      <q-breadcrumbs-el icon="home" />
      <q-breadcrumbs-el icon="widgets" />
      <q-breadcrumbs-el icon="navigation" />
    </q-breadcrumbs>
    </q-toolbar>
     <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      infinite
      animated
      navigation
      padding
      control-type="regular"
      control-color="primary"
      arrows
      class="bg-grey-2 shadow-1 rounded-borders"
    >
     <q-carousel-slide
        :name="'slide-' + person.id"
        v-for="person in people"
        :key="person.id">
        <!-- <film-blurb :film="film" /> -->
      </q-carousel-slide>
     </q-carousel>
  </q-page>
</template>

<script>
// import FilmBlurb from 'src/components/FilmBlurb.vue';
import swapi from 'src/hooks/swapi.js';

export default {
  // components: { FilmBlurb },
  name: 'CharacterCarousel',
  data: () => ({
    people: [],
    slide: 'slide-4',
  }),
  async created() {
    this.people = await swapi.fetchDataCategory('people');
  },
};
</script>
