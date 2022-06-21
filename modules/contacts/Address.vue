<template>
  <div class="contacts-address">
    <div class="container">
      <div class="row row-desktop-reverse">
        <div class="col-6 col-d-8">
          <div class="map">
            <div style="position: relative; overflow: hidden">
              <iframe
                src="https://yandex.kz/map-widget/v1/-/CCUuJ8E~lA"
                width="560"
                height="400"
                frameborder="1"
                allowfullscreen="true"
                style="position: relative"
              ></iframe>
            </div>
          </div>
        </div>
        <div class="col-6 col-d-4 col-t-6">
          <div class="contacts-address-wrapper">
            <div class="contacts__socials">
              <a
                v-for="(itemSoc, i) in socials"
                :key="$keyGen(i)"
                :href="itemSoc.link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="contacts__socials-svg-wrapper">
                  <inline-svg
                    v-if="itemSoc.icon"
                    :src="getSrcSocialIcon(itemSoc.icon)"
                    :class="itemSoc.icon"
                  /></div
              ></a>
            </div>
            <div class="items-wrapper">
              <div v-for="(item, i) in address" :key="$keyGen(i)" class="item">
                <p class="item__title text-p2">{{ item.title }}</p>
                <p
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
  name: 'ContactsAddress',
  props: {
    address: {
      type: Array,
      default: () => [],
    },
    socials: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
  methods: {
    getSrcSocialIcon(iconName) {
      return (
        this.$getDefault('img', 'DEFAULT_SOCIAL_ICONS_SRC') + iconName + '.svg'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.contacts-address {
  .contacts__socials {
    display: flex;
    margin-top: 5rem;
    a {
      margin-right: 3rem;
    }
    &-svg-wrapper {
      svg {
        width: 2rem;
        height: 2rem;
      }
    }
  }
  .item {
    &:not(:last-child) {
      margin-bottom: 2.5rem;
    }
    &__title {
      margin-bottom: 0.4rem;
    }
  }
  .map {
    margin-bottom: 3rem;
    iframe {
      width: 100%;
      height: 18rem;
      border-radius: 20px;
    }
  }
  .contacts-address-wrapper {
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: 3rem;
    border-bottom: 2px solid $COLOR_BLACK-BLUE;
  }
  .items-wrapper {
    .item {
      &__title {
        max-width: 27rem;
      }
      &__link {
        max-width: 29.3rem;
      }
    }
  }
  @include tablet {
    .contacts__socials {
      margin-right: 19.5rem;
      margin-top: 0;
    }
    .map {
      margin-bottom: 4rem;
      iframe {
        height: 36rem;
        border-radius: 40px;
      }
    }
    .contacts-address-wrapper {
      flex-direction: row;
      align-items: flex-start;
      padding-bottom: 5rem;
    }
    .items-wrapper {
      .item {
        &__title {
          max-width: 100%;
        }
        &__link {
          max-width: 100%;
        }
      }
    }
  }
  @include large-desktop {
    .row-desktop-reverse {
      flex-direction: row-reverse;
    }
    .item {
      &:not(:last-child) {
        margin-bottom: 5rem;
      }
    }
    .map {
      margin-bottom: 0;
      iframe {
        border: none;
        height: 52rem;
      }
    }
    .contacts-address-wrapper {
      height: 100%;
      padding-bottom: 3rem;
      flex-direction: column-reverse;
      justify-content: space-between;
    }
  }
}
</style>
