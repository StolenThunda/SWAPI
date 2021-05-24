<template>
  <q-page>
    <q-toolbar inset>
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el
          :label="getCategory()"
          :icon="getIcon()"
          class="text-capitalize"
        />
      </q-breadcrumbs>
    </q-toolbar>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      infinite
      animated
      padding
      control-type="regular"
      control-color="primary"
      arrows
      class="q-ma-none shadow-1 rounded-borders carousel"
    >
      <q-carousel-slide
        v-for="(item, index) in collection"
        :name="'slide-' + (index + 1)"
        :key="item.id"
      >
        <slide-view :category="category" :datum="item">
          <template #content>
            <starship-detail v-if="category === 'starships'" v-bind="item" />
            <film-view v-if="category === 'films'" v-bind="item" />
            <character-view v-if="['people'].includes(category)" v-bind="item" />
          </template>
        </slide-view>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import swapi from 'src/hooks/swapi.js';
import SlideView from 'src/components/SlideView.vue';

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    StarshipDetail: () => import('src/components/StarshipDetail.vue'),
    FilmView: () => import('src/components/FilmView.vue'),
    SlideView,
  },
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
    this.category = this.$route.path.replaceAll('/', '');
    this.category = ['characters', 'residents'].includes(this.category) ? 'people' : this.category;
    this.collection = await swapi.fetchDataCategory(this.category);
  },
  computed: {
    categoryRoute() {
      return this.$route.path.replaceAll('/', '');
    },
  },
  methods: {
    updateCrumb(e) { this.datumTitle = e; },
    getCategory() { return `${this.categoryRoute} - ${this.datumTitle}`; },
    getIcon() {
      let icon = '';
      switch (this.categoryRoute) {
        case 'starships':
          icon = 'airplanemode_active';
          break;
        case 'vehicles':
          icon = 'toys';
          break;
        case 'species':
          icon = 'groups';
          break;
        case 'people':
          icon = 'person';
          break;
        default:
          icon = 'theaters';
          break;
      }
      // eslint-disable-next-line no-console
      console.log('icon', icon);
      return icon;
    },
  },
};
</script>

<style scoped>
.carousel {
  height: 88vh;
}
</style>
