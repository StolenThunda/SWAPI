<template>
  <div class="stars ">
    <div class='' >
    <h3 class="text-center text-primary font-jedi ">Choose a Category</h3>
    </div>
    <!-- <div class="twinkling"></div> -->
    <!-- <div class="clouds"></div> -->
    <div class="nav flex flex-center justify-center wrap">
      <div
        class="navImage"
        v-for="category in categories"
        :key="category.title"
      >
        <q-img
          class="q-px-lg"
          :src="'api/' + category.image"
          spinner-color="white"
          style="height: 30vh; max-width: 10vw"
        >
          <div
            class="absolute-bottom text-body1 text-uppercase /
            text-center text-weight-bolder ellipsis">
            <router-link :to="`/${category.title === 'characters' ? 'people' : category.title}`">
            {{ category.title}}
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
.navImage {
  max-height: 20vh;
  max-width: 50vw;
  width: 15vw;
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
