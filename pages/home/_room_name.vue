<template>
  <v-app id="inspire">
    <v-app-bar app>
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
    </v-app-bar>
    <v-navigation-drawer
      width="320"
      v-model="drawer"
      app
    >
      <groups
        :user="user"
        :userinfo="userInfo"
        @setLog="onLog"
      />
    </v-navigation-drawer>
    <v-navigation-drawer
      app
      right
    >
      <user-panel
        :user="user"
        @setLog="onLog"
      />
    </v-navigation-drawer>
    <logbar
      app
      :status="log.status"
      :data="log.data"
      v-if="forceReload"
    />
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
            >
              <template #append>
                <v-btn
                  class="mx-0"
                  depressed
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
import jwtDecode from 'jwt-decode'
import Groups from '../../components/groups'
import UserPanel from '../../components/userPanel'
import Logbar from '../../components/logbar'

export default {
  components: {
    Logbar,
    UserPanel,
    Groups
  },
  data: () => ({
    forceReload: true,
    log: {},
    user: {},
    // OLD
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
  created () {
    if (process.browser) {
      this.user = jwtDecode(localStorage.token)
    }
  },
  computed: {
    timeline () {
      return this.events.slice().reverse()
    }
  },
  methods: {
    onLog (data) {
      this.forceReload = false
      this.forceReload = true
      console.log(data.data)
      this.log.status = data.status
      this.log.data = data.data
    }
  },
  mounted () {
    if (process.browser) {
      this.user = jwtDecode(localStorage.token)
    }
  }
}
</script>

<style lang="scss">
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
