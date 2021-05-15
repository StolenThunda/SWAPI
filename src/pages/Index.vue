<template>
  <q-page>
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
      class="full-height bg-grey-2 shadow-1 rounded-borders absolute-full"
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
