<template>
  <section class="archive-slider">
    <div class="container">
      <header>
        <h2 class="text-h1">{{ title }}</h2>
        <div class="slider-pagination">
          <button aria-label="slide-prev">
            <inline-svg
              :src="$getDefault('img', 'DEFAULT_ICON_ARROW_LINK')"
              @click="$emit('slideMove', false)"
            />
          </button>
          <button aria-label="slide-next">
            <inline-svg
              :src="$getDefault('img', 'DEFAULT_ICON_ARROW_LINK')"
              @click="$emit('slideMove', true)"
            />
          </button>
        </div>
      </header>
      <CustomSlider :swiper-options="$options.swiperOptions">
        <div v-for="(item, i) in items" :key="$keyGen(i)" class="swiper-slide">
          <p :class="!isMobile ? 'text-h3' : 'text-p1'">{{ item.title }}</p>
          <nuxt-link :to="item.link.href">
            <p v-if="!isMobile" class="text-p2">{{ item.link.text }}</p>
            <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_ARROW_LINK')" />
          </nuxt-link>
        </div>
      </CustomSlider>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomSlider from '~/components/custom/CustomSlider.vue'
export default {
  swiperOptions: {
    slidesPerView: 1.4,
    breakpoints: {
      767: {
        slidesPerView: 2,
      },
      1439: {
        slidesPerView: 3,
      },
    },
  },
  name: 'ContestsArchiveSlider',
  components: {
    CustomSlider,
  },
  props: {
    title: {
      type: String,
      default: 'заголовок не получен',
    },
    items: {
      type: Array,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['isMobile']),
  },
}
</script>

<style lang="scss">
.archive-slider {
  .container {
    padding-right: 0;
  }
  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4rem;
  }
  .swiper-slide {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 26rem;
    border-top: $BORDER_DEFAULT;
    padding: 2rem 2.5rem 2rem 0;
    &:not(:first-of-type) {
      padding-left: 2rem;
      border-left: $BORDER_DEFAULT;
    }

    .text-p1 {
      max-width: 50%;
    }
    a {
      @include a;
      align-self: flex-end;
      display: flex;
    }
    svg {
      width: 4.3rem;
    }
    .text-p2 {
      margin-right: 1rem;
      text-transform: lowercase;
    }
  }

  .swiper-slide {
    width: 25rem;
  }

  .slider-pagination {
    display: none;
    button {
      @include a;
      &:nth-child(1) {
        svg {
          transform: rotate(180deg);
        }
        margin-right: 3rem;
      }
    }
    svg {
      height: 1.6rem;
      color: $COLOR_BLACK-BLUE;
    }
  }

  @include tablet {
    .container {
      padding-left: 0;
    }
    h2.text-h1 {
      padding-left: var(--main-padding-x);
    }
    .swiper-slide {
      width: 38.5rem;
      padding: 3rem 3.5rem 2.4rem 4rem;
      &:not(:first-of-type) {
        padding-left: var(--main-padding-x);
      }
      .text-h3 {
        max-width: 50%;
      }
    }
    .slider-pagination {
      display: flex;
      padding-right: var(--main-padding-x);
    }
  }
  @include large-desktop {
    .container {
      padding: 0 var(--main-padding-x);
    }
    header {
      margin-bottom: 8rem;
    }
    h2.text-h1 {
      padding-left: 0;
    }
    .slider-pagination {
      padding-right: 0;
    }
    .swiper-slide {
      width: 33%;
      min-width: 44.6rem;
      height: 46rem;

      border-right: $BORDER_DEFAULT;
      &:first-of-type {
        border-left: $BORDER_DEFAULT;
      }
      &:not(:first-of-type) {
        border-left: none;
      }
    }
  }
}
</style>
