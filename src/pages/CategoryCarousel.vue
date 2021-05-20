<template>
<div>
  <q-toolbar inset>
  <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/" />
      <q-breadcrumbs-el :label="$route.path.replaceAll('/','')" class="text-capitalize"/>
      <q-breadcrumbs-el icon="movie" :label="datumTitle" />
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
      class="q-ma-none bg-grey-2 shadow-1 rounded-borders carousel"
    >
     <q-carousel-slide
        :name="'slide-' + item.id"
        v-for="item in collection"
        :key="item.id">
        <data-view :category='category' :datum="item" />
      </q-carousel-slide>
     </q-carousel>
</div>
</template>

<script>
import swapi from 'src/hooks/swapi.js';
import DataView from 'src/components/DataView.vue';

export default {
  components: { DataView },
  name: 'CategoryCarousel',
  data: () => ({
    collection: [],
    category: '',
    slide: 'slide-1',
    datumTitle: '',
  }),
  async created() {
    // eslint-disable-next-line no-console
    this.$root.$on('update-breadcrumb', this.updateCrumb);
    // eslint-disable-next-line no-console
    console.log(this.$route.path);
    this.category = this.$route.path.replaceAll('/', '');
    this.collection = await swapi.fetchDataCategory(this.category);
  },
  computed: {
    getCategory() { return this.$route.path.replaceAll('/', ''); },
    // getIcon() {
    //   let icon = 'films'
    //   switch (this.getCategory()) {
    //     case 'films':
    //       return 'movie_open';
    //       break;
    //     default:
    //       break;
    //   }
    // }
  },
  methods: {
    updateCrumb(e) {
      // eslint-disable-next-line no-console
      console.log('new title', e);
      this.datumTitle = e;
    },
  },
};
</script>

<style scoped>
.carousel {
  height: 88vh;
}
</style>
