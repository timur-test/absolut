<template>
  <div class="comment">
    <slot name="image" />
    <p class="text-h2">{{ text }}</p>
    <custom-note>
      <p class="text-p2">{{ name }}</p>
      <p class="comment__position text-p2">{{ position }}</p>
    </custom-note>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomNote from '~/components/custom/CustomNote.vue'

export default {
  name: 'Comment',
  components: {
    CustomNote,
  },
  inject: ['storageUrl'],
  props: {
    text: {
      type: String,
      default: 'текст цитаты не получен',
    },
    name: {
      type: String,
      default: 'автор цитаты не получен',
    },
    position: {
      type: String,
      default: 'должность автора цитаты не получена',
    },
    img: {
      type: String,
      default: '/img/no-pic.webp',
    },
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
.comment {
  --comment-img-width: 16.4rem;
  --top-background: calc(var(--comment-img-width) / 2);
  --padding-x: -1.6rem;

  width: 100%;
  position: relative;
  z-index: 1;
  padding-bottom: 8rem;
  &::before {
    content: '';
    position: absolute;
    top: var(--top-background);
    left: var(--padding-x);
    right: var(--padding-x);
    height: calc(100% - var(--top-background));
    background-color: $COLOR_YELLOW;
    z-index: -1;
  }

  img {
    @include square(var(--comment-img-width));
    border-radius: var(--default-img-border-radius);
    margin: 0 auto 4rem;
  }

  .text-h2 {
    margin-bottom: 5rem;
  }

  &__position {
    color: $COLOR_GREY-BLUE;
  }

  @include tablet {
    --comment-img-width: 20.4rem;
    --padding-x: -4rem;

    --comment-min-padding: 5rem 0;

    .text-h2 {
      text-align: center;
    }

    img {
      margin: 0 auto 5rem;
    }

    .custom-note {
      margin: 0 auto;
      .note__content {
        max-width: 32rem;
      }
    }
  }

  @include large-desktop {
    --comment-img-width: 30.6rem;
    --padding-x: -5rem;

    --comment-min-padding: 4rem 11.6rem 4rem 0;

    padding-bottom: 10rem;

    .text-h2 {
      margin: 0 11.5rem 10rem;
    }

    img {
      margin: 0 auto 4rem;
    }

    .custom-note {
      margin: 0;
      .note__content {
        max-width: 57.6rem;
      }
    }
  }
}
</style>
