<template>
  <div class="custom-note">
    <inline-svg
      :src="
        isDesktop
          ? $getDefault('img', 'DEFAULT_ICON_STAR_D')
          : $getDefault('img', 'DEFAULT_ICON_STAR')
      "
    />
    <div class="note__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CustomNote',
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
.custom-note {
  --note-svg-width: 2.5rem;

  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  color: $COLOR_BLACK-BLUE;
  svg {
    width: var(--note-svg-width);
    margin-right: 1.5rem;
  }
  .note__content {
    width: calc(100% - var(--note-svg-width));
  }
  @include large-desktop {
    align-items: center;
    svg {
      width: 4.5rem;
      margin-right: 3rem;
      path {
        max-height: 2rem;
      }
    }
  }
}
</style>
