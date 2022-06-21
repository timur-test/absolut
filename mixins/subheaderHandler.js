import debounce from 'lodash.debounce'

export default {
  mounted() {
    window.addEventListener('scroll', this.stickySelectHandler)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.stickySelectHandler)
  },
  methods: {
    scrollToAnchor() {
      this.$emit('select-click')
    },
    stickySelect() {
      const select = this.$refs.select
      const rect = select.getBoundingClientRect()
      if (rect.top < 0) {
        this.$nuxt.$emit('changeHeaderClass', true)
        select.classList.add('sticky')
      }
      if (window.scrollY < 400) {
        this.$nuxt.$emit('changeHeaderClass', false)
        select.classList.remove('sticky')
      }
    },
    stickySelectHandler: debounce(function () {
      this.stickySelect()
    }, 1000 / 60),
  },
}
