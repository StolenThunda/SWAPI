<template>
  <div id="q-app">
    <router-view :films="results"></router-view>
  </div>
</template>
<script>
import swapi from 'src/hooks/swapi.js';

export default {
  name: 'App',
  mixins: [swapi],
  data: () => ({
    results: null,
  }),
  async created() {
    this.results = await swapi.fetchDataCategory('films');
  },
};
</script>

<style>
@font-face {
  font-family: StarJedi;
  src: url(./css/fonts/Starjedi.ttf);
}
@font-face {
  font-family: StarJhol;
  src: url(./css/fonts/Starjhol.ttf);
}

.font-jedi {
  font-family: 'StarJedi';
}
.font-jedi-outline {
  font-family: 'StarJhol';
}

</style>
