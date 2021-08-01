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
        @setLog="onLog"
        @setRoom="onRoom"
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
          <event-timeline
            :id="selectedRoom.id"
            :user="user"
            :events="events"
          />
        </v-timeline>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// helpers

import jwtDecode from 'jwt-decode'
import RoomType from '../../plugins/ChatRoomFabric/RoomType'

// components
import Groups from '../../components/home/groupspanel/groups'
import UserPanel from '../../components/home/userpanel/userPanel'
import Logbar from '../../components/logbar'
import eventTimeline from '../../components/home/chat/eventTimeline'

function waitForSocketConnection (socket, callback) {
  setTimeout(
    function () {
      if (socket.readyState === 1) {
        console.log('Connection is made')
        if (callback != null) {
          callback()
        }
      } else {
        console.log('wait for connection...')
        waitForSocketConnection(socket, callback)
      }
    }, 30) // wait 5 milisecond for the connection...
}

export default {
  components: {
    Logbar,
    UserPanel,
    Groups,
    eventTimeline
  },
  data: () => ({
    myWSgroups: [],
    selectedRoom: {},
    forceReload: true,
    log: {},
    user: {},
    // OLD
    valid: true,
    users: [],
    events: [],
    input: null,
    nonce: 0,
    drawer: null,
    // pallete
    pallete: false,
    toggle_multiple: []
  }),
  created () {
    if (process.browser) {
      this.user = jwtDecode(localStorage.token)
      this.$axios.post('/refresh', {
        id: this.user.id,
        oldJWT: localStorage.token
      }).then((response) => {
        this.user = jwtDecode(response.data)
        /*
            TODO: Dont worry about this, its just ... i dont know,
            idea have two tokens. Short for auth, and long for user data
         */
      }).catch((e) => {
        this.$router.push({ path: '/' })
      })
    }
  },
  methods: {
    comment () {
      const timeEvent = (new Date()).toTimeString().replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
        return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
      })
      const date = new Date().getTime().toString()
      const msgBox = {
        uuid: date,
        userID: this.user.id,
        groupID: this.selectedRoom.id,
        avatar: this.user.profileUrl,
        user: this.user.name,
        message: this.input,
        time: timeEvent
      }
      // Append List Item
      const WSgroup = this.myWSgroups[this.selectedRoom.Index]
      if (WSgroup) {
        waitForSocketConnection(WSgroup, () => {
          this.events.push(msgBox)
          WSgroup.send(JSON.stringify(msgBox))
        })
      }
      this.input = null
    },
    onRoom (data) {
      this.events = []
      this.selectedRoom = data
    },
    onLog (data) {
      this.forceReload = false
      this.forceReload = true
      this.log.status = data.status
      this.log.data = data.data
    }
  },
  mounted () {
    if (process.browser) {
      this.user = jwtDecode(localStorage.token)
      let groups = []
      try {
        groups = JSON.parse(this.user.users_groups)
      } catch (error) {
        console.error(error)
      }
      groups.forEach((element) => {
        const Room = new RoomType(
          'ws://localhost:8080/', element.groupName.toLowerCase())
          .listenRoom(element, this.events)
        Room.onmessage = (e) => {
          if (e.data !== undefined && e.data !== null && e.data !== '[]' && e.data) {
            try {
              const message = JSON.parse(e.data)
              this.events.push(message)
              console.warn(`[${message.groupID}] get new message from ${Room.url}`)
            } catch (error) {
              console.error(error)
            }
          }
        }
        this.myWSgroups.push(Room)
      })
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
