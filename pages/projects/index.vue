<template>
  <main id="projects" class="projects">
    <div class="container">
      <PageTitle
        :title="locale.header.title"
        :subtitle="locale.header.text"
        title-class="col-6 col-t-3 col-d-4"
      />
      <div class="projects__content">
        <header class="row">
          <div class="col-6">
            <span class="hr" />
          </div>
          <div ref="select" class="projects__select col-6">
            <custom-select class="sub-sticky" :title="locale.select.title">
              <ul class="projects__anchors text-p2">
                <li v-for="(item, i) in locale.select.items" :key="$keyGen(i)">
                  <a
                    :href="'#' + item.key"
                    :alt="item.text"
                    @click="scrollToAnchor"
                  >
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </custom-select>
          </div>
        </header>
        <section
          v-for="(block, i) in locale.blocks"
          :key="$keyGen(i)"
          class="projects__block row"
        >
          <h2 :id="locale.select.items[i].key" class="text-h1 col-6 col-d-4">
            {{ block.title }}
          </h2>
          <div class="col-6 col-d-8">
            <div class="row">
              <article
                v-for="(post, c) in block.items"
                :key="$keyGen(c)"
                class="col-6 col-t-3"
              >
                <img :src="storageUrl + post.img" :alt="post.title" />
                <nuxt-link
                  :to="'/need-path/' + post.id"
                  :class="isDesktop ? 'text-s1' : 'text-p1'"
                >
                  {{ post.title }}
                </nuxt-link>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import subheaderHandler from '~/mixins/subheaderHandler.js'

import PageTitle from '~/components/blocks/PageTitle.vue'
import CustomSelect from '~/components/custom/CustomSelect.vue'

export default {
  name: 'Projects',
  components: {
    PageTitle,
    CustomSelect,
  },
  mixins: [subheaderHandler],
  inject: ['storageUrl'],
  async asyncData(ctx) {
    try {
      const request = await ctx.$api.pages.getProjectsPage()
      const response = await request.data
      return { response }
    } catch (e) {
      ctx.error(e)
    }
  },
  computed: {
    ...mapState(['lang']),
    ...mapGetters(['isDesktop']),
    locale() {
      return this.response[this.lang]
    },
  },
}
</script>

<style lang="scss">
.projects {
  --project-block-img-height: 25rem;
  --project-block-title-margin-bott: 3rem;
  --project-block-margin-bott: 8rem;
  --project-article-margin-bott: 4rem;

  margin-bottom: 10rem;

  .page-title {
    --page-title-margin-bott: 1rem;
    --page-title-padding-bott: 0;
  }

  &__content {
    width: 100%;
  }

  .hr {
    margin-bottom: 1.5rem;
  }

  header {
    margin-bottom: 5rem;
  }

  &__anchors {
    @include dropdown-content;
  }

  &__block {
    &:not(:last-of-type) {
      margin-bottom: var(--project-block-margin-bott);
    }

    h2.text-h1 {
      margin-bottom: var(--project-block-title-margin-bott);
    }

    img {
      height: var(--project-block-img-height);
      object-fit: cover;
      border-radius: 2rem;
      margin-bottom: 1rem;
    }

    article {
      &:not(:last-of-type) {
        margin-bottom: var(--project-article-margin-bott);
      }
    }
  }

  @include tablet {
    --project-block-img-height: 23.5rem;
    --project-block-title-margin-bott: 4rem;
    --project-block-margin-bott: 4rem;
  }

  @include large-desktop {
    --project-block-img-height: 30rem;
    --project-block-title-margin-bott: 0;
    --project-article-margin-bott: 6rem;
    --project-block-margin-bott: 8rem;

    margin-bottom: 18rem;

    .page-title {
      &__title {
        width: 37rem;
        margin-right: 4rem;
      }
    }
  }
}
</style>
