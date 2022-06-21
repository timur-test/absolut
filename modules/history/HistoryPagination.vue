<template>
  <div class="history-pagination">
    <ul
      ref="historyPagList"
      class="history-pagination__list"
      :style="{ left: paginationPosition }"
    >
      <li
        v-for="(item, idx) of slides"
        :key="$keyGen(idx)"
        class="history-pagination__item"
        :data-pag="idx"
        @click.prevent="$emit('change-slide', '#slide-' + idx)"
      >
        <a
          class="history-pagination__link text-p2"
          :class="{ active: currentSlide === idx }"
        >
          {{ item.year }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HistoryPagination',
  props: {
    slides: {
      type: Array,
      required: true,
    },
    paginationPosition: {
      type: String,
      default: '',
    },
    activeSlide: {
      type: [Number, String],
      default: 0
    },
  },
  data() {
    return {
      currentSlide: this.activeSlide
    }
  },
  watch: {
    activeSlide(newVal) {
      setTimeout(() => {
        this.currentSlide = newVal
      }, 200)
    }
  }
}
</script>

<style lang="scss">
.history-pagination {
  width: 100vw;
  max-width: 100%;
  position: relative;
  height: 4rem;
  border-top: 2px solid $COLOR_BLACK-BLUE;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    transform: translateY(-50%) translateX(-50%);
    left: 2.6rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: $COLOR_BLACK-BLUE;
  }

  @include large-desktop {
    &::after {
      left: 50%;
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}
.history-pagination__list {
  position: absolute;
  top: 0;
  left: 1.5rem;
  display: flex;
  padding-top: 1.5rem;
  @include transition(all);
}
.history-pagination__item {
  margin-right: 1.5rem;
  a {
    color: $COLOR_GREY-BLUE;

    &.active {
      color: $COLOR_BLACK-BLUE;
    }

    &:hover {
      color: $COLOR_BLACK-BLUE;
    }
  }


  @include tablet {
    margin-right: 2rem;
  }

  @include large-desktop {
    margin-right: 3rem;
  }
}
.history-pagination__link {
  font-weight: 500;
  color: $COLOR_GREY-BLUE;
}
</style>
