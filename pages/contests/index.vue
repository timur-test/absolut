<template>
  <main id="contests" class="contests">
    <div class="container">
      <PageTitle
        v-if="locale.header"
        :title="locale.header.title"
        :subtitle="locale.header.subtitle"
        :img="locale.header.img"
        :text="locale.header.text"
      >
        <template #link>
          <custom-note>
            <p class="text-p2">
              {{ locale.header.note.text }}
              <nuxt-link :to="locale.header.note.link.href"
                >{{ locale.header.note.link.text }}
              </nuxt-link>
            </p>
          </custom-note>
        </template>
      </PageTitle>
      <ContestsSupportDirections
        v-if="locale.support"
        :title="locale.support.title"
        :items="locale.support.items"
      />
      <ContestsGrants
        v-if="locale.grants"
        :title="locale.grants.title"
        :text="locale.grants.text"
        :desc="locale.grants.desc"
        :items="locale.grants.items"
      />
    </div>
    <ContentSlider
      v-if="locale.news"
      :title="locale.news.title"
      :items="locale.news.items"
      :link="locale.news.link"
    />
    <div class="container">
      <DocsImg
        v-if="locale.docs"
        :title="locale.docs.title"
        :img="locale.docs.img"
        :file="locale.docs.file"
      />
    </div>
    <ContestsArchiveSlider
      v-if="locale.archive"
      :title="locale.archive.title"
      :items="locale.archive.items"
    />
  </main>
</template>

<script>
import { mapState } from 'vuex'
import PageTitle from '~/components/blocks/PageTitle.vue'
import ContentSlider from '~/components/blocks/ContentSlider.vue'
import DocsImg from '~/components/blocks/DocsImg.vue'

import ContestsSupportDirections from '~/modules/contests/ContestsSupportDirections.vue'
import ContestsGrants from '~/modules/contests/ContestsGrants.vue'
import ContestsArchiveSlider from '~/modules/contests/ContestsArchiveSlider.vue'

