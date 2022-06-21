<template>
  <div class="documents-block-wrapper">
    <div
      v-for="(document, i) of documents"
      :id="document.scrollId"
      :key="$keyGen(i)"
      class="documents-block"
    >
      <div class="row">
        <div class="col-6 col-t-3 col-d-4">
          <div class="documents-block__left">
            <h3 class="documents-block__title text-h1">
              {{ document.title }}
            </h3>
            <a v-if="document.link" class="documents-block__load" href="#"
              ><span class="text-h3">скачать все одним архивом</span>
              <inline-svg
                :src="$getDefault('img', 'DEFAULT_ICON_ARROW_DOWNLOAD')"
            /></a>
          </div>
        </div>
        <div class="col-6 col-t-3 offset-d-2 col-d-6">
          <div class="documents-block__right">
            <ul class="documents-block__list">
              <li
                v-for="(item, idx) of document.list"
                :key="$keyGen(idx)"
                class="documents-block__item"
              >
                <DocLink
                  class="contest-docs__file"
                  :name="item.name"
                  :size="item.size"
                  :type="item.type"
                  :link="item.link"
                  :text-class="isDesktop ? 'text-h3' : 'text-p1'"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DocLink from '~/components/blocks/DocLink.vue'

export default {
  name: 'DocumentBlock',
  components: {
    DocLink,
  },
  props: {
    documents: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss" scoped>
.documents-block-wrapper {
  width: 100%;
}
.documents {
  &-block {
    margin-bottom: 8rem;
    &:last-child {
      margin-bottom: 5.7rem;
    }
    &__left {
      max-width: 100%;
    }
    &__right {
      max-width: 100%;
    }
    &__title {
      margin-bottom: 4rem;
    }
    &__load {
      display: flex;
      align-items: center;
      padding-bottom: 2rem;
      margin-bottom: 3rem;
      border-bottom: 2px solid $COLOR_BLACK-BLUE;
      @include a;
      svg {
        position: relative;
        top: 0.2rem;
        width: 2.5rem;
        height: 2.5rem;
        color: inherit;
        margin-left: 0.5rem;
        path {
          transition: all 0.3s ease-in-out;
        }
        rect {
          transition: all 0.3s ease-in-out;
        }
      }
    }
    &__item {
      margin-bottom: 4rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
    @include tablet {
      &__title {
        margin-bottom: 2rem;
        max-width: 20rem;
      }
      &__title {
        margin-bottom: 4rem;
        max-width: 35rem;
      }
      &__load {
        border-bottom: none;
      }
    }
    @include large_desktop {
      margin-bottom: 10rem;
      &:last-child {
        margin-bottom: 7.5rem;
      }
      &__load {
        display: flex;
        align-items: center;
        transition: all 0.3s ease-in-out;
      }
    }
  }
}
</style>
