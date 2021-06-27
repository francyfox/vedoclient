<template>
  <v-system-bar
    height="30"
  >
    <v-slide-x-reverse-transition>
      <template v-if="status != 0">
          <div>
            <div
              class="d-inline pa-1 mr-2"
              :class="color = status == 201 ? 'green': 'red'"
            >
              {{ status }}
            </div>
            <div class="d-inline pa-1 black white--text">
              {{ data }}
            </div>
          </div>
      </template>
    </v-slide-x-reverse-transition>
  </v-system-bar>
</template>

<script>
export default {
  name: 'logbar',
  props: {
    data: String,
    status: Number
  }
}
</script>

<style scoped>

</style>
