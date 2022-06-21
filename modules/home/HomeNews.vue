<template>
  <section class="news row">
    <header class="col-6">
      <h2 class="text-h1">{{ title }}</h2>
      <custom-button
        tag="a"
        :text="link.text"
        :text-class="isDesktop ? 'text-h3' : 'text-p1'"
        :to="$getDefault('route', link.key) || ''"
        arrow-icon="DEFAULT_ICON_ARROW_LINK"
        class="only-text"
      />
    </header>
    <article
      v-for="(item, i) in items"
      :key="$keyGen(i)"
      :class="isFirst(i) ? 'col-6' : 'col-6 col-t-2'"
    >
      <div v-if="isFirst(i)" class="img-wrapper">
        <img :src="storageUrl + item.img" :alt="item.title" />
      </div>
      <div class="text-wrapper">
        <nuxt-link
          :class="isFirst(i) ? 'text-h1' : isDesktop ? 'text-h3' : 'text-p1'"
          :to="'/news/' + item.id"
        >
          {{ item.title }}
        </nuxt-link>
        <p class="news__date text-p2">
          {{ $dateConverter(item.date) }}
        </p>
      </div>
      <div v-if="!isFirst(i)" class="hr-wrapper col-6">
        <span class="hr" />
      </div>
    </article>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomButton from '~/components/custom/CustomButton.vue'

export default {
  name: 'HomeNews',
  components: { CustomButton },
  inject: ['storageUrl'],
  props: {
    title: {
      type: String,
      default: 'не получен заголовок новостей',
    },
    link: {
      type: Object,
      default: () => {},
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
  methods: {
    isFirst(i) {
      return i === 0
    },
  },
}
</script>

<style lang="scss">
.news {
  --post-image-size: 16.4rem;
  --subpost-gap-y: 2rem;

  --top-yellow-background: calc(var(--post-image-size) / 2);
  --left-yellow-background: 0.4rem;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  a.only-text {
    width: max-content;
    margin: 0 auto 5rem;
  }

  svg {
    width: 4rem;
  }

  article {
    &:first-of-type {
      padding-bottom: 5rem;
      margin-bottom: 4rem;
      position: relative;
      z-index: 1;
      &::before {
        content: '';
        position: absolute;
        z-index: -1;
        left: var(--left-yellow-background);
        top: var(--top-yellow-background);
        width: calc(100% - var(--col-gap));
        height: calc(100% - var(--top-yellow-background));
        background-color: $COLOR_YELLOW;
        filter: blur(2rem);
      }

      p,
      a {
        text-align: center;
      }

      .text-h1 {
        width: 100%;
        margin-bottom: 3rem;
      }

      .text-wrapper {
        flex-wrap: wrap;
        justify-content: center;
      }
    }

    &:not(:first-of-type) {
      .text-p2 {
        margin-left: 8rem;
      }
      &:not(:last-of-type) {
        margin-bottom: var(--subpost-gap-y);
      }
    }

    .img-wrapper {
      margin-bottom: 3rem;
      img {
        @include square(var(--post-image-size));
        border-radius: var(--default-img-border-radius);
        margin: 0 auto;
      }
    }

    .text-wrapper {
      display: flex;
      flex-wrap: nowrap;
      padding: 0;
    }

    .hr-wrapper {
      margin-top: 2rem;
    }
  }

  @include tablet {
    --post-image-size: 20.4rem;
    --subpost-gap-y: 0;
    --left-yellow-background: 1rem;

    h2 {
      text-align: left;
    }
    .custom-button.only-text {
      margin: 0 auto 5rem 0;
    }

    article {
      &:not(:first-of-type) {
        .text-wrapper {
          height: 100%;
          flex-wrap: nowrap;
          flex-direction: column;
          justify-content: space-between;
        }
        .text-p2 {
          margin-top: 3rem;
          margin-left: 0;
        }
      }
    }

    .hr-wrapper {
      display: none;
    }
  }

  @include large-desktop {
    --post-image-size: 30.6rem;

    &.row {
      position: relative;
    }
    header {
      top: 15rem;
      position: absolute;
      z-index: 2;
    }

    article {
      &:first-of-type {
        padding-bottom: 8rem;
        margin-bottom: 5rem;
        .text-h1 {
          max-width: 111rem;
          margin-bottom: 4rem;
        }
        .text-p2 {
          width: 100%;
        }
      }
      &:not(:first-of-type) {
        .text-p2 {
          margin-top: 2rem;
        }
      }
    }
  }
}
</style>
