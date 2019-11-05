import vue from 'vue'
import app from './app.vue'

new vue({
  el: '#app',
  render(h) {
    return h(app)
  }
})