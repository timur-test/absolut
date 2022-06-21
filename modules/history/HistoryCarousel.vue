<template>
<div class="history-carousel">
  <div class="history-carousel-wr" :class="'swiper-' + slideIndex">
    <div class="swiper-wrapper">
      <div
        v-for="(slide, idx) in images"
        :key="idx"
        class="history-carousel__item swiper-slide"
      >
        <div
          class="history-slide__img responsive-img"
        >
          <img :src="'/img/history/' + slide"/>
        </div>
      </div>
    </div>
    <div class="history-carousel__prev">
      <inline-svg
        :src="$getDefault('img', 'DEFAULT_ICON_ARROW_LINK')"
        class="history-carousel__prev-icon"
      />
    </div>
    <div class="history-carousel__next">
      <inline-svg
        :src="$getDefault('img', 'DEFAULT_ICON_ARROW_LINK')"
        class="history-carousel__next-icon"
      />
    </div>
  </div>
  <div v-if="swiper" class="history-carousel__count text-p2">
    {{ swiper.realIndex + 1 }} из {{ images.length }}
  </div>
</div>
</template>

<script>
// eslint-disable-next-line import/no-named-as-default
import Swiper, { Navigation } from 'swiper'
Swiper.use([Navigation])

export default {
  name: 'HistoryCarousel',
  props: {
    images: {
      type: Array,
      required: true
    },
    slideIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      swiper: null
    }
  },
  computed: {
    activeSlide() {
      return (
        this.swiper.activeIndex <= this.images.length &&
        this.swiper.activeIndex || this.images.length
      )
    }
  },
  mounted() {
    this.swiper = new Swiper('.swiper-' + this.slideIndex, {
      loop: true,
      normalizeSlideIndex:false,
      slidesPerView: 1,

      navigation: {
        nextEl: '.history-carousel__next',
        prevEl: '.history-carousel__prev',
      },
    });

  }
}
</script>

<style lang="scss" scoped>
  @import 'swiper/swiper.min.css';
  @import 'swiper/components/navigation/navigation.min.css';

  .history-carousel {
    position: relative;
    margin-bottom: 2rem;
    position: relative;

    .history-slide__img {
      margin-bottom: 0;
      margin-right: 0;
      border-radius: 0;

      img {
        border-radius: 0;
        border-radius: 3rem;
      }
    }

    @include large-desktop {
      margin-bottom: 0;
      margin-right: 4rem;
      height: 100%;
    }
  }

  .history-carousel-wr {
    margin-bottom: 1rem;
    overflow: hidden;
    height: 100%;
    border-radius: 3rem;
    position: relative;

    @include large-desktop {
      margin-bottom: 0;
      border-radius: 4rem;
      width: 61rem;
      overflow-x: hidden;
    }

    @media (min-width: 1600px) {
      max-width: 65.1vh;
    }
  }

  .history-carousel__next,
  .history-carousel__prev {
    display: none;
    position: absolute;
    align-items: center;
    width: 9rem;
    height: 100%;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 95%);
    top: 0;
    z-index: 1;
    cursor: pointer;
    padding-right: 2.1rem;

    svg {
      transform: rotate(180deg);
    }

    svg {
      width: 4rem;
      height: 1.6rem;
      color:white;
    }
    path {
      stroke: white;
    }

    @include large-desktop {
      display: flex;
      justify-content: flex-end;
    }

  }
  .history-carousel__next {
    transform: matrix(-1, 0, 0, 1, 0, 0);
    right: 0;
  }
  .history-carousel__prev {
    left: 0;
    padding-right: 2.1rem;
  }
  .history-carousel__count {
    color: $COLOR_GREY-BLUE;
    bottom: -2.5rem;
    left: 0;

    @include large-desktop {
      position: absolute;
    }
  }
  .history-carousel__item {
    align-content: stretch;

    @include large-desktop {
      .history-slide__img {
        width: 100%;
      }
    }
  }
</style>
