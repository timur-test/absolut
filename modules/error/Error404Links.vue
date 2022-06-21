<template>
  <ul class="error-404-links">
    <li
      v-for="(link, i) in links"
      :key="$keyGen(i)"
      class="error-404-links__item"
    >
      <span class="error-404-links__item-title text-s1">{{link.title}}</span>
      <nuxt-link :to="link.href" class="error-404-links__item-link">
        <span class="error-404-links__label text-p1">Перейти</span>
        <span class="error-404-links__label error-404-links__label--desktop text-p1">подробнее</span>
        <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_ARROW_LINK')" />
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {title: 'проекты', href: '/projects'},
        {title: 'школа «Абсолют»', href: '/school'},
        {title: 'новости', href: '/news'},
        {title: 'корпортавно-социальная ответственность', href: '/csr'}
      ]
    }
  }
}
</script>

<style lang="scss">
  .error-404-links {
    color: $COLOR_BLACK-BLUE;
    .error-404-links__item {
      border-top: $BORDER_DEFAULT;
      padding-top: 1.5rem;
      margin-bottom: 1.5rem;

      &:first-child {
        border-top: none;
      }

      &:last-child {
        margin-bottom: 0;
      }

      @include flex-between-center;

      .error-404-links__item-link {
        display: flex;
        align-items: center;
      }
      svg {
        width: 4rem;
        padding-top: .2rem;
      }
    }
    .error-404-links__label {
      display: none;
      margin-right: 1rem;
    }
    @include tablet {
      display: flex;
      flex-wrap: wrap;

      .error-404-links__item {
        padding: 3rem 3rem 0;
        margin-bottom: 2rem;
        width: 50%;
        display: flex;
        flex-direction: column;
        height: 22rem;
        border-right: $BORDER_DEFAULT;

        &:first-child {
          border-top: $BORDER_DEFAULT;
        }

        &:nth-child(2n) {
          border-right: none;
        }

        &:nth-last-child(2) {
          margin-bottom: 0;
        }
      }

      .error-404-links__label {
        display: block;

        &--desktop {
          display: none;
        }
      }

      .error-404-links__item-title {
        align-self: flex-start;
        max-width: 22rem;
      }
      .error-404-links__item-link {
        align-self: flex-end;
      }
    }

    @include large-desktop {
      .error-404-links__item {
        width: 25%;
        margin-bottom: 0;
        height: 27rem;

        &:nth-child(2n) {
          border-right: $BORDER_DEFAULT;
        }
      }
      .error-404-links__label {
        display: none;
        font-size: 1.6rem;
        line-height: 2rem;

        &--desktop {
          display: block;
        }
      }
    }
  }
</style>
