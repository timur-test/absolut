<template>
  <section class="support-directions">
    <h2 class="text-h1">{{ title }}</h2>
    <div class="row">
      <article
        v-for="(item, i) in items"
        :key="$keyGen(i)"
        class="col-6 col-t-3 col-d-4"
      >
        <div class="support-direction__image-wrapper">
          <img :src="item.img" :alt="item.title" />
        </div>
        <p class="text-h3">{{ item.title }}</p>

        <custom-dropdown
          title="больше"
          title-open="меньше"
          :button-class="isDesktop ? 'text-p2' : 'text-p1'"
          class="dropdown__plus"
          self
          custom-icon
        >
          <template #icon>
            <div>
              <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_MINUS')" />
              <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_MINUS')" />
            </div>
          </template>
          <p class="text-p2">
            {{ item.text }}
          </p>
        </custom-dropdown>

        <span class="hr" />
      </article>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import CustomDropdown from '~/components/custom/CustomDropdown.vue'

export default {
  name: 'ContestsSupportDirections',
  components: {
    CustomDropdown,
  },
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
.support-directions {
  width: 100%;
  h2.text-h1 {
    margin-bottom: 4rem;
  }
  article:not(:last-of-type) {
    margin-bottom: 3rem;
  }
  .support-direction__image-wrapper {
    margin-bottom: 2rem;
  }
  .text-h3 {
    margin-bottom: 1rem;
  }

  .dropdown__plus {
    margin-bottom: 3rem;
    &.open {
      .text-p2 {
        margin-bottom: 1.55rem;
      }
    }
  }

  @include tablet {
    .support-direction__image-wrapper {
      display: none;
    }

    article.col-t-3 {
      border-top: $BORDER_DEFAULT;
      padding-top: 3rem;
      padding-right: 3.5rem;
      &:nth-child(odd) {
        border-right: $BORDER_DEFAULT;
      }
      &:nth-child(even) {
        padding-left: 4rem;
      }
      .dropdown__plus {
        margin-top: 5.7rem;
        margin-bottom: 0;
        .dropdown__title {
          margin-right: unset;
          margin-left: auto;
        }
      }
      .hr {
        display: none;
      }
    }
  }

  @include large-desktop {
    h2.text-h1 {
      margin-bottom: 10rem;
    }

    article.col-d-4 {
      @include default-border;
      border-bottom: transparent;
      padding-top: 3rem;
      padding-right: 3rem;
      padding-left: 3rem;
      margin-bottom: 3rem;
      &:nth-child(3n + 2) {
        border-left: transparent;
        border-right: transparent;
      }
      &:last-child {
        border-right: $BORDER_DEFAULT;
      }

      .dropdown__plus {
        margin-top: 15.5rem;
      }
    }
  }
}
</style>
