<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout view="hhh Lpr fFf">
    <q-header>
      <q-toolbar class="q-px-xl">
        <h4 class="text-center font-jedi">
         <span>star wars visual guide <sup>2</sup></span>
        </h4>
        <q-space />
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
};
</script>
