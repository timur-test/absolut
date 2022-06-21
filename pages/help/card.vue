<template>
  <main id="card" class="card">
    <div class="container">
      <PageWithIdTitle
        :title="$options.DATA.header.title"
        :img="$options.DATA.header.img"
      >
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
      <div class="row no-gut">
        <form
          ref="form"
          class="card__form col-6 col-t-4 col-t-4 offset-t-2 col-d-6 offset-d-6"
        >
          <CustomInput
            v-for="(item, i) in $options.DATA.form.inputs"
            :key="$keyGen(i)"
            :name="item.name"
            :type="item.type"
          />
          <CustomCheckbox
            :name="$options.DATA.form.agree[0].text"
            :text="$options.DATA.form.agree"
          />
          <CustomButton
            type="button"
            :text="$options.DATA.form.button.text"
            words
            @click.native="clickHandler($options.DATA.form.button.href)"
          />
          <footer>
            <p
              v-for="(item, i) in $options.DATA.form.footer"
              :key="$keyGen(i)"
              class="text-p2"
            >
              <inline-svg v-if="i === 0" src="/img/svg/icon/lock.svg" />
              {{ item }}
            </p>
          </footer>
        </form>
      </div>
      <footer class="card__footer">
        <div class="card__footer-title">
          <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_ALERT')" />
          <h2 class="text-h3">
            {{ $options.DATA.attention.title }}
          </h2>
        </div>
        <p
          v-for="(item, i) in $options.DATA.attention.text"
          :key="$keyGen(i)"
          class="text-p2"
        >
          {{ item }}
        </p>
        <custom-dropdown
          :title="$options.DATA.attention.dropdown.button.open"
          :title-open="$options.DATA.attention.dropdown.button.close"
          :button-class="isDesktop ? 'text-p2' : 'text-p1'"
          class="dropdown__plus"
          self
          custom-icon
        >
          <template #icon>
            <div>
              <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_MINUS')" />
              <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_MINUS')" />
            </div>
          </template>
          <p
            v-for="(item, i) in $options.DATA.attention.dropdown.headerText"
            :key="$keyGen(i)"
            class="text-p2"
          >
            {{ item }}
          </p>
          <h2 class="text-h3">{{ $options.DATA.attention.dropdown.title }}</h2>
          <p
            v-for="(item, i) in $options.DATA.attention.dropdown.text"
            :key="$keyGen(i)"
            class="text-p2"
          >
            {{ item }}
          </p>
          <custom-ol
            :items="$options.DATA.attention.dropdown.list"
            class="text-p2"
          />
        </custom-dropdown>
      </footer>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import PageWithIdTitle from '~/components/blocks/PageWithIdTitle.vue'
import CustomInput from '~/components/custom/CustomInput.vue'
import CustomCheckbox from '~/components/custom/CustomCheckbox.vue'
import CustomButton from '~/components/custom/CustomButton.vue'
import CustomDropdown from '~/components/custom/CustomDropdown.vue'
import CustomOl from '~/components/custom/CustomOl.vue'

