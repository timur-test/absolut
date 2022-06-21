<template>
  <section class="report row">
    <div class="col-6 col-t-3">
      <h2 class="text-h1">{{ title.text }}</h2>
      <nuxt-link
        :to="$getDefault('route', title.link.key) || ''"
        class="text-h1"
        >{{ title.link.text }}</nuxt-link
      >
    </div>
    <p
      class="col-6 col-t-3 col-d-5 offset-d-1"
      :class="isDesktop ? 'text-h3' : 'text-p1'"
    >
      {{ text }}
    </p>
    <div class="col-6">
      <img :src="storageUrl + img" :alt="title.link.text" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import DEFAULT_IMAGES from '~/assets/defaults/images.js'

export default {
  name: 'HomeReport',
  inject: ['storageUrl'],
  props: {
    title: {
      type: Object,
      default: () => {},
    },
    text: {
      type: String,
      default: 'текст отчетов не получен',
    },
    img: {
      type: String,
      default: DEFAULT_IMAGES.DEFAULT_REPORT_IMG,
    },
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
.report {
  margin-bottom: 7rem;
  a {
    @include link-bottom-border;
  }
  .text-p1 {
    margin: 3rem 0;
  }
  img {
    height: 18rem;
    border-radius: 3rem;
    object-fit: cover;
  }

  @include tablet {
    .text-p1 {
      margin-top: 0;
    }
    img {
      height: 36rem;
    }
  }

  @include large-desktop {
    .text-p1 {
      display: flex;
      align-items: center;
      margin-bottom: 0;
    }
    img {
      margin-top: 6rem;
      height: 70rem;
    }
  }
}
</style>
