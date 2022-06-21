<template>
  <main class="contest">
    <div class="container">
      <PageWithIdTitle :title="locale.header.title" :img="locale.header.img">
        <template #header>
          <custom-button
            tag="a"
            :text="locale.header.link.text"
            arrow-icon="DEFAULT_ICON_ARROW_LINK"
            class="only-text"
            :text-class="isDesktop ? 'text-p2' : 'text-p1'"
          />
        </template>
        <template #desc>
          <ul class="contest__title-desc">
            <li v-for="(item, i) in locale.header.items" :key="$keyGen(i)">
              <p class="text-p2">{{ item.label }}</p>
              <p :class="isDesktop ? 'text-h3' : 'text-p1'">{{ item.num }}</p>
            </li>
          </ul>
        </template>
        <template #footer>
          <p :class="isDesktop ? 'text-p2' : 'text-p1'">
            {{ locale.header.finish }}
          </p>
        </template>
      </PageWithIdTitle>

      <div class="section-select">
        <template v-for="(item, i) in locale.sections">
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
            {{ item.text }}
          </label>
        </template>
      </div>

      <section v-if="section !== 'conditions'" class="contest-directions">
        <h2 class="text-h1">Направления и победители</h2>
        <article
          v-for="(item, i) in locale.directions.items"
          :key="$keyGen(i)"
          class="contest-article"
        >
          <h3 class="contest-article__title text-h2">{{ item.title }}</h3>
          <div class="contest-article__labels">
            <div
              v-for="(label, c) in item.labels"
              :key="$keyGen(c)"
              class="contest-article__label"
            >
              <p class="text-h2">{{ label.num }}</p>
              <p class="text-p1">{{ label.text }}</p>
            </div>
          </div>
          <p class="contest-article__text text-p1">{{ item.text }}</p>
          <custom-dropdown
            title="развернуть"
            title-open="свернуть"
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
            <div class="contest-article__projects">
              <div
                v-for="(project, i) in item.projects"
                :key="$keyGen(i)"
                class="contest-article__project"
              >
                <img :src="storageUrl + project.img" :alt="project.title" />
                <div class="contest-article__project-text">
                  <p class="contest-article__project-place text-p2">
                    {{ project.place }}
                  </p>
                  <h4 class="contest-article__project-title text-h3">
                    {{ project.title }}
                  </h4>
                  <p class="text-p2">{{ project.text }}</p>
                  <nuxt-link class="text-p2" :to="project.link.href">{{
                    project.link.text
                  }}</nuxt-link>
                </div>
              </div>
            </div>
          </custom-dropdown>
        </article>
      </section>

      <section v-else class="contest-conditions">
        <div class="contest-conditions__requirements">
          <h2 class="text-h1">Требования к участникам</h2>
          <ul>
            <li
              v-for="(item, i) in locale.conditions.requirements.items"
              :key="$keyGen(i)"
              :data-num="i + 1"
              class="text-p1"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="contest-conditions__projects row">
          <div
            v-for="(item, i) in locale.conditions.projects"
            :key="$keyGen(i)"
            class="col-6 col-t-3"
          >
            <h2 :class="isDesktop ? 'text-h2' : 'text-h1'">{{ item.title }}</h2>
            <inline-svg src="/img/svg/school/inclusive.svg" />
            <p class="text-p1">{{ item.text }}</p>
          </div>
        </div>
        <div class="contest-conditions__stages row">
          <div class="col-6 col-t-3">
            <h2 class="text-h1">Этапы проведения конкурса</h2>
          </div>
          <div class="col-6 col-t-3">
            <ul>
              <li
                v-for="(item, i) in locale.conditions.stage_of_the_competition
                  .items"
                :key="$keyGen(i)"
                :data-num="i + 1"
                class="text-p1"
              >
                <p>{{ item.text }}</p>
                <p class="date">
                  {{ $dateConverter(item.from, $options.dateOptions) }} -
                  {{ $dateConverter(item.to, $options.dateOptions) }}
                </p>
              </li>
            </ul>
            <button>
              <span class="text-h3">подать заявку</span>
              <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_SEND')" />
            </button>
          </div>
        </div>
        <div class="contest-conditions__docs row">
          <div class="col-6">
            <h2 class="text-h1">!!!!</h2>
          </div>
        </div>
      </section>
    </div>

    <ContestsArchiveSlider
      :title="locale.archive.title"
      :items="locale.archive.items"
    />
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import PageWithIdTitle from '~/components/blocks/PageWithIdTitle.vue'
import CustomDropdown from '~/components/custom/CustomDropdown.vue'
import ContestsArchiveSlider from '~/modules/contests/ContestsArchiveSlider.vue'

