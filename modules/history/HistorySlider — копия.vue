<template>
  <section
    id="history-slider"
    :key="sliderKey"
    :style="containerStyle"
  >
    <div ref="slider-wr" class="history-slider__wr" :class="sliderWrClass">
      <div ref="select" class="history-slider__top">
        <ul class="history-slider__top-navi">
          <li>
            <a
              class="text-p2"
              :class="{active: activeSlide === 0}"
              @click.prevent="pagHandler('#slide-0', true)">
              с начала
            </a>
          </li>
          <li>
            <a
              class="text-p2"
              :class="{active: activeSlide === items.length - 1}"
              @click.prevent="pagHandler('#slide-' + (items.length - 1), true)"
            >
              с конца
            </a>
          </li>
        </ul>
        <template v-if="!isDesktop">
          <HistoryPagination
            :active-slide="activeSlide"
            :slides="items"
            :pagination-position="paginationPosition"
            @change-slide="pagHandler"
          />
        </template>
      </div>
      <div
        class="history-slider-container"
        :style="sliderContainerStyle"
      >
        <HistorySlide
          v-for="(slide, index) in items"
          :key="index"
          :slide="slide"
          :slide-index="index"
        />
      </div>
      <template v-if="isDesktop">
        <HistoryPagination
          :active-slide="activeSlide"
          :slides="items"
          :pagination-position="paginationPosition"
          @change-slide="pagHandler"
        />
      </template>
      <div v-if="!isMobile" class="history-slider__prompt">
        <p id="text" class="text-p2">
          Для навигации по странице используйте скролл мыши/тачпада или клавиши
          «вверх-вниз».
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill';
import { mapGetters } from 'vuex'
 import debounce from 'lodash.debounce'

import HistorySlide from './HistorySlide.vue'
import HistoryPagination from './HistoryPagination.vue'
import subheaderHandler from '~/mixins/subheaderHandler.js'

export default {
  name: 'HistorySlider',
  components: {
    HistorySlide,
    HistoryPagination,
  },
  mixins: [subheaderHandler],
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      pagStep: 0,
      activeSlide: 0,
      pagItemWidth: 0,
      indicatorWidth: 0,
      containerWidth: 0,
      isVisibleSlider: false,
      containerTranslate: null,
      scrollPosition: 0,
      offsetLeft: 0,
      sliderKey: 0,
      sliderEnd: false
    }
  },

  computed: {
    ...mapGetters(['getHeaderSticky', 'isMobile', 'isDesktop']),
    paginationPosition() {
      if (!this.isDesktop) {
        return `calc(1.5rem - ${this.pagStep}px)`
      } else {
        return `calc(50% - ${this.pagStep}px - ${this.pagItemWidth / 2}px)`
      }
    },
    sliderContainerStyle() {
      if (!this.isDesktop) return null

      return { transform: this.containerTranslate }
    },
    sliderWrClass() {
      if (this.isDesktop) {
        return {
          sticky: this.getHeaderSticky && !this.sliderEnd,
          end: this.sliderEnd,
          show: this.isVisibleSlider
        }
      }
      return null
    },
    sliderPositionTop() {
      if (!this.isDesktop) {
        return null
      }
      return this.getHeaderSticky ? '10rem' : '16rem'
    },
    containerStyle() {
      if (!this.isDesktop) return null
      return {
        height: this.containerWidth ? this.containerWidth + 'px' : '22000px',
      }
    },
  },
  mounted() {
    if (!window) return

    setTimeout(() => {
      this.initSlider()
      this.calcElementsWidth()
    }, 300)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler)
    window.removeEventListener('resize', this.resizeWindowHandler)
  },
  methods: {
    initSlider() {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      })
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          const event = new Event('resize')
          window.dispatchEvent(event)
          resolve()
        }, 500)
      })

      promise.then(() => {
        this.setContainerWidth()
        this.isVisibleSlider = true

        window.addEventListener('scroll', this.scrollHandler)
        this.scrollHandler()


        if (navigator.userAgent.includes('Safari')) {
          smoothscroll.polyfill();
        } else {
          window.addEventListener('resize', this.resizeWindowHandler)
        }

        this.$refs['slider-wr'].style.opacity = '1'
      })
    },
    initDomElements() {
      return {
        slides: [...document.querySelectorAll('.history-slide')],
        sliderContainer: document.querySelector('.history-slider-container'),
        pagination: document.querySelector('.history-pagination'),
        footer: document.querySelector('.footer'),
        pagItems: document.querySelectorAll('.history-pagination__item')
      }
    },
    resizeWindowHandler() {
      this.updateComponent()
      this.setContainerWidth()
      this.calcElementsWidth()
      this.debousedSetPaginationPosition()
    },
    debousedSetPaginationPosition: debounce(function() {
      this.setPaginationPosition(this.activeSlide)
    }, 10),
    scrollHandler() {
      if (this.isDesktop) {
        this.containerTranslate = `translateX(calc(-${window.pageYOffset}px))`
        const { footer } = this.initDomElements()
        const footerRect = footer.getBoundingClientRect()

        if (this.isVisibleSlider) {
          this.sliderEnd = footerRect.top < window.innerHeight + 200
        }
      }
      this.debouncedChangeActiveSlide()
    },
    setContainerWidth() {
      setTimeout(() => {
        if (this.isDesktop) {
          const { sliderContainer } = this.initDomElements()
          this.containerWidth = sliderContainer.scrollWidth
        }
      }, 100);
    },
    pagHandler(slideId, startEnd = false) {
      const targetElement = document.querySelector(slideId)
      if (this.isDesktop || (this.isDesktop && startEnd)) {
        window.scrollTo(0, targetElement.offsetLeft)
      } else {
        const targetElementOffset = targetElement.offsetTop

        window.scrollTo({
          top: targetElementOffset,
          behavior: 'smooth',
        })
      }

      const slideIndex = +targetElement.getAttribute('data-pag')
      this.setPaginationPosition(slideIndex)
    },
    debouncedChangeActiveSlide : debounce(function() {
      this.changeActiveSlide()
    }, 50),
    changeActiveSlide() {
      const { slides } = this.initDomElements()
      const windowProp = this.isDesktop ? 'innerWidth' : 'innerHeight'
      const slideOffset = this.isDesktop ? 'offsetLeft' : 'offsetTop'
      const divisor = this.isDesktop ? 4 : 6
      const triggerArea = window.pageYOffset + window[windowProp] / divisor

      slides.every((slide, index) => {
        if (slide[slideOffset] <= triggerArea) {
          this.activeSlide = index
          return true
        }
        else {
          return false
        }
      })

      if (window.pageYOffset === 0) {
        this.activeSlide = 0
      }
      this.setPaginationPosition(this.activeSlide)
    },
    updateComponent() {
      this.activeSlide = 0
      this.pagStep = 0
      this.containerTranslate = 0
      setTimeout(() => {
        this.sliderKey = this.$keyGen(2)
      }, 500);
    },
    setPaginationPosition(slideIndex = null) {
      this.activeSlide = slideIndex
      if (this.activeSlide === null) {
        return
      }
      if (this.activeSlide >= 0) {
        const { pagItems } = this.initDomElements()
        const pagItem = pagItems[this.activeSlide]

        this.pagItemWidth = pagItem.clientWidth
        this.pagStep = pagItem.offsetLeft
      }
    },
    calcElementsWidth() {
      const { pagItems, pagination } = this.initDomElements()
      this.pagItemWidth = pagItems[0].clientWidth

      this.indicatorWidth = parseFloat(
        window.getComputedStyle(pagination,':after').width,
      )
    },
  },
}
</script>

