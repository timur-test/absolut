<template>
  <div id="app" class="app-home">
    <span id="page-top" />
    <Header
      ref="header"
      :is-hide="isHeaderHide"
      :is-sticky="isHeaderSticky"
      :class="{ open: isSideNavbar }"
    />
    <Nuxt ref="content" />
    <Footer />
  </div>
</template>

<script>
import layoutsHandlers from '~/mixins/layoutsHandlers.js'

import Footer from '~/components/Footer'

export default {
  name: 'Home',
  components: {
    Footer,
  },
  mixins: [layoutsHandlers],
  methods: {
    isHide() {
      const contentY = this.$refs.content.$el.getBoundingClientRect().y
      const contentPositonTop = 0.8 * window.innerHeight
      const contentRealTop = contentY + contentPositonTop
      const headerHeight = this.$getComputedStyle(
        this.$refs.header.$el,
        'height',
      )
      const isHide = contentRealTop <= headerHeight && contentRealTop > 0
      const stickyCondition = contentRealTop < 0
      return { isHide, stickyCondition }
    },
  },
}
</script>

<style lang="scss">
.app-home {
  --content-top: 80vh;

  .header {
    z-index: 1;
    .logo {
      @include color($COLOR_SMOKE, $COLOR_BLACK-BLUE);
    }
    &.sticky a,
    &.sticky button {
      @include color($COLOR_BLACK-BLUE, $COLOR_GREY-BLUE);
    }
    .navbar.open {
      .logo {
        @include color($COLOR_BLACK-BLUE, $COLOR_GREY-BLUE);
      }
    }
    .navbar__dropdown-link {
      @include color($COLOR_BLACK-BLUE, $COLOR_GREY-BLUE);
    }
  }

  .footer {
    top: var(--content-top);
  }
  .navbar__burger {
    @include color($COLOR_SMOKE, $COLOR_BLACK-BLUE);
    a:active {
      color: $COLOR_SMOKE;
    }
  }

  @include large-desktop {
    .navbar__item a,
    .navbar__item button {
      @include color($COLOR_SMOKE, $COLOR_BLACK-BLUE);
    }
    .navbar__dropdown li a,
    .navbar__dropdown li button {
      @include color($COLOR_BLACK-BLUE, $COLOR_SMOKE);
    }
  }
}
</style>