export default {
  dateOptions: {
    day: 'numeric',
    month: 'long',
  },
  name: 'Contest',
  components: {
    PageWithIdTitle,
    CustomDropdown,
    ContestsArchiveSlider,
  },
  inject: ['storageUrl'],
  async asyncData(ctx) {
    try {
      const id = await ctx.route.params.id
      const request = await ctx.$api.pages.getContestById(id)
      const response = await request.data
      return { response }
    } catch (e) {
      ctx.error(e)
    }
  },
  data() {
    return {
      section: 'directions',
    }
  },
  computed: {
    ...mapState(['lang']),
    ...mapGetters(['isDesktop']),
    locale() {
      return this.response[this.lang]
    },
  },
}
</script>

<style lang="scss">
.contest {
  .page-with-id-title {
    --page-with-id-margin-bott: 1rem;
    --page-with-id-title-margin-bott: 1.5rem;

    &__main {
      margin-bottom: 3.5rem;
    }

    .contest__title-desc {
      li {
        &:not(:last-of-type) {
          margin-bottom: 2rem;
        }
        .text-p2 {
          margin-bottom: 0.2rem;
        }
      }
    }
  }

  &-directions {
    margin-bottom: 12rem;
    h2.text-h1 {
      margin-bottom: 5rem;
    }
  }

  &-article {
    padding-bottom: 3rem;
    border-bottom: $BORDER_DEFAULT;
    &:not(:last-of-type) {
      margin-bottom: 3rem;
    }
    &__title {
      margin-bottom: 2rem;
    }

    &__labels {
      display: flex;
      margin-bottom: 3rem;
    }

    &__label {
      &:not(:last-of-type) {
        margin-right: 2rem;
      }

      .text-h2 {
        margin-bottom: 0.5rem;
      }
    }

    &__text {
      margin-bottom: 2rem;
    }

    .dropdown__plus {
      flex-direction: column;
    }

    &__project {
      --contest-projects-img-size: 16.5rem;

      display: flex;
      flex-direction: column;
      background-color: $COLOR_SMOKE;
      border-radius: 3rem;
      padding: 2rem 2.5rem 2.5rem;
      &:first-of-type {
        margin-top: 3rem;
      }
      &:not(:last-of-type) {
        margin-bottom: 1.5rem;
      }
      img {
        @include square(var(--contest-projects-img-size));
        border-radius: 1.5rem;
        margin-bottom: 1.5rem;
      }
      &-text {
        height: var(--contest-projects-img-size);
        display: flex;
        flex-direction: column;
        a {
          display: block;
          margin-top: auto;
          text-decoration: underline;
          text-underline-offset: 0.5rem;
        }
      }
      &-place {
        color: $COLOR_GREY-BLUE;
        margin-bottom: 1rem;
      }
      &-title {
        margin-bottom: 1.5rem;
      }
    }
  }

  &-conditions {
    &__requirements {
      margin-bottom: 10rem;

      h2.text-h1 {
        margin-bottom: 4rem;
      }
      ul {
        li {
          position: relative;
          padding-left: 6rem;
          &::before {
            @include square(4.5rem);
            border-radius: 50%;
            content: '';
            position: absolute;
            z-index: -1;
            left: 0;
            top: 0;
            background-color: $COLOR_YELLOW;
            filter: blur(1rem);
          }
          &::after {
            @include text-h1;
            content: attr(data-num);
            position: absolute;
            left: 2.25rem;
            top: 2.25rem;
            transform: translateX(-50%) translateY(-50%);
          }
          &:not(:last-of-type) {
            margin-bottom: 3rem;
          }
        }
      }
    }
    &__projects {
      position: relative;
      padding: 6rem 0 9rem;
      &.row {
        margin: 0 var(--row-margin) 10rem;
      }
      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: -0.8rem;
        right: -0.8rem;
        background-color: $COLOR_YELLOW;
        filter: blur(1rem);
      }
      & > .col-6:first-of-type {
        padding-bottom: 4rem;
        border-bottom: $BORDER_DEFAULT;
        margin-bottom: 4rem;
      }
      h2.text-h1 {
        margin-bottom: 3rem;
      }
      svg {
        color: $COLOR_BLACK-BLUE;
        width: 4.5rem;
        margin-bottom: 3rem;
      }
    }
    &__stages {
      margin-bottom: 10rem;
      h2.text-h1 {
        margin-bottom: 4rem;
      }

      ul {
        margin-bottom: 4rem;
        li {
          padding-left: 6rem;
          position: relative;
          &::before {
            @include text-h1;
            content: attr(data-num);
            position: absolute;
            left: 0;
            width: 3rem;
            text-align: center;
          }

          .date {
            margin-top: 1rem;
            color: $COLOR_GREY-BLUE;
          }
          &:not(:last-of-type) {
            margin-bottom: 3rem;
          }
        }
      }

      button {
        width: 100%;
        height: 6rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2rem;
        border: $BORDER_DEFAULT;
        svg {
          width: 2.5rem;
        }
      }
    }
  }

  @include tablet {
    .page-with-id-title {
      --page-with-id-title-margin-bott: 0;
      h1.text-h1 {
        width: 40.5rem;
      }
      &__main {
        margin-bottom: 1.4rem;
      }
    }

    &-directions {
      margin-bottom: 13.5rem;
    }
    &-article {
      position: relative;
      display: grid;
      grid-template-areas:
        'title labels'
        'title article-text'
        'projects projects';
      grid-template-columns: 20.4rem 1fr;
      column-gap: 4rem;

      &__title {
        grid-area: title;
        margin-bottom: 0;
      }
      &__labels {
        grid-area: labels;
      }
      &__text {
        grid-area: article-text;
      }
      .dropdown__plus {
        grid-area: projects;
        .dropdown__title {
          position: absolute;
          top: 0;
          right: 1.25rem;
        }
      }

      &__project {
        --contest-projects-img-size: 21rem;

        flex-direction: row-reverse;
        padding: 3.5rem 4rem 4rem;

        img {
          margin-left: 4rem;
          margin-bottom: 0;
        }
      }
    }

    &-conditions {
      width: 100%;
      &__requirements {
        display: flex;
        justify-content: space-between;

        h2.text-h1 {
          width: 33.33%;
        }

        ul {
          width: 55%;
        }
      }

      &__projects {
        padding: 6rem 0;
        &::before {
          left: -1.6rem;
          right: -1.6rem;
        }
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          width: 0.2rem;
          height: 30.5rem;
          background-color: $COLOR_BLACK-BLUE;
        }
        & > .col-6:first-of-type {
          padding-bottom: 0;
          border-bottom: none;
          margin-bottom: 0;
        }
      }
    }
  }

  @include large-desktop {
    .page-with-id-title {
      --page-with-id-header-padding: 5.4rem 16.4rem 0 5rem;
      h1.text-h1 {
        width: 80rem;
      }

      &__main {
        margin-bottom: 5.5rem;
      }

      .contest__title-desc {
        position: relative;
        top: 4rem;
      }
    }

    &-directions {
      margin-bottom: 20rem;
      h2.text-h1 {
        margin-bottom: 7rem;
      }
    }

    &-article {
      grid-template-areas:
        'title labels'
        'title article-text'
        'title projects';
      grid-template-columns: 30.6rem 1fr;
      column-gap: 15.5rem;
      padding-bottom: 5rem;
      &:not(:last-of-type) {
        margin-bottom: 5rem;
      }
    }

    &-conditions {
      &__requirements {
        margin-bottom: 22rem;
        ul {
          li {
            padding-left: 8rem;
            &::before {
              @include square(5rem);
            }
            &::after {
              @include text-h3;
              left: 2.5rem;
              top: 2.5rem;
            }
          }
        }
      }

      &__projects {
        border-left: $BORDER_DEFAULT;
        border-right: $BORDER_DEFAULT;
        &.row {
          margin: 0 var(--row-margin) 22rem;
        }
        &::before {
          left: 0;
          right: 50%;
        }
        &::after {
          top: 0;
          height: 100%;
        }

        .col-t-3 {
          & > * {
            max-width: 66.67%;
            margin: 0 auto;
          }
          svg {
            margin-left: calc(33.33% / 2);
            margin-bottom: 3rem;
          }
        }

        h2.text-h2 {
          margin-bottom: 4rem;
        }
      }

      &__stages {
        margin-bottom: 18rem;
        h2.text-h1 {
          width: 50%;
        }

        ul {
          li {
            &::before {
              @include text-h3;
            }
            &:not(:last-of-type) {
              margin-bottom: 6rem;
            }
          }
        }
      }
    }
  }
}
</style>
