/* eslint-disable no-console */
/* eslint-disable no-console */
/* eslint-disable no-console */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */ /* eslint-disable no-plusplus */
<template>
<div>
    <p q-if="!nested" class="text-h6 text-capitalize">{{ context }}</p>
  <q-scroll-area
    horizontal
    v-if="details.length"
    class="bg-grey-1"
    style="height: 125px;"
  >
  <div class="row text-white bg-primary no-wrap">
    <div
      v-for="detail in details"
      :key="detail.id"
      class="q-px-xs text-center q-ma-xs bg-accent column flex items-center"
    >
      <div class="col" @click="showDetail(detail)">
        {{ detail.name }}
        <q-avatar
            class="text-center shadow-2 flex"
            size="5rem">
            <q-img :src="imgSrc(detail)" contain>
            <template v-slot:loading>
              <q-spinner-gears color="primary" />
            </template>
          </q-img>
        </q-avatar>
        <starship-detail
          v-if="['starships', 'vehicles'].includes(context)"
          :detail="detail"
          v-model="detail.show"
        />
        <people-detail
        v-model="detail.show"
        v-if="['people'].includes(context)"
        :detail="detail" />
        </div>
    </div>
  </div>
  </q-scroll-area>
</div>
</template>

<script>
import StarshipDetail from './StarshipDetail.vue';
import PeopleDetail from './DataDialog.vue';

export default {
  components: { StarshipDetail, PeopleDetail },
  name: 'DataDetail',
  props: {
    category: {
      type: String,
      required: true,
    },
    arrayOfIDs: {
      type: Array,
      default: () => ([]),
    },
    nested: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    show: {},
    context: null,
    details: [],
    slide: null,
  }),
  async created() {
    this.context = this.category === 'characters' ? 'people' : this.category;
    let i = 0;
    // const fetches = [];
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < this.arrayOfIDs.length; i++) {
      const id = this.arrayOfIDs[i];
      // eslint-disable-next-line no-await-in-loop
      const res = await fetch(`api/${this.context}/${id}`);
      // eslint-disable-next-line no-await-in-loop
      const item = await res.json();
      item.show = false;
      this.details = [...this.details, item];
    }
    this.slide = this.details[0].name;
  },
  computed: {},
  methods: {
    showDetail(dtl) {
      // eslint-disable-next-line no-console
      console.log(`Before: ${dtl.name}`, dtl.show);
      // this.show[dtl.name] = !this.show[dtl.name];
      dtl.show = !dtl.show;
      // eslint-disable-next-line no-console
      console.log(`After: ${dtl.name}`, dtl.show);
      return dtl.show;
    },
    imgSrc(dtl) {
      const imgURL = dtl.image ? dtl.image : `${dtl.name}.jpg`;
      const retURL = `api/${imgURL}`;
      // eslint-disable-next-line no-console
      // console.log(retURL);
      return retURL;
    },
  },
};
</script>

<style></style>
