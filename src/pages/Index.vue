<template>
  <q-page>
     <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      infinite
      swipeable
      animated
      navigation
      padding
      arrows
      height="100%"
      class="bg-blue-9 shadow-1 rounded-borders absolute-full"
    >
     <q-carousel-slide
        :name="'slide-' + film.id"
        v-for="film in films"
        :key="film.id">
        <film-blurb :film="film" />
      </q-carousel-slide>
     </q-carousel>
  </q-page>
</template>

<script>
import FilmBlurb from 'src/components/FilmBlurb.vue';

export default {
  components: { FilmBlurb },
  name: 'PageIndex',
  props: ['films'],
  data: () => ({
    slide: 'slide-4',
  }),
};
</script>
