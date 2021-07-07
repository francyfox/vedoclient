<template>
  <div class="data-dump">
    <div class="data-dump__label">{{ typeof data }}</div>
    <pre v-if="json" class="data-dump__pre language-json">
      <code>{{ JSON.parse(data) }}</code>
    </pre>
    <pre v-else class="data-dump__pre language-json">
      <code>{{ JSON.stringify(data, null, 4)}}</code>
    </pre>
  </div>
</template>
<script>
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-json'

export default {
  name: 'dump',
  props: ['data', 'json'],
  mounted () {
    Prism.highlightAll()
  }
}
</script>
<style scoped>
.data-dump {
  border: 2px solid #9c27b0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
  Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.spacer {
  margin: auto;
}
.data-dump__label-button {
  margin-left: 1rem;
}
.data-dump__label {
  padding: 0.5rem;
  border-bottom: 2px solid #9c27b0;
  display: flex;
  align-items: center;
}
.data-dump__pre {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
}
.data-dump__pre code {
  white-space: break-spaces;
  overflow-y: auto;
  display: block;
  font-size: 0.9rem;
  font-family: inherit;
  background-size: auto 3em;
  line-height: 1.5;
  font-family: Monaco, Menlo, Consolas, 'SF Mono', 'Ubuntu Mono', monospace;
  padding: 0 1em;
}
.data-dump__label::before {
  content: 'ℹ️ ';
}
</style>