export default {
  DATA: {
    head: {
      title: 'Конкурсы проектов',
      subtitle:
        '«Абсолют-Помощь» — грантодающая организация. Фонд на регулярной основе, один раз в год проводит конкурсы проектов, направленных на поддержку целевых групп — в первую очередь детей с ограниченными возможностями и опытом сиротства. Ежегодно финансирование фонда получают более 100 проектов некоммерческих организаций.',
      img: '/img/webp/home/grant.webp',
      note: {
        text: 'Стартовал грантовый конкурс для НКО.',
        link: {
          text: 'Подробнее',
          key: '#',
        },
      },
      text: 'Процесс системных изменений, развития необходимых сервисов и обучения специалистов требует времени и усилий многих стейкхолдеров. Но кому-то необходима срочная операция или реабилитация, у кого-то сломалась инвалидная коляска или другое жизненно необходимое устройство, кому-то не могут установить точный диагноз без дорогостоящего генетического анализа. В таких случаях фонд «Абсолют-Помощь» помогает напрямую: мы оплачиваем лечение, реабилитационные занятия, закупаем необходимое оборудование.',
    },
    support: {
      title: 'Направления поддержки',
      items: [
        {
          img: 'img/webp/home/grant.webp',
          title: 'Повышение качества жизни и вовлеченности',
          text: 'Каждому человеку важно стремиться к самостоятельности. Трудные обстоятельства и ограниченные возможности не должны препятствовать получению жизненных навыков, адаптации, получению психологической, социальной и медицинской поддержки. Уязвимым группам населения необходима помощь в улучшении качества жизни, расширении возможностей, социализации и трудоустройстве.',
        },
        {
          img: 'img/webp/home/grant.webp',
          title: 'Повышение качества жизни и вовлеченности',
          text: 'Каждому человеку важно стремиться к самостоятельности. Трудные обстоятельства и ограниченные возможности не должны препятствовать получению жизненных навыков, адаптации, получению психологической, социальной и медицинской поддержки. Уязвимым группам населения необходима помощь в улучшении качества жизни, расширении возможностей, социализации и трудоустройстве.',
        },
        {
          img: 'img/webp/home/grant.webp',
          title: 'Повышение качества жизни и вовлеченности',
          text: 'Каждому человеку важно стремиться к самостоятельности. Трудные обстоятельства и ограниченные возможности не должны препятствовать получению жизненных навыков, адаптации, получению психологической, социальной и медицинской поддержки. Уязвимым группам населения необходима помощь в улучшении качества жизни, расширении возможностей, социализации и трудоустройстве.',
        },
        {
          img: 'img/webp/home/grant.webp',
          title: 'Повышение качества жизни и вовлеченности',
          text: 'Каждому человеку важно стремиться к самостоятельности. Трудные обстоятельства и ограниченные возможности не должны препятствовать получению жизненных навыков, адаптации, получению психологической, социальной и медицинской поддержки. Уязвимым группам населения необходима помощь в улучшении качества жизни, расширении возможностей, социализации и трудоустройстве.',
        },
        {
          img: 'img/webp/home/grant.webp',
          title: 'Повышение качества жизни и вовлеченности',
          text: 'Каждому человеку важно стремиться к самостоятельности. Трудные обстоятельства и ограниченные возможности не должны препятствовать получению жизненных навыков, адаптации, получению психологической, социальной и медицинской поддержки. Уязвимым группам населения необходима помощь в улучшении качества жизни, расширении возможностей, социализации и трудоустройстве.',
        },
      ],
    },
    grants: {
      title: 'Грантовый конкурс',
      text: 'Фонд на регулярной основе, один раз в год проводит конкурсы проектов, направленных на поддержку целевых групп — в первую очередь детей с ограниченными возможностями и опытом сиротства.',
      desc: [
        {
          num: 1,
          text: 'конкурс в этом году',
        },
        {
          num: 5,
          text: 'направлений проектов',
        },
        {
          num: 100,
          text: 'выбирается проектов за раз',
        },
      ],
      items: [
        {
          img: '/img/webp/home/grant.webp',
          title:
            'Грантовый конкурс № 1 благотворительного фонда «Абсолют-Помощь» 2021',
          link: {
            text: 'подробнее',
            key: '',
          },
          requests: 'Заявки принимаются с 1 по 31 марта',
        },
        {
          img: 'img/webp/home/grant.webp',
          title:
            'Грантовый конкурс № 1 благотворительного фонда «Абсолют-Помощь» 2021',
          link: {
            text: 'подробнее',
            key: '',
          },
          requests: 'Заявки принимаются с 1 по 31 марта',
        },
      ],
    },
    docs: {
      title:
        'Проект реализуется в рамках благотворительной программы фонда «Абсолют–Помощь»',
      img: '/img/webp/home/grant.webp',
      file: {
        name: 'Благотворительная программа фонда «Абсолют–Помощь»',
        type: 'PDF - 967 КБ',
        link: {},
      },
    },
    archive: {
      title: 'Архив конкурсов',
      items: [
        {
          text: 'Конкурс грантов 2020',
          link: {
            text: 'подробнее',
            href: '#',
          },
        },
        {
          text: 'Конкурс грантов 2019',
          link: {
            text: 'подробнее',
            href: '#',
          },
        },
        {
          text: 'Конкурс грантов 2018',
          link: {
            text: 'подробнее',
            href: '#',
          },
        },
        {
          text: 'Конкурс грантов 2020',
          link: {
            text: 'подробнее',
            href: '#',
          },
        },
        {
          text: 'Конкурс грантов 2019',
          link: {
            text: 'подробнее',
            href: '#',
          },
        },
        {
          text: 'Конкурс грантов 2018',
          link: {
            text: 'подробнее',
            href: '#',
          },
        },
      ],
    },
  },
  name: 'Contests',
  components: {
    PageTitle,
    ContentSlider,
    ContestsSupportDirections,
    ContestsGrants,
    DocsImg,
    ContestsArchiveSlider,
  },
  async asyncData(ctx) {
    try {
      const request = await ctx.$api.pages.getContestsPage()
      const response = await request.data
      return { response }
    } catch (e) {
      ctx.error(e)
    }
  },
  computed: {
    ...mapState(['lang']),
    locale() {
      return this.response[this.lang]
    },
  },
}
</script>

<style lang="scss">
.contests {
  overflow-x: hidden;

  .page-title {
    .custom-note {
      max-width: 24.6rem;
      a {
        text-decoration: underline;
      }
    }
  }

  .page-title,
  .content-slider,
  .docs-img {
    margin-bottom: 8rem;
  }
  .support-directions,
  .grants {
    margin-bottom: 10rem;
  }

  @include tablet {
    .page-title,
    .docs-img {
      margin-bottom: 10rem;
    }
    .support-directions {
      margin-bottom: 12rem;
    }
  }
  @include large-desktop {
    .page-title {
      .custom-note {
        max-width: 34.6rem;
      }
    }
    .page-title,
    .support-directions,
    .docs-img {
      margin-bottom: 16rem;
    }
    .grants {
      margin-bottom: 14rem;
    }
  }
}
</style>
