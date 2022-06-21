section
<template>
  <main class="csr">
    <div class="container">
      <PageTitle
        :title="$options.DATA.header.title"
        :subtitle="$options.DATA.header.subtitle"
        :img="$options.DATA.header.img"
        :text="$options.DATA.header.text"
        class="csr-title"
      >
        <template #link>
          <custom-button
            tag="a"
            :to="$options.DATA.header.link.href"
            :text="$options.DATA.header.link.text"
            :text-class="'text-h3'"
            arrow-icon="DEFAULT_ICON_ARROW_LINK"
            class="only-text csr-arrow"
        /></template>
      </PageTitle>
      <div class="csr__block">
        <div class="row">
          <h1 class="text-h1 col-6 col-t-3">
            {{ $options.DATA.we_do.title }}
          </h1>
          <p
            class="csr__block-text col-6 col-t-3"
            :class="isDesktop ? 'text-h3' : 'text-p1'"
            v-html="$options.DATA.we_do.subtitle"
          />
        </div>
      </div>
      <Event :events="$options.DATA.events" />
    </div>
    <ContentSlider
      class="csr-slider"
      :title="$options.DATA.news.title"
      :items="$options.DATA.news.sliders"
      :link="$options.DATA.news.link"
    />
    <div class="container">
      <DocsImg
        :title="$options.DATA.docs_image.title"
        :img="$options.DATA.docs_image.img"
        :file="$options.DATA.docs_image.file"
      />
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

import PageTitle from '~/components/blocks/PageTitle.vue'
import Event from '~/components/blocks/Event.vue'
import DocsImg from '~/components/blocks/DocsImg.vue'
import ContentSlider from '~/components/blocks/ContentSlider.vue'

