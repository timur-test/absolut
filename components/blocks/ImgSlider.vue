<template>
  <div class="img-slider">
    <div class="img-slider__navigation">
      <button
        aria-label="slide-prev"
        class="slide-prev"
        @click="$emit('slideMove', false)"
      >
        <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_ARROW_LONG')" />
      </button>
      <button
        aria-label="slide-next"
        class="slide-next"
        @click="$emit('slideMove', true)"
      >
        <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_ARROW_LONG')" />
      </button>
    </div>
    <CustomSlider
      :swiper-options="$options.swiperOptions"
      @activeIndex="activeIdx = $event"
    >
      <div v-for="(item, i) in images" :key="'slide-' + i" class="swiper-slide">
        <img :src="item" :alt="alt" />
      </div>
    </CustomSlider>
    <p class="img-slider__count text-p2">
      <span>{{ activeIdx + 1 }} из {{ images.length }}</span>
      <span> {{ desc[activeIdx] }} </span>
    </p>
  </div>
</template>

<script>
import CustomSlider from '~/components/custom/CustomSlider.vue'
export default {
  swiperOptions: {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      1439: {
        spaceBetween: 40,
      },
    },
  },
  name: 'ImgSlider',
  components: {
    CustomSlider,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    desc: {
      type: Array,
      default: () => [],
    },
    alt: {
      type: String,
      default: 'Абсолют-Помощь',
    },
  },
  data() {
    return {
      activeIdx: 0,
    }
  },
}
</script>

<style lang="scss">
.img-slider {
  --slide-height: 18rem;
  --slides-count-margin: 1rem 0 4.4rem;
  --slides-button-offset: 4rem;

  position: relative;

  .swiper-slide {
    width: 100%;
    height: var(--slide-height);
    img {
      height: inherit;
      object-fit: cover;
      border-radius: 3rem;
    }
  }

  .slide-prev,
  .slide-next {
    position: absolute;
    height: var(--slide-height);
    display: none;
    color: white;
    z-index: 2;
  }
  .slide-prev {
    transform: rotate(180deg);
    left: var(--slides-button-offset);
  }
  .slide-next {
    right: var(--slides-button-offset);
  }

  &__count {
    color: $COLOR_GREY-BLUE;
    margin: var(--slides-count-margin);
  }

  @include tablet {
    --slide-height: 36rem;
    --slides-count-margin: 1rem 0 5.4rem;

    .slide-prev,
    .slide-next {
      display: flex;
      align-items: center;
      width: 6.8rem;
    }
  }

  @include large-desktop {
    --slide-height: 70rem;
    --slides-count-margin: 1rem 0 7rem;
    --slides-button-offset: 5rem;

    .slide-prev,
    .slide-next {
      width: 10rem;
    }
  }
}
</style>
