/* eslint-disable max-len */
<template>
  <div class="stars ">
    <div class="twinkling"></div>
    <div class="clouds"></div>
    <div class="row flex flex-center justify-center q-gutter-md">
      <h4 class="col-12 text-center text-primary font-jedi q-pt-lg q-pt-xl">
        Choose a Category
      </h4>
      <div
        class="navImage q-ma-lg col-2"
        v-for="category in categories"
        :key="category.title"
      >
        <q-img
          class="q-px-lg"
          :src="'api/' + category.image"
          spinner-color="white"
          contain
          ratio="1"
          style="height: 30vh; max-width: 20vw"
        >
          <div :class="linkClasses">
            <router-link
              :to="
                `/${
                  category.title === 'characters' ? 'people' : category.title
                }`
              "
            >
              {{ category.title }}
            </router-link>
          </div>
        </q-img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data: () => ({
    linkClasses: [
      'absolute-bottom',
      'text-h4',
      'text-lowercase',
      'font-jedi',
      'text-center',
      'bg-primary',
      'text-white',
    ].join(' '),
    categories: [
      {
        title: 'films',
        image: 'a_new_hope.jpg',
      },
      {
        title: 'characters',
        image: 'ackbar.jpg',
      },
      {
        title: 'species',
        image: 'greedo.jpg',
      },
      {
        title: 'vehicles',
        image: 'sand_crawler.jpg',
      },
      {
        title: 'starships',
        image: 'executor.jpg',
      },
      {
        title: 'planets',
        image: 'naboo.jpg',
      },
    ],
  }),
};
</script>

<style scoped>
h4 {
  z-index: 1000;
}
.navImage {
  z-index: 100;
  height: 33vh;
  max-width: 25vw;
  width: 33vw;
}
@keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-webkit-keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-moz-keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-ms-keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@keyframes move-clouds-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 10000px 0;
  }
}
@-webkit-keyframes move-clouds-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 10000px 0;
  }
}
@-moz-keyframes move-clouds-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 10000px 0;
  }
}
@-ms-keyframes move-clouds-back {
  from {
    background-position: 0;
  }
  to {
    background-position: 10000px 0;
  }
}
.stars,
.twinkling,
.clouds {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -100;
}
.stars {
  background: #000
    url(https://www.script-tutorials.com/demos/360/images/stars.png) repeat top
    center;
  z-index: 0;
}
.twinkling {
  background: transparent
    url(https://www.script-tutorials.com/demos/360/images/twinkling.png) repeat
    top center;
  z-index: 1;
  -moz-animation: move-twink-back 200s linear infinite;
  -ms-animation: move-twink-back 200s linear infinite;
  -o-animation: move-twink-back 200s linear infinite;
  -webkit-animation: move-twink-back 200s linear infinite;
  animation: move-twink-back 200s linear infinite;
}
.clouds {
  background: transparent
    url(https://www.script-tutorials.com/demos/360/images/clouds.png) repeat top
    center;
  z-index: 3;
  -moz-animation: move-clouds-back 200s linear infinite;
  -ms-animation: move-clouds-back 200s linear infinite;
  -o-animation: move-clouds-back 200s linear infinite;
  -webkit-animation: move-clouds-back 200s linear infinite;
  animation: move-clouds-back 200s linear infinite;
}
</style>