export default {
  DATA: {
    header: {
      title: 'Перевод банковской картой',
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
    form: {
      inputs: [
        {
          name: 'введите сумму, ₽',
          type: 'number',
        },
        {
          name: 'email для отправки квитанции',
          type: 'email',
        },
      ],
      agree: [
        {
          text: 'Согласен с условиями',
          link: {
            text: 'оферты',
            href: '/',
          },
        },
        {
          text: 'и политикой обработки',
          link: {
            text: 'персональных данных',
            href: '/',
          },
        },
      ],
      button: {
        text: 'сделать перевод',
        href: '/',
      },
      footer: ['Защищено Сбербанк', 'МИР, Visa, MasterCard'],
    },
    attention: {
      title: 'Внимание:',
      text: [
        'После нажатия на кнопку "Помочь Фонду" Вы будете перенаправлены на платежный шлюз ПАО СБЕРБАНК. Соединение с платежным шлюзом и передача информации осуществляется в защищенном режиме с использованием протокола шифрования SSL.',
        'В случае если Ваш банк поддерживает технологию безопасного проведения интернет-платежей Verified By Visa или MasterCard SecureCode для проведения платежа также может потребоваться ввод специального пароля.',
      ],
      dropdown: {
        button: {
          open: 'больше',
          close: 'меньше',
        },
        headerText: [
          'Настоящий сайт поддерживает 256-битное шифрование. Конфиденциальность сообщаемой персональной информации обеспечивается ПАО СБЕРБАНК. Введенная информация не будет предоставлена третьим лицам за исключением случаев, предусмотренных законодательством РФ.',
          'Проведение платежей по банковским картам осуществляется в строгом соответствии с требованиями платежных систем МИР, Visa Int. и MasterCard Europe Sprl.',
        ],
        title: 'Уважаемые господа!',
        text: [
          'Обращаем Ваше внимание на необходимость соблюдения норм валютного законодательства Российской Федерации валютными резидентами России.*',
          '*в соответствии с пп.6 ч. 1 ст. 1 Федерального закона от 10.12.2003 N 173-ФЗ "О валютном регулировании и валютном контроле" резидентами являются:',
        ],
        list: [
          'физические лица, являющиеся гражданами Российской Федерации, за исключением граждан Российской Федерации, постоянно проживающих в иностранном государстве не менее одного года, в том числе имеющих выданный уполномоченным государственным органом соответствующего иностранного государства вид на жительство, либо временно пребывающих в иностранном государстве не менее одного года на основании рабочей визы или учебной визы со сроком действия не менее одного года или на основании совокупности таких виз с общим сроком действия не менее одного года;',
          'постоянно проживающие в Российской Федерации на основании вида на жительство, предусмотренного законодательством Российской Федерации, иностранные граждане и лица без гражданства;',
          'юридические лица, созданные в соответствии с законодательством Российской Федерации;',
          'находящиеся за пределами территории Российской Федерации филиалы, представительства и иные подразделения резидентов, указанных в подпункте "в" настоящего пункта;',
          'дипломатические представительства, консульские учреждения Российской Федерации и иные официальные представительства Российской Федерации, находящиеся за пределами территории Российской Федерации, а также постоянные представительства Российской Федерации при межгосударственных или межправительственных организациях;',
          'Российская Федерация, субъекты Российской Федерации, муниципальные образования, которые выступают в отношениях, регулируемых настоящим Федеральным законом и принятыми в соответствии с ним иными федеральными законами и другими нормативными правовыми актами.',
        ],
      },
    },
  },
  name: 'Card',
  components: {
    PageWithIdTitle,
    CustomInput,
    CustomCheckbox,
    CustomButton,
    CustomDropdown,
    CustomOl,
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
  methods: {
    clickHandler(href) {
      if (!this.$refs.form.checkValidity()) return false
      else this.$router.push(href)
    },
  },
}
</script>

<style lang="scss">
.card {
  .page-with-id-title {
    --page-with-id-title-margin-bott: 3rem;
    --page-with-id-margin-bott: 5rem;
  }

  .row {
    width: 100%;
    margin-bottom: 8rem;
  }

  .custom-checkbox {
    margin-bottom: 5rem;
  }

  &__form {
    .custom-button {
      --blur-border-width: 1.2rem;
      padding: 3rem 4rem;
      margin-bottom: 3.6rem;
      span.text-h1 {
        font-size: 2.6rem;
        line-height: 3rem;
        margin-right: 1rem;
      }
      .arrow-long {
        top: 0.2rem;
        height: 2px;
        svg {
          height: 1.6rem;
        }
      }
    }
    footer {
      display: flex;
      justify-content: space-between;

      p.text-p2 {
        @include flex-center;
      }

      svg {
        width: 2.5rem;
        margin-right: 0.5rem;
      }
    }
  }

  &__footer {
    --card-footer-padding: 3.6rem 3rem 0.5rem;
    --card-footer-circle-size: 4.5rem;
    --card-footer-circle-t: -25%;
    --card-footer-svg-h: 2.1rem;
    --card-footer-svg-t: 0;
    --card-footer-svg-l: 2rem;

    width: 100%;
    color: $COLOR_BLACK-BLUE;
    border: $BORDER_DEFAULT;
    border-bottom-color: transparent;
    padding: var(--card-footer-padding);

    &-title {
      display: flex;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: var(--card-footer-circle-t);
        width: var(--card-footer-circle-size);
        height: var(--card-footer-circle-size);
        background-color: $COLOR_YELLOW;
        border-radius: 50%;
        filter: blur(0.4rem);
      }
      svg {
        height: var(--card-footer-svg-h);
        position: relative;
        top: var(--card-footer-svg-t);
        left: var(--card-footer-svg-l);
      }
      h2.text-h3 {
        margin-left: 6rem;
      }
    }

    h2.text-h3 {
      margin-bottom: 2rem;
    }

    p.text-p2 {
      margin-bottom: 2rem;
    }

    .dropdown__title {
      margin-top: 3rem;
    }

    ol {
      li {
        list-style: lower-latin;
        &:not(:last-of-type) {
          margin-bottom: 1rem;
        }
      }
    }
  }

  @include tablet {
    .page-with-id-title {
      --page-with-id-margin-bott: 8rem;
      --page-with-id-title-margin-bott: 0;
      --page-with-id-header-padding: 3.4rem 4rem 3rem;

      &__main-left {
        width: calc(50% - 2rem);
      }
    }

    &__footer {
      --card-footer-padding: 3rem 4rem 0.5rem 2.6rem;
      --card-footer-circle-size: 7rem;
      --card-footer-circle-t: 0;
      --card-footer-svg-h: 4.2rem;
      --card-footer-svg-t: 1.2rem;
      --card-footer-svg-l: 3rem;
      --card-footer-content-ml: 9.5rem;

      &-title {
        h2.text-h3 {
          margin-left: 8.25rem;
        }
      }
    }
    .text-h3,
    .text-p2 {
      margin-left: var(--card-footer-content-ml);
      max-width: 88rem;
    }

    .dropdown__title {
      margin-left: auto;
      margin-right: 1.25rem;
    }
  }

  @include large-desktop {
    .page-with-id-title {
      --page-with-id-header-padding: 5rem 11.5rem 6rem 5rem;
    }
    .row {
      margin-bottom: 12rem;
    }

    &__footer {
      --card-footer-padding: 6rem 3rem 0.5rem 5rem;
      --card-footer-circle-size: 12rem;
      --card-footer-circle-t: -0.6rem;
      --card-footer-svg-h: 6.5rem;
      --card-footer-svg-t: 2rem;
      --card-footer-svg-l: 5.2rem;
      --card-footer-content-ml: 18rem;

      &-title {
        h2.text-h3 {
          margin-left: 16rem;
        }
      }
    }
  }
}
</style>
