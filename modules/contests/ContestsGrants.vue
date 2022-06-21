<template>
  <section class="grants">
    <header class="row" :class="{ 'no-items': !items }">
      <div
        class="col-6 col-t-3"
        :class="!items ? 'col-d-5 offset-d-1' : 'col-d-6'"
      >
        <h2 class="grants__title text-h1">{{ title }}</h2>
        <p class="grants__text text-p1">{{ text }}</p>
      </div>
      <div
        class="col-6 col-t-2 offset-t-1 col-d-4"
        :class="!items ? 'offset-d-1' : 'offset-d-2'"
      >
        <div class="grants__desc">
          <div v-for="(item, i) in desc" :key="$keyGen(i)" class="grants__item">
            <div class="grants__num text-h1">{{ item.num }}</div>
            <p class="grants__num-text text-p1">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </header>
    <Grant v-if="items" :items="items" />
  </section>
</template>

<script>
import Grant from '~/components/blocks/Grant.vue'

export default {
  name: 'ContestsGrants',
  components: {
    Grant,
  },
  props: {
    title: {
      type: String,
      default: 'заголовок не получен',
    },
    text: {
      type: String,
      default: 'текст не получен',
    },
    desc: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
.grants {
  header {
    padding: 6rem 0;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: -5rem;
      right: -5rem;
      background-color: $COLOR_YELLOW;
      filter: blur(1rem);
    }
  }
  &__title {
    margin-bottom: 2rem;
  }
  &__text {
    margin-bottom: 5rem;
  }
  &__desc {
    display: flex;
    justify-content: space-between;
  }
  &__item {
    flex-basis: calc(calc(100% / 3) - 1rem);
    &:not(:last-of-type) {
      margin-right: 1.5rem;
    }
  }
  &__num {
    margin-bottom: 1rem;
  }

  @include tablet {
    &__title {
      margin-bottom: 2.5rem;
    }
    &__desc {
      flex-direction: column;
    }
    &__item {
      padding-bottom: 3rem;
      margin-bottom: 3rem;
      &:not(:last-of-type) {
        border-bottom: $BORDER_DEFAULT;
        margin-right: 0;
      }
    }
  }

  @include large-desktop {
    header {
      &.no-items {
        &:before {
          left: 0;
          right: 0;
        }
      }
    }
  }
}
</style>
