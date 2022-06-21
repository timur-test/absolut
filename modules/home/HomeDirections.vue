<template>
  <section class="directions">
    <h2 class="text-h1">{{ title }}</h2>
    <article v-for="(item, i) in items" :key="$keyGen(i)" class="row">
      <div :class="getImgClass(i)">
        <img :src="storageUrl + item.img" :alt="item.title" />
      </div>
      <div class="direction__text col-6" :class="getTextClass(i)">
        <h3 class="text-h1">{{ item.title }}</h3>
        <p :class="isDesktop ? 'text-h3' : 'text-p1'">{{ item.text }}</p>
        <!-- need-path -->
        <nuxt-link :to="'directions/' + item.id" :aria-label="item.title">
          <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_ARROW_LINK')" />
        </nuxt-link>
        <!--  -->
      </div>
      <div v-if="i !== items.length - 1" class="col-6">
        <span class="hr" />
      </div>
    </article>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeDirections',
  inject: ['storageUrl'],
  props: {
    title: {
      type: String,
      default: 'заголовок направлений не получен',
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
    getImgClass(idx) {
      if (idx === 0) return 'col-6 col-t-3 col-d-7'
      else return 'col-3 col-t-2 col-d-3 offset-d-1'
    },
    getTextClass(idx) {
      if (idx === 0) return 'col-t-3 col-d-5'
      else return 'col-3 col-t-4 col-d-7 offset-d-1'
    },
  },
}
</script>

<style lang="scss">
.directions {
  width: 100%;
  h2 {
    text-align: center;
    margin-bottom: 4rem;
  }

  article {
    &:first-of-type {
      .direction__text {
        overflow: hidden;
      }
    }

    &:not(:last-of-type) {
      margin-bottom: 3rem;
    }

    img {
      @include square(100%);
      border-radius: var(--default-img-border-radius);
      margin-bottom: 3rem;
    }

    h3 {
      margin-bottom: 2rem;
    }

    .text-p1 {
      margin-bottom: 2rem;
    }

    svg {
      width: 5.6rem;
    }
    .hr {
      margin-top: 3rem;
    }
  }

  @include tablet {
    h2 {
      text-align: left;
    }

    article {
      &:first-of-type {
        img {
          height: 30rem;
        }
      }
      img {
        margin-bottom: 0;
      }
      .text-h3 {
        margin-bottom: 2rem;
      }
    }
  }
  @include large-desktop {
    h2.text-h1 {
      margin-bottom: 5rem;
    }
    article {
      &:first-of-type {
        img {
          height: 70rem;
        }
      }
      .hr {
        margin-top: 5rem;
      }
    }
  }
}
</style>
