<template>
  <main id="school" class="school">
    <div class="container">
      <PageTitle
        :title="locale.header.title"
        :subtitle="locale.header.subtitle"
        :img="locale.header.img"
        :text="locale.header.text"
      >
        <template #link>
          <a :href="locale.header.link.key">
            <span class="text-p1">{{ locale.header.link.text }}</span>
            <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_ARROW_45')" />
          </a>
        </template>
      </PageTitle>
      <SchoolIndividual
        :title="locale.individual.title"
        :text="locale.individual.text"
        :items="locale.individual.items"
      />
      <SchoolPrinciples
        :title="locale.principles.title"
        :items="locale.principles.items"
      />
      <Comment
        :text="$options.DATA.comment.text"
        :name="$options.DATA.comment.name"
        :position="$options.DATA.comment.position"
      >
        <template #image>
          <ImgSlider :images="$options.DATA.comment.images" />
        </template>
      </Comment>
      <SchoolStudents
        :title="locale.students.title"
        :desc="locale.students.desc"
        :items="locale.students.items"
      />
    </div>
    <ContentSlider
      :title="locale.news.title"
      :items="locale.news.items"
      :link="locale.news.link"
    />
    <div class="container">
      <DocsImg
        :title="locale.docs_image.title"
        :img="locale.docs_image.img"
        :file="locale.docs_image.file"
      />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

import PageTitle from '~/components/blocks/PageTitle.vue'
import ContentSlider from '~/components/blocks/ContentSlider.vue'
import DocsImg from '~/components/blocks/DocsImg.vue'
import Comment from '~/components/blocks/Comment.vue'
import ImgSlider from '~/components/blocks/ImgSlider.vue'

import SchoolIndividual from '~/modules/school/SchoolIndividual.vue'
import SchoolPrinciples from '~/modules/school/SchoolPrinciples.vue'
import SchoolStudents from '~/modules/school/SchoolStudents.vue'
export default {
  DATA: {
    head: {
      title: 'Школа «Абсолют»',
      subtitle:
        'Школа «Абсолют» — единственная инклюзивная частная школа, обучение в которой бесплатно. В школе вместе учатся дети с разными стартовыми возможностями.  В создании проекта здания школы принимали участие психологи, педагоги, дефектологи, чтобы учесть потребности разных детей.',
      img: '/img/webp/home/grant.webp',
      link: {
        text: 'Перейти на сайт школы',
        key: '#',
      },
      text: 'Школе «Абсолют» близки ценности и философия гуманной педагогики. В школе созданы оптимальные условия, при которых проще проявлять себя, узнавать новое, общаться со сверстниками и взрослыми, формировать жизненную позицию. Наши ученики взаимодействуют друг с другом на равных, вне зависимости от своих интеллектуальных или физических особенностей.',
    },
    individual: {
      title: 'Индивидуальный подход',
      text: 'Ежегодно обучение в школе проходят более 120 учеников. Среди них – дети из приемных и кровных семей. Индивидуальный подход к организации образовательного процесса подразумевает подбор оптимальной программы обучения для каждого ребенка: образовательная и адаптивная',
      items: [
        {
          title: 'Инклюзивное образование',
          img: '/img/webp/default/directions-img.webp',
          icon: '/img/svg/school/inclusive.svg',
        },
        {
          title: 'Индивидуальные маршруты развития',
          img: '/img/webp/default/news-img.webp',
          icon: '/img/svg/school/routes.svg',
        },
        {
          title: 'Волонтерское движение',
          img: '/img/webp/default/quote-avatar.webp',
          icon: '/img/svg/icon/star-d.svg',
        },
        {
          title: 'Развивающие лагеря и кружки',
          img: '/img/webp/default/directions-img.webp',
          icon: '/img/svg/school/inclusive.svg',
        },
        {
          title: 'Международное сотрудничество',
          img: '/img/webp/home/grant.webp',
          icon: '/img/svg/school/routes.svg',
        },
      ],
    },
    principles: {
      title: 'Наши принципы',
      items: [
        'Место, где детей обучают по вариативным образовательным программам,  позволяющим учитывать индивидуальные особенности каждого ребенка.',
        'Экспериментальная площадка, соответствующая современным стандартам образования, использующая новейшие методики обучения с доказанной эффективностью.',
        'Учебное заведение, в котором каждый этап развития ребенка сопровождается непрерывной поддержкой со стороны педагогов, дефектологов, психологов и медработников.',
        'Частное образовательное учреждение, в котором созданы оптимальные условия для гармоничного развития и социализации детей с разными стартовыми возможностями.',
      ],
    },
    comment: {
      images: [
        '/img/webp/default/directions-img.webp',
        '/img/webp/default/news-img.webp',
        '/img/webp/default/quote-avatar.webp',
        '/img/webp/home/grant.webp',
      ],
      text: '«Мы верим, что если вовремя поддержать ребенка, попавшего в трудную жизненную ситуацию, он сможет стать полноценными членом общества и добиться того, о чем мечтает».',
      name: 'Александр Светаков',
      position:
        'Председатель Общего собрания, учредитель благотворительного фонда «Абсолют-Помощь»',
    },
    students: {
      title: 'Наши ученики',
      desc: [
        'получают коррекционную и психологическую помощь;',
        'проходят лечение на базе медицинского блока школы;',
        'посещают дополнительные творческие занятия, обучаются английскому, французскому языку, занимаются спортом и танцами',
      ],
      items: [
        {
          num: 132,
          text: 'ребенка в возрасте от 7 до 17 лет',
        },
        {
          num: 46,
          text: 'детей обучаются по основным общеобразовательным программам',
        },
        {
          num: 86,
          text: 'детей обучаются по адаптированным программам в соответствии с заключением ПМПК',
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
  },
  name: 'School',
  components: {
    PageTitle,
    SchoolIndividual,
    SchoolPrinciples,
    Comment,
    ImgSlider,
    SchoolStudents,
    ContentSlider,
    DocsImg,
  },
  async asyncData(ctx) {
    try {
      const request = await ctx.$api.pages.getSchoolPage()
      const response = await request.data
      return { response }
    } catch (e) {
      ctx.error(e)
    }
  },
  computed: {
    ...mapState(['scrollTop', 'lang']),
    locale() {
      return this.response[this.lang]
    },
  },
}
</script>

<style lang="scss">
.school {
  .page-title {
    margin-bottom: 8rem;
    a {
      @include a;
    }
    svg {
      width: 1.5rem;
      margin-left: 1.5rem;
    }
  }
  .school-individual,
  .content-slider,
  .comment {
    margin-bottom: 8rem;
  }
  .comment {
    img {
      width: 100%;
      min-width: unset;
      max-width: unset;
      aspect-ratio: unset;
      margin: 0;
    }

    .img-slider {
      &__count {
        text-align: center;
      }
    }
  }

  .school-principles {
    margin-bottom: 4rem;
  }
  .docs-img,
  .school-students {
    margin-bottom: 10rem;
  }

  @include tablet {
    .page-title,
    .content-slider,
    .comment {
      margin-bottom: 10rem;
    }
    .school-individual {
      margin-bottom: 12rem;
    }
  }

  @include large-desktop {
    .page-title,
    .content-slider,
    .comment,
    .docs-img,
    .school-students {
      margin-bottom: 16rem;
    }
    .school-individual {
      margin-bottom: 20rem;
    }
  }
}
</style>
