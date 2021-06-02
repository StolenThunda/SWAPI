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
       <q-space />
        <q-input
            v-if="$route.fullPath.length > 1"
            standout
            clearable
            v-model="search"
            input-class="text-right"
            @input="filterBySearch"
            class="q-ml-md">
            <template #prepend>
            <q-icon name='search' />
          </template>
        </q-input>
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
        <slide-view
          :category="category"
          :datum="item"
          :order="{index: index + 1 , total: collection.length}">
          <!-- <template #content> -->
            <starship-detail v-if="category === 'starships'" v-bind="item" />
            <film-view v-if="category === 'films'" v-bind="item" />
            <!-- <character-view v-if="['people'].includes(category)" v-bind="item" /> -->
          <!-- </template> -->
        </slide-view>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import SWAPI from 'src/hooks/swapi.js';
import SlideView from 'src/components/SlideView.vue';

export default {
  components: {
    SlideView,
    StarshipDetail: () => import('src/components/StarshipDetail.vue'),
    FilmView: () => import('src/components/FilmView.vue'),
    // CharacterView: () => import('src/components/CharacterView.vue'),
  },
  name: 'CategoryCarousel',
  data: () => ({
    baseCollection: [],
    collection: [],
    category: '',
    slide: 'slide-1',
    datumTitle: '',
    search: '',
  }),
  async created() {
    // eslint-disable-next-line no-console
    this.$root.$on('update-breadcrumb', this.updateCrumb);
    this.category = this.$route.path.replaceAll('/', '');
    this.category = ['characters', 'residents'].includes(this.category) ? 'people' : this.category;
    this.baseCollection = await SWAPI.fetchDataCategory(this.category);
    this.collection = this.baseCollection;
  },
  computed: {
    categoryRoute() {
      return this.$route.path.replaceAll('/', '');
    },
  },
  methods: {
    filterBySearch() {
      this.collection = this.baseCollection.filter(
        (obj) => {
          const ident = obj.name ? obj.name : obj.title;
          // eslint-disable-next-line no-console
          // console.log(ident, this.search);
          // eslint-disable-next-line no-console
          const found = ident.startsWith(this.search);
          // eslint-disable-next-line no-console
          if (found) console.log(ident, found);
          return found;
        },
      );
    },
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
