<template>
  <div id="app" class="app">
    <span id="page-top" />
    <Header
      ref="header"
      :is-hide="isHeaderHide"
      :is-sticky="isHeaderSticky"
      :class="{ open: isSideNavbar || isOpenNavbarDropdown }"
    />
    <Nuxt ref="content" class="content" />
    <Footer />
  </div>
</template>

<script>
import layoutsHandlers from '~/mixins/layoutsHandlers.js'

import Footer from '~/components/Footer'

export default {
  name: 'Default',
  components: {
    Footer,
  },
  mixins: [layoutsHandlers],
  mounted() {
    this.$nuxt.$on('changeHeaderClass', this.headerClass)
  },
  methods: {
    isHide() {
      const headerHeight = this.$getComputedStyle(
        this.$refs.header.$el,
        'height',
      )
      const contentY = this.$refs.content.$el.getBoundingClientRect().y
      const isHide = this.scrollTop >= headerHeight
      const stickyCondition = contentY + headerHeight <= 0

      return { isHide, stickyCondition }
    },
    headerClass(e) {
      e
        ? this.$refs.header?.$el.classList.add('with-border-bottom')
        : this.$refs.header?.$el.classList.remove('with-border-bottom')
    },
  },
}
</script>

<style lang="scss">
.app {
  .header {
    z-index: 1;
    &.hide {
      z-index: -1;
    }
    &.with-border-bottom {
      box-shadow: none;
    }
  }
  .content {
    position: relative;
    top: var(--content-position-top);
    background-color: white;
    z-index: 2;
  }
  .footer {
    z-index: 1;
    top: calc(var(--content-position-top) + var(--footer-before-height));
  }
}
</style>
