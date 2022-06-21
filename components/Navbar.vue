<template>
  <nav class="navbar" :class="navbarClass">
    <button aria-label="navbar" class="navbar__burger" @click="open">
      <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_BURGER')" />
    </button>
    <ul v-if="response" ref="navbarItems" class="navbar__items">
      <li class="navbar__item">
        <header>
          <Logo v-if="isMobile" @click.native="routeChange('/')" />
          <button aria-label="close" class="navbar__close" @click="close">
            <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_CLOSE')" />
          </button>
        </header>
      </li>
      <li v-for="item in links" :key="item.text" class="navbar__item">
        <custom-dropdown
          v-if="item.items"
          :title="item.text"
          :is-open="isOpenDropdown"
          :relative="isDesktop"
          :button-class="linkClass"
          @open="isOpenDropdown = true"
          @close="isOpenDropdown = false"
          @hover="dropdownToggle"
        >
          <ul class="navbar__dropdown">
            <li v-for="(option, i) in item.items" :key="$keyGen(i)">
              <a
                :aria-label="option.text"
                class="navbar__dropdown-link"
                :class="{ 'text-p2': !isSideNavbar }"
                @click.prevent="
                  routeChange($getDefault('route', option.key) || '')
                "
                >{{ option.text }}</a
              >
            </li>
          </ul>
        </custom-dropdown>
        <a
          v-else
          :aria-label="item.text"
          :class="linkClass"
          @click.prevent="routeChange($getDefault('route', item.key) || '')"
          >{{ item.text }}</a
        >
      </li>
      <li class="navbar__item navbar__search">
        <button aria-label="search">
          <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_SEARCH')" />
        </button>
      </li>
      <li class="navbar__item" :class="linkClass">
        <button aria-label="lang" class="navbar__lang" @click="langChange">
          {{ langObject.text }}
        </button>
      </li>
    </ul>
    <span ref="navbarSideback" class="navbar__sideBack" />
  </nav>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import Logo from '~/components/Logo.vue'
import customDropdown from '~/components/custom/CustomDropdown.vue'

export default {
  name: 'Navbar',
  components: {
    customDropdown,
    Logo,
  },
  data() {
    return {
      isOpenDropdown: false,
      response: null,
      scrollBlockElem: null,
    }
  },
  async fetch() {
    const request = await this.$api.common.getNavbar()
    this.response = await request.data
  },
  computed: {
    ...mapState(['lang']),
    ...mapGetters(['isMobile', 'isDesktop', 'isSideNavbar']),

    locale() {
      return this.response[this.lang]
    },
    links() {
      return this.locale.filter((el) => {
        return !Object.prototype.hasOwnProperty.call(el, 'label')
      })
    },
    search() {
      return this.locale.find((el) => el.label === 'search')
    },
    langObject() {
      return this.locale.find((el) => el.label === 'lang')
    },

    navbarClass() {
      let result = ''
      if (this.isSideNavbar) result += 'open '

      return result
    },
    linkClass() {
      const condition = !this.isSideNavbar && this.isDesktop
      return condition ? 'text-p2' : 'text-h1'
    },
  },
  watch: {
    scrollBlockElem() {
      this.addRemoveListener(
        this.isSideNavbar,
        ['wheel', 'touchmove'],
        this.scrollBlock,
      )
    },
  },
  mounted() {
    document.addEventListener(
      'click',
      this.$notElClickListener(this.$refs.navbarItems, this.notElClose),
    )

    this.getScrollBlockElem()
    window.addEventListener('orientationchange', () => {
      this.addRemoveListener(false, ['wheel', 'touchmove'], this.scrollBlock)
      setTimeout(this.getScrollBlockElem, 100)
    })
  },
  beforeDestroy() {
    this.removeScrollBlock()
  },
  methods: {
    ...mapMutations(['isSideNavbarOpen', 'changeLang']),
    open() {
      this.addScrollBlock()
      this.isSideNavbarOpen(true)
    },
    close() {
      this.removeScrollBlock()
      this.isSideNavbarOpen(false)
    },
    routeChange(route) {
      this.close()
      setTimeout(() => {
        this.$router.push(route)
      }, 330)
    },

    notElClose(e) {
      if (
        e?.target.tagName !== 'A' &&
        !e?.target.classList.contains('navbar__sideBack')
      ) {
        return
      }
      this.close()
    },
    dropdownToggle(e) {
      if (!this.isDesktop) return
      this.$nuxt.$emit('openNavbarDropdown', e)
      this.isOpenDropdown = e
    },

    scrollBlock(e) {
      e.preventDefault()
    },
    addScrollBlock() {
      this.addRemoveListener(true, ['wheel', 'touchmove'], this.scrollBlock)
    },
    removeScrollBlock() {
      this.addRemoveListener(false, ['wheel', 'touchmove'], this.scrollBlock)
    },
    addRemoveListener(condition, eventsArr, callback) {
      if (condition) {
        eventsArr.forEach((event) => {
          this.scrollBlockElem?.addEventListener(event, callback, {
            passive: false,
          })
        })
      } else {
        eventsArr.forEach((event) => {
          this.scrollBlockElem?.removeEventListener(event, callback, {
            passive: false,
          })
        })
      }
    },
    getScrollBlockElem() {
      if (!this.$refs.navbarItems) return
      const fullNavbarHeight = 640
      if (
        this.$getComputedStyle(this.$refs.navbarItems, 'height') <
        fullNavbarHeight
      )
        this.scrollBlockElem = this.$refs.navbarSideback
      else this.scrollBlockElem = document
    },

    langChange() {
      this.lang === 'ru' ? this.changeLang('en') : this.changeLang('ru')
    },
  },
}
</script>

