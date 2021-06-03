<template>
  <div>
    <q-toolbar inset>
       <q-btn dense flat round icon="mdi-menu" @click="$root.$emit('toggle-drawer')" />
       <q-btn
          label="Back to categories"
          icon="mdi-arrow-left-circle"
          to="/"
       />
       <q-space />
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="mdi-home" to="/" label="Home"  class="text-secondary"/>
        <q-breadcrumbs-el
          :label="getCategory()"
          :icon="getIcon()"
          class="text-capitalize"
        />
      </q-breadcrumbs>
      <q-space />
      <q-input
        v-if="$route.fullPath.length > 1"
        standout
        v-model="search"
        input-class="text-right"
        @input="filterBySearch"
        class="q-ml-md"
      >
        <template #prepend>
          <q-icon name="mdi-magnify" />
        </template>
        <template #append class="cursor">
          <q-icon
            v-show='search.length > 0'
            name="mdi-backspace"
            @click="clearSearch"
          />
        </template>
      </q-input>
    </q-toolbar>
   <category-view
      v-if='collection.length > 0'
      :collection="collection"
      :category="category"
      :drawerState="openDrawer" />
    <div
      v-else
      class="absolute-center text-center text-h1 font-jedi-outline"
    >
      no data to match search:
      <p class="font-jedi text-h2 q-ma-xl">
        {{ search }}
      </p>
    </div>
  </div>
</template>

<script>
import SWAPI from 'src/hooks/swapi.js';
import CategoryView from 'src/components/CategoryView.vue';

/**
 * Function to sort alphabetically an array of objects by some specific key.
 *
 * @param {String} property Key of the object to sort.
 */
const dynamicSort = (property) => {
  let sortOrder = 1;

  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }

  return (a, b) => {
    if (sortOrder === -1) {
      return b[property].localeCompare(a[property]);
    }
    return a[property].localeCompare(b[property]);
  };
};
export default {
  components: {
    CategoryView,
  },
  name: 'CategoryCarousel',
  data: () => ({
    baseCollection: [],
    collection: [],
    category: '',
    datumTitle: '',
    search: '',
    openDrawer: false,
  }),
  async created() {
    // eslint-disable-next-line no-console
    this.$root.$on('update-breadcrumb', this.updateCrumb);
    this.$root.$on('toggle-drawer', () => { this.openDrawer = !this.openDrawer; });
    this.category = this.$route.path.replaceAll('/', '');
    this.category = ['characters', 'residents'].includes(this.category)
      ? 'people'
      : this.category;
    this.baseCollection = await SWAPI.fetchDataCategory(this.category);
    this.collection = this.sortCriteria(this.baseCollection);
  },
  computed: {
    categoryRoute() {
      return this.$route.path.replaceAll('/', '');
    },
  },
  methods: {
    clearSearch() {
      this.collection = this.baseCollection;
      this.search = '';
    },
    sortCriteria(col) {
      const field = col[0].name ? 'name' : 'title';
      const dir = ''; // - = desc; '' = asc
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return col.sort(dynamicSort(`${dir}${field}`));
    },
    filterBySearch() {
      this.collection = this.baseCollection.filter((obj) => {
        const ident = obj.name ? obj.name : obj.title;
        return ident.toLowerCase().includes(this.search);
      });
      this.openDrawer = true;
    },
    updateCrumb(e) {
      this.datumTitle = e;
    },
    getCategory() {
      return `${this.categoryRoute} - ${this.datumTitle}`;
    },
    getIcon() {
      let icon = '';
      switch (this.categoryRoute) {
        case 'starships':
          icon = 'mdi-ufo-outline';
          break;
        case 'vehicles':
          icon = 'mdi-truck-fast';
          break;
        case 'species':
          icon = 'mdi-account-group';
          break;
        case 'people':
          icon = 'mdi-account';
          break;
        default:
          icon = 'mdi-film';
          break;
      }
      return icon;
    },
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>
