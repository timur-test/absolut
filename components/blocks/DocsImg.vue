<template>
  <section class="docs-img">
    <h2 class="docs-img__title" :class="isDesktop ? 'text-h2' : 'text-h1'">
      {{ title }}
    </h2>
    <img class="docs-img__img" :src="storageUrl + img" :alt="title" />
    <DocLink
      class="docs-img__file"
      :name="file.name"
      :type="file.type"
      :size="file.size"
      :link="file.href"
      :text-class="isDesktop ? 'text-h3' : 'text-p1'"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import DocLink from '~/components/blocks/DocLink.vue'
export default {
  name: 'DocsImg',
  components: {
    DocLink,
  },
  inject: ['storageUrl'],
  props: {
    title: {
      type: String,
      default: 'заголовок не получен',
    },
    img: {
      type: String,
      default: '#',
    },
    file: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
.docs-img {
  display: grid;
  grid-template-areas:
    'title'
    'img'
    'file';
  &__title {
    grid-area: title;
    margin-bottom: 3rem;
  }
  &__img {
    grid-area: img;
    height: 18rem;
    object-fit: cover;
    border-radius: 2rem;
    margin-bottom: 3rem;
  }
  &__file {
    grid-area: file;
  }

  @include tablet {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'img title'
      'img file';
    column-gap: 4rem;
    &__img {
      height: 26rem;
      margin-bottom: 0;
    }
    &__file {
      margin-top: auto;
      height: max-content;
    }
  }

  @include large-desktop {
    &__img {
      height: 62rem;
    }
  }
}
</style>
