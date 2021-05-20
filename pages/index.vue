<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="3">
      <v-snackbar
        v-model="snackbar"
        top
        left
      >
        <v-card-title>
          Status code
          <strong v-if="error" class="error">[ {{ AxiosLog.type }} ]</strong>
          <strong v-else class="success">[ {{ AxiosLog.type }} ]</strong>
        </v-card-title>
        <v-card-text>
          <pre>
            <p>{{ AxiosLog.data }}</p>
          </pre>
        </v-card-text>
        <v-btn
          color="indigo"
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
      <v-tabs
        v-model="tabs"
        centered
      >
        <v-tab>
          <v-app-bar-title>
            Auth
          </v-app-bar-title>
        </v-tab>
        <v-tab>
          <v-app-bar-title>
            Registration
          </v-app-bar-title>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card class="p20">
            <v-form v-model="validAuth" lazy-validation>
              <v-text-field
                v-model="authUser"
                :rules="[v => v.length <= 10 || 'Max 10 characters']"
                :counter="10"
                label="Username"
                required
              />
              <v-text-field
                v-model="authPass"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
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
              >
                LOGIN
              </v-btn>
            </v-form>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="p20">
            <v-form v-model="validReg" lazy-validation>
              <v-text-field
                v-model="username"
                :rules="[v => v.length <= 10 || 'Max 10 characters']"
                :counter="10"
                label="Username"
                required
              />
              <v-text-field
                v-model="email"
                :rules="[rules.required, rules.email]"
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
                :rules="[rules.required, rules.min, passwordConfirmationRule]"
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
                    :rules="[rules.required]"
                    label="Name"
                    required
                  />
                </v-col>
                <v-col
                  cols="6"
                  md="6"
                >
                  <v-text-field
                    v-model="lastname"
                    :rules="[rules.required]"
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
                    :rules="[rules.required]"
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
              <v-text-field
                v-model="work"
                :rules="[v => v.length <= 10 || 'Max 20 characters']"
                label="Work"
              />
              <v-text-field
                v-model="hobby"
                :rules="[v => v.length <= 10 || 'Max 20 characters']"
                label="Hobby"
              />
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="like"
                    :rules="[rules.required]"
                    :items="LikeItems"
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
                    :rules="[rules.required]"
                    :items="DisLikeItems"
                    chips
                    label="Dislike"
                    multiple
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row class="between">
                <v-checkbox
                  v-model="married"
                  label="Married?"
                />
                <v-checkbox
                  v-model="childs"
                  label="Childs?"
                />
              </v-row>

              <v-checkbox
                v-model="checkbox"
                :rules="[rules.required]"
              >
                <template v-slot:label>
                  <div>
                    I agree with
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <a
                          target="_blank"
                          href="https://vuetifyjs.com"
                          @click.stop
                          v-on="on"
                        >
                          Agreement
                        </a>
                      </template>
                      Opens in new window
                    </v-tooltip>
                     page
                  </div>
                </template>
              </v-checkbox>

              <v-btn
                :disabled="!validReg"
                class="mr-4"
                @click="submitReg"
              >
                submit
              </v-btn>
              <v-btn @click="clear">
                clear
              </v-btn>
            </v-form>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
const url = 'http://127.0.0.1:8000/api/'

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
    error: false,
    snackbar: false,
    AxiosLog: {
      type: '',
      data: ''
    },
    validReg: false,
    validAuth: false,
    tabs: null,
    authUser: '',
    authPass: '',
    username: '',
    email: '',
    name: '',
    lastname: '',
    password: '',
    repeatPass: '',
    hobby: '',
    work: '',
    married: false,
    childs: false,
    like: [],
    LikeItems: [
      'chips', 'wine', 'beer', 'shark'
    ],
    dislike: [],
    DisLikeItems: [
      'avacado', 'Morgenstern', 'Adam Sendler'
    ],
    show1: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      email: v => /.+@.+/.test(v) || 'E-mail must be valid'
    },

    date: null,
    menu: false,
    checkbox: false
  }),
  computed: {
    passwordConfirmationRule () {
      return () => (this.password === this.repeatPass) || 'Password must match'
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
    submitReg () {
      const userInfo = {
        username: this.username.toString(),
        roles: ['ROLE_USER'],
        password: this.password.toString(),
        email: this.email,
        name: this.name,
        lastname: this.lastname,
        birthday: this.date,
        work: this.work,
        hobby: this.hobby,
        married: this.married,
        childs: this.childs,
        country: 'Vaflandia',
        like: JSON.stringify(this.like),
        dislike: JSON.stringify(this.like),
        disc: {
          CorrelationCoefficent: 0,
          Dominance: 0,
          Influence: 0,
          Steadness: 0,
          Conscient: 0,
          correlationCoefficent: 0,
          dominance: 0,
          influence: 0,
          steadness: 0,
          conscient: 0
        }
      }
      const app = this
      if (this.username) {
        this.$axios
          .post(url + 'users', userInfo)
          .then(function (response) {
            app.snackbar = true
            app.AxiosLog.type = response.status
            app.AxiosLog.data = response.data
          })
      }
    },
    submitAuth () {
      const app = this
      const userInfo = {
        username: this.authUser,
        password: this.authPass
      }
      this.$axios
        .post(url + 'auth', userInfo)
        .then(function (response) {
          app.snackbar = true
          app.AxiosLog.type = response.status
          app.AxiosLog.data = response.data
          localStorage.setItem('username', app.$data.authUser)
          localStorage.setItem('token', response.data)
          app.$router.push({ path: '/home' })
        })
        .catch(function (error) {
          // eslint-disable-next-line eqeqeq
          if (error.response.status == 201) {
            app.error = false
          } else {
            app.error = true
          }
          app.snackbar = true
          app.AxiosLog.type = error.response.status
          app.AxiosLog.data = error.response.data
        })
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    }
  },
  mounted () {
    if (localStorage.token) {
      this.$router.push({ path: '/home' })
    }
  }
}
</script>

<style lang="scss">
  .v-snack__content{
    box-sizing: border-box;
    max-width: 100%;
    overflow: hidden;
  }
  .v-application .success, .v-application .error {
    margin-left: 5px;
    font-size: 20px;
    font-weight: bold;
  }
  .v-application .success{
    background: transparent !important;
    color: #82bf82;
  }
  .v-application .error{
    background: transparent !important;
    color: #d26f6f;
  }
  .p20{
    padding: 20px;
  }
  .v-main__wrap > .container{
    display: flex;
    height: 100%;
  }
  .between{
    margin-top: 0 !important;
    margin-left: 1px !important;
    width: 100%;
    height: 40px;
    > div {
      margin: 0 !important;
      margin-right: 10px !important;
    }
  }
</style>
