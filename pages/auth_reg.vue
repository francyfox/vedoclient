<template class="bg">
  <v-app>
    <logbar
      :status="log.status"
      :data="log.data"
    />
    <v-parallax
      dark
      class="wp"
      height="100vh"
      src="/fon.jpg"
    >
      <v-row
        class="pl-10"
        align="center"
        justify="left"
      >
        <v-card max-width="600" class="mt-10 pa-6 -align-center">
          <v-tabs
            v-model="tab"
          >
            <v-tab>
              AUTH
            </v-tab>
            <v-tab>
              REGISTRATION
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <auth
                  :rules="rules"
                  @setLog="onLog"
                />
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <registration
                  :rules="rules"
                />
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-row>
<!--      <div class="bg">-->
<!--        <span>V</span>-->
<!--        <span>edo</span>-->
<!--        <span>F</span>-->
<!--        <span>a</span>-->
<!--        <span>i</span>-->
<!--        <span>r</span>-->
<!--      </div>-->
    </v-parallax>
  </v-app>
</template>

<script>
import logbar from '../components/logbar'
import Auth from '../components/auth'
import Registration from '../components/registration'

export default {
  name: 'AuthReg',
  components: {
    logbar,
    Registration,
    Auth
  },
  data () {
    return {
      log: {
        status: 0,
        data: ''
      },
      tab: null,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        email: v => /.+@.+/.test(v) || 'E-mail must be valid'
      },
      tabs: null
    }
  },
  methods: {
    onLog (data) {
      this.log.status = data.status
      this.log.data = data.data
    }
  }
}
</script>

<style lang="scss" scoped>
  .wp{
    max-width: 100% !important;
    height: 100% !important;
  }
  .bg{
    pointer-events: none;
    filter: contrast(0.5);
    right: 42%;
    top: -2.5vh;
    position: absolute;
    font-family: 'Rosarivo', serif;
    font-size: 15vw;
    span {
      &:nth-child(1) {
        left: 8vw;
      }
      &:nth-child(2) {
        top: 5vw;
        left: 5vw;
      }
      &:nth-child(3) {
        top: 20vw;
        left: 0vw;
      }
      &:nth-child(4) {
        top: 25vw;
        left: 8vw;
      }
      &:nth-child(5) {
        top: 18vw;
        left: 16vw;
      }
      &:nth-child(6) {
        top: 25vw;
        left: 22vw;
      }
      position: absolute;
      filter: invert(1);
      color: #424242;
      letter-spacing: .15em;
      text-shadow:
        1px -1px 0 rgba(118, 118, 118, 0.62),
        -1px 2px 1px #73727261,
        -2px 4px 1px #76747461,
        -3px 6px 1px #78777761,
        -4px 8px 1px #78777761,
        -5px 10px 1px #7f7d7d61,
        -6px 12px 1px rgba(129, 130, 129, 0.38),
        -7px 14px 1px #86858561,
        -8px 16px 1px #8b8a8961,
        -9px 18px 1px #8f8e8d61,
        -10px 20px 1px #94939261,
        -11px 22px 1px #99989761,
        -12px 24px 1px #9e9c9c61,
        -13px 26px 1px #a3a1a161,
        -14px 28px 1px #a8a6a661,
        -15px 30px 1px rgba(106, 182, 97, 0.38),
        -16px 32px 1px rgba(97, 182, 111, 0.38),
        -17px 34px 1px rgba(97, 182, 101, 0.38),
        -18px 36px 1px #bcbbba61,
        -19px 38px 1px #c1bfbf61,
        -20px 40px 1px #c6c4c461,
        -21px 42px 1px #cbc9c861,
        -22px 44px 1px #cfcdcd61,
        -23px 46px 1px #d4d2d161,
        -24px 48px 1px #d8d6d561,
        -25px 50px 1px #dbdad961,
        -26px 52px 1px #dfdddc61,
        -27px 54px 1px #e2e0df61,
        -28px 56px 1px #e4e3e261;
    }
  }
</style>
