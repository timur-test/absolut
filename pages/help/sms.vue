<template>
  <main id="sms" class="sms">
    <div class="container">
      <PageWithIdTitle :title="$options.DATA.header.title">
        <template #header>
          <custom-button
            tag="a"
            :text="$options.DATA.header.link.text"
            :to="$options.DATA.header.link.href"
            arrow-icon="DEFAULT_ICON_ARROW_LINK"
            class="only-text"
            :text-class="isDesktop ? 'text-p2' : 'text-p1'"
          />
        </template>
        <template #desc>
          <div class="page-with-id-title__desc text-p1">
            {{ $options.DATA.header.desc.text }}
            <nuxt-link :to="$options.DATA.header.desc.link.href">
              {{ $options.DATA.header.desc.link.text }}
            </nuxt-link>
          </div>
        </template>
      </PageWithIdTitle>
      <div class="sms__list row">
        <div class="col-5 offset-1 col-t-3 offset-t-3 col-d-6 offset-d-6">
          <ul>
            <li
              v-for="(item, i) in $options.DATA.items"
              :key="$keyGen(i)"
              :data-count="i + 1"
            >
              <p :class="isDesktop ? 'text-h3' : 'text-p1'">{{ item.text }}</p>
              <p v-if="item.example">
                <span :class="isDesktop ? 'text-p2' : 'text-p1'">
                  {{ item.example.title }}
                </span>
                <span :class="isDesktop ? 'text-h2' : 'text-h1'">
                  {{ item.example.value }}
                </span>
              </p>
              <ul v-if="item.list">
                <li
                  class="text-p1"
                  v-for="(li, c) in item.list"
                  :key="$keyGen(c)"
                >
                  {{ li }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="sms__footer">
        <div class="sms__footer-svg">
          <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_ALERT')" />
        </div>
        <div class="text-p2">
          {{ $options.DATA.footer }}
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomButton from '~/components/custom/CustomButton'
import PageWithIdTitle from '~/components/blocks/PageWithIdTitle'
export default {
  DATA: {
    header: {
      title: 'Перевод по СМС',
      desc: {
        text: 'Осуществляя перевод, Вы подтверждаете, что принимаете условия',
        link: {
          text: 'договора оферты.',
          href: '/',
        },
      },
      link: {
        text: 'к выбору способа оплаты',
        href: '/help',
      },
    },
    items: [
      {
        text: 'Отправьте СМС на номер 7715 с текстом: Абсолют пробел сумма пожертвования. Сумма пожертвования указывается цифрами, без точек, слов «рублей», «руб.».',
        example: {
          title: 'Например',
          value: 'Абсолют 500',
        },
      },
      {
        text: 'В ответ с сервисного номера оператора приходит сообщение с просьбой подтвердить платеж.',
      },
      {
        text: 'Абонент подтверждает перевод пожертвования отправкой бесплатного СМС на указанный номер оператора.',
      },
      {
        text: 'Средства в объеме указанной абонентом суммы списываются со счета абонента.',
        list: [
          'Стоимость отправки одного SMS-сообщения согласно тарифу вашего оператора сотовой связи; комиссия за перечисление средств 0%.',
          'При отрицательном балансе средства не будут списаны.',
        ],
      },
    ],
    footer:
      'В случае технических сбоев обратитесь в службу поддержки вашего оператора. Партнерский проект Благотворительного фонда «Абсолют-Помощь» и Общероссийского общественного фонда «Национальный благотворительный фонд».',
  },
  name: 'Sms',
  components: {
    PageWithIdTitle,
    CustomButton,
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
.sms {
  .page-with-id-title {
    --page-with-id-margin-bott: 8rem;
  }

  &__list {
    &.row {
      margin-bottom: 8rem;
    }
    p {
      span {
        display: block;
        &.text-p1 {
          margin: 3rem 0 0.5rem;
        }
      }
    }

    ul {
      li {
        position: relative;
        &:before {
          content: '';
          position: absolute;
          left: -6rem;
          width: 4.5rem;
          height: 4.5rem;
          background-color: $COLOR_YELLOW;
          border-radius: 50%;
          filter: blur(1rem);
        }
        &:after {
          @include text-h1;
          @include flex-center;
          content: attr(data-count);
          position: absolute;
          top: 0;
          left: -6rem;
          width: 4.5rem;
          height: 4.5rem;
        }
        &:not(:last-of-type) {
          margin-bottom: 3rem;
        }
        ul {
          margin-top: 3rem;
          padding-left: 1.5rem;
          li {
            &:before {
              left: -2.2rem;
              top: 0.5rem;
              width: 0.9rem;
              height: 0.9rem;
              background-color: $COLOR_BLACK-BLUE;
              filter: blur(0);
            }
            &:not(:last-of-type) {
              margin-bottom: 2rem;
            }
          }
        }
      }
    }
  }

  &__footer {
    --alert-svg-h: 2.1rem;
    --alert-circle-size: 4.5rem;

    width: 100%;
    padding: 3rem;
    border: $BORDER_DEFAULT;
    border-bottom-color: transparent;
    &-svg {
      @include flex-center;
      flex-grow: 2;
      min-width: var(--alert-circle-size);
      max-width: var(--alert-circle-size);
      height: var(--alert-circle-size);
      position: relative;
      margin: 0 auto 3rem;

      &:before {
        content: '';
        position: absolute;
        width: var(--alert-circle-size);
        height: var(--alert-circle-size);
        background-color: $COLOR_YELLOW;
        border-radius: 50%;
        filter: blur(0.4rem);
      }

      svg {
        position: relative;
        height: var(--alert-svg-h);
      }
    }
  }

  @include tablet {
    .page-with-id-title {
      --page-with-id-margin-bott: 10rem;
    }

    &__footer {
      --alert-svg-h: 4.2rem;
      --alert-circle-size: 7rem;

      display: flex;
      padding: 3rem 4rem 3rem 2.6rem;
      &-svg {
        margin: 0 0 2.5rem;
        margin-right: 2.5rem;
      }
    }
  }

  @include large-desktop {
    p {
      span {
        &.text-p2 {
          margin: 4rem 0 1rem;
        }
      }
    }

    &__list {
      &.row {
        margin-bottom: 12rem;
      }

      ul {
        li {
          &:before {
            left: -8rem;
            width: 5rem;
            height: 5rem;
          }
          &:after {
            left: -8rem;
            width: 5rem;
            height: 5rem;
            @include text-h3;
          }
          &:not(:last-of-type) {
            margin-bottom: 4rem;
          }
          ul {
            margin-top: 7.5rem;
            padding-left: 4rem;
          }
        }
      }
    }

    &__footer {
      --alert-svg-h: 6.5rem;
      --alert-circle-size: 12rem;

      padding: 5rem;
      &-svg {
        margin-right: 6rem;
      }

      .text-p2 {
        position: relative;
        top: 3rem;
        max-width: 88rem;
      }
    }
  }
}
</style>
