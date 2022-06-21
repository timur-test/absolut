<template>
  <section class="supported-projects">
    <h2 class="text-h1">{{ title }}</h2>
    <div class="supported-projects__blocks row no-gut">
      <div
        v-for="(item, i) in items"
        :key="$keyGen(i)"
        class="supported-projects__item col-6 col-t-3"
      >
        <img :src="storageUrl + item.img" :alt="item.title" />
        <custom-button
          tag="a"
          :to="'projects/' + item.id"
          :text="item.title"
          :text-class="isDesktop ? 'text-h3' : 'text-p1'"
          arrow-icon="DEFAULT_ICON_ARROW_LINK"
          class="only-text"
        />
        <span v-if="i !== items.length - 1" class="hr" />
      </div>
    </div>
    <div class="row no-gut">
      <div class="col-6">
        <custom-button
          tag="a"
          :href="$getDefault('route', link.key) || ''"
          :text="link.text"
          words
          class="supported-projects__about"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomButton from '~/components/custom/CustomButton.vue'

export default {
  name: 'HomeSupportedProjects',
  components: { CustomButton },
  inject: ['storageUrl'],
  props: {
    title: {
      type: String,
      default: 'заголовок поддерживаемых проектов не получен',
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
}
</script>

<style lang="scss">
.supported-projects {
  --projects-title-padding: 2.5rem 3rem 0;
  --projects-title-margin-bott: 6rem;
  --projects-img-width: 16.5rem;

  h2 {
    @include default-border;
    border-bottom-color: transparent;
    text-align: center;
    padding: var(--projects-title-padding);
    margin-bottom: var(--projects-title-margin-bott);
  }

  &__item {
    text-align: center;
    margin-bottom: 3rem;
    img {
      @include square(var(--projects-img-width));
      border-radius: 3rem;
      margin: 0 auto 3rem;
    }
    .custom-button {
      width: inherit;
      flex-direction: column;
      justify-content: space-between;
      margin: 5rem auto 0;
      svg {
        margin-top: 2rem;
      }
    }
    .hr {
      margin-top: 3rem;
    }
  }

  &__about {
    margin-top: 5rem;
  }

  @include tablet {
    --projects-title-padding: 4rem 4rem 3rem;
    --projects-title-margin-bott: 5rem;
    --projects-img-width: 20.4rem;

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
      &.row {
        .hr {
          display: none;
        }
      }
    }

    &__item {
      margin-bottom: 0;
      &:first-of-type,
      &:nth-child(2) {
        margin-bottom: 10.2rem;
      }
    }
    &__about {
      margin-top: 8rem;
    }
  }

  @include large-desktop {
    --projects-title-padding: 10rem 11.5rem;
    --projects-title-margin-bott: 4rem;
    --projects-img-width: 30.6rem;
  }
}
</style>
