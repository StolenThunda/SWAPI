<template>
  <q-layout view="hHh lpR fFf">
    <!-- <q-header>
      <q-toolbar>
      <slot></slot>
      </q-toolbar>
    </q-header> -->

    <q-drawer :value="drawerState" side="left" elevated>
      <q-scroll-area class='fit'>
        <q-item
          clickable
          v-for="(item, index) in collection"
          :key="index"
          @click="viewItem(index + 1)"
        >
          {{ identity(item) }}
        </q-item>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="q-ma-none q-pa-none">
      <q-carousel
        ref="carousel"
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        infinite
        animated
        padding
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
        control-type="regular"
        control-color="primary"
        arrows
        class="q-ma-none shadow-1 rounded-borders carousel fit"
      >
        <q-carousel-slide
          v-for="(item, index) in collection"
          :name="'slide-' + (index + 1)"
          :key="item.id"
        >
          <slide-view
            :category="category"
            :datum="item"
            :order="{ index: index + 1, total: collection.length }"
          >
            <starship-detail v-if="category === 'starships'" v-bind="item" />
            <film-view v-if="category === 'films'" v-bind="item" />
          </slide-view>
        </q-carousel-slide>
      </q-carousel>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  props: ['collection', 'category', 'drawerState'],
  components: {
    SlideView: () => import('src/components/SlideView.vue'),
    StarshipDetail: () => import('src/components/StarshipDetail.vue'),
    FilmView: () => import('src/components/FilmView.vue'),
  },
  data() {
    return {
      // values: [],
      left: false,
      slide: 'slide-1',
    };
  },
  // created() {
  //   this.syncData();
  // },
  watch: {
    drawerState() {
      this.left = this.drawerState;
    },
  },
  methods: {
    // syncData() { this.values = this.collection; },
    viewItem(index) {
      this.$refs.carousel.goTo(`slide-${index}`);
      this.left = false;
    },
    identity(item) {
      return item.name ? item.name : item.title;
    },
  },
};
</script>

<style scoped>
.carousel {
  height: 88vh;
}
</style>
