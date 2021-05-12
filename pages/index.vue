<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="3">
      <v-tabs
        v-model="tabs"
        centered
      >
        <v-tab>
          <v-app-bar-title>
            Registration
          </v-app-bar-title>
        </v-tab>
        <v-tab>
          <v-app-bar-title>
            Auth
          </v-app-bar-title>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card class="p20">
            <form>
              <v-text-field
                v-model="username"
                :error-messages="nameErrors"
                :counter="10"
                label="Username"
                required
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
              />
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
              />
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                required
                counter
                @click:append="show1 = !show1"
              />
              <v-text-field
                v-model="repeatPass"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                label="Repeat Password"
                required
                counter
                @click:append="show1 = !show1"
              />
              <v-row>
                <v-col
                  cols="6"
                  md="6"
                >
                  <v-text-field
                    v-model="name"
                    label="Name"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  />
                </v-col>
                <v-col
                  cols="6"
                  md="6"
                >
                  <v-text-field
                    v-model="lastname"
                    label="Lastname"
                    required
                  />
                </v-col>
              </v-row>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Birthday date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="date"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1920-01-01"
                  @change="save"
                />
              </v-menu>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="like"
                    :items="like.items"
                    chips
                    label="Like"
                    multiple
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="dislike"
                    :items="dislike.items"
                    chips
                    label="Dislike"
                    multiple
                    outlined
                  />
                </v-col>
              </v-row>
              <v-checkbox
                v-model="checkbox"
                :error-messages="checkboxErrors"
                label="Do you agree?"
                required
                @change="$v.checkbox.$touch()"
                @blur="$v.checkbox.$touch()"
              />

              <v-btn
                class="mr-4"
                @click="submit"
              >
                submit
              </v-btn>
              <v-btn @click="clear">
                clear
              </v-btn>
            </form>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <h3>test item</h3>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },

  data: () => ({
    tabs: null,
    username: '',
    email: '',
    name: '',
    lastname: '',
    password: '',
    repeatPass: '',
    like: {
      items: [
        'chips', 'wine', 'beer', 'shark'
      ]
    },
    dislike: {
      items: [
        'avacado', 'Morgenstern', 'Adam Sendler'
      ]
    },
    show1: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => ('The email and password you entered don\'t match')
    },

    date: null,
    menu: false,
    checkbox: false
  }),
  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) {
        return errors
      }
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) {
        return errors
      }
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) {
        return errors
      }

      !this.$v.username.maxLength && errors.push('Username must be at most 10 characters long')
      !this.$v.username.required && errors.push('Username is required.')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) {
        return errors
      }
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    }
  }
}
</script>

<style lang="scss">
  .p20{
    padding: 20px;
  }
</style>
