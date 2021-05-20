<template>
  <q-page>
    <ul>
      <li class="navImage">
        <q-img :src="api/a_new_hope.jpg">
        <div class="absolute-top text-h2 text-center ellipsis">
          Films
        </div>
      </q-img>
      </li>
      <li class="navImage">
        <q-img :src="api/ackbar.jpg">
        <div class="absolute-top text-h2 text-center ellipsis">
          Characters
        </div>
      </q-img>
      </li>
      <li class="navImage">
        <q-img :src="api/greedo.jpg">
        <div class="absolute-top text-h2 text-center ellipsis">
          Species
        </div>
      </q-img>
      </li>
      <li class="navImage">
        <q-img :src="'api/' + detail.image">
        <div class="absolute-top text-h2 text-center ellipsis">
          Starships
        </div>
      </q-img>
      </li>
      <li class="navImage">
        <q-img :src="'api/' + detail.image">
        <div class="absolute-top text-h2 text-center ellipsis">
          Planets
        </div>
      </q-img>
      </li>
    </ul>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
};
</script>

<style scoped>
.navImage {
  height: 150px;
  width: 200px;
  border: 1px solid;
}
</style>
