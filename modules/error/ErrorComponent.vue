<template>
  <div class="error-component">
    <div class="error-component__img">
      <inline-svg :src="errorImgSrc || ''" />
    </div>
    <h1 class="error__title text-h1" v-html="errorText"></h1>
    <template v-if="statusCode < 500">
      <Error404Links />
    </template>
  </div>
</template>

<script>
import Error404Links from '@/modules/error/Error404Links'

export default {
  components: {
    Error404Links,
  },
  props: {
    statusCode: {
      type: Number,
      required: true,
    },
    errorText: {
      type: String,
      default: 'Произошла ошибка',
    },
  },
  computed: {
    errorImgSrc() {
      if (this.statusCode >= 500) {
        return this.$getDefault('img', `DEFAULT_ERROR_503`)
      }
      return (
        this.$getDefault('img', `DEFAULT_ERROR_${this.statusCode}`) ||
        this.$getDefault('img', `DEFAULT_ERROR_404`)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.error-component {
  --error-img-width: 100%;
  --error-img-height: 100%;

  padding-top: 12rem;
  padding-bottom: 4rem;

  .error-component__img {
    margin-bottom: 5rem;
    svg {
      max-width: 100%;
      height: var(--error-img-height);
      width: var(--error-img-width);
    }
  }
  .error__title {
    margin-bottom: 5rem;
    letter-spacing: -0.01em;
  }
  @include large-desktop {
    --error-img-width: 111.7rem;
    --error-img-height: 47.7rem;

    padding-top: 38.5rem;
    padding-bottom: 8.5rem;
    .container {
      padding: 0 5rem;
    }
    .error-component__img {
      max-width: 100%;
      height: var(--error-img-height);
      width: var(--error-img-width);
      display: block;
      position: absolute;
      top: -3rem;
      right: -3rem;
    }
    .error__title {
      margin-bottom: 8rem;
      font-size: 5.5rem;
      line-height: 6rem;
      position: relative;
      z-index: 1;
    }
  }
}
</style>
