<template>
  <main id="privacy" class="privacy">
    <div class="container">
      <PageTitle
        title="Политика конфиденциальности"
        :subtitle="$options.DATA.updateOn"
        title-class="col-12"
      />
      <span class="hr"></span>
      <div class="privacy__content">
        <div class="privacy-nav-wr">
          <div ref="select" class="privacy-nav-container" :style="navStyle">
            <PrivacyNav
              :active-item-index="activeIndex"
              :nav-list="navItems"
              @select-click="selectClickHandler"
            />
          </div>
        </div>
        <div class="privacy__main text-p1">

          <ul class="privacy__points-list">
            <li
              v-for="(point, i) in $options.DATA.points"
              :id="'point-' + i"
              :key="$keyGen(i)"
              class="privacy__point"
            >
              <h2 class="text-h2">
                {{point.title}}
              </h2>
              <ul
                v-if="point.subpoints"
              >
                <li
                  v-for="(subpoint, j) in point.subpoints"
                  :key="$keyGen(j)"
                >
                  <p v-if="subpoint.text" v-html="subpoint.text"></p>

                  <ul v-if="subpoint.list" class="privacy__ul">
                    <li
                      v-for="(listItem, k) in subpoint.list"
                      :key="$keyGen(k)"
                    >
                      <span v-html="listItem"></span>
                    </li>
                  </ul>
                  <ul v-if="subpoint.subpointInner" class="privacy__list-inner">
                    <li
                      v-for="(subpointInnerItem, l) in subpoint.subpointInner"
                      :key="$keyGen(l)"
                    >
                      <p v-if="subpointInnerItem.text" v-html="subpointInnerItem.text"></p>
                      <ul v-if="subpointInnerItem.list" class="privacy__ul">
                        <li
                          v-for="(listItem, k) in subpointInnerItem.list"
                          :key="$keyGen(k)"
                        >
                          <span v-html="listItem"></span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill';
import { mapGetters } from  'vuex'
import subheaderHandler from '~/mixins/subheaderHandler.js'

import privacyData from '~/modules/privacy/privacy.json'
import PageTitle from '~/components/blocks/PageTitle.vue'
import PrivacyNav from '~/modules/privacy/PrivacyNav.vue'

export default {
  DATA: privacyData,
  name: 'Privacy',
  components: {
    PageTitle,
    PrivacyNav,
  },
  mixins: [subheaderHandler],
  data() {
   return {
      activeIndex: 0,
      topPosition: 0,
      scrollPosition: 0,
      navPosition: 'static',
      navOffsetTop: 0,
      isDesktop: null,
      isMobile: null
   }
  },
  computed: {
    ...mapGetters(['getHeaderSticky']),
    navItems() {
      return this.$options.DATA.points.map(point => point.title)
    },
    navStyle() {
      if(this.isDesktop) {
        return {
          transform: `translateY(${this.topPosition + 'px'})`,
          position: this.navPosition,
          top: this.navPosition === 'absolute' ? 'auto' : '12.6rem',
          bottom: this.navPosition === 'absolute' ? '0' : 'auto'
        }
      }
      return null
    }
  },
  mounted() {
    if(window) {
      const { nav } = this.initDomElements()
      this.navOffsetTop = nav.offsetTop * 2

      if (navigator.userAgent.includes('Safari')) {
        smoothscroll.polyfill();
      }

      setTimeout(() => {
          this.isMobile = this.$store.getters.isMobile
          this.isDesktop = this.$store.getters.isDesktop
          this.scrollHandler()
          window.addEventListener('scroll', this.scrollHandler)
          window.addEventListener('resize', this.scrollHandler)
      }, 300)


    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler)
    window.removeEventListener('resize', this.scrollHandler)
  },
  methods: {
    selectClickHandler(index) {
      const scrollTo = (behavior) => {
        const { header, point, nav} = this.initDomElements(index)
        let scrollYposition = point.getBoundingClientRect().top + window.pageYOffset - header.clientHeight
        const isDesktop = this.isDesktop
        const isMobile = this.isMobile
        const isTablet = !isMobile && ! isDesktop

        if (isDesktop) scrollYposition -= 50
        if (isMobile) scrollYposition -= 9
        if (isTablet) scrollYposition -= 42
        if (!isDesktop) scrollYposition -= nav.clientHeight
        if (isMobile && !this.getHeaderSticky) scrollYposition -= 30

        window.scrollTo({
          top: scrollYposition,
          behavior
        })
      }

      scrollTo('smooth')
    },
    scrollHandler() {
      const desktopSafari = navigator.userAgent.includes('Safari') && window.innerWidth > 1439

      if (this.isDesktop || desktopSafari) {
        // this.changePositionNav()
        this.setPositionNav()
      }

      this.changeActiveIndex()
      },
    changePositionNav() {
      const { nav, header, content } = this.initDomElements()
      const rectNav = nav.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()

      if (contentRect.bottom < window.innerHeight) {
        return
      }

      if (window.pageYOffset > this.scrollPosition) {
        if (contentRect.top < 0 && rectNav.bottom > window.innerHeight) {
          this.topPosition-=20
        }
      } else if(rectNav.top < header.clientHeight) {
        this.topPosition+=20
      }

      this.scrollPosition = window.pageYOffset

      if (contentRect.top > 0) {
        this.topPosition = 0
      }
    },
    changeActiveIndex() {
      const { points, header, nav } = this.initDomElements()

      points.forEach((item, index) => {
        const navItemRect = item.getBoundingClientRect()
        const itemOffset = navItemRect.top + window.pageYOffset
        const targetArea = itemOffset - header.clientHeight - nav.clientHeight - 100

        if (targetArea  <  window.pageYOffset) {
          this.activeIndex = index
        }

      });
    },
    initDomElements(index = 0) {
      return {
        nav: document.querySelector('.privacy-nav-container'),
        header: document.querySelector('.header'),
        content: document.querySelector('.privacy__content'),
        points: document.querySelectorAll('.privacy__point'),
        point: document.querySelector('#point-' + index),
      }
    },
    setPositionNav() {
      const { content, header, nav} = this.initDomElements()
      const contentRect = content.getBoundingClientRect()
      const endPositionFixed = nav.clientHeight + this.navOffsetTop

      if (contentRect.bottom <= endPositionFixed) {
        this.navPosition = 'absolute'
      } else {
        this.navPosition = contentRect.top <= header.clientHeight ?  'fixed' : 'static'
      }
    }
  },

}
</script>

