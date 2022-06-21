<template>
  <section class="documents">
    <div class="container">
      <div class="documents__title-wrap">
        <h2 class="text-h1">{{ $options.DATA.title }}</h2>
      </div>
      <div class="row documents-row no-gut">
        <div class="documents-top__list-wrap">
          <div ref="select" class="col-6 documents-top__list-wrap-sticky">
            <ul class="documents-top__list">
              <li
                v-for="(item, i) of $options.DATA.topList"
                :key="$keyGen(i)"
                class="documents-top__item"
              >
                <a
                  :href="item.id"
                  class="documents-top__list-link"
                  :class="isDesktop ? 'text-p2' : 'text-p1'"
                  @click.prevent.self="scrollBlock($event)"
                >
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <DocumentBlock :documents="$options.DATA.documents" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import subheaderHandler from '~/mixins/subheaderHandler.js'
import DocumentBlock from '~/modules/documents/DocumentBlock.vue'

export default {
  components: {
    DocumentBlock,
  },
  mixins: [subheaderHandler],
  data() {
    return {
      heightHeader: 100,
    }
  },
  DATA: {
    title: 'Документация',
    documents: [
      {
        title: 'Результаты работ',
        scrollId: 'result',
        link: true,
        list: [
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
        ],
      },
      {
        title: 'Правовые документы',
        scrollId: 'legal',
        link: true,
        list: [
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
        ],
      },
      {
        title: 'Логотипы',
        scrollId: 'logo',
        link: true,
        list: [
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
          {
            name: 'Инструкция по заполнению финансового отчета',
            type: 'PDF',
            size: '967 КБ',
            link: {},
          },
        ],
      },
    ],
    topList: [
      {
        id: '#result',
        title: 'Результаты работы',
      },
      {
        id: '#legal',
        title: 'Правовые документы',
      },
      {
        id: '#logo',
        title: 'Логотипы',
      },
    ],
  },

  computed: {
    ...mapGetters(['isDesktop']),
  },
  methods: {
    scrollBlock(e) {
      const th = e.target
      const href = th.getAttribute('href')

      const listSticky = document.querySelector(
        '.documents-top__list-wrap-sticky',
      ).offsetHeight

      if (window.innerWidth > 1850) {
        this.heightHeader = 150
      } else if (window.innerWidth > 767) {
        this.heightHeader = 100
      } else {
        this.heightHeader = 80
      }

      window.location.hash = href
      setTimeout(() => {
        if (href !== '#') {
          const heightTop = document
            .querySelector(href)
            .getBoundingClientRect().top
          window.scrollTo({
            top: window.scrollY + heightTop - (this.heightHeader + listSticky),
            behavior: 'smooth',
          })
        }
      }, 0)
    },
  },
}
</script>

<style lang="scss" scoped>
.documents {
  .documents-row {
    width: 100%;
    margin-bottom: 8rem;
    .col-6 {
      &.sticky {
        padding-bottom: 0;
        .documents-top__list {
          border-top: 1px solid #e9ecf1;
          border-bottom-color: transparent;
        }
      }
    }
  }
  &__title-wrap {
    width: 100%;
    padding: 3rem;
    margin-bottom: 3rem;
    border: 2px solid $COLOR_BLACK-BLUE;
    border-bottom: none;
  }
  &-top__list-wrap {
    position: relative;
    width: 100%;
    overflow-y: hidden;
  }
  &-top {
    &__list {
      @include transition(all);
      position: relative;
      display: flex;
      align-items: center;
      padding-top: 1.5rem;
      padding-bottom: 3rem;
      margin-bottom: -1rem;
      overflow-x: scroll;
      border-top: 1px solid transparent;
    }
    &__item {
      margin-right: 2rem;
      flex-shrink: 0;
    }
    &__link {
      transition: all 0.3s ease-in-out;
      color: $COLOR_BLACK-BLUE;
      &:hover {
        color: $COLOR_GREY-BLUE;
      }
    }
  }
  @include tablet {
    &__title-wrap {
      padding: 4rem;
      margin-bottom: 3rem;
    }
    &-top__list-hr {
      display: none;
    }
    &-top {
      &__list {
        padding-bottom: 2rem;
        margin-bottom: 0;
        border-bottom: 2px solid $COLOR_BLACK-BLUE;
        overflow-x: auto;
      }
      &__item {
        margin-right: 1.5rem;
      }
    }
  }
  @include large-desktop {
    &__title-wrap {
      padding: 5rem 5rem 6rem 5rem;
      margin-bottom: 4rem;
    }
    &-top {
      &__list {
        padding-bottom: 2rem;
      }
    }
  }
}
</style>
