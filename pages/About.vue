<template>
  <main id="about" class="about">
    <div class="container">
      <PageTitle
        v-if="$options.DATA.header"
        :title="$options.DATA.header.title"
        :subtitle="$options.DATA.header.subtitle"
        :img="$options.DATA.header.img"
        :text="$options.DATA.header.text"
      >
        <template #link>
          <p class="text-p2">
            <nuxt-link :to="$options.DATA.header.link.href"
              >{{ $options.DATA.header.link.text }}
            </nuxt-link>
            <inline-svg
              :src="$getDefault('img', 'DEFAULT_ICON_ARROW_LINK_DOWNLOAD')"
            />
          </p>
        </template>
      </PageTitle>

      <section class="about__we-help">
        <h2 class="text-h1">{{ $options.DATA.we_help.title }}</h2>
        <ul class="row">
          <li
            v-for="(item, i) in $options.DATA.we_help.items"
            :key="$keyGen(i)"
            class="col-6 col-t-2 col-d-4"
          >
            <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_DONE')" />
            <p :class="isDesktop ? 'text-h3' : 'text-p1'">{{ item }}</p>
          </li>
        </ul>
      </section>

      <section class="about__target">
        <h2 class="text-h1">{{ $options.DATA.target.title }}</h2>
        <ImgSlider
          :images="$options.DATA.target.items.map((el) => el.img)"
          :desc="$options.DATA.target.items.map((el) => el.text)"
        />
      </section>

      <Assistance
        :title="$options.DATA.assistance.title"
        :items="$options.DATA.assistance.items"
      />

      <Comment
        :text="$options.DATA.comment.text"
        :name="$options.DATA.comment.name"
        :position="$options.DATA.comment.position"
      >
        <template #image>
          <img
            src="/img/webp/default/quote-avatar.webp"
            :alt="$options.DATA.comment.name"
          />
        </template>
      </Comment>

      <section class="about__principles">
        <div class="row">
          <h2 class="text-h1 col-6 col-t-3">
            {{ $options.DATA.principles.title }}
          </h2>
          <ul class="col-6 col-t-3">
            <li
              v-for="(item, i) in $options.DATA.principles.items"
              :key="$keyGen(i)"
            >
              <inline-svg :src="item.icon" />
              <p :class="isDesktop ? 'text-h3' : 'text-p1'">{{ item.text }}</p>
            </li>
          </ul>
        </div>
      </section>

      <section class="about__directions">
        <h2 class="text-h1">{{ $options.DATA.directions.title }}</h2>
        <ul>
          <li
            v-for="(item, i) in $options.DATA.directions.items"
            :key="$keyGen(i)"
          >
            <img :src="item.img" :alt="item.title" />
            <h3 class="text-h1">{{ item.title }}</h3>
            <nuxt-link :to="item.link.href">
              <p :class="isDesktop ? 'text-h3' : 'text-p1'">
                {{ item.link.text }}
              </p>
              <inline-svg
                :src="$getDefault('img', 'DEFAULT_ICON_ARROW_LINK')"
              />
            </nuxt-link>
          </li>
        </ul>
        <span class="hr" />
      </section>

      <section class="about__team">
        <h2 class="text-h1">{{ $options.DATA.team.title }}</h2>
        <img :src="$options.DATA.team.img" :alt="$options.DATA.team.title" />
        <article
          v-for="(item, i) in $options.DATA.team.units"
          :key="$keyGen(i)"
        >
          <h3 :class="isDesktop ? 'text-h2' : 'text-h1'">{{ item.title }}</h3>
          <ul>
            <li v-for="(user, c) in item.users" :key="$keyGen(c)">
              <p class="text-p2">{{ user.position }}</p>
              <p class="text-p1">{{ user.name }}</p>
              <p class="about__team-mail text-p1">{{ user.mail }}</p>
            </li>
          </ul>
        </article>
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import PageTitle from '~/components/blocks/PageTitle.vue'
import ImgSlider from '~/components/blocks/ImgSlider.vue'
import Assistance from '~/components/blocks/Assistance.vue'
import Comment from '~/components/blocks/Comment.vue'

