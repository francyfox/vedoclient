<template>
  <v-card class="p20">
    <v-form v-model="validReg" lazy-validation>
      <div v-if="RegInfo.profileUrl" class="avatar mx-3 d-flex flex-column justify-center mt-3 mb-3">
        <v-progress-circular
          size="84"
          indeterminate
          :rotate="360"
          :value="speed"
          color="primary"
        >
          <v-avatar size="80">
            <v-img :src="RegInfo.profileUrl" />
          </v-avatar>
        </v-progress-circular>

      </div>
      <v-text-field
        v-model="RegInfo.profileUrl"
        label="Set avatar by url"
      />
      <v-text-field
        v-model="RegInfo.username"
        :rules="[v => v.length <= 20 || 'Max 20 characters']"
        :counter="20"
        label="Username"
        required
      />
      <v-text-field
        v-model="RegInfo.email"
        :rules="[rules.required, rules.email]"
        label="E-mail"
        required
      />
      <v-text-field
        v-model="RegInfo.country"
        :rules="[rules.required]"
        label="Country"
        required
      />
      <v-text-field
        v-model="RegInfo.password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        label="Password"
        required
        counter
        @click:append="show1 = !show1"
      />
      <v-text-field
        v-model="RegInfo.repeatPass"
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
            v-model="RegInfo.name"
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
            v-model="RegInfo.lastname"
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
            v-model="RegInfo.birthday"
            :rules="[rules.required]"
            label="Birthday date"
            prepend-icon="fa-date"
            readonly
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <v-date-picker
          ref="picker"
          v-model="RegInfo.birthday"
          :max="new Date().toISOString().substr(0, 10)"
          min="1920-01-01"
          @change="save"
        />
      </v-menu>
      <v-text-field
        v-model="RegInfo.work"
        :rules="[v => v.length <= 10 || 'Max 20 characters']"
        label="Work"
      />
      <v-text-field
        v-model="RegInfo.hobby"
        :rules="[v => v.length <= 10 || 'Max 20 characters']"
        label="Hobby"
      />
      <v-row>

        <v-col
          cols="12"
          sm="6"
        >
          <v-combobox
            multiple
            v-model="RegInfo.like"
            label="Like"
            append-icon
            chips
            deletable-chips
            class="tag-input"
            :search-input.sync="search"
            @keyup.tab="updateTags"
            @paste="updateTags"
          >
          </v-combobox>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-combobox
            multiple
            v-model="RegInfo.dislike"
            label="Dislike"
            append-icon
            chips
            deletable-chips
            class="tag-input"
            :search-input.sync="search"
            @keyup.tab="updateTags"
            @paste="updateTags"
          >
          </v-combobox>
        </v-col>
      </v-row>
      <v-row class="between ml-0">
        <v-checkbox
          class="mr-2"
          v-model="RegInfo.married"
          label="Married?"
        />
        <v-checkbox
          v-model="RegInfo.childs"
          label="Childs?"
        />
      </v-row>
      <v-checkbox
        v-model="checkbox"
        :rules="[rules.required]"
      >
        <template #label>
          <div>
            I agree with
            <v-tooltip bottom>
              <template #activator="{ on }">
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
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, maxLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'Registration',
  mixins: [validationMixin],
  props: {
    rules: {
      required: Boolean,
      min: Boolean,
      email: Boolean
    }
  },
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
  data () {
    return {
      speed: 0,
      search: '',
      checkbox: false,
      show1: false,
      menu: false,
      validReg: false,
      RegInfo: {
        profileUrl: '',
        username: '',
        email: '',
        name: '',
        lastname: '',
        birthday: new Date().toISOString().substr(0, 10),
        password: '',
        repeatPass: '',
        hobby: '',
        work: '',
        married: false,
        childs: false,
        country: '',
        like: [],
        dislike: []
        // TODO: What we need?
        // disc: {
        //   CorrelationCoefficent: 1,
        //   Dominance: 0,
        //   Influence: 0,
        //   Steadness: 0,
        //   Conscient: 0,
        //   correlationCoefficent: 1,
        //   dominance: 0,
        //   influence: 0,
        //   steadness: 0,
        //   conscient: 0
        // }
      }
    }
  },
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
    async submitReg () {
      await this.$axios
        .post('users', this.RegInfo)
        .then((response) => {
        })
    },
    updateTags () {
      this.$nextTick(() => {
        this.select.push(...this.search.split(','))
        this.$nextTick(() => {
          this.search = ''
        })
      })
    },
    save (date) {
      this.$refs.menu.save(date)
    },
    clear () {
      this.$v.$reset()
      this.validReg = false
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    }
  },
  mounted () {
    setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 1
    }, 5000)
  }
}
</script>

<style lang="scss" scoped>
</style>
