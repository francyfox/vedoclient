<template>
  <v-app id="inspire">
    <v-app-bar app>
      <div class="mx-3">
        <v-list-item-title>
          {{ group.name }}
          <span class="amber--text">group number</span>
          <span class="amber--text"> {{ group.id }} </span>
        </v-list-item-title>
      </div>
      <v-spacer></v-spacer>
      <template>
        <v-toolbar dense class="tools">
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-btn-toggle
              v-model="toggle_multiple"
              color="primary"
              dense
              group
              multiple
            >
              <v-btn
                :value="1"
                text
              >
                <v-icon>fa-bold</v-icon>
              </v-btn>

              <v-btn
                :value="2"
                text
              >
                <v-icon>fa-italic</v-icon>
              </v-btn>

              <v-btn
                :value="3"
                text
              >
                <v-icon>fa-underline</v-icon>
              </v-btn>
              <v-menu
                v-model="pallete"
                bottom
                origin="bottom bottom"
                transition="scale-transition"
                :close-on-content-click="false"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :value="4"
                    text
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>fa-palette</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-color-picker
                    dot-size="25"
                    mode="hexa"
                    swatches-max-height="200"
                  ></v-color-picker>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      @click="pallete = false"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-list>
              </v-menu>

              <v-btn
                :value="5"
                text
              >
                <v-icon>fa-file-video</v-icon>
              </v-btn>
              <v-btn
                :value="6"
                text
              >
                <v-icon>fa-file-upload</v-icon>
              </v-btn>
              <v-btn
                :value="7"
                text
              >
                <v-icon>fa-file-audio</v-icon>
              </v-btn>
              <v-btn
                :value="8"
                text
              >
                <v-icon>fa-tag</v-icon>
              </v-btn>
              <v-btn
                :value="9"
                text
              >
                <v-icon>fa-link</v-icon>
              </v-btn>
              <v-btn
                :value="10"
                text
              >
                <v-icon>fa-quote-left</v-icon>
              </v-btn>
              <v-btn
                :value="11"
                text
              >
                <v-icon>fa-caret-square-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>
      <div class="mx-3">
        <v-tabs class="tab-icons">
          <v-tab>
            <v-icon>fa-house-user</v-icon>
            Room
          </v-tab>
          <v-tab>
            <v-icon>fa-tools</v-icon>
            Edit Room
          </v-tab>
          <v-tab>
            <v-icon>fa-search</v-icon>
            FIND
          </v-tab>
        </v-tabs>
      </div>
    </v-app-bar>
    <v-system-bar app>
      <v-spacer />

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer
      width="320"
      v-model="drawer"
      app
    >
      <groups :userInfo="userInfo"/>
    </v-navigation-drawer>
    <v-navigation-drawer
      app
      right
    >
      <user-panel :username="username" :userInfo="userInfo"></user-panel>
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
            <template #icon>
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
              <template #append>
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
              large
            >
              <template v-if="userInfo.username == event.user" v-slot:icon>
                <v-avatar style="background: #1b1b1b;" size="50">
                  <img :src="userInfo.profileUrl">
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
                    {{ event.text }}
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
        </v-timeline>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import groups from '../components/groups'
import UserPanel from '../components/userPanel'

export default {
  components: {
    UserPanel,
    groups
  },
  data: () => ({
    userInfo: {},
    clientInformation: {
      room: 0,
      id: 0,
      uuid: new Date().getTime().toString(),
      user: '',
      time: ''
    },
    connection: null,
    group: {},
    username: '',
    valid: true,
    users: [],
    events: [],
    input: null,
    nonce: 0,
    cards: ['Today', 'Yesterday'],
    drawer: null,
    // pallete
    pallete: false,
    toggle_multiple: []
  }),
  computed: {
    timeline () {
      return this.events.slice().reverse()
    }
  },
  methods: {
    appendMessage (username, message) {
      const timeEvent = (new Date()).toTimeString().replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
        return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
      })
      let from

      if (username === this.clientInformation.uuid) {
        from = 'me'
      } else {
        // eslint-disable-next-line no-unused-vars
        from = this.clientInformation.uuid
      }

      // Append List Item
      this.events.push({
        id: this.nonce,
        user: this.username,
        text: this.input,
        time: timeEvent
      })
    },
    comment () {
      this.clientInformation.id = this.nonce++
      this.clientInformation.time = (new Date()).toTimeString().replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
        return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
      })
      this.clientInformation.message = this.input
      // Send info as JSON
      this.connection.send(JSON.stringify(this.clientInformation))
      // Add my own message to the list
      this.appendMessage(this.clientInformation.uuid, this.clientInformation.message)
      this.input = null
    }
  },
  mounted () {
    // #TODO: Refactor mounted hook, put methods to Vuex Actions
    if (process.browser) {
      this.username = localStorage.username
      this.clientInformation.user = localStorage.username
    }
    // STORAGE
    this.group = this.$store.getters['groups/getCurrentGroup']
    // .replace(/ /g, '_').toLowerCase()
    if (this.group) {
      this.connection = new WebSocket('ws://localhost:8080/' + this.group.name.replace(/ /g, '_').toLowerCase())
      console.log(this.connection)
      this.connection.onopen = function (e) {}
      this.connection.onmessage = (e) => {
        const data = JSON.parse(e.data)
        this.events.push({
          id: data.id,
          user: data.user,
          time: data.time,
          text: data.message
        })
        this.timeline()
      }
      this.connection.onerror = function (e) {
        alert('Error: something went wrong with the socket.')
        console.error(e)
      }
    }
    // END SOCKET CONFIG
    this.$store.dispatch('user/getUserInfo').then(() => {
      this.userInfo = this.$store.getters['user/getUser']
    })
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
  .tab-icons i{
    margin-right: 10px;
  }
  .v-timeline{
    width: 100%;
    max-width: 70%;
  }
  .v-main{
    padding: 32px 0 0 154px !important;
  }
  .v-main__wrap .container, .v-timeline{
    height: 100%;
  }
  .message .col {
    padding: 20px 30px;
  }
  .menu-but{
    width: 100% !important;
    border-radius: 0 !important;
  }
  .tools{
    box-shadow: none !important;
    background-color: rgb(30, 30, 30) !important;
    flex-grow: 0 !important;
  }
  .edit-group{
    min-width: 32px !important;
    padding: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
  }
  .caption{
    bottom: -30px;
    position: absolute;
  }
</style>