export default {
  DATA: {
    header: {
      title: 'Корпортавно-социальная ответственность',
      subtitle:
        'Усилий некоммерческих организаций для решения социальных проблем не всегда достаточно, поэтому фонд стремится увеличить свой вклад, развивая программы корпоративной филантропии – мы запускаем и поддерживаем инициативы совместно с бизнесом и его сотрудниками, другими некоммерческими и неправительственными организациями, а также государственными учреждениями и органами власти. ',
      img: '/img/webp/csr/title-img.webp',
      link: {
        text: 'новости по теме',
        href: '#',
      },
      text: 'Волонтерское движение среди сотрудников Инвестиционной Группы АБСОЛЮТ с каждым годом набирает обороты. Волонтеры регулярно сдают кровь, участвуют в благотворительных ярмарках, поддерживают инициативы по улучшению состояния окружающей среды и сами активно предлагают идеи для новых социальных проектов.',
    },
    news: {
      title: 'Новости по теме',
      link: {
        text: 'Читать все',
        key: '#',
      },
      sliders: [
        {
          title: 'Заголовок',
          date: 1637838258,
          img: '/img/webp/csr/csr-slide.webp',
        },
        {
          title: 'Заголовок',
          date: 1637838258,
          img: '/img/webp/csr/csr-slide.webp',
        },
        {
          title: 'Заголовок',
          date: 1637838258,
          img: '/img/webp/csr/csr-slide.webp',
        },
        {
          title: 'Заголовок',
          date: 1637838258,
          img: '/img/webp/csr/csr-slide.webp',
        },
      ],
    },
    we_do: {
      title: 'Что мы делаем',
      subtitle:
        'Ежегодно в рамках корпоративной социальной ответственности фонд «Абсолют-Помощь» проводит мероприятия помощи: мы сдаем кровь и собираем вещи для нуждающихся.<br/><br/>Фонд способствует разработке собственных проектов волонтерами компании, а также пропагандирует экологические принципы работы в офисе.',
    },
    events: [
      {
        title: 'День донора',
        description:
          'Доноры сдают кровь для переливания детям в московских больницах',
        items: [
          {
            value: '70 кг',
            description: 'одежды собрано и передано в детские дома',
          },
          {
            value: '46 детей',
            description:
              'детей обучаются по основным общеобразовательным программам',
          },
          {
            value: '80 детей',
            description:
              'детей обучаются по адаптированным программам в соответствии с заключением ПМПК',
          },
        ],
        list: [
          {
            text: 'получают коррекционную и психологическую помощь;',
          },
          {
            text: 'проходят лечение на базе медицинского блока школы;',
          },
          {
            text: 'посещают дополнительные творческие занятия, обучаются английскому, французскому языку, занимаются спортом и танцами',
          },
        ],
        link: {
          text: 'Читать подробнее',
          href: '#',
        },
        slider: {
          items: [
            {
              img: '/img/webp/csr/csr-slide.webp',
              text: 'Александр Романов сдает кровь в центре ЛМНР',
            },
            {
              img: '/img/webp/csr/csr-slide.webp',
              text: 'Александр Романов сдает кровь в центре ЛМНР 2',
            },
            {
              img: '/img/webp/csr/csr-slide.webp',
              text: 'Александр Романов сдает кровь в центре ЛМНР 3',
            },
            {
              img: '/img/webp/csr/csr-slide.webp',
              text: 'Александр Романов сдает кровь в центре ЛМНР 4',
            },
          ],
        },
      },
      {
        title: 'Щедрый вторник',
        description:
          'Волонтерское движение среди сотрудников Инвестиционной Группы АБСОЛЮТ с каждым годом набирает обороты. Волонтеры регулярно сдают кровь, участвуют в благотворительных ярмарках, поддерживают инициативы по улучшению состояния.<br/><br/>Волонтерское движение среди сотрудников Инвестиционной Группы АБСОЛЮТ с каждым годом набирает обороты. ',
        items: [
          {
            value: '70 кг',
            description: 'одежды собрано и передано в детские дома',
          },
          {
            value: '46 детей',
            description:
              'детей обучаются по основным общеобразовательным программам',
          },
          {
            value: '80 детей',
            description:
              'детей обучаются по адаптированным программам в соответствии с заключением ПМПК',
          },
        ],
        link: {
          text: 'Читать подробнее',
          href: '#',
        },
        slider: {
          items: [
            {
              img: '/img/webp/csr/csr-slide-2.webp',
              text: 'Алексей Колчун загружает маски для детского центра «Теремок»',
            },
            {
              img: '/img/webp/csr/csr-slide-2.webp',
              text: 'Алексей Колчун загружает маски для детского центра «Теремок» 2',
            },
            {
              img: '/img/webp/csr/csr-slide-2.webp',
              text: 'Алексей Колчун загружает маски для детского центра «Теремок» 3',
            },
            {
              img: '/img/webp/csr/csr-slide-2.webp',
              text: 'Алексей Колчун загружает маски для детского центра «Теремок» 4',
            },
          ],
        },
      },
    ],
    docs_image: {
      title:
        'Проект реализуется в рамках благотворительной программы фонда «Абсолют–Помощь»',
      description: '',
      file: {
        name: 'Благотворительная программа фонда «Абсолют–Помощь»',
        href: '',
        type: ' PDF - 29 КБ',
        size: '',
      },
      img: '/img/contacts-help.png',
    },
  },
  name: 'Contests',
  components: {
    PageTitle,
    ContentSlider,
    Event,
    DocsImg,
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
.csr {
  margin-bottom: 10rem;
  &__block-title {
    margin-top: 10rem;
  }
  &__block {
    width: 100%;
    margin-top: 8rem;
    margin-bottom: 5rem;
    &-text {
      max-width: 57.5rem !important;
    }
    .row {
      h1 {
        margin-bottom: 3rem;
        word-spacing: normal;
      }
    }
  }
  .page-title__slot {
    width: 50%;
  }
  .docs-img {
    margin-top: 8rem;
    &__title {
      max-width: 62.3rem;
    }
  }
  .doc-link {
    &__title {
      max-width: 46.8rem;
    }
  }
  // .csr-slider {
  //   margin-top: 4rem;
  // }
  .csr-title {
    .page-title__header {
      padding-right: 4rem;
      .row {
        padding-right: 5rem;
      }
      .text-h3 {
        max-width: 55rem;
        padding: 0 var(--col-gap);
      }
    }
    .text-p1 {
      max-width: 53.5rem;
      margin-right: auto;
      padding: 0 var(--col-gap);
    }
  }
  .csr-arrow {
    justify-content: flex-start;
    width: max-content;
    .arrow-long {
      svg {
        width: 5.5rem;
      }
    }
  }
  @include tablet {
    margin-bottom: 9.4rem;
    .csr-slider {
      margin-top: 4rem;
    }
    .csr-slider {
      margin-top: 0;
    }
    .docs-img {
      margin-top: 10rem;
    }
    &__block {
      margin-bottom: 6rem;
    }
    .csr-slider {
      margin-bottom: 9.2rem;
    }
  }
  @include large-desktop {
    margin-bottom: 16rem;
    .csr-slider {
      margin-top: 4rem;
    }
    .csr-arrow {
      .arrow-long {
        top: 1px;
      }
    }
    .docs-img {
      margin-top: 16rem;
    }
    &__block {
      margin: 10rem 0;
    }
    .csr-slider {
      margin-bottom: 14rem;
    }
  }
}
</style>