export default {
  DATA: {
    header: {
      title: 'О фонде',
      subtitle:
        'Благотворительный фонд «Абсолют-Помощь» создан в 2002 году для поддержки детей в трудной жизненной ситуации. В настоящее время основная деятельность фонда связана с распределением грантов для нко, которые поддерживают детей в тяжелых жизненных ситуациях.',
      img: '/img/webp/default/news-img.webp',
      text: 'За прошедшие годы реализовано множество программ и проектов, направленных в первую очередь на поддержку детей с особенностями развития и детей-сирот. Фонд накопил богатый опыт в этой сфере. Был пройден путь от фонда адресной помощи до грантодающей организации, системно предоставляющей финансирование на конкурсной основе. Проводится всесторонняя экспертная работа. Фонд «Абсолют-Помощь» тесно сотрудничает с ведущими некоммерческими организациями и ключевыми государственными службами.',
      link: {
        href: '#',
        text: 'скачать логотип',
      },
    },
    we_help: {
      title: 'Мы помогаем фондам, которые заботятся о:',
      items: [
        'Детях до 18 лет с ограниченными возможностями здоровья (физическими и ментальными) и их семьях',
        'Детях до 18 лет в трудной жизненной ситуации (дети-сироты, приемные дети), выпускниках детских домов-интернатов',
        'Молодых взрослых с ментальными нарушениями, нуждающимся в социализации и сопровождаемом проживании',
      ],
    },
    target: {
      title:
        'Наша цель — долгосрочное улучшение качества жизни детей, их здоровья, социального благополучия.',
      items: [
        {
          img: '/img/webp/home/grant.webp',
          text: 'Денис Емин ухаживает за овчарками. Москва',
        },
        {
          img: '/img/webp/home/grant.webp',
          text: 'Денис Емин ухаживает за овчарками 2. Москва',
        },
        {
          img: '/img/webp/home/grant.webp',
          text: 'Денис Емин ухаживает за овчарками 3. Москва',
        },
        {
          img: '/img/webp/home/grant.webp',
          text: 'Денис Емин ухаживает за овчарками 4. Москва',
        },
      ],
    },
    assistance: {
      title: 'Мы содействуем:',
      items: [
        'внедрению и распространению лучших методик и практик',
        'развитию сферы защиты детства и помощи людям с инвалидностью',
        'улучшению отношения общества к целевым группам',
      ],
    },
    comment: {
      text: '«За 18 лет фонд прошел долгий путь и накопил большой опыт в сфере поддержки детей в трудной жизненной ситуации. Помогать нуждающимся недостаточно — необходимо объединять усилия и влиять на ситуацию системно. Поэтому в приоритете фонда проектаня деятельность и конкурсное распределение средств.»',
      name: 'Александр Светаков',
      position:
        'Председатель Общего собрания, учредитель благотворительного фонда «Абсолют-Помощь»',
    },
    directions: {
      title: 'Направления нашей работы',
      items: [
        {
          title: 'Школа «Абсолют»',
          img: '/img/webp/default/quote-avatar.webp',
          link: {
            text: 'Инклюзивная школа «Абсолют» — флагманский проект фонда.',
            href: '#',
          },
        },
        {
          title: 'Конкурс и проекты',
          img: '/img/webp/default/quote-avatar.webp',
          link: {
            text: 'Сопровождение детей и подростков с ментальными нарушениями, проживающих в Подмосковье',
            href: '#',
          },
        },
        {
          title: 'КСО',
          img: '/img/webp/default/quote-avatar.webp',
          link: {
            text: 'Сопровождение детей и подростков с ментальными нарушениями, проживающих в Подмосковье',
            href: '#',
          },
        },
        {
          title: 'Адресная помощь',
          img: '/img/webp/default/quote-avatar.webp',
          link: {
            text: 'Сопровождение детей и подростков с ментальными нарушениями, проживающих в Подмосковье',
            href: '#',
          },
        },
      ],
    },
    team: {
      title: 'Команда Абсолют–Помощь',
      img: '/img/webp/home/grant.webp',
      units: [
        {
          title: 'Дирекция',
          users: [
            {
              position: 'Исполнительный директор',
              name: 'Наталья Александровна Полякова',
              mail: 'n.a.polyakova@absolute-help.ru',
            },
            {
              position: 'Помощник исполнительного директора',
              name: 'Диана Шаяхметова',
              mail: 'd.shayakhmetova@absolute-help.ru',
            },
          ],
        },
        {
          title: 'Проекты и гранты',
          users: [
            {
              position:
                'Заместитель исполнительного директора по информационно-аналитической работе',
              name: 'Татьяна Беляева',
              mail: 't.belyaeva@absolute-help.ru',
            },
            {
              position: 'Руководитель благотворительных программ',
              name: 'Лариса Бильдина',
              mail: 'l.bildina@absolute-help.ru',
            },
            {
              position: 'Руководитель благотворительных программ',
              name: 'Алексей Жариков',
              mail: 'a.zharikov@absolute-help.ru',
            },
            {
              position: 'Руководитель благотворительных программ',
              name: 'Пелагея Сотникова',
              mail: 'p.sotnikova@absolute-help.ru',
            },
          ],
        },
        {
          title: 'Адресная помощь',
          users: [
            {
              position: 'Исполнительный директор',
              name: 'Наталья Александровна Полякова',
              mail: 'n.a.polyakova@absolute-help.ru',
            },
            {
              position: 'Помощник исполнительного директора',
              name: 'Диана Шаяхметова',
              mail: 'd.shayakhmetova@absolute-help.ru',
            },
          ],
        },
        {
          title: 'Коммуникации и спецпроекты',
          users: [
            {
              position:
                'Заместитель исполнительного директора по информационно-аналитической работе',
              name: 'Татьяна Беляева',
              mail: 't.belyaeva@absolute-help.ru',
            },
            {
              position: 'Руководитель благотворительных программ',
              name: 'Лариса Бильдина',
              mail: 'l.bildina@absolute-help.ru',
            },
            {
              position: 'Руководитель благотворительных программ',
              name: 'Алексей Жариков',
              mail: 'a.zharikov@absolute-help.ru',
            },
            {
              position: 'Руководитель благотворительных программ',
              name: 'Пелагея Сотникова',
              mail: 'p.sotnikova@absolute-help.ru',
            },
          ],
        },
      ],
    },
    principles: {
      title: 'Наши принципы',
      items: [
        {
          icon: '/img/svg/school/inclusive.svg',
          text: 'Эффективный альтруизм',
        },
        {
          icon: '/img/svg/school/routes.svg',
          text: 'Независимая экспертиза',
        },
        {
          icon: '/img/svg/icon/star-d.svg',
          text: 'Высокая и долгосрочная результативность',
        },
        {
          icon: '/img/svg/school/inclusive.svg',
          text: 'Ориентация на устойчивые улучшения, а не на разовую помощь',
        },
        {
          icon: '/img/svg/school/routes.svg',
          text: 'Открытость, прозрачность, равный доступ для участников в распределении средств',
        },
      ],
    },
  },
  name: 'About',
  components: {
    PageTitle,
    ImgSlider,
    Assistance,
    Comment,
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss">
.about {
  .page-title {
    margin-bottom: 8rem;
    &__slot {
      .text-p2 {
        @include a;
        display: flex;
        align-items: center;
        svg {
          width: 1.4rem;
          margin-left: 1.6rem;
        }
      }
    }
  }

  &__we-help {
    margin-bottom: 8rem;
    h2.text-h1 {
      margin-bottom: 4rem;
    }
    ul {
      li {
        display: flex;
        align-items: flex-start;
        color: $COLOR_BLACK-BLUE;
        &:not(:last-of-type) {
          margin-bottom: 3rem;
        }

        svg {
          @include square(2.5rem);
          margin-right: 1.5rem;
        }
      }
    }
  }

  &__target {
    width: 100%;
    margin-bottom: 8rem;
    h2.text-h1 {
      margin-bottom: 3rem;
    }
  }

  .assistance {
    margin-bottom: 9rem;
  }

  .comment {
    margin-bottom: 8rem;
  }

  &__principles {
    width: 100%;
    margin-bottom: 10rem;
    h2.text-h1 {
      margin-bottom: 4rem;
    }
    ul {
      li {
        display: flex;
        align-items: flex-start;
        color: $COLOR_BLACK-BLUE;
        &:not(:last-of-type) {
          margin-bottom: 3rem;
        }
        svg {
          margin-left: 1.5rem;
          margin-right: 3rem;
          min-width: 3.5rem;
          max-width: 3.5rem;
          position: relative;
          top: 0.3rem;
        }
      }
    }
  }

  &__directions {
    --about-directions-img-size: 16.5rem;

    margin-bottom: 10rem;

    h2.text-h1 {
      padding-bottom: 4rem;
      border-bottom: $BORDER_DEFAULT;
      margin-bottom: 3rem;
    }

    ul {
      li {
        padding-bottom: 3rem;
        border-bottom: $BORDER_DEFAULT;
        margin-bottom: 3rem;
        img {
          @include square(var(--about-directions-img-size));
          border-radius: 2rem;
          margin-bottom: 3rem;
        }
        h3.text-h1 {
          margin-bottom: 2rem;
        }
        a {
          @include a;
          .text-p1 {
            margin-bottom: 3rem;
          }
          svg {
            width: 5.5rem;
          }
        }
      }
    }

    .hr {
      display: none;
    }
  }

  &__team {
    width: 100%;
    margin-bottom: 10rem;

    h2.text-h1 {
      margin-bottom: 3rem;
    }

    img {
      border-radius: 2rem;
      margin-bottom: 4rem;
    }

    h3.text-h1 {
      padding-bottom: 2rem;
      border-bottom: $BORDER_DEFAULT;
      margin-bottom: 4rem;
    }

    ul {
      margin-bottom: 5rem;
      li {
        &:not(:last-of-type) {
          margin-bottom: 3.5rem;
        }

        .text-p2 {
          margin-bottom: 1rem;
        }

        .about__team-mail {
          color: $COLOR_GREY-BLUE;
          margin-top: 0.5rem;
        }
      }
    }
  }

  @include tablet {
    &__we-help {
      margin-bottom: 10rem;
      h2.text-h1 {
        width: 50%;
      }
      ul {
        li {
          flex-direction: column;

          svg {
            margin-right: 0;
            margin-bottom: 1.5rem;
          }
        }
      }
    }

    .assistance {
      margin-bottom: 10rem;
    }

    &__principles {
      h2.text-h1 {
        margin-bottom: 0;
      }
      ul {
        li {
          svg {
            margin-left: 0;
            margin-right: 4rem;
          }
        }
      }
    }

    &__directions {
      --about-directions-img-size: 20.3rem;

      h2.text-h1 {
        text-align: center;
        margin-bottom: 2rem;
      }

      ul {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 4rem;
        grid-row-gap: 12rem;
        padding: 5rem 0;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 0.2rem;
          top: calc(50% - 0.2rem);
          background-color: $COLOR_BLACK-BLUE;
        }
        &::after {
          content: '';
          position: absolute;
          height: 100%;
          width: 0.2rem;
          left: calc(50% - 0.2rem);
          background-color: $COLOR_BLACK-BLUE;
        }

        li {
          padding-bottom: 0;
          border-bottom: none;
          margin-bottom: 0;

          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          img {
            border-radius: 3rem;
          }
          h3.text-h1 {
            margin-bottom: 1.5rem;
          }
          a {
            .text-p1 {
              margin-bottom: 2rem;
            }
          }
        }
      }

      .hr {
        display: block;
        margin-top: 2rem;
      }
    }

    &__team {
      img {
        border-radius: 3rem;
        margin-bottom: 3.5rem;
      }

      article {
        display: flex;
        justify-content: space-between;
        padding-bottom: 3.5rem;
        border-bottom: $BORDER_DEFAULT;
        margin-bottom: 3.5rem;
      }

      h3.text-h1 {
        width: 30%;
        padding-bottom: 0;
        border-bottom: none;
        margin-bottom: 0;
      }

      ul {
        width: 50%;
        margin-bottom: 0;
      }
    }
  }

  @include large-desktop {
    .page-title {
      margin-bottom: 18rem;
    }

    &__we-help {
      margin-bottom: 18rem;
      h2.text-h1 {
        margin-bottom: 6rem;
      }
      ul {
        li {
          svg {
            @include square(3.5rem);
            margin-bottom: 2.3rem;
          }
        }
      }
    }

    &__target {
      margin-bottom: 16rem;
    }

    .assistance {
      margin-bottom: 18rem;
    }

    .comment {
      margin-bottom: 16rem;
    }

    &__principles {
      margin-bottom: 18rem;
      ul {
        li {
          &:not(:last-of-type) {
            margin-bottom: 6rem;
          }
          svg {
            min-width: 4.6rem;
            max-width: 4.6rem;
            margin-right: 7rem;
          }
        }
      }
    }

    &__directions {
      --about-directions-img-size: 30.5rem;

      margin-bottom: 18rem;

      h2.text-h1 {
        margin-bottom: 5rem;
      }

      ul {
        grid-row-gap: 25.2rem;
        li {
          img {
            border-radius: 4rem;
            margin-bottom: 5rem;
          }
          h3.text-h1 {
            margin-bottom: 3rem;
          }
          .text-h3 {
            margin-bottom: 4rem;
          }
        }
      }

      .hr {
        margin-top: 5rem;
      }
    }

    &__team {
      margin-bottom: 20rem;

      img {
        border-radius: 4rem;
        margin-bottom: 5rem;
      }

      article {
        padding-bottom: 5rem;
        margin-bottom: 5rem;
      }

      h3.text-h2 {
        width: 30%;
      }

      ul {
        li {
          &:not(:last-of-type) {
            margin-bottom: 5rem;
          }
        }
      }
    }
  }
}
</style>
