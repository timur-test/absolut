<template>
  <nuxt-link v-if="tag === 'a'" :to="to" class="custom-button">
    <template v-if="words">
      <span
        v-for="(word, i) in text.split(' ')"
        :key="$keyGen(i)"
        class="custom-button__text"
        :class="textClass"
      >
        {{ word }}
      </span>
    </template>
    <template v-else>
      <span class="custom-button__text" :class="textClass">{{ text }}</span>
    </template>
    <span class="arrow-long">
      <inline-svg
        :src="
          $getDefault(
            'img',
            arrowIcon === 'DEFAULT_ICON_ARROW_THIN' && isDesktop
              ? 'DEFAULT_ICON_ARROW_THIN_D'
              : arrowIcon,
          )
        "
      />
    </span>
  </nuxt-link>
  <button v-else class="custom-button">
    <template v-if="words">
      <span
        v-for="(word, i) in text.split(' ')"
        :key="$keyGen(i)"
        class="custom-button__text"
        :class="textClass"
      >
        {{ word }}
      </span>
    </template>
    <template v-else>
      <span class="custom-button__text" :class="textClass">{{ text }}</span>
    </template>
    <span class="arrow-long">
      <inline-svg
        :src="
          $getDefault(
            'img',
            arrowIcon === 'DEFAULT_ICON_ARROW_THIN' && isDesktop
              ? 'DEFAULT_ICON_ARROW_THIN_D'
              : arrowIcon,
          )
        "
      />
    </span>
  </button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CustomButton',
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    text: {
      type: String,
      default: 'подробнее',
    },
    textClass: {
      type: String,
      default: 'text-h1',
    },
    arrowIcon: {
      type: String,
      default: 'DEFAULT_ICON_ARROW_THIN',
    },
    words: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: '#',
    },
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
.custom-button {
  --blur-border-width: 1.2rem;

  --button-padding-y: 3rem;
  --button-padding-x: 4rem;

  --button-padding: calc(
      var(--blur-border-after-offset) + var(--button-padding-y)
    )
    calc(var(--blur-border-after-offset) + var(--button-padding-x));

  @include blur-border;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--button-color);
  padding: var(--button-padding);
  position: relative;
  left: 0;
  text-transform: lowercase;

  .text-h1 {
    margin-right: 1rem;
  }

  .text-p1:not(:first-of-type) {
    margin-left: 0.6rem !important;
  }

  .arrow-long {
    @include flex-center;
    width: 100%;
    height: 100%;
    justify-content: flex-end;
    position: relative;
    top: 1px;
    &::before {
      content: '';
      position: absolute;
      right: 0.2rem;
      width: calc(100% - 0.2rem);
      height: 2px;
      background-color: $COLOR_BLACK-BLUE;
    }
    svg {
      height: 1.6rem;
      color: $COLOR_BLACK-BLUE;
    }
  }

  &.button-white {
    --button-color: white;
    --blur-border-color: white;
  }

  &.only-text {
    --blur-border-width: 0;

    --button-padding-y: 0;
    --button-padding-x: 0;
    width: max-content;
    justify-content: center;
    &::after {
      display: none;
    }
    .arrow-long {
      width: unset;
      justify-content: flex-start;
      color: inherit;
      top: 0;
      &::before {
        width: 0;
      }
      svg {
        position: relative;
        top: 0.15rem;
        color: inherit;
      }
    }
    svg {
      width: 4rem;
      margin-left: 1rem;
    }

    .custom-button__text {
      color: inherit;
    }

    &:hover,
    &.hover {
      border-color: transparent;
    }
  }

  @include large-desktop {
    --blur-border-width: 2rem;

    --button-padding-y: 7rem;
    --button-padding-x: 8rem;
    --button-border-width: 4rem;

    .text-h1 {
      margin-right: 3rem;
    }

    .arrow-long {
      top: 0.4rem;
      svg {
        height: 3rem;
      }
    }
    &.only-text {
      .arrow-long svg {
        top: 0.2rem;
      }
    }
  }
}
</style>
