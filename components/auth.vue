<template>
  <v-card class="p20">
    <v-form v-model="validAuth" lazy-validation>
      <v-text-field
        v-model="userInfo.username"
        :rules="[v => v.length <= 20 || 'Max 20 characters']"
        :counter="20"
        label="Username"
        required
      />
      <v-text-field
        v-model="userInfo.password"
        :rules="[rules.required, rules.min]"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        label="Password"
        required
        counter
        @click:append="show1 = !show1"
      />
      <v-btn
        :disabled="!validAuth"
        class="mr-4"
        @click="submitAuth"
        @keydown.enter="submitAuth"
      >
        LOGIN
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  name: 'Auth',
  props: {
    rules: {
      required: Boolean,
      min: Boolean,
      email: Boolean
    }
  },
  data () {
    return {
      error: false,
      show1: false,
      validAuth: false,
      userInfo: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async submitAuth () {
      await this.$axios
        .post('auth', this.userInfo)
        .then((response) => {
          this.$emit('setLog', {
            status: response.status,
            data: jwtDecode(response.data)
          })
          localStorage.setItem('token', response.data)
          this.$router.push({ path: '/home' })
        })
        .catch((error) => {
          // eslint-disable-next-line eqeqeq
          if (error.response.status == 201) {
            this.error = false
          } else {
            this.error = true
          }
          this.$emit('setLog', {
            status: error.response.status,
            data: error.response.data
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
