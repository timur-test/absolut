<template>
  <section class="assistance">
    <h2 class="assistance__title text-h1">{{ title }}</h2>
    <div class="assistance__items">
      <div
        v-for="(item, i) in items"
        :key="$keyGen(i)"
        class="assistance__item"
      >
        <span
          class="assistance__num"
          :class="isDesktop ? 'text-h3' : 'text-h1'"
          >{{ i + 1 }}</span
        >
        <p class="text-p1">{{ item }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Assistance',
  props: {
    title: {
      type: String,
      default: 'Assistance title',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
@mixin pseudo-border {
  content: '';
  position: absolute;
  top: -2px;
  width: 2px;
  background-color: $COLOR_BLACK-BLUE;
}

.assistance {
  &__title {
    text-align: center;
    margin-bottom: 3rem;
  }

  &__items {
    @include default-border;
    border-bottom-color: transparent;
    display: flex;
    flex-direction: column;
    padding: 3rem 3rem 0 3rem;
  }
  &__item {
    display: flex;
    border-bottom: 2px solid $COLOR_BLACK-BLUE;
    padding-bottom: 3rem;
    &:not(:last-of-type) {
      margin-bottom: 3rem;
    }
  }

  &__num {
    @include square(5rem);
    border-radius: 50%;
    max-height: 5rem;
    margin-right: 2rem;
    position: relative;
    z-index: 1;
    &::before {
      @include square(5rem);
      border-radius: 50%;
      content: '';
      position: absolute;
      z-index: -1;
      left: 0;
      top: 0;
      background-color: $COLOR_YELLOW;
      filter: blur(1rem);
    }
  }

  @include tablet {
    &__title {
      margin-bottom: 5rem;
    }
    &__items {
      flex-direction: row;
      justify-content: space-between;
      border-left-color: transparent;
      border-right-color: transparent;
      border-bottom-color: $COLOR_BLACK-BLUE;
      padding: 4rem 0 3rem;
      position: relative;
      &:before {
        @include pseudo-border;
        height: 13rem;
        left: -2px;
      }
      &:after {
        @include pseudo-border;
        height: 13rem;
        right: -2px;
      }
    }
    &__item {
      width: 33.333%;
      flex-direction: column;
      align-items: center;
      border-bottom: none;
      padding: 0 3rem;
      &:not(:last-of-type) {
        margin-bottom: 0;
        .text-p1 {
          position: relative;
          &:before {
            @include pseudo-border;
            right: -3rem;
            height: 100%;
          }
        }
      }
      .text-p1 {
        text-align: center;
        height: 100%;
      }
    }
    &__num {
      margin-right: 0;
      margin-bottom: 4rem;
    }
  }

  @include large-desktop {
    &__title {
      margin-bottom: 12rem;
    }
    &__items {
      padding-top: 10rem;
      &:before {
        height: 25rem;
      }
      &:after {
        height: 25rem;
      }
    }
    &__item {
      padding: 0 3rem;
      .text-p1 {
        padding: 2rem 0;
      }
    }
    &__num {
      margin-bottom: 9.2rem;
    }
  }
}
</style>
