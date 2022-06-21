<template>
  <main id="help" class="help">
    <div class="container">
      <div class="row" :class="isDesktop ? 'no-gut' : ''">
        <div class="col-6 col-t-3 col-d-4">
          <h1 class="text-h1">{{ $options.DATA.header.title }}</h1>
        </div>
        <div class="col-6 col-t-3 col-d-6 offset-d-2">
          <p class="help__subtitle" :class="isDesktop ? 'text-h3' : 'text-p2'">
            {{ $options.DATA.header.text }}
          </p>
          <ul>
            <li
              v-for="(item, i) in $options.DATA.header.links"
              :key="$keyGen(i)"
            >
              <nuxt-link :to="item.href">
                <span class="text-h2"> {{ item.text }} </span>
                <inline-svg
                  :src="$getDefault('img', 'DEFAULT_ICON_ARROW_LINK')"
                />
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  DATA: {
    header: {
      title: 'Сделать пожертвование фонду',
      text: 'Все пожертвования идут на помощь людям, которые обращаются в фонд за помощью вне куркурса.',
      links: [
        {
          text: 'Банковский перевод',
          href: '/help/transfer',
        },
        {
          text: 'Банковская карта',
          href: '/help/card',
        },
        {
          text: 'СМС-сообщение',
          href: '/help/sms',
        },
      ],
    },
  },
  name: 'Help',
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
.help {
  .container {
    width: 100%;
  }
  h1.text-h1 {
    margin-bottom: 2.2rem;
  }
  &__subtitle {
    margin-bottom: 8rem;
  }
  ul {
    margin-bottom: 8rem;
    li {
      padding-bottom: 2rem;
      border-bottom: $BORDER_DEFAULT;
      &:not(:last-of-type) {
        margin-bottom: 2rem;
      }
      a {
        @include a;
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      svg {
        width: 4.1rem;
      }
    }
  }

  @include tablet {
    &__subtitle {
      margin-bottom: 7rem;
    }
    ul {
      li {
        padding-bottom: 3rem;
        &:not(:last-of-type) {
          margin-bottom: 3rem;
        }
      }
    }
  }

  @include large-desktop {
    ul {
      margin-bottom: 13.5rem;
    }
  }
}
</style>
