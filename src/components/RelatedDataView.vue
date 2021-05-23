<template>
  <div class="col-12 col-md-5 shadow-6 bg-accent q-ma-md">
    <q-item>
      <q-item-section q-if="!nested" class="text-h6 text-capitalize">
      {{ context }}
      </q-item-section>
       <q-item-section side top>
      <q-badge :label="details.length + ' item(s)'" />
        </q-item-section>
      </q-item>
    <div>
      <q-carousel
        ref="carousel"
        v-model="slide"
        transition-prev="flip-left"
        transition-next="flip-right"
        animated
        infinite
        class="rounded-borders"
      >
        <q-carousel-slide
          :name="detail.title"
          class="column flex-center fit"
          v-for="detail in details"
          :key="detail.id"
          :img-src="'api/' + detail.image" @click="showDetail(detail)"
        >
          <div>
            <span
                class='text-h6
                absolute-bottom
                bg-secondary
                text-center
                text-lowercase
                font-jedi'>  {{ detail.title }}
            </span>
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
              <character-view
                v-model="detail.show"
                v-if="['people'].includes(context)"
                v-bind="detail"
              />
            </data-dialog>
          </div>
        </q-carousel-slide>
      <template v-slot:control >
        <q-carousel-control
          position="top-right"
          :offset="[10, 5]"
          class="q-gutter-xs"
        >
          <q-btn
            push round dense color="orange" text-color="black" icon="arrow_left"
            @click="$refs.carousel.previous()"
          />
          <q-btn
            push round dense color="orange" text-color="black" icon="arrow_right"
            @click="$refs.carousel.next()"
          />
        </q-carousel-control>
      </template>
      </q-carousel>
      <!-- <div class="row justify-center">
        <q-btn-toggle
          glossy
          v-model="slide"
          :options="options"
        />
      </div> -->
    </div>
    <!-- <q-scroll-area
      horizontal
      v-if="details.length"
      style="height: 150px"
      class="gt-xl"
      >
      <div
        class="row flex text-center text-white no-wrap">
        <div
          v-for="detail in details"
          :key="detail.id"
          class="q-px-md q-ma-auto column flex items-center"
        >
          <div class="col-2 q-mb-lg" @click="showDetail(detail)">
            {{ detail.name ? detail.name : detail.title }}
            <q-avatar class="text-centerflex q-pt-md" size="5rem">
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
             <character-view
        v-model="detail.show"
        v-if="['people'].includes(context)"
        v-bind="detail" />
            </data-dialog>
          </div>
        </div>
      </div>
    </q-scroll-area> -->
  </div>
</template>

<script>
import DataDialog from './DataDialog.vue';
import utility from '../hooks/imageUtilities.js';

export default {
  components: {
    // CharacterView: () =>import('./CharacterView.vue'),
    DataDialog,
    StarshipDetail: () => import('./StarshipDetail.vue'),
    FilmView: () => import('./FilmView.vue'),
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
      item.title = this.getTitle(item);
      item.show = false;
      this.details = [...this.details, item];
    }
    this.slide = this.details[0].name;
  },
  computed: {},
  methods: {
    getTitle: (detail) => (detail.name ? detail.name : detail.title),
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
