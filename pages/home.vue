<template>
  <v-app id="inspire">
    <v-app-bar app>
      <div class="mx-3">
        <v-list-item-title>
          Current Group
          <span class="amber--text">group number</span>
          <span class="amber--text"> [N] </span>
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
                :value="9"
                text
              >
                <v-icon>fa-quote-left</v-icon>
              </v-btn>
              <v-btn
                :value="10"
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
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            class="menu-but"
            v-bind="attrs"
            elevation="2"
            v-on="on"
          >
            NEW GROUP
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <div class="headline" style="width: 100%">
              NEW USER GROUP
            </div>
              <v-form>
                  <v-text-field
                    v-model="chatRoomName"
                    :counter="20"
                    label="Title"
                    required
                  />
                  <v-select
                    v-model="userSelect"
                    :items="users"
                    label="Add users to group"
                    data-vv-name="select"
                    multiple
                    chips
                    hint="Selected users will join automatically"
                    persistent-hint
                  />
                <v-checkbox
                  v-model="roleplay"
                  :label="`Enable RolePlay mode`"
                >
                </v-checkbox>
                  <v-radio-group v-model="security">
                    <v-radio value=false>
                      <template #label>
                        <strong class="success--text">OPEN</strong>
                      </template>
                    </v-radio>
                    <v-radio value=true>
                      <template #label>
                        <strong class="primary--text">CLOSE</strong>
                      </template>
                    </v-radio>
                  </v-radio-group>
              </v-form>
          </v-card-title>
          <v-card-actions>
            <v-btn
              class="mr-4"
              type="submit"
              :disabled="invalid"
              @click="addGroup"
            >
              submit
            </v-btn>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-list>
        <v-list-item v-for="group in groups_list" :key="group.groupName" @click="changeGroup" link>
          <div class="mx-3">
            <v-badge
              bordered
              bottom
              color="green accent-4"
              offset-x="1 5"
              offset-y="15"
            >
              <v-avatar size="50">
                <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
              </v-avatar>
            </v-badge>
          </div>
          <v-list-item-content>
            <v-list-item-title class="title">
              <span class="--text error--text"><strong class="amber--text">ID:</strong> {{group[0].id }}</span> | {{ group[0].groupName }}
            </v-list-item-title>
            <v-list-item-subtitle>
            <span class="user_tag" v-for="user in group[0].users" :key="user.index">
              {{ user }}
            </span>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-menu
            v-model="dialogNote[group[0].id]"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
          >
            <template v-slot:activator="{ on, attrs}">
              <v-btn
                class="edit-group"
                dark
                v-bind="attrs"
                v-on="on"
                v-model="dialogNote[group[0].id]"
                @click="$set(dialogNote, group[0].id, true)"
              >
                <v-icon size="15">fas fa-edit</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    >
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                    <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn
                      :class="fav ? 'red--text' : ''"
                      icon
                      @click="fav = !fav"
                    >
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch
                      v-model="message"
                      color="purple"
                    ></v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Open Group</v-list-item-title>
                </v-list-item>

                <v-list-item>

                </v-list-item>
              </v-list>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  v-bind:class="'group-'+group[0].id"
                  text
                  @click.stop="$set(dialogNote, group[0].id, false)"
                >
                  Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  v-bind:class="'group-'+group[0].id"
                  text
                  @click="deleteGroup(group[0].id)"
                >
                  DELETE
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="menu = false"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      app
      right
    >
      <v-sheet
        color="grey darken-4"
        class="pa-4"
      >
        <v-row>
          <div class="mx-3 d-flex flex-column justify-center">
            <v-badge
              bordered
              bottom
              color="green accent-4"
              offset-x="1 5"
              offset-y="15"
            >
              <v-avatar size="50">
                <v-img src="https://static.vecteezy.com/system/resources/thumbnails/000/546/910/small/fox_007.jpg" />
              </v-avatar>
            </v-badge>
          </div>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ username }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Admin
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-row>
      </v-sheet>
      <v-tabs>
        <v-tab>
          <v-icon>fa-user-tie</v-icon>
        </v-tab>
        <v-tab>
          <v-icon>fa-user-cog</v-icon>
        </v-tab>
      </v-tabs>
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          link
        >
          <v-list-item-content>
            <v-list-item-title>Item {{ n }}</v-list-item-title>
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
              small
            >
              <v-row justify="space-between" class="message">
                <v-col
                  cols="7"
                  v-text="event.text"
                />
                <v-col
                  class="text-right"
                  cols="5"
                  v-text="event.time"
                />
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
    pallete: false,
    username: '',
    valid: true,
    dialogNote: {},
    dialog: false,
    groups_list: [],
    groupId: 0,
    currentGroup: 0,
    roleplay: false,
    chatRoomName: '',
    userSelect: [],
    users: [
      'Alabama', 'Alaska', 'American Samoa', 'Arizona',
      'Arkansas', 'California', 'Colorado', 'Connecticut',
      'Delaware', 'District of Columbia', 'Federated States of Micronesia'
    ],
    security: true,
    events: [],
    input: null,
    nonce: 0,
    cards: ['Today', 'Yesterday'],
    drawer: null
  }),
  computed: {
    timeline () {
      return this.events.slice().reverse()
    }
  },
  methods: {
    addGroup () {
      const app = this
      const groupinfo = {
        groupName: this.$data.chatRoomName,
        users: this.$data.userSelect,
        security: JSON.parse(this.$data.security),
        sharedKey: 'string',
        rp: this.roleplay
      }
      this.$axios
        .post('http://127.0.0.1:8000/api/groups', groupinfo)
        .then(function (response) {
          app.groupId = response.data.id
          app.groups_list.push(
            {
              id: response.data.id,
              groupName: response.data.groupName,
              users: response.data.users,
              security: response.data.security,
              rp: response.data.rp
            }
          )
        })
    },
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
  },
  mounted () {
    if (process.browser) {
      this.username = localStorage.username
    }
    const app = this
    this.$axios
      .get('http://127.0.0.1:8000/api/groups')
      .then(function (response) {
        const groups = (Object.entries(response.data['hydra:member']))
        groups.forEach(function (item) {
          item.shift()
        })
        app.$data.groups_list = groups
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
  .message{
    background: #5c5c5c1f;
    border-radius: 3px;
    box-shadow: 0 3px 1px slateblue;
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
</style>
