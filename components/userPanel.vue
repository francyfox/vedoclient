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
  </div>
</template>

<script>
export default {
  name: 'userPanel',
  props: {
    username: String
  }
}
</script>

<style scoped>

</style>
