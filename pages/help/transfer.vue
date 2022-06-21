<template>
  <main id="transfer" class="transfer">
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
      <div class="section-select">
        <div class="row">
          <div ref="select" class="col-6">
            <div class="sub-sticky">
              <template v-for="(item, i) in $options.DATA.sections">
                <input
                  :id="'section-' + item.key"
                  :key="$keyGen(i)"
                  type="radio"
                  name="section"
                  :checked="item.key === section"
                />
                <label
                  :key="$keyGen(i)"
                  :for="'section-' + item.key"
                  class="text-p2"
                  @click="section = item.key"
                >
                  {{ item.text }} ({{ item.key }})
                </label>
              </template>
            </div>
          </div>
        </div>
      </div>

      <section v-if="$options.DATA.content[section]" class="transfer__content">
        <div class="row">
          <header class="col-6 col-t-3 col-d-6">
            <h2 class="text-h1">{{ $options.DATA.content[section].title }}</h2>
            <DocLink
              :name="$options.DATA.content[section].file.name"
              :type="$options.DATA.content[section].file.type"
              :size="$options.DATA.content[section].file.size"
              :href="$options.DATA.content[section].file.href"
            />
          </header>
          <div class="col-6 col-t-3 col-d-6">
            <BufferValue
              v-for="(item, i) in $options.DATA.content[section].items"
              :key="$keyGen(i)"
              :title="item.title"
              :value="item.value"
            />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import subheaderHandler from '~/mixins/subheaderHandler.js'

import PageWithIdTitle from '~/components/blocks/PageWithIdTitle'
import BufferValue from '~/components/blocks/BufferValue'
import DocLink from '~/components/blocks/DocLink'
export default {
  DATA: {
    header: {
      title: 'Банковский перевод',
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
    sections: [
      {
        text: 'В рублях',
        key: 'RUB',
      },
      {
        text: 'В долларах США',
        key: 'USD',
      },
      {
        text: 'В евро',
        key: 'EUR',
      },
      {
        text: 'В фунтах стерлингов',
        key: 'GBP',
      },
    ],
    content: {
      RUB: {
        title: 'Реквизиты фонда «Абсолют-Помощь» в рублях',
        file: {
          href: '',
          name: 'Форма договора пожертвования',
          type: 'PDF',
          size: '967 Кб',
        },
        items: [
          {
            title: 'Полное наименование организации',
            value: 'Благотворительный Фонд «Абсолют-Помощь»',
          },
          {
            title: 'Юридический адрес',
            value:
              '143085, Московская область, Одинцовский район, Рабочий поселок Заречье д.8, 1 этаж, комн. 18',
          },
          {
            title: 'Почтовый адрес',
            value:
              '119270, г. Москва, ул. Лужнецкая наб.д.2/4, стр.4, 3 этаж, офис 300',
          },
          {
            title: 'ИНН / КПП',
            value: '5003039076 / 503201001',
          },
          {
            title: 'Полное наименование организации',
            value: 'Благотворительный Фонд «Абсолют-Помощь»',
          },
          {
            title: 'Юридический адрес',
            value:
              '143085, Московская область, Одинцовский район, Рабочий поселок Заречье д.8, 1 этаж, комн. 18',
          },
          {
            title: 'Почтовый адрес',
            value:
              '119270, г. Москва, ул. Лужнецкая наб.д.2/4, стр.4, 3 этаж, офис 300',
          },
          {
            title: 'ИНН / КПП',
            value: '5003039076 / 503201001',
          },
        ],
      },
    },
  },
  name: 'Transfer',
  components: {
    PageWithIdTitle,
    BufferValue,
    DocLink,
  },
  mixins: [subheaderHandler],
  data() {
    return {
      section: 'RUB',
    }
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
.transfer {
  .page-with-id-title {
    --page-with-id-margin-bott: 3rem;
    --page-with-id-header-margin-bott: 0;
    .hr {
      display: none;
    }
  }

  .section-select {
    overflow-y: scroll;
    white-space: nowrap;
  }

  &__content {
    width: 100%;
    margin-bottom: 8rem;

    header.col-6 {
      padding-bottom: 3rem;
      border-bottom: $BORDER_DEFAULT;
      margin-bottom: 3rem;
    }

    h2.text-h1 {
      margin-bottom: 3rem;
    }
  }

  @include tablet {
    &__content {
      margin-bottom: 10rem;
      header.col-6 {
        padding-bottom: 0;
        border-bottom: none;
        margin-bottom: 0;
      }
    }
  }

  @include large-desktop {
    &__content {
      margin-bottom: 14.5rem;
      h2.text-h1 {
        margin-bottom: 4rem;
      }
    }
  }
}
</style>
