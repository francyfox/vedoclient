import Vue from 'vue'

Vue.filter('truncate', (text, stop, clamp) => {
  if (typeof text === 'object' && text !== null) {
    text = JSON.stringify(text)
  }
  if (text !== undefined) {
    return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
  } else {
    return text
  }
})

export default ({ store }) => {
  store.commit('dump/dump_active')
}

Vue.filter('dump', (text, format) => {
  if (typeof text === 'object' && text !== null) {
    text = JSON.stringify(text)
  }
  if (text !== undefined && process.browser) {
    localStorage.setItem('dump', text)
    return ''
  } else {
    return false
  }
})
