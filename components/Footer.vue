<template>
  <footer class="footer">
    <div v-if="response" class="container">
      <div class="row">
        <Logo :is-min="true" to="#page-top" />
        <p v-if="isDesktop" class="text-h3 logo-desc">
          {{ sublogo.text }}
        </p>
        <div class="col-6">
          <custom-button class="button-white" :text="button.text" words />
        </div>
        <div
          v-for="(linksBlock, i) in links"
          :key="$keyGen(i)"
          class="col-3 col-d-3"
        >
          <div class="footer__block">
            <nuxt-link
              v-for="link in linksBlock"
              :key="link.text"
              class="text-h3"
              :class="{ 'with-icon': link.icon }"
              :to="$getDefault('route', link.key) || ''"
            >
              <span v-if="link.icon">
                {{ link.text }}
                <span class="svg-wrapper">
                  <inline-svg
                    :src="getSrcSocialIcon(link.icon)"
                    :class="link.icon"
                  />
                </span>
              </span>
              <template v-else>{{ link.text }}</template>
            </nuxt-link>
          </div>
        </div>
        <div class="col-6 col-d-6 copyright" :class="copyrightClass">
          {{ copyright.text }}
        </div>
        <div class="col-6 col-d-6 privacy" :class="copyrightClass">
          <div class="wrapper">
            <div>
              <nuxt-link to="/privacy">{{ policy.text }}</nuxt-link>
              <nuxt-link to="/privacy#cookies">{{ cookies.text }}</nuxt-link>
            </div>
            <p class="by-oni text-p2">Made by ONY</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import Logo from '~/components/Logo.vue'
import CustomButton from '~/components/custom/CustomButton.vue'
export default {
  name: 'Footer',
  components: {
    Logo,
    CustomButton,
  },
  data() {
    return {
      response: null,
    }
  },
  async fetch() {
    const request = await this.$api.common.getFooter()
    this.response = await request.data
  },
  computed: {
    ...mapState(['lang']),
    ...mapGetters(['isDesktop']),

    locale() {
      return this.response[this.lang]
    },
    sublogo() {
      return this.locale.find((el) => el.key === 'sublogo')
    },
    links() {
      return this.locale
        .filter((el) => {
          return Object.prototype.hasOwnProperty.call(el, 'items')
        })
        .map((el) => el.items)
    },
    button() {
      return this.locale.find((el) => el.key === 'wantToHelp')
    },
    copyright() {
      return this.locale.find((el) => el.key === 'copyright')
    },
    policy() {
      return this.locale.find((el) => el.key === 'policy')
    },
    cookies() {
      return this.locale.find((el) => el.key === 'cookies')
    },

    copyrightClass() {
      return 'text-p2'
    },
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

<style lang="scss">
.footer {
  --logo-padding-x: 5.35rem;
  --footer-before-height: 8.5rem;

  --footer-before-top: calc(var(--footer-before-height) / -2);

  background-color: $COLOR_SMOKE;
  margin-bottom: 2rem;
  position: relative;

  margin-top: calc(var(--footer-before-height) / 2);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    transform: translateY(-90%);
    width: 100%;
    height: var(--footer-before-height);

    background: linear-gradient(0deg, $COLOR_SMOKE 30%, rgba(255, 255, 255, 0));
  }
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    transform: translateY(-90%);
    width: 100%;
    height: var(--footer-before-height);
    background-color: white;
  }

  .col-6:last-of-type {
    margin-bottom: 2rem;
  }

  .logo {
    justify-content: center;
    padding: 0 var(--logo-padding-x);
    z-index: 2;
    svg {
      width: 100%;
    }
  }

  .footer__block {
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem;
    .text-h3 {
      width: max-content;
      margin-bottom: 1rem;
      text-transform: lowercase;
    }
  }

  .custom-button {
    margin: 5.4rem 0 8rem;
  }

  .text-p2 {
    &.copyright,
    &.privacy {
      text-align: center;
      &:not(:last-of-type) {
        margin-bottom: 0.5rem;
      }
    }
  }

  .copyright {
    margin-top: 4rem;
  }

  .by-oni {
    margin-top: 0.5rem;
  }

  .logo-desc {
    @include flex-center;
    width: 100%;
  }

  .with-icon {
    &.text-h3 {
      width: 100%;
    }
    span {
      @include flex-center;
      justify-content: space-between;
      svg {
        &.fb {
          width: 1rem;
          max-height: 2rem;
        }
        &.vk {
          width: 2rem;
          max-width: 2rem;
        }
        &.inst {
          width: 1.6rem;
          max-width: 1.6rem;
        }
        &.ytb {
          width: 1.8rem;
          max-width: 1.8rem;
        }
      }
      .svg-wrapper {
        @include flex-center;
        color: inherit;
        width: 2rem;
        height: 2rem;
      }
    }
  }

  @include tablet {
    --logo-padding-x: 22.5rem;

    .with-icon {
      max-width: 16rem;
    }
  }

  @include large-desktop {
    --logo-padding-x: 38.3rem;
    --footer-before-height: 13rem;

    .logo {
      margin-bottom: 2rem;
    }
    .custom-button {
      margin: 6.4rem 0 16rem;
    }
    .footer__block {
      margin-bottom: 10rem;
    }
    .with-icon {
      max-width: unset;
    }
    .copyright {
      margin-top: 0;
    }

    .text-p2 {
      &.copyright,
      &.privacy {
        text-align: left;
      }
    }

    .privacy {
      .wrapper {
        display: flex;
        justify-content: space-between;
        .by-oni {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
