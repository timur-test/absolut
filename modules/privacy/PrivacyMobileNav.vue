<template>
  <div class="privacy-mobile-nav" :class="{active: showOverlay}">
    <div class="privacy-mobile-nav__wr" :style="navStyle">
      <div class="privacy-mobile-nav__close" @click="$emit('close')">
        <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_CLOSE')" />
      </div>
      <div
        ref="nav-content"
        class="privacy-mobile-nav__content"
        :style="{maxHeight: maxHeightContent}"
      >
        <ul class="privacy-mobile-nav__list">
          <li
            v-for="(navItem, index) in navList"
            :key="$keyGen(index)"
          >
            <a
              :href="'#point-' + index"
              @click.prevent="$emit('click', index)"
            >
              {{navItem}}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="privacy-mobile-nav__bg">

    </div>
  </div>
</template>

<script>
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

export default {
  name: 'PrivacyMobileNav',
  props: {
    navList: {
      type: Array,
      default: () => ([])
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headerHeight: 0,
      maxHeightContent: 0,
      showList: false,
      showOverlay: false
    }
  },
  computed: {
    navStyle() {
      return  {top: this.showList ? `calc(${this.headerHeight  + 'px'} - 3rem )` : '120%'}
    }
  },
  watch: {
    isActive(val) {
      const header = document.querySelector('.header');
      val ? this.lockBody() : this.unlockBody()
      if (val) {
        header.setAttribute('style', 'z-index: 1 !important');
      } else {
        header.removeAttribute('style');
      }
      this.showOverlay = val
      this.showList = val
    }
  },
   mounted() {
     if (window) {
      this.initParams()
      window.addEventListener('scroll', this.initParams)
    }
  },
  beforeDestroy() {
     window.removeEventListener('scroll', this.initParams)
  },
  methods: {
    initParams() {
      this.headerHeight =  document.querySelector('.header').clientHeight
      this.maxHeightContent = `calc(100vh - ${this.headerHeight}px)`
    },
    lockBody() {
      disablePageScroll(this.$refs['nav-content']);
    },
    unlockBody() {
      enablePageScroll(this.$refs['nav-content']);
    }
  }
}
</script>

<style lang="scss">
.privacy-mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  pointer-events: none;

  &.active {
    opacity: 1;
    pointer-events: all;
    .privacy-mobile-nav__bg {
      opacity: .85;
      z-index: 100;
      pointer-events: all;
    }
  }
}
.privacy-mobile-nav__bg {
  @include transition(all);
  background-color: $COLOR_YELLOW;
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
}
.privacy-mobile-nav__content {
  background-color: white;
  left: 0;
  height: 100%;
  padding: 3rem;
  padding-bottom: 6rem;
  border-radius: 3rem 3rem 0 0;
  scrollbar-width: none;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /*chrome*/
  }
}
.privacy-mobile-nav__close {
  width: 4.5rem;
  height: 4.5rem;
  margin-left: auto;
  background-color: white;
  padding: 1.2rem;
  border-radius: 50%;
  margin-right: var(--main-padding-x);
  margin-bottom: 1rem;
  svg {
    width: 100%;
  }
}
.privacy-mobile-nav__list {
  li {
    margin-bottom: 1.4rem;
  }
}

.privacy-mobile-nav__wr {
  @include transition(all);
  position: absolute;
  top: 120%;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 101;
  height: 100%;
}
</style>
