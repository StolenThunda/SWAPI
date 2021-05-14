<template>
   <q-card >
          <q-card-section>
            {{ detail.name }}
            <q-avatar >
              <q-img :src="'api/' + detail.image" contain  />
            </q-avatar>
          <q-card-actions>
            <q-btn color="primary" icon="info" label="details" @click="onClick" />
          </q-card-actions>
          </q-card-section>
        </q-card>
</template>

<script>
export default {
  name: 'StarshipDetail',
  props: ['detail'],
};
</script>

<style>

</style>
