<template>
  <div>
    <search-room :userInfo="userInfo" mode="groups"></search-room>
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
          <v-row>
            <v-form>
              <v-text-field
                v-model="chatRoomName"
                :counter="20"
                label="Title"
                required
              />
              <v-text-field
                v-model="imageUrl"
                label="Group Image URL"
              />
              <v-checkbox
                v-model="roleplay"
                :label="`Enable RolePlay mode`"
              />
              <v-radio-group v-model="security">
                <v-radio value="false">
                  <template #label>
                    <strong class="success--text">OPEN</strong>
                  </template>
                </v-radio>
                <v-radio value="true">
                  <template #label>
                    <strong class="primary--text">CLOSE</strong>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-form>
            <v-avatar size="120" style="margin-left: 20px">
              <v-img :src="imageUrl"/>
            </v-avatar>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-btn
            class="mr-4"
            type="submit"
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
    <v-sheet
      color="grey darken-4"
      class="pa-4 p-0"
    >
      <v-list flat>
        <v-list-item-group
          v-model="selectedGroup"
          color="#1976d2"
          active-class="activeGroup"
        >
          <v-list-item
            v-for="group in userInfo.GroupList"
            :key="group.index"
            @click="changeGroup(group.groupName)"
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
                    <v-img :src="group.imageUrl" />
                  </v-avatar>
                </div>
              </v-badge>
            </div>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ group.groupName }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <span v-for="user in group.users" :key="user.index" class="user_tag">
                  {{ user }}
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: 'Groups',
  props: {
    userInfo: Object
  },
  data: () => ({
    chatRoomName: '',
    imageUrl: '',
    selectedGroup: 0,
    security: true,
    roleplay: false,
    userSelect: [],
    dialogNote: {},
    dialog: false,
    groupId: 0
  }),
  mounted () {
    // this.$axios
    //   .get('http://127.0.0.1:8000/api/groups')
    //   .then((response) => {
    //     const groups = (Object.entries(response.data['hydra:member']))
    //     groups.forEach(function (item) {
    //       item.shift()
    //     })
    //     this.$data.groups_list = groups
    //     this.currentGroup = this.groups_list[this.selectedGroup][0].groupName
    //     const newOption = { id: this.selectedGroup, name: this.currentGroup }
    //     this.$store.commit('groups/set_current', newOption)
    //   })
  },
  methods: {
    changeGroup (name) {
      try {
        this.$store.commit('groups/set_current', { id: this.selectedGroup, name: this.userInfo.GroupList[this.selectedGroup].groupName })
        this.$parent.$parent.$parent.joinToRoom(name)
        history.pushState(
          {},
          null,
          this.$route.path + '#' + encodeURIComponent(name)
        )
      } catch (e) {
        console.log(e)
      }
    },
    addGroup () {
      const app = this
      const groupinfo = {
        groupName: this.chatRoomName,
        users: this.$data.userSelect,
        security: JSON.parse(this.$data.security),
        sharedKey: 'string',
        rp: this.roleplay,
        imageUrl: this.imageUrl
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
  .v-application .p-0{
    padding: 0 !important;
  }
</style>
