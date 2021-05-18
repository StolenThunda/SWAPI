/* eslint-disable no-await-in-loop */ /* eslint-disable no-plusplus */
<template>
  <q-scroll-area
    horizontal
    v-if="details.length"
    class="row bg-grey-1 no-wrap"
    style="height: 150px;"
  >
    <div
      v-for="detail in details"
      :key="detail.id"
      class="column col q-pa-sm  q-ma-sm bg-accent flex items-center"
    >
      <div style="width: 150px" @click="show = !show" class="col">
        {{ detail.name }}
        <q-avatar class="text-center shadow-2 flex" size="5rem">
          <q-img :src="'api/' + detail.image" contain>
            <template v-slot:loading>
              <q-spinner-gears color="primary" />
            </template>
          </q-img>
        </q-avatar>
        <!-- <starship-detail :detail="detail" /> -->
        <starship-detail
          v-if="['starships', 'vehicles'].includes(context)"
          :detail="detail"
        />
        <people-detail v-if="['people'].includes(context)" :detail="detail" />
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
import StarshipDetail from './StarshipDetail.vue';
import PeopleDetail from './DetailPeople.vue';

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
    for (i = 0; i < this.arrayOfIDs.length; i++) {
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
