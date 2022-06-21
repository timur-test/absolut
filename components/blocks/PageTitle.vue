<template>
  <section class="page-title" :class="{ 'with-text': text }">
    <div class="page-title__header">
      <div class="page-title__title">
        <h1 class="text-h1">
          {{ title }}
        </h1>
      </div>
      <p :class="isDesktop ? 'text-h3' : 'text-p1'">
        {{ subtitle }}
      </p>
    </div>
    <template v-if="img || text">
      <div v-if="img">
        <img class="page-title__img" :src="storageUrl + img" :alt="title" />
      </div>
      <div class="page-title__footer">
        <div class="page-title__slot">
          <slot name="link" />
        </div>

        <p v-if="text" class="page-title__text text-p1">{{ text }}</p>
      </div>
    </template>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageTitle',
  inject: ['storageUrl'],
  props: {
    title: {
      type: String,
      default: 'заголовок страницы не получен',
    },
    subtitle: {
      type: String,
      default: 'подзаголовок страницы не получен',
    },
    img: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    titleClass: {
      type: String,
      default: 'col-6 col-t-3 col-d-6',
    },
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
.page-title {
  --page-title-header-padding: 3rem 5rem 3rem 3rem;
  --page-title-margin-bott: 2rem;

  --page-title-img-height: 18rem;
  --page-title-img-margin-bott: 2rem;

  --page-title-padding-bott: 5rem;
  padding-bottom: var(--page-title-padding-bott);

  &__header {
    @include default-border;
    border-bottom: transparent;
    padding: var(--page-title-header-padding);
    margin-bottom: var(--page-title-margin-bott);
    h1 {
      margin-bottom: 3rem;
      width: 50%;
    }
  }

  &__img {
    width: 100%;
    height: var(--page-title-img-height);
    border-radius: 2rem;
    object-fit: cover;
    margin-bottom: var(--page-title-img-margin-bott);
  }

  &__slot {
    margin-bottom: 4rem;
  }

  &.with-text {
    position: relative;
    * {
      position: inherit;
      z-index: 1;
    }
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: calc(var(--row-margin) * 2);
      right: calc(var(--row-margin) * 2);
      height: 50%;
      background-color: $COLOR_SMOKE;
      filter: blur(1.5rem);
    }
  }

  @include tablet {
    --page-title-img-height: 36rem;
    --page-title-header-padding: 4rem 6rem 3rem 4rem;
    --page-title-img-margin-bott: 4rem;

    &__header {
      display: flex;
      & > * {
        width: 50%;
      }
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .page-title__text {
        width: calc(50% + 1rem);
        padding-right: 1rem;
      }
    }

    &__slot {
      margin-bottom: 0;
    }
  }

  @include large-desktop {
    --page-title-header-padding: 5rem 10rem 6rem 5rem;
    --page-title-margin-bott: 4rem;

    --page-title-img-height: 70rem;
    --page-title-img-margin-bott: 7rem;

    --page-title-padding-bott: 10rem;

    h1.text-h1 {
      padding-left: 2rem;
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .page-title__text {
        width: calc(50% + 2.5rem);
        padding-right: 5rem;
      }
    }
  }
}
</style>
