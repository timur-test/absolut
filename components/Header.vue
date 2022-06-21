<template>
  <header class="header" :class="{ sticky: isSticky, hide: isHide }">
    <div class="header__logo">
      <Logo
        :color="isSticky ? 'colorBlackBlue' : 'colorSmoke'"
        :is-min="isSticky"
        to="/"
      />
    </div>
    <Navbar />
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Logo from '~/components/Logo.vue'
import Navbar from '~/components/Navbar.vue'

export default {
  name: 'Header',
  components: {
    Navbar,
    Logo,
  },
  props: {
    isHide: {
      type: Boolean,
      default: false,
    },
    isSticky: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['scrollTop']),
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
.header {
  width: 100%;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 3;
  padding: var(--main-padding);
  .navbar {
    flex-grow: 2;
  }
  &.hide {
    transform: translateY(-100%);
  }
  &.open {
    z-index: 99 !important;
  }

  &.sticky {
    z-index: 99 !important;
    @include transition(transform);
    position: fixed;
    top: 0;
    width: 100%;
    height: var(--header-sticky-height);
    background-color: white;
    box-shadow: 0px 4px 40px rgba(187, 209, 242, 0.55);
    transform: translateY(0);
    .header__logo {
      align-items: center;
      padding-bottom: 0;
    }
    .logo svg {
      width: 23.8rem;
      height: 4rem;
    }
    &.no-shadow {
      box-shadow: none;
    }
    @media (max-width: calc($LARGE_DESKTOP - 1px)) {
      .navbar {
        .navbar__items {
          height: 100vh;
        }
      }
    }
  }
  @include large-desktop {
    .header__logo {
      margin-top: 1.75rem;
    }
    &.sticky {
      .header__logo {
        margin-top: 0;
      }
    }
  }
}
</style>
