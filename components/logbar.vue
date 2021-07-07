<template>
  <v-system-bar
    app
    height="30"
    style="overflow: hidden"
  >
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="d-inline white black--text"
          dark
          v-bind="attrs"
          v-on="on"
        >
          INFO
        </v-btn>
      </template>
      <v-app>
        <v-app-bar
          fixed
          dense
          dark
          color="primary"
        >
          <v-card-title>DEBUG MAP || ERROR {{ status }}</v-card-title>
          <v-spacer/>
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>fa-window-close</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card-text class="mt-10">
          <v-expansion-panels focusable>
            <v-expansion-panel>
              <v-expansion-panel-header>/****DUMP DATA****/</v-expansion-panel-header>
              <v-expansion-panel-content>
                <dump
                  :data="dump"
                  json="true"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>/****ERROR DATA****/</v-expansion-panel-header>
              <v-expansion-panel-content>
                <dump
                  :data="data"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-card-text>
      </v-app>
    </v-dialog>
    <v-slide-x-reverse-transition>
      <template v-if="status != 0">
          <div>
            <div
              v-if="status"
              class="d-inline pa-2 pl-3 mr-2"
              :class="color = status == 201 ? 'green': 'red'"
            >
              <strong>{{ status }}</strong>
            </div>
            <div
              v-else
              class="d-inline pa-2 pl-3 mr-2 yellow black--text"
            >
              <strong>DUMP</strong>
            </div>
            <div class="d-inline pa-1 black white--text">
              {{ data | truncate(180, '...')}}
            </div>
          </div>
      </template>
    </v-slide-x-reverse-transition>
  </v-system-bar>
</template>

<script>
import dump from './dump'

export default {
  name: 'logbar',
  props: {
    data: String,
    status: Number
  },
  components: {
    dump
  },
  data () {
    return {
      dump: 'No dump data',
      show: false,
      dialog: false
    }
  },
  created () {
    this.$store.dispatch('dump/dump_active').then(() => {
      this.show = this.$store.getters['dump/dump_status']
      this.dump = localStorage.dump
    })
  }
}
</script>

<style scoped>

</style>
