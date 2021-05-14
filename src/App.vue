<template>
  <div id="q-app">
    <router-view :films="results"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data: () => ({
    results: null,
  }),
  async created() {
    this.results = await this.fetchDataCategory('films');
  },
  methods: {
    async fetchDataCategory(category) {
      const res = await fetch(`api/${category}`);
      const data = await res.json();
      return data;
    },
    async fetchOne(category, id) {
      const res = await fetch(`api/${category}${id ? `/${id}` : ''}`);
      const data = await res.json();
      return data;
    },
  },
};
</script>
