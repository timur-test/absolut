<template>
  <section class="thank-partners">
    <div class="row no-gut">
      <h2 class="col-6 col-t-3" :class="isDesktop ? 'text-h2' : 'text-h1'">
        {{ title }}
      </h2>
      <ul class="col-6 col-t-3">
        <li v-for="(link, i) in links" :key="$keyGen(i)">
          <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_ARROW_45')" />
          <nuxt-link
            :to="link.href"
            :class="isDesktop ? 'text-h3' : 'text-p1'"
            >{{ link.text }}</nuxt-link
          >
        </li>
        <p class="text-p2">
          {{ description.text }}
        </p>
        <nuxt-link :to="description.link.key" class="link text-p2">{{
          description.link.text
        }}</nuxt-link>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ThankPartners',
  props: {
    title: {
      type: String,
      default: 'заголовок благодарностей не получен',
    },
    links: {
      type: Array,
      default: () => [],
    },
    description: {
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
.thank-partners {
  width: calc(100% - var(--row-margin));
  @include default-border;
  .row {
    border-bottom: transparent;
    padding: 2.5rem 3rem 5rem;
  }
  h2 {
    margin-bottom: 3rem;
  }
  ul {
    li {
      @include a;
      position: relative;
      padding-left: 4rem;
      margin-bottom: 0.8rem;
      svg {
        width: 1.4rem;
        position: absolute;
        left: 0;
        top: 0.7rem;
      }
    }
    .text-p1 {
      color: inherit;
    }
    .text-p2 {
      display: inline-block;
      margin-top: 3rem;
    }
    .link {
      &:hover {
        color: $COLOR_GREY-BLUE;
      }
      text-decoration: underline;
    }
  }
  svg {
    width: 1.4rem;
    margin-right: 2.6rem;
  }

  @include tablet {
    .row {
      padding: 4rem 4rem 8rem;
    }
  }

  @include large-desktop {
    .row {
      justify-content: space-between;
      padding: 10rem 7rem 9rem 11.5rem;
    }
    .text-h2 {
      max-width: 42rem !important;
    }
    ul {
      .text-p2 {
        margin-top: 4rem;
      }
    }
  }
}
</style>
