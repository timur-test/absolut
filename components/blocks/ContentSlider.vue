<template>
  <div class="content-slider">
    <div class="container">
      <h2 class="text-h1">{{ title }}</h2>
      <div class="content-slider__navigation">
        <custom-button
          tag="a"
          :text="link.text"
          :to="link.key"
          :text-class="'text-p1'"
          arrow-icon="DEFAULT_ICON_ARROW_LINK"
          class="only-text"
          words
        />
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
      </div>
      <CustomSlider :swiper-options="$options.swiperOptions">
        <article v-for="(item, i) in items" :key="i" class="swiper-slide">
          <img :src="storageUrl + item.img" :alt="item.title" />
          <p class="content-slide__tag text-p2">новости</p>
          <nuxt-link to="#" class="content-slide__link text-p1">
            {{ item.title }}
          </nuxt-link>
          <p class="text-p2">{{ $dateConverter(item.date) }}</p>
        </article>
      </CustomSlider>
    </div>
  </div>
</template>

<script>
import CustomButton from '~/components/custom/CustomButton.vue'
import CustomSlider from '~/components/custom/CustomSlider.vue'

export default {
  swiperOptions: {
    slidesPerView: 1.2,
    spaceBetween: 15,
    breakpoints: {
      767: {
        slidesPerView: 2.2,
        spaceBetween: 40,
      },
      1439: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1919: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      2559: {
        slidesPerView: 3,
        spaceBetween: 80,
      },
    },
  },
  name: 'ContentSlider',
  components: {
    CustomButton,
    CustomSlider,
  },
  inject: ['storageUrl'],
  props: {
    title: {
      type: String,
      default: 'заголовок не получен',
    },
    link: {
      type: Object,
      default: () => {},
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      rem: 0,
    }
  },
}
</script>

<style lang="scss">
.content-slider {
  --slider-navigation-margin-bott: 2.4rem;

  --slide-img-margin-bott: 2rem;
  --slide-link-margin-bott: 1rem;

  .container {
    padding-right: 0;
  }

  h2.text-h1 {
    width: 100%;
    margin-right: auto;
    margin-bottom: 1rem;
  }

  &__navigation {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: var(--slider-navigation-margin-bott);
    .custom-button.only-text {
      justify-content: flex-start;
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
  }

  img {
    border-radius: 3rem;
    margin-bottom: var(--slide-img-margin-bott);
  }

  .content-slide__tag {
    margin-bottom: 1rem;
  }

  .content-slide__link {
    display: block;
    margin-bottom: var(--slide-link-margin-bott);
  }

  @include tablet {
    --slider-navigation-margin-bott: 3.4rem;

    --slide-link-margin-bott: 1.5rem;
  }

  @include large-desktop {
    --slider-navigation-margin-bott: 5rem;

    --slide-img-margin-bott: 3rem;
    --slide-link-margin-bott: 4.5rem;

    .container {
      padding-right: var(--main-padding-x);
    }

    h2.text-h1 {
      margin-bottom: 2rem;
    }
    &__navigation {
      display: flex;
      justify-content: space-between;
      .slider-pagination {
        display: flex;
      }
    }
  }
}
</style>
