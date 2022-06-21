<template>
  <div class="buffer">
    <div class="buffer__left">
      <p class="text-p2">{{ title }}</p>
      <p :class="isDesktop ? 'text-h3' : 'text-p1'">{{ value }}</p>
    </div>
    <div class="buffer__right">
      <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_COPY')" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BufferValue',
  props: {
    title: {
      type: String,
      default: 'заголовк не получен',
    },
    value: {
      type: String,
      default: 'значение не получено',
    },
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
.buffer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  &:not(:last-of-type) {
    margin-bottom: 3rem;
  }

  &__left {
    width: 30rem;
    .text-p2 {
      margin-bottom: 0.4rem;
    }
  }

  svg {
    width: 1.9rem;
  }

  @include large-desktop {
    &:not(:last-of-type) {
      margin-bottom: 4rem;
    }

    &__left {
      .text-p2 {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
