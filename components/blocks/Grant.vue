<template>
  <section class="grant">
    <img
      :src="storageUrl + items[0].img"
      :alt="items[0].requests"
      class="grant__img"
    />
    <template v-if="items.length === 1">
      <h2 class="grant__title text-h1">{{ items[0].title }}</h2>
      <custom-button
        tag="a"
        :text="items[0].link.text"
        :aria-label="items[0].link.text"
        :to="$getDefault('route', items[0].link.key) || ''"
      />
      <custom-note>
        <p class="text-p2">{{ items[0].requests }}</p>
      </custom-note>
    </template>
    <template v-else>
      <div v-for="(item, i) in items" :key="$keyGen(i)" class="row no-gut">
        <div
          class="col-6 col-t-2 col-d-4"
          :class="isDesktop ? 'text-h2' : 'text-h3'"
        >
          {{ item.title }}
        </div>
        <div
          class="col-2 col-t-1 offset-t-1 col-d-2 offset-d-2"
          :class="isDesktop ? 'text-h3' : 'text-p2'"
        >
          {{ item.requests }}
        </div>
        <div class="col-3 offset-1 col-t-2 col-d-2 offset-d-2">
          <custom-button
            tag="a"
            :text="item.link.text"
            text-class="text-p1"
            arrow-icon="DEFAULT_ICON_ARROW_LINK"
            class="only-text"
            :to="item.link.href"
          />
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import CustomButton from '~/components/custom/CustomButton.vue'
import CustomNote from '~/components/custom/CustomNote.vue'

export default {
  name: 'Grant',
  components: {
    CustomButton,
    CustomNote,
  },
  inject: ['storageUrl'],
  props: {
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
.grant {
  --grant-img-height: 18rem;
  width: 100%;

  &__img {
    height: var(--grant-img-height);
    border-radius: var(--default-img-border-radius);
    object-fit: cover;
  }

  &__title {
    text-align: center;
    border-left: 2px solid $COLOR_BLACK-BLUE;
    border-right: 2px solid $COLOR_BLACK-BLUE;
    padding: 2rem 2rem 5rem 2rem;
    margin-top: 1rem;
  }

  .custom-button {
    margin-bottom: 3rem;
  }

  .custom-button.only-text {
    margin-bottom: 0;
    justify-content: flex-end;
  }

  .row {
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    border-bottom: $BORDER_DEFAULT;
    .text-h3 {
      margin-bottom: 3rem;
    }
  }

  @include tablet {
    --grant-img-height: 36rem;
    &__title {
      padding: 3rem 13rem 6rem 13rem;
    }

    .custom-button {
      margin-bottom: 4rem;
    }

    .row {
      .text-h3 {
        margin-bottom: 0;
      }
    }
  }

  @include large-desktop {
    --grant-img-height: 70rem;
    &__title {
      margin-top: 4rem;
      padding: 0 23rem 10rem 23rem;
    }
    .custom-button {
      margin-bottom: 5rem;
    }
  }
}
</style>
