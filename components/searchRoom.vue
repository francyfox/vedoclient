<template>
  <v-autocomplete
    v-model="friend"
    :items="people"
    :loading="isLoading"
    :search-input.sync="search"
    hide-no-data
    hide-selected
    append-icon="fa-search"
    filled
    chips
    color="blue-grey lighten-2"
    label="User Search"
    item-text="username"
    item-value="username"
    return-object
  >
    <template #selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="remove(data.item)"
      >
        <v-avatar left>
          <v-img :src="data.item.profileUrl" />
        </v-avatar>
        {{ data.item.username }}
        <v-btn
          :data="data.item.name"
          text
          @click="patchList(data.item)"
        >
          <v-icon size="20">
            fa-check-circle
          </v-icon>
        </v-btn>
      </v-chip>
    </template>
    <template #item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item" />
      </template>
      <template v-else>
        <v-list-item-avatar>
          <img :src="data.item.profileUrl">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.username" />
          <v-list-item-subtitle v-html="data.item.name +' '+ data.item.lastname" />
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
const url = 'http://127.0.0.1:8000/api/'
export default {
  // TODO: Put userInfo and API URL to store, and set 1 search component
  name: 'searchRoom',
  data: () => ({
    descriptionLimit: 60,
    autoUpdate: true,
    friend: null,
    isLoading: false,
    people: [],
    search: null
  }),
  computed: {
    fields () {
      if (!this.model) { return [] }

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.friend[key] || 'n/a'
        }
      })
    },
    SearchItems () {
      return this.entries.map((entry) => {
        const Description = entry.Description.length > this.descriptionLimit
          ? entry.Description.slice(0, this.descriptionLimit) + '...'
          : entry.Description

        return Object.assign({}, entry, { Description })
      })
    }
  },
  watch: {
    search (val) {
      // Items have already been loaded
      if (this.people.length > 0) { return }

      // Items have already been requested
      if (this.isLoading) { return }

      this.isLoading = true

      // Lazily load input items

      const loadUserUrl = url + 'users?username=' + val
      console.log(loadUserUrl)
      this.$axios(loadUserUrl)
        .then((response) => {
          this.people = response.data['hydra:member']
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  },
  methods: {
    async patchList (item) {
      const config = {
        headers: { 'Content-Type': 'application/merge-patch+json' }
      }
      const friendListClone = JSON.parse(JSON.stringify(this.userInfo.friendList))
      console.log(friendListClone)
      friendListClone.push({
        id: item.id,
        username: item.username,
        name: item.name,
        lastname: item.lastname,
        profileUrl: item.profileUrl
      })
      const info = {
        friendList: friendListClone
      }
      await this.$axios.$patch(url + 'users/' + this.userInfo.id, JSON.stringify(info), config).catch((e) => {
        console.log(e)
      })
    },
    remove (item) {
      this.friend = ''
    }
  }
}
</script>

<style scoped>

</style>
