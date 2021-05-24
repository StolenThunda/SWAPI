<template>
  <div class="col-12 col-md-5 shadow-6 bg-accent q-ma-md">
    <q-item>
      <q-item-section q-if="!nested" class="text-h6 text-capitalize">
        {{ category }}
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
          class="my-card"
          v-for="(detail, index) in details"
          :key="detail.id"
          :img-src="getImage(detail)"
          @click="showDetail(detail)"
        >
          <q-badge
            :label="index + 1 + ' of ' + details.length + ' item(s)'"
            class="absolute-top text-center"
          />
          <div class="">
            <span
              class="text-h5
                bg-accent
                text-white
                absolute-bottom
                text-center
                text-lowercase
                font-jedi"
            >
              {{ detail.title }}
            </span>
            <data-dialog :detail="detail" v-model="detail.show">
              <starship-detail
                v-if="category === 'starships'"
                v-bind="detail"
                v-model="detail.show"
              />
              <!-- <film-view
                v-if="category === 'films'"
                v-bind="detail"
                v-model="detail.show"
              />-->
              <character-view
                v-model="detail.show"
                v-if="['people'].includes(context)"
                v-bind="detail"
              />
            </data-dialog>
          </div>
        </q-carousel-slide>
        <template v-slot:control>
          <q-carousel-control
            position="top-right"
            :offset="[10, 5]"
            class="q-gutter-xs"
          >
            <q-btn
              push
              round
              dense
              color="orange"
              text-color="black"
              icon="arrow_left"
              @click="$refs.carousel.previous()"
            />
            <q-btn
              push
              round
              dense
              color="orange"
              text-color="black"
              icon="arrow_right"
              @click="$refs.carousel.next()"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
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
import { format, QSpinnerGears } from 'quasar';
import DataDialog from './DataDialog.vue';
import libImages from '../hooks/imageUtilities.js';

const { capitalize } = format;
export default {
  components: {
    DataDialog,
    CharacterView: () => import('./CharacterView.vue'),
    StarshipDetail: () => import('./StarshipDetail.vue'),
    // FilmView: () => import('./FilmView.vue'),
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
    placeholder: libImages.NoImageBase64URL,
  }),
  async created() {
    this.context = ['characters', 'residents'].includes(this.category)
      ? 'people'
      : this.category;
    let i = 0;
    const arrayLength = this.arrayOfIDs.length;
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < arrayLength; i++) {
      const completed = Math.floor((i / arrayLength) * 100);
      this.$q.loading.show({
        message: `Loading ${capitalize(
          this.category,
        )} completed: ${completed}%`,
        spinner: QSpinnerGears,
      });
      const id = this.arrayOfIDs[i];
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line no-await-in-loop
      const res = await fetch(`api/${this.context}/${id}`);
      // eslint-disable-next-line no-await-in-loop
      const item = await res.json();
      item.title = this.getTitle(item);
      item.show = false;
      this.details = [...this.details, item];
    }
    this.$q.loading.hide();
    this.slide = this.details[0].name
      ? this.details[0].name
      : this.details[0].title;
  },
  computed: {},
  methods: {
    getImage(dtl) {
      return libImages.ImgSrcFromObject(dtl);
    },
    getTitle: (detail) => (detail.name ? detail.name : detail.title),
    showDetail(dtl) {
      dtl.show = !dtl.show;
      return dtl.show;
    },
  },
};
</script>

<style></style>
