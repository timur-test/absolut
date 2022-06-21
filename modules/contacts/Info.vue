<template>
  <div class="contacts-info">
    <div class="container">
      <div class="row-wrapper">
        <div class="row">
          <div class="col-6 col-t-3 col-d-3">
            <h2 class="title text-h1">{{ title }}</h2>
          </div>
          <div class="col-6 col-t-3 col-d-8 offset-d-1">
            <div class="row-wrapper-items">
              <div v-for="(item, i) in info" :key="$keyGen(i)" class="item">
                <p class="item__title text-p2">{{ item.title }}</p>
                <a
                  v-if="item.type === 'email'"
                  class="item__link"
                  :class="isDesktop ? 'text-h3' : 'text-p1'"
                  :href="`mailto:${item.value}`"
                  >{{ item.value }}</a
                >
                <a
                  v-else-if="item.type === 'phone'"
                  class="item__link"
                  :class="isDesktop ? 'text-h3' : 'text-p1'"
                  :href="`tel:${item.value.replace(/\s+/g, '')}`"
                  >{{ item.value }}</a
                >
                <p
                  v-else
                  class="item__link"
                  :class="isDesktop ? 'text-h3' : 'text-p1'"
                >
                  {{ item.value }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContactsInfo',
  props: {
    title: {
      type: String,
      default: '',
    },
    info: {
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
.row-wrapper {
  width: 100%;
  margin-bottom: 2rem;
  padding: 3rem;
  border: 2px solid $COLOR_BLACK-BLUE;
  border-bottom: none;
  .title {
    margin-bottom: 3rem;
  }
  &-items {
    .item {
      &:not(:last-child) {
        margin-bottom: 2.5rem;
      }
      &__title {
        margin-bottom: 0.4rem;
      }
    }
  }
  @include tablet {
    padding: 4rem;
  }
  @include large-desktop {
    padding: 5rem;
    padding-bottom: 0;
    margin-bottom: 4rem;
    &-items {
      .item {
        width: 25.8rem;
        margin-right: 9rem;
        display: inline-block;
        &:not(:last-child) {
          margin-bottom: 5rem;
        }
      }
    }
  }
}
</style>