<style lang="scss">
.navbar {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  a,
  button {
    @include color($COLOR_BLACK-BLUE, $COLOR_GREY-BLUE);
    text-transform: lowercase;
  }

  .dropdown__title-text {
    line-height: inherit;
  }

  &__sideBack {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: $COLOR_YELLOW;
    opacity: 0.85;
  }
  &__items {
    @include transition(transform);
    @include text-h1;
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    z-index: 10;
    padding: 2rem 2rem 3rem 1.5rem;
    header {
      display: flex;
      a {
        width: max-content;
      }
    }
  }
  &__item {
    &:last-of-type {
      margin-top: auto;
    }
    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }
  }
  &__burger {
    margin-left: auto;
    width: 3.5rem;
    height: 4.4rem;
    svg {
      position: relative;
      z-index: -1;
    }
  }
  &__dropdown {
    padding-left: 2.2rem;
    margin-top: 2rem;
    li {
      .navbar__dropdown-link {
        @include color($COLOR_BLACK-BLUE, $COLOR_GREY-BLUE);
      }
      &:not(:last-of-type) {
        margin-bottom: 2rem;
      }
    }
  }
  &__close {
    @include flex-center;
    width: 3.2rem;
    height: 3.2rem;
    justify-content: center;
    margin-left: auto;
    svg {
      width: 4.5rem;
    }
  }
  &__search {
    button {
      width: 2.5rem;
      position: relative;
      top: 0.4rem;
    }
  }

  &__lang {
    text-transform: lowercase;
  }

  &.open {
    .navbar__items {
      transform: translateX(-100%);
      overflow-y: scroll;
    }
    .navbar__burger {
      display: none;
    }
    .navbar__sideBack {
      display: block;
      height: 100vh;
      z-index: 9;
    }
  }

  @include mobile {
  }

  @include tablet {
    &__items {
      position: fixed;
      top: 0;
      right: -50%;
      width: 50%;
      padding: 3rem 4rem 3.4rem;
    }
  }

  @include large-desktop {
    &__items {
      @include text-p1;
      position: absolute;
      left: 0;
      right: unset;
      width: inherit;
      height: inherit;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      padding: 0;
      background-color: transparent;
    }
    &__item {
      &:last-of-type {
        margin-top: 0;
      }
      &:not(:last-of-type) {
        margin-bottom: 0;
        margin-right: 2rem;
      }
    }
    &__burger,
    &__close {
      display: none;
    }
    &__dropdown {
      @include dropdown-content;
    }
    &__search {
      display: block;
      button {
        width: 2.5rem;
        position: relative;
        top: 0.4rem;
      }
    }

    .dropdown__title {
      svg {
        transition: none;
        transform: unset;
      }
    }
  }
}
</style>
