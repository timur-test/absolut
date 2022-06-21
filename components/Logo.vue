<template>
  <nuxt-link class="logo" aria-label="to home" :to="to">
    <inline-svg :src="src" />
  </nuxt-link>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    color: {
      type: String,
      default: 'colorBlackBlue',
    },
    isMin: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: '#',
    },
  },
  computed: {
    src() {
      return this.isMin
        ? this.$getDefault('img', 'DEFAULT_LOGO_BASE')
        : this.$getDefault('img', 'DEFAULT_LOGO_FULL')
    },
  },
}
</script>

<style lang="scss">
.logo {
  --logo-svg-width: 24rem;
  --logo-svg-height: 4rem;

  @include flex-center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;

  svg {
    width: var(--logo-svg-width);
    height: var(--logo-svg-height);
  }

  @include large-desktop {
    --logo-svg-width: 50rem;
    --logo-svg-height: 7rem;
  }
}
</style>
