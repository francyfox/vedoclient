<template>
  <v-app id="inspire">
    <v-app-bar app>
      <div class="mx-3">
        <v-list-item-title>
          Current Group
          <span class="amber--text">group number</span>
          <span class="amber--text">test </span>
        </v-list-item-title>
      </div>
      <div class="mx-3">
        <v-tabs>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </div>
    </v-app-bar>
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        color="grey darken-4"
        class="pa-4"
      >
        <v-row>
          <div class="mx-3">
            <v-badge
              bordered
              bottom
              color="green accent-4"
              offset-x="1 5"
              offset-y="15"
            >
              <v-avatar size="50">
                <v-img src="https://static.vecteezy.com/system/resources/thumbnails/000/546/910/small/fox_007.jpg"></v-img>
              </v-avatar>
            </v-badge>
          </div>
          <v-list-item-content>
            <v-list-item-title class="title">
              test
            </v-list-item-title>
            <v-list-item-subtitle>
              Admin
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-row>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text] in links"
          :key="icon"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-timeline
          dense
          clipped
        >
          <v-timeline-item
            fill-dot
            class="white--text mb-12"
            color="primary"
            large
          >
            <template v-slot:icon>
              <span>ME</span>
            </template>
            <v-text-field
              v-model="input"
              hide-details
              flat
              label="Leave a comment..."
              solo
              @keydown.enter="comment"
            >
              <template v-slot:append>
                <v-btn
                  class="mx-0"
                  depressed
                  @click="comment"
                >
                  Post
                </v-btn>
              </template>
            </v-text-field>
          </v-timeline-item>

          <v-slide-x-transition
            group
          >
            <v-timeline-item
              v-for="event in timeline"
              :key="event.id"
              class="mb-4"
              color="pink"
              small
            >
              <v-row justify="space-between" class="message">
                <v-col
                  cols="7"
                  v-text="event.text"
                ></v-col>
                <v-col
                  class="text-right"
                  cols="5"
                  v-text="event.time"
                ></v-col>
              </v-row>
            </v-timeline-item>
          </v-slide-x-transition>

          <v-timeline-item
            class="mb-6"
            hide-dot
          >
            <span>TODAY</span>
          </v-timeline-item>

          <v-timeline-item
            class="mb-4"
            color="grey"
            icon-color="grey lighten-2"
            small
          >
            <v-row justify="space-between">
              <v-col cols="7">
                This order was archived.
              </v-col>
              <v-col
                class="text-right"
                cols="5"
              >
                15:26 EDT
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item
            class="mb-4"
            small
          >
            <v-row justify="space-between">
              <v-col cols="7">
                <v-chip
                  class="white--text ml-0"
                  color="purple"
                  label
                  small
                >
                  APP
                </v-chip>
                Digital Downloads fulfilled 1 item.
              </v-col>
              <v-col
                class="text-right"
                cols="5"
              >
                15:25 EDT
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item
            class="mb-4"
            color="grey"
            small
          >
            <v-row justify="space-between">
              <v-col cols="7">
                Order confirmation email was sent to John Leider (john@vuetifyjs.com).
              </v-col>
              <v-col
                class="text-right"
                cols="5"
              >
                15:25 EDT
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item
            class="mb-4"
            hide-dot
          >
            <v-btn
              class="mx-0"
            >
              Resend Email
            </v-btn>
          </v-timeline-item>

          <v-timeline-item
            class="mb-4"
            color="grey"
            small
          >
            <v-row justify="space-between">
              <v-col cols="7">
                A $15.00 USD payment was processed on PayPal Express Checkout
              </v-col>
              <v-col
                class="text-right"
                cols="5"
              >
                15:25 EDT
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item
            color="grey"
            small
          >
            <v-row justify="space-between">
              <v-col cols="7">
                John Leider placed this order on Online Store (checkout #1937432132572).
              </v-col>
              <v-col
                class="text-right"
                cols="5"
              >
                15:25 EDT
              </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    events: [],
    input: null,
    nonce: 0,
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Inbox'],
      ['mdi-send', 'Send'],
      ['mdi-delete', 'Trash'],
      ['mdi-alert-octagon', 'Spam']
    ]
  }),
  computed: {
    timeline () {
      return this.events.slice().reverse()
    }
  },
  methods: {
    comment () {
      const time = (new Date()).toTimeString()
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
          return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
        })
      })

      this.input = null
    }
  }
}
</script>

<style lang="scss">
  html::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 1px;
    background-color: #1e1e1e;
  }
  html::-webkit-scrollbar
  {
    width: 12px;
    background-color: #1e1e1e;
  }
  html::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #2196f3;
  }
  .v-main__wrap > .container > .container > .container{
    &::-webkit-scrollbar-track
    {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 1px;
      background-color: #1e1e1e;
    }
    &::-webkit-scrollbar
    {
      width: 12px;
      background-color: #1e1e1e;
    }
    &::-webkit-scrollbar-thumb
    {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #97ae4a;
    }
  }
  .v-main{
    padding: 32px 0 0 122px !important;
  }
  .v-main__wrap .container, .v-timeline{
    height: 100%;
  }
  .message{
    background: #5c5c5c1f;
    border-radius: 3px;
    box-shadow: 0 3px 1px slateblue;
  }
</style>
