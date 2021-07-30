<template>
  <div>
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
            offset-x="15"
            offset-y="15"
          >
            <v-avatar v-if="currentGroup" size="50">
              <v-img :src="currentGroup.imageUrl" />
            </v-avatar>
          </v-badge>
        </div>
        <v-list-item-content v-if="currentGroup">
          <v-list-item-title class="title">
            {{ currentGroup.groupName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <span v-for="user in currentGroup.users" :key="user.index" class="user_tag">
              {{ user }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-row>
    </v-sheet>
    <v-tabs
      v-model="selectGroupTab"
      align-with-title
    >
      <v-tab>
        <v-icon>fa-house-user</v-icon>
      </v-tab>
      <v-tab>
        <v-icon>fa-tools</v-icon>
      </v-tab>

      <v-tab>
        <v-icon>fa-folder-plus</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="selectGroupTab"
    >
      <v-tab-item>
        <search-room
          :user="user"
          mode="groups"
        />
        <v-list>
          <v-list-item-group
            v-model="selectedGroup"
            color="#1976d2"
            active-class="activeGroup"
          >
            <v-list-item
              v-for="(group, index) in myGroups"
              :key="index"
              class="p-2"
              @click="changeGroup(index)"
            >
              <div class="mx-3 pt-2 pb-2">
                <div class="avatar">
                  <v-avatar size="50">
                    <v-img :src="group.imageUrl" />
                  </v-avatar>
                </div>
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
              <a href="#" @click.prevent="deleteGroup(group.id)"><i class="fa fa-trash-alt white--text" /></a>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-tab-item>
      <v-tab-item />
      <v-tab-item>
        <v-card class="pl-5 pr-5">
          <v-card-title>
            <div class="headline mb-7" style="width: 100%">
              NEW USER GROUP
            </div>
            <v-avatar
              class="ml-30"
              size="120"
            >
              <v-img :src="imageUrl" />
            </v-avatar>
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
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import SearchRoom from '../searchRoom'
// import ChatRoomFabric from '../../../plugins/ChatRoomFabric'

export default {
  name: 'Groups',
  components: { SearchRoom },
  props: {
    user: Object,
    userinfo: Object
  },
  data: () => ({
    selectGroupTab: null,
    groupList: [],
    chatRoomName: '',
    imageUrl: null,
    selectedGroup: 0,
    security: true,
    roleplay: false,
    userSelect: [],
    dialogNote: {},
    dialog: false,
    groupId: 0
  }),
  computed: {
    myGroups () {
      if (this.user.users_groups) {
        return JSON.parse(this.user.users_groups)
      } else {
        return {}
      }
    },
    currentGroup () {
      let groupID = 0
      if (this.user.users_groups) {
        groupID = JSON.parse(this.user.users_groups)[0].id
      }
      this.$emit('setRoom', { id: groupID, Index: 0, isGroup: true })
      return this.myGroups[0]
    }
  },
  methods: {
    deleteGroup (id) {
      // console.log('test')
      this.$axios.post('/user/' + this.user.id + '/group/' + id)
        .then(response => console.log(response.data))
        .catch(e => console.log(e))
    },
    changeGroup (index) {
      const groupID = JSON.parse(this.user.users_groups)[index].id
      this.$emit('setRoom', { id: groupID, Index: index, isGroup: true })
      history.pushState(
        {},
        null,
        this.$route.path + '#' + this.myGroups[index].groupName
      )
    },
    addGroup () {
      const groupInfo = {
        groupName: this.chatRoomName,
        users: this.$data.userSelect,
        security: JSON.parse(this.$data.security),
        sharedKey: 'string',
        rp: this.roleplay,
        imageUrl: this.imageUrl
      }
      this.$axios
        .post('http://127.0.0.1:8000/api/groups', groupInfo)
        .then((response) => {
          this.groupId = response.data.id
          this.myGroups.push(response.data)
        })
    }
  }
}
</script>

<style lang="scss">
  .v-application .p-0{
    padding: 0 !important;
  }
</style>
