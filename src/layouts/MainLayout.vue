<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout view="hhh Lpr fFf">
    <q-header>
      <q-toolbar class="flex flex-center font-jedi">
        <q-toolbar-title>
         <span>star wars visual guide <sup>2</sup></span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
    <q-footer>
      <div class="column">
        <div class="row">
          <div class="col">Powered by Quasar v{{ $q.version }}</div>
          <div class="col">
            Designed and developed by Antonio Moses &copy; 2021
            </div>
        </div>
        <div class="flex flex-center col-12">
          Star Wars and all associated names and/or images
           are copyright Lucasfilm Ltd. Images were freely collected from Wookiepedia.
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
};
</script>
