module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  rules: {
    quotes: [2, 'single', { "avoidEscape": true }]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {},
}
