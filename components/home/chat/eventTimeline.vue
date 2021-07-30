<template>
  <v-slide-x-transition
    group
  >
    <v-timeline-item
      v-for="(event, index) in timeline"
      :key="index"
      class="mb-4"
      color="pink"
      large
    >
      <template v-if="event.user" v-slot:icon>
        <v-avatar style="background: #1b1b1b;" size="50">
          <img :src="event.avatar">
        </v-avatar>
        <span class="caption user_tag">{{ event.user }}</span>
      </template>
      <template v-else v-slot:icon>
        <span class="caption user_tag">{{ event.user }}</span>
      </template>
      <v-card class="elevation-2">
        <v-row justify="space-between" class="message">
          <v-col
            cols="7"
          >
            {{ event.message }}
          </v-col>
          <v-col
            class="text-right"
            cols="5"
            v-text="event.time"
          />
        </v-row>
      </v-card>
    </v-timeline-item>
  </v-slide-x-transition>
</template>

<script>

export default {
  name: 'eventTimeline',
  props: {
    user: Object,
    events: Array
  },
  computed: {
    timeline () {
      if (this.events) {
        return this.events.slice().reverse()
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
