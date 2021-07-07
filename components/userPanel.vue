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
    {{ user.friends | dump }}
    <search-room
      :user="user"
      :userInfo="userInfo"
      mode="users"
    />
    <v-list>
      <v-list-item
        v-for="item in JSON.parse(user.friends)"
        :key="item.index"
        link
      >
        <v-list-item-avatar>
          <v-img :src="item.profileUrl" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.username }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.name }} {{ item.lastname }}</v-list-item-subtitle>
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
    user: Object,
    userInfo: Object
  }
}
</script>

<style scoped>

</style>
