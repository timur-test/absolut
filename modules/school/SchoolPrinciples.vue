<template>
  <section class="school-principles">
    <h2 class="text-h1">{{ title }}</h2>
    <div class="school-principles__blocks row no-gut">
      <div v-for="(item, i) in items" :key="$keyGen(i)" class="col-6 col-t-3">
        <div class="school-principles__item">
          <span
            class="school-principles__num"
            :class="isDesktop ? 'text-h3' : 'text-h1'"
            >{{ i + 1 }}</span
          >
          <p class="text-p1">{{ item }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SchoolPrinciples',
  props: {
    title: {
      type: String,
      default: 'заголовок не получен',
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
.school-principles {
  --school-principles-title-padding: 3rem;
  --school-principles-title-margin-bott: 3rem;

  --school-principles-items-top-margin-bott: 12.2rem;
  --school-principles-items-top-padding-top: 6rem;

  width: 100%;

  h2.text-h1 {
    @include default-border;
    border-bottom-color: transparent;
    text-align: center;
    padding: var(--school-principles-title-padding);
    margin-bottom: var(--school-principles-title-margin-bott);
  }

  &__item {
    display: flex;
    &:not(:last-of-type) {
      border-bottom: $BORDER_DEFAULT;
      padding-bottom: 3rem;
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
    --school-principles-title-padding: 5rem 4rem 6rem;

    &__blocks {
      position: relative;
      &::before {
        content: '';
        width: 100%;
        height: 2px;
        position: absolute;
        left: 0;
        top: 50%;
        background-color: $COLOR_BLACK-BLUE;
      }
      &::after {
        content: '';
        width: 2px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        background-color: $COLOR_BLACK-BLUE;
      }

      .col-6 {
        .school-principles__item {
          margin: 0 auto;
        }
        &:nth-child(1),
        &:nth-child(2) {
          .school-principles__item {
            padding-top: var(--school-principles-items-top-padding-top);
            margin-bottom: var(--school-principles-items-top-margin-bott);
          }
        }
        &:nth-child(3),
        &:nth-child(4) {
          .school-principles__item {
            padding-bottom: var(--school-principles-items-top-padding-top);
          }
        }
      }
    }
    &__item {
      max-width: 30.2rem;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    &__num {
      margin-right: 0;
      margin-bottom: 4rem;
    }
  }

  @include large-desktop {
    --school-principles-title-padding: 10rem 11.5rem 12rem;

    --school-principles-items-top-margin-bott: 24.2rem;
    --school-principles-items-top-padding-top: 12rem;

    &__item {
      max-width: 50rem;
    }
  }
}
</style>
