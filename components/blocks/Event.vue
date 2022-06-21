<template>
  <div class="event-wrapper">
    <section class="event" :key="$keyGen(idx)" v-for="(event, idx) in events">
      <div class="event__header">
        <div class="row row-reverse-mobile">
          <div v-if="event.items" class="col-6 col-t-3">
            <div class="event__left">
              <div
                v-for="(item, i) in event.items"
                :key="$keyGen(i)"
                class="item"
              >
                <h2 class="text-h2 item__value">{{ item.value }}</h2>
                <p class="text-p2 item__description">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-6 col-t-3">
            <div class="event__right">
              <p
                v-if="event.title"
                class="text-h1 title"
                v-html="event.title"
              />
              <p
                v-if="event.description"
                class="text-h3 description"
                v-html="event.description"
              />
              <ul v-if="event.list" class="list">
                <li
                  v-for="(listItem, i) in event.list"
                  :key="$keyGen(i)"
                  class="list-item text-h3"
                >
                  {{ listItem.text }}
                </li>
              </ul>
              <nuxt-link
                v-if="event.link"
                :to="event.link.href"
                class="event__link text-p2"
              >
                {{ event.link.text }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="event__slider">
        <ImgSlider
          :images="event.slider.items.map((el) => el.img)"
          :desc="event.slider.items.map((el) => el.text)"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ImgSlider from '~/components/blocks/ImgSlider.vue'

export default {
  name: 'Event',
  components: { ImgSlider },
  props: {
    events: {
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
.event-wrapper {
  width: 100%;
  .event {
    margin-bottom: 8rem;
    &__header {
      @include default-border;
      padding: 3rem 1.4rem 0 3rem;
      margin-bottom: 4rem;
      border-bottom: transparent;
      border-right: transparent;
    }
    &__right {
      margin-bottom: 5rem;
    }
    &__link {
      @include link-bottom-border;
      display: block;
      max-width: max-content;
      text-decoration-color: $COLOR_BLACK-BLUE;
      text-underline-offset: 0.65rem;
      &:hover {
        color: $COLOR_GREY-BLUE;
        text-decoration-color: transparent;
      }
    }
    &__slider {
      ::v-deep.img-slider__count {
        margin-bottom: 0;
      }
    }
    .title {
      margin-bottom: 3rem;
    }
    .description {
      margin-bottom: 2rem;
    }
    .list {
      list-style-type: disc;
      padding-left: 2rem;
      li {
        margin-bottom: 1.5rem;
      }
    }
    .item {
      max-width: 100%;
      &:not(:last-child) {
        margin-bottom: 2.5rem;
      }
      &__value {
        margin-bottom: 1rem;
      }
    }
    @include mobile {
      .row-reverse-mobile {
        flex-direction: column-reverse;
      }
    }
    @include tablet {
      margin-bottom: 9rem;
      &__header {
        padding: 4rem 0 0 4rem;
        margin-bottom: 8rem;
      }
      &__right {
        margin-bottom: 0;
      }
      .list {
        padding-left: 3rem;
      }
      .item {
        max-width: 20rem;
        &:not(:last-child) {
          margin-bottom: 3.5rem;
        }
      }
    }
    @include large-desktop {
      margin-bottom: 10rem;
      &__header {
        padding: 7rem 7rem 0 7rem;
        margin-bottom: 10rem;
      }
      &__link {
        margin-top: 5rem;
      }
      .description {
        max-width: 55rem;
        margin-bottom: 3rem;
      }
      .list {
        li {
          margin-bottom: 2rem;
        }
      }
      .item {
        max-width: 30rem;
        &:not(:last-child) {
          margin-bottom: 4rem;
        }
      }
    }
  }
}
</style>
