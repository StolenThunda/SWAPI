/* eslint-disable no-await-in-loop */ /* eslint-disable no-plusplus */
<template>
  <div v-if="details.length">
    <q-scroll-area
      horizontal
      style="height: 150px;"
      class="bg-grey-1 rounded-borders"
    >
      <div class="row no-wrap">
        <div v-for="detail in details" :key="detail.id" style="width: 150px" class="q-pa-sm">
        <starship-detail  :detail="detail" />
        <!-- <starship-detail v-if="category === 'starships'" :detail="detail" /> -->
        <people-detail v-if="category === 'people'" :detail="detail" />
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import StarshipDetail from './StarshipDetail.vue';
import PeopleDetail from './PeopleDetail.vue';

export default {
  components: { StarshipDetail, PeopleDetail },
  name: 'DataDetail',
  props: ['category', 'arrayOfIDs'],
  data: () => ({
    context: null,
    details: [],
    slide: null,
  }),
  async created() {
    this.context = this.category === 'characters' ? 'people' : this.category;
    let i = 0;
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < this.arrayOfIDs.length - 1; i++) {
      const id = this.arrayOfIDs[i];
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
