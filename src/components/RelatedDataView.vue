<template>
  <div class="col-5 shadow-6 bg-accent">
    <p q-if="!nested" class="text-h6 text-capitalize">{{ context }}</p>
 <q-scroll-area
      horizontal
      v-if="details.length"
      style="height: 125px;"
      >
      <div class="row text-white no-wrap fit">
        <div
          v-for="detail in details"
          :key="detail.id"
          class="q-px-xs text-center q-ma-xs column flex items-center"
        >
          <div class="col " @click="showDetail(detail)">
            {{ detail.name ? detail.name : detail.title }}
            <q-avatar class="text-center shadow-2 flex" size="5rem">
              <q-img
                :placeholder-src="placeholder"
                :src="imgSrc(detail)"
                contain
              >
                <template v-slot:loading>
                  <q-spinner-gears color="primary" />
                </template>
              </q-img>
            </q-avatar>
            <!-- <stat-view v-bind="detail" /> -->
            <data-dialog :detail="detail" v-model="detail.show">
              <starship-detail
                v-if="category === 'starships'"
                v-bind="detail"
                v-model="detail.show"
              />
              <film-view
                v-if="category === 'films'"
                v-bind="detail"
                v-model="detail.show"
              />
            </data-dialog>
            <!-- <character-view
        v-model="detail.show"
        v-if="['people'].includes(context)"
        v-bind="detail" /> -->
          </div>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import DataDialog from './DataDialog.vue';
import utility from '../hooks/imageUtilities.js';

export default {
  components: {
    // CharacterView: () =>import('./CharacterView.vue'),
    DataDialog,
  },
  name: 'RelatedData',
  props: {
    category: {
      type: String,
      required: true,
    },
    arrayOfIDs: {
      type: Array,
      default: () => [],
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
    placeholder: utility.NoImageBase64URL,
  }),
  async created() {
    this.context = ['characters', 'residents'].includes(this.category)
      ? 'people'
      : this.category;
    let i = 0;
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
      dtl.show = !dtl.show;
      return dtl.show;
    },
    imgSrc(dtl) {
      const ident = dtl.name ? dtl.name : dtl.title;
      const imgURL = dtl.image ? dtl.image : `${ident.replaceAll(' ', '_').toLowerCase()}.jpg`;
      const retURL = `api/${imgURL}`;
      // eslint-disable-next-line no-console
      console.log(retURL);
      return retURL;
    },
  },
};
</script>

<style></style>
