<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout view="hhh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="text-center font-jedi-outline">
         <span>star wars visual guide <sup>2</sup></span>
        </q-toolbar-title>
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
