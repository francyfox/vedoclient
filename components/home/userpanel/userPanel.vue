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
            <v-avatar size="50">
              <v-img :src="user.profileUrl" />
            </v-avatar>
          </v-badge>
        </div>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.username }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user.name }} {{ user.lastname }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-btn @click="clearLocalStorage" class="mt-5">
          <v-icon size="20">fa-sign-out-alt</v-icon>
        </v-btn>
      </v-row>
    </v-sheet>
    <v-tabs v-model="selectUserTab">
      <v-tab>
        <v-icon>fa-user-tie</v-icon>
      </v-tab>
      <v-tab>
        <v-icon>fa-user-cog</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="selectUserTab">
      <v-tab-item>
        <search-room
          :user="user"
          :userInfo="userInfo"
          mode="users"
        />
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="item in myFriends"
              :key="item.index"
              link
            >
              <v-badge
                bordered
                bottom
                color="green accent-4"
                offset-x="28"
                offset-y="25"
              >
                <v-list-item-avatar>
                  <v-img :src="item.profileUrl" />
                </v-list-item-avatar>
              </v-badge>
              <v-list-item-content>
                <v-list-item-title>{{ item.username }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.name }} {{ item.lastname }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-tab-item>
      <v-tab-item></v-tab-item>
      <v-tab-item></v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import searchRoom from '../searchRoom'
export default {
  name: 'userPanel',
  components: {
    searchRoom
  },
  props: {
    user: Object,
    userInfo: Object
  },
  data: () => ({
    selectUserTab: null
  }),
  computed: {
    myFriends () {
      if (this.user.friends) {
        return JSON.parse(this.user.friends)
      } else {
        return {}
      }
    }
  },
  methods: {
    clearLocalStorage () {
      localStorage.clear()
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>

</style>
