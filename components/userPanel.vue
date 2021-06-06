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
            offset-x="1 5"
            offset-y="15"
          >
            <v-avatar size="50">
              <v-img :src="userInfo.profileUrl" />
            </v-avatar>
          </v-badge>
        </div>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ username }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ userInfo.name }} {{ userInfo.lastname }}
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
    <search-room userInfo="userInfo"></search-room>
    <v-list>
      <v-list-item
        v-for="user in userInfo.friendList"
        :key="user.index"
        link
      >
        <v-list-item-avatar>
          <v-img :src="user.profileUrl" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.username }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.name }} {{ user.lastname }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import searchRoom from './searchRoom'
export default {
  name: 'userPanel',
  components: {
    searchRoom
  },
  props: {
    username: String,
    userInfo: Object
  }
}
</script>

<style scoped>

</style>
