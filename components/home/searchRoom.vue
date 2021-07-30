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
    multiple
    color="blue-grey lighten-2"
    :label="mode + ' search'"
    :item-text="inputType"
    :item-value="inputType"
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
        {{ data.item.username || data.item.groupName }}
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
          <v-img v-if="mode == 'users'" :src="data.item.profileUrl" />
          <v-img v-else :src="data.item.imageUrl" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.username || data.item.groupName" />
          <v-list-item-subtitle v-if="mode == 'users'">
            {{ data.item.name }} {{ data.item.lastname }}
          </v-list-item-subtitle>
          <v-list-item-subtitle v-else>
            <span class="user_tag" v-for="user in data.item.users" :key="user.index">
              {{ user }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'searchRoom',
  props: {
    user: Object,
    mode: String
  },
  data: () => ({
    inputType: 'username',
    descriptionLimit: 60,
    autoUpdate: true,
    friend: [],
    isLoading: false,
    people: [],
    search: null
  }),
  created () {
    if (this.mode === 'groups') {
      this.inputType = 'groupName'
    }
  },
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
      let queryFind = 'username'
      if (this.mode === 'groups') {
        queryFind = 'groupName'
      }

      const loadUserUrl = this.mode + '?' + queryFind + '=' + val
      this.$axios(loadUserUrl)
        .then((response) => {
          const data = response.data['hydra:member']
          this.people = data
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  },
  methods: {
    async patchList (item) {
      // const config = {
      //   headers: { 'Content-Type': 'application/merge-patch+json' }
      // }
      if (this.mode === 'users') {
        await this.$axios.$post('joinTo/user', {
          list: this.people,
          userID: this.user.id
        }).then((response) => {
          this.$parent.$emit('setLog', {
            status: response.status,
            data: response.data
          })
        }).catch((error) => {
          this.$parent.$emit('setLog', {
            status: error.response.status,
            data: error.response.data
          })
        })
      } else {
        await this.$axios.$post('joinTo/group', {
          list: this.people,
          userID: this.user.id
        }).then((response) => {
          this.$parent.$emit('setLog', {
            status: response.status,
            data: response.data
          })
        }).catch((error) => {
          this.$parent.$emit('setLog', {
            status: error.response.status,
            data: error.response.data
          })
        })
      }
    },
    remove (item) {
      this.friend = {}
    }
  }
}
</script>

<style lang="scss">
  @mixin random-bgr(){
    background: rgba(random(255), random(255), random(255), 0.2);
  }
  @for $i from 0 to 12 {
    .user_tag:nth-child(#{$i}){
      display: inline-block;
      padding: 3px;
      @include random-bgr();
    }
  }
</style>