<style lang="scss">
.privacy {
  .page-title {
    width: 100%;
    padding-bottom: 0;
    margin-bottom: 2rem;

    @include large-desktop {
      margin-bottom: 3rem;
    }
  }
  .page-title__header  {
    padding-bottom: 0;
    flex-direction: column;
    margin-bottom: 0;
    h1 {
      word-spacing: normal;
      margin-bottom: 4rem;

      @include large-desktop {
        margin-bottom: 8rem;
      }
    }

    p {
      font-size: 1.6rem;
      line-height: 2rem;
    }

  }
  .custom-select__title {
    text-transform: inherit;
  }
  .custom-select__items {
    width: calc(100vw - var(--main-padding-x) * 2);
  }
}
.privacy-nav-wr {
  @include tablet {
    width: 18.4rem;
    min-width: 18.4rem;
    margin-right: 5.9rem;
  }

  @include large-desktop {
    width: 31.6rem;
    margin-right: 13.9rem;
  }
}
.privacy-nav-container {
  @include transition(top);
  width: 100%;

  @include large-desktop {
    margin-right: 10rem;
    top: 12.6rem;
    height: max-content;
    width: 31.6rem;
  }
  @media (max-width: $LARGE_DESKTOP) {
    &.sticky {
      @include sticky;
    }
  }
  &:not(.sticky) {
    .privacy-nav__tablet {
      height: 5rem;
    }
  }
  @include mobile {
    &.sticky {
      .privacy-nav__mobile {
        border-top: 1px solid $COLOR_SMOKE;
      }
    }
  }

}
.privacy__content {
  position: relative;
  width: 100%;
  padding-top: 1.45rem;

  @include tablet {
    padding-top: 2.05rem;
    display: flex;
    justify-content: flex-start;
  }

  @include large-desktop {
    padding-top: 8rem;
  }
}
.privacy__main {
  padding-top: 5.45rem;
  h2 {
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 3rem;
  }

  @include large-desktop {
    padding-top: 0;
    max-width: 76.5rem;
  }
}

.privacy-nav-container {
  padding: 0;
}

.privacy__ul {
  margin-bottom: 3rem;

  li {
    --disc-position-top: .65rem;
    @include list-style;
    padding-left: 3rem;
    margin-bottom: 0.5rem;
    margin-left: 0.8rem;
  }
}
.privacy__list-inner {
  padding-left: 3.5rem;
}

.privacy__point {
  &:not(:last-child) {
    margin-bottom: 8rem;
  }
  &:last-child {
    li:last-child p{
      margin-bottom: 0;
    }
  }

}
</style>
