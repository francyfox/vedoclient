<template>
  <div>
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
    <v-list flat>
      <v-list-item-group
        v-model="selectedGroup"
        color="#1976d2"
        active-class="activeGroup"
      >
        <v-list-item
          v-for="group in groups_list"
          :key="group.groupName"
          @click="changeGroup"
        >
          <div class="mx-3">
            <v-badge
              bordered
              bottom
              color="green accent-4"
              offset-x="15"
              offset-y="15"
            >
              <div class="avatar">
                <v-icon>fa-circle</v-icon>
                <v-avatar size="50">
                  <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                </v-avatar>
              </div>
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
      </v-list-item-group>

    </v-list>
  </div>
</template>

<script>
export default {
  name: 'groups',
  data: () => ({
    selectedGroup: 0,
    security: true,
    roleplay: false,
    userSelect: [],
    dialogNote: {},
    dialog: false,
    groups_list: [],
    groupId: 0
  }),
  methods: {
    changeGroup () {
      this.$store.commit('groups/set_current', { id: this.selectedGroup, name: this.groups_list[this.selectedGroup][0].groupName })
    },
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
    }
  },
  mounted () {
    // this.currentGroupId = this.groups_list[this.selectedGroup].groupName
    const app = this
    this.$axios
      .get('http://127.0.0.1:8000/api/groups')
      .then(function (response) {
        const groups = (Object.entries(response.data['hydra:member']))
        groups.forEach(function (item) {
          item.shift()
        })
        app.$data.groups_list = groups
        app.currentGroup = app.groups_list[app.selectedGroup][0].groupName
        const newOption = { id: app.selectedGroup, name: app.currentGroup }
        app.$store.commit('groups/set_current', newOption)
      })
  }
}
</script>

<style lang="scss">
  .avatar{
    position: relative;
    .fa-circle{
      text-shadow: 1px 1px 2px black;
      color: #79617d;
      top: 0;
      left: 0;
      position: absolute;
      font-size: 58px;
      z-index: -1;
    }
  }
</style>
