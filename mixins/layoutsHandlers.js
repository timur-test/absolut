import { mapMutations, mapState, mapGetters } from 'vuex'
import debounce from 'lodash.debounce'

import Header from '~/components/Header'

export default {
  components: {
    Header,
  },
  provide() {
    return {
      storageUrl: this.storageUrl,
    }
  },
  data() {
    return {
      isHeaderHide: false,
      isHeaderSticky: false,
      isOpenNavbarDropdown: false,
    }
  },
  computed: {
    ...mapState(['scrollTop', 'lang']),
    ...mapGetters(['isDesktop', 'isSideNavbar']),
    storageUrl() {
      return process.env.STORAGE_URL
    },
  },
  watch: {
    lang(newV) {
      localStorage.lang = newV
    },
  },
  mounted() {
    if (localStorage.lang) this.changeLang(localStorage.lang)

    this.resizeHandler()
    this.scrollHandler()
    this.headerHide()

    window.addEventListener('resize', this.resizeHandler)
    window.addEventListener('scroll', this.scrollHandler)

    this.$nuxt.$on('openNavbarDropdown', (e) => (this.isOpenNavbarDropdown = e))
  },
  methods: {
    ...mapMutations([
      'updateWindowWidth',
      'updateScrollTop',
      'setHeaderSticky',
      'changeLang',
    ]),
    resizeHandler: debounce(function () {
      this.updateWindowWidth(window.innerWidth)
    }, 1000 / 60),

    scrollHandler: debounce(function () {
      this.updateScrollTop(window.scrollY)
      this.headerHide()
    }, 10),

    headerHide() {
      const { isHide, stickyCondition } = this.isHide()

      if (stickyCondition) {
        this.isHeaderSticky = true
        this.setHeaderSticky(true)
      } else if (isHide) {
        this.isHeaderHide = true
      } else {
        this.isHeaderHide = false
        this.isHeaderSticky = false
        this.setHeaderSticky(false)
      }
    },
  },
}
