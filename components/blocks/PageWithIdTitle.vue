<template>
  <section class="page-with-id-title">
    <header>
      <div class="page-with-id-title__main">
        <div class="page-with-id-title__main-left">
          <slot name="header" />
          <h1 class="text-h1">
            {{ title }}
          </h1>
        </div>
        <slot class="page-with-id-title__main-right" name="desc" />
      </div>
      <slot name="footer" />
    </header>
    <span v-if="!img" class="hr" />
    <template v-else>
      <img
        class="page-with-id-title__img"
        :src="storageUrl + img"
        :alt="title"
      />
      <slot name="imgDesc" />
    </template>
  </section>
</template>

<script>
export default {
  name: 'PageWithIdTitle',
  inject: ['storageUrl'],
  props: {
    title: {
      type: String,
      default: 'заголовок не получен',
    },
    img: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.page-with-id-title {
  --page-with-id-margin-bott: 5rem;
  --page-with-id-header-padding: 3rem 3rem 3rem;
  --page-with-id-header-margin-bott: 1rem;
  --page-with-id-head-button-margin-bott: 2.4rem;
  --page-with-id-title-margin-bott: 1rem;

  width: 100%;
  margin-bottom: var(--page-with-id-margin-bott);
  header {
    @include default-border;
    border-bottom-color: transparent;
    padding: var(--page-with-id-header-padding);
    margin-bottom: var(--page-with-id-header-margin-bott);
  }
  .custom-button {
    flex-direction: row-reverse;
    justify-content: flex-end;
    margin-bottom: var(--page-with-id-head-button-margin-bott);
    svg {
      transform: rotate(180deg);
      margin-left: 0;
      margin-right: 1rem;
    }
  }
  h1.text-h1 {
    margin-bottom: var(--page-with-id-title-margin-bott);
  }

  &__img {
    border-radius: 4rem;
    margin-bottom: 1rem;
  }

  &__main {
    display: flex;
    flex-wrap: wrap;
  }

  &__desc {
    a {
      text-decoration: underline;
      text-underline-offset: 0.5rem;
    }
  }

  @include tablet {
    --page-with-id-margin-bott: 5.4rem;
    --page-with-id-header-padding: 3.4rem 4rem 0.5rem;
    --page-with-id-header-margin-bott: 2rem;
    --page-with-id-head-button-margin-bott: 3.4rem;
    --page-with-id-title-margin-bott: 4rem;

    &__main {
      flex-wrap: nowrap;
      justify-content: space-between;
    }

    &__desc {
      width: calc(50% - 2rem);
      position: relative;
      top: 5.8rem;
    }
  }

  @include large-desktop {
    --page-with-id-margin-bott: 3rem;
    --page-with-id-header-padding: 5.4rem 5rem 0;
    --page-with-id-header-margin-bott: 3rem;
    --page-with-id-head-button-margin-bott: 2rem;
    --page-with-id-title-margin-bott: 8rem;
  }
}
</style>