<style lang="scss">
#history-slider {
  background: #fff;
  padding-bottom: 12rem;
  overflow-x: hidden;
  display: flex;
  align-items: flex-end;
  scroll-behavior: instant;

  @include mobile {
    padding: 0 var(--main-padding-x);
  }

  @include large-desktop {
    padding-bottom: 5rem;
    margin-top: -5rem;
    position: relative;
    overflow-x: visible;
    padding: 0;
    height: 22000px;
  }
}

.history-slider__wr {
  opacity: 0;
  width: 100%;
  @include large-desktop {
    @include transition(top);
    padding: 0 var(--main-padding-x);
    overflow-x: hidden;
    position: fixed;
    z-index: 100;
    background-color: white;
    top: 16rem;

    &.sticky {
      top: 10rem;
    }

    &.end {
      position: static;
    }
  }
}

.history-slider__top {
  left: 0;
  background-color: #fff;
  z-index: 2;
  top: 5rem;
  width: 100%;
  transition: top 0.3s;
  &.sticky {
    .history-slider__top-navi {
      padding-top: 1.5rem;
    }
    padding: 0 1.6rem;
  }

  @media (max-width: $LARGE_DESKTOP) {
    &.sticky {
      @include sticky;
      padding: 0 1.6rem;

      .history-slider__top-navi {
        border-top: 1px solid $COLOR_SMOKE;
      }
    }
  }

  @include tablet {

    padding: 0 var(--main-padding-x);

    &.sticky {
      .history-slider__top-navi {
        padding-top: 1.5rem;
      }
    }
  }

  @include large-desktop {
    padding: 0;
    &.sticky {
      position: static;
      padding: 0;
    }
  }
}
.history-slider__top-navi {
  display: flex;
  padding-bottom: 0.7rem;

  li {
    margin-right: 1.9rem;
    cursor: pointer;

    a {
      color: $COLOR_GREY-BLUE;

      &.active {
        color: $COLOR_BLACK-BLUE;
      }

      &:hover {
        color: $COLOR_BLACK-BLUE;
      }
    }
  }

  @include large-desktop {
    padding-bottom: 2rem;
    border-bottom: 2px solid $COLOR_BLACK-BLUE;
  }
}

.history-slider-container {
  position: relative;
  height: 100%;
  display: flex;
  padding-top: 4rem;
  flex-direction: column;
  flex-wrap: nowrap;
  max-width: none;
  transition: 0.3s;

  @include tablet {
    padding: 0 16.1rem;
    padding-top: 6rem;
  }

  @include large-desktop {
    flex-direction: row;
    padding: 5rem 0;
    padding-left: 33.8rem;
  }

}
.history-slider__prompt {
  display: none;
  margin-top: 3.7rem;
  padding-bottom: 6rem;
  p {
    max-width: 30.5rem;
    color: $COLOR_GREY-BLUE;
  }

  @include large-desktop {
    display: block;
  }
}
</style>
