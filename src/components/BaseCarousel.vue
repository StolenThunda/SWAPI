/* eslint-disable no-await-in-loop */ /* eslint-disable no-plusplus */
<template>
  <div v-if="details.length">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      padding
      arrows
      autoplay
      height="150px"
      control-color="primary"
      class="rounded-borders"
    >
      <q-carousel-slide
        v-for="detail in details"
        :key="detail.id"
        :name="detail.name"
        class="column no-wrap flex-center"
      >
       <starship-detail :detail="detail" />
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import StarshipDetail from './StarshipDetail.vue';

export default {
  components: { StarshipDetail },
  name: 'BaseCarousel',
  props: ['category', 'items'],
  data: () => ({
    context: null,
    details: [],
    slide: null,
  }),
  async created() {
    this.context = this.category === 'characters' ? 'people' : this.category;
    let i = 0;
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < this.items.length - 1; i++) {
      const id = this.items[i];
      // eslint-disable-next-line no-await-in-loop
      const res = await fetch(`api/${this.context}/${id}`);
      // eslint-disable-next-line no-await-in-loop
      const item = await res.json();
      this.details.push(item);
    }
    this.slide = this.details[0].name;
  },
};
</script>

<style></style>
