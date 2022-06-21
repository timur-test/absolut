<template>
  <article
    :id="'slide-' + slideIndex"
    :data-pag="slideIndex"
    class="panel history-slide"
    :class="{ bordered: isVisibleDevider }"
  >
    <template v-if="slide.changes && slide.changes.length">
      <HistorySlideChanges :images="slide.changes" />
    </template>
    <template v-if="slide.slider && slide.slider.length">
      <HistoryCarousel :images="slide.slider" :slide-index="slideIndex" />
    </template>
    <div v-if="slide.img" class="history-slide__img responsive-img">
      <img :src="require(`@/static/img/history/${slide.img}`)" />
    </div>
    <div class="history-slide__content">
      <h2 class="history-slide__title text-h1">{{ slide.year }}</h2>
      <ul
        class="history-slide__list"
        :class="`history-slide__list-${slide.list.length}`"
      >
        <li
          v-for="(text, i) of slide.list"
          :key="$keyGen(i)"
          class="history-slide__item text-h3"
        >
          {{ text }}
        </li>
      </ul>
      <p v-if="slide.text" class="history-slide__text text-p2">
        {{ slide.text }}
      </p>
    </div>
  </article>
</template>

<script>
import HistorySlideChanges from './HistorySlideChanges.vue'
import HistoryCarousel from './HistoryCarousel.vue'

export default {
  name: 'HistorySlide',
  components: {
    HistorySlideChanges,
    HistoryCarousel,
  },
  props: {
    slide: {
      type: Object,
      required: true,
    },
    slideIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isVisibleDevider() {
      return (
        !this.slide?.img &&
        !this.slide?.slider?.length &&
        !this.slide?.changes?.length
      )
    },
  },
}
</script>
<style lang="scss">
.history-slide {
  display: flex;
  flex-direction: column;
  width: 100%;
  will-change: transform;
  flex-shrink: 0;

  &:not(:last-child) {
    margin-bottom: 4rem;
  }

  &.bordered {
    padding-top: 4rem;
    border-top: $BORDER_DEFAULT;
  }


  @include large-desktop {
    width: auto;
    flex-direction: row;
    padding-bottom: 0;
    height: 40.4rem;
    border: none;

    &:not(:first-child) {
      padding-top: 0;
      margin-right: 10rem;
    }
    &:not(:last-child) {
      margin-right: 10rem;
      margin-bottom: 0;
    }

    &:first-child {
      .history-slide__img {
        width: 65rem;
      }
    }

    &.bordered {
      padding-top: 0;
      padding-left: 4rem;
      border-top: none;
      border-left: $BORDER_DEFAULT;
    }
  }

  @media (min-width: 1600px) {
    height: 43.11vh;
  }
}
.history-slide__content {
  display: flex;
  flex-direction: column;
  flex: auto;
}
.history-slide__text {
  max-width: 28.3rem;
  margin-top: auto;
  margin-bottom: 1.5rem;
  order: -1;
  color: $COLOR_GREY-BLUE;

  @include large-desktop {
    max-width: 23.5rem;
    order: 1;
    margin-bottom: 0;
  }
}
.history-slide__img {
  position: relative;
  display: block;
  margin-bottom: 2rem;
  line-height: 0;
  height: 21.5rem;
  border-radius: 3rem;

  img {
    height: 100%;
    object-fit: cover;
    border-radius: 3rem;
  }

  &--foreground {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
    margin-right: 0;
    border-radius: 0;

    img {
      border-radius: 0;
    }
  }

  &--background,
  &--foreground {
    margin: 0;
  }

  @include tablet {
    height: 28rem;
  }

  @include desktop {
    height: 40.4rem;
  }

  @include large-desktop {
    margin-bottom: 0;
    margin-right: 4rem;
    width: 61rem;
    border-radius: 4rem;
    height: 100%;

    &--background,
    &--foreground {
      margin: 0;
      height: 100%;
    }

    &--foreground {
      border-radius: 0;
    }

    img {
      height: 100%;
      object-fit: cover;
      border-radius: 4rem;
    }
  }

  @media (min-width: 1600px) {
    max-width: 65.1vh;
  }
}
.history-slide__title {
  margin-bottom: 1rem;

  @include large-desktop {
    margin-bottom: 3rem;
  }
}
.history-slide__list {
  display: flex;
  flex-direction: column;

  @include large-desktop {
    flex-direction: row;
  }
}
.history-slide__item {

  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  @include large-desktop {
    max-width: 30rem;

    &:not(:last-child) {
      margin-right: 4rem;
    }
  }
}
</style>
