<template>
  <main id="contests-archive" class="contest-archive">
    <div v-if="locale" class="container">
      <PageTitle
        :title="locale.title"
        :subtitle="locale.subtitle"
        title-class="col-6 col-t-3"
      />
      <div class="contest-archive__content">
        <header class="row">
          <div class="col-6">
            <span class="hr" />
          </div>
          <div ref="select" class="contest-archive__select col-6">
            <custom-select :title="locale.select.title">
              <ul class="contest-archive__anchors text-p2">
                <li v-for="(item, i) in locale.select.items" :key="$keyGen(i)">
                  <a :href="'#' + item" @click="scrollToAnchor">
                    {{ item }}
                  </a>
                </li>
              </ul>
            </custom-select>
          </div>
        </header>
        <div class="contest-archive__items row">
          <div
            v-for="(item, i) in locale.archive.items"
            :key="$keyGen(i)"
            class="col-6 col-t-3"
          >
            <img
              :id="locale.select.items[i]"
              :src="storageUrl + item.img"
              :alt="item.title"
            />
            <nuxt-link :to="item.link.href" class="text-p1">
              {{ item.title }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import subheaderHandler from '~/mixins/subheaderHandler.js'

import PageTitle from '~/components/blocks/PageTitle.vue'
import CustomSelect from '~/components/custom/CustomSelect.vue'
export default {
  name: 'ContestsArchive',
  components: {
    PageTitle,
    CustomSelect,
  },
  mixins: [subheaderHandler],
  inject: ['storageUrl'],
  async asyncData(ctx) {
    try {
      const request = await ctx.$api.pages.getContestsArchivePage()
      const response = await request.data
      return { response }
    } catch (e) {
      ctx.error(e)
    }
  },
  computed: {
    ...mapState(['lang']),
    locale() {
      return this.response && this.response[this.lang]
    },
  },
}
</script>

<style lang="scss">
.contest-archive {
  .page-title {
    --page-title-margin-bott: 1rem;
    --page-title-padding-bott: 0;
  }
  &__content {
    width: 100%;
  }

  header {
  }

  .hr {
    margin-bottom: 1.5rem;
  }

  &__items.row {
    margin-top: 3.5rem;
    margin-bottom: 6rem;
    img {
      height: 25rem;
      border-radius: 3rem;
      object-fit: cover;
      margin-bottom: 1rem;
    }
    .col-6 {
      margin-bottom: 4rem;
    }
  }

  &__anchors {
    @include dropdown-content;
  }

  @include tablet {
    .page-title {
      --page-title-margin-bott: 2rem;
    }
    .hr {
      margin-bottom: 2rem;
    }

    &__items.row {
      img {
        height: 23.5rem;
      }
    }
  }

  @include large-desktop {
    .page-title {
      --page-title-margin-bott: 4.5rem;
    }
    .hr {
      margin-bottom: 3rem;
    }
    &__items.row {
      margin-top: 4rem;
      margin-bottom: 8rem;
      .col-6 {
        margin-bottom: 8rem;
      }
      img {
        height: 46.8rem;
      }
    }
  }
}
</style>
