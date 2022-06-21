<template>
  <main id="home" class="home">
    <div class="video" @mousemove="moveRay">
      <video
        ref="video"
        :src="$getDefault('img', 'DEFAULT_HOME_VIDEO')"
        :poster="$getDefault('img', 'DEFAULT_HOME_POSTER')"
        type="video/mp4"
        preload="auto"
        muted="muted"
        playsinline
        @mousemove="play"
        @mouseleave="pause"
        @touchstart="togglePlayPause"
      />

      <div class="ray" :style="{ transform: `rotate(-${rayDeg}deg)` }" />
    </div>
    <div class="wrapper">
      <div class="container">
        <!-- h1 ??? -->
        <div
          ref="homeTitle"
          class="home__title text-h1"
          v-html="locale.mainText"
        />
        <!--  -->
        <HomeCircles :items="locale.details" />
        <Grant
          :items="[
            {
              img: locale.grant.img,
              title: locale.grant.title,
              link: locale.grant.link,
              requests: locale.grant.requests,
            },
          ]"
        />
        <Assistance
          :title="locale.assistance.title"
          :items="locale.assistance.items"
        />
        <Comment
          :text="locale.comment.text"
          :name="locale.comment.name"
          :position="locale.comment.position"
        >
          <template #image>
            <img
              :src="storageUrl + locale.comment.img"
              :alt="locale.comment.name"
            />
          </template>
        </Comment>
        <HomeDirections
          :title="locale.directions.title"
          :items="locale.directions.items"
        />
        <HomeNews
          :title="locale.news.title"
          :link="locale.news.link"
          :items="locale.news.items"
        />
        <HomeSupportedProjects
          :title="locale.projects.title"
          :link="locale.projects.link"
          :items="locale.projects.items"
        />
        <HomeReport
          :title="locale.report.title"
          :text="locale.report.text"
          :img="locale.report.img"
        />
        <HomeThankPartners
          :title="locale.thanks.title"
          :links="locale.thanks.links"
          :description="locale.thanks.description"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import Assistance from '~/components/blocks/Assistance.vue'
import Comment from '~/components/blocks/Comment.vue'
import Grant from '~/components/blocks/Grant.vue'

import HomeCircles from '~/modules/home/HomeCircles.vue'
import HomeDirections from '~/modules/home/HomeDirections.vue'
import HomeNews from '~/modules/home/HomeNews.vue'
import HomeSupportedProjects from '~/modules/home/HomeSupportedProjects.vue'
import HomeReport from '~/modules/home/HomeReport.vue'
import HomeThankPartners from '~/modules/home/HomeThankPartners.vue'

export default {
  name: 'Main',
  components: {
    HomeCircles,
    Grant,
    Assistance,
    Comment,
    HomeDirections,
    HomeNews,
    HomeSupportedProjects,
    HomeReport,
    HomeThankPartners,
  },
  inject: ['storageUrl'],
  layout: 'home',
  async asyncData(ctx) {
    try {
      const request = await ctx.$api.pages.getMainPage()
      const response = await request.data
      return { response }
    } catch (e) {
      ctx.error(e)
    }
  },
  data() {
    return {
      rayDeg: 40,
    }
  },
  computed: {
    ...mapState(['scrollTop', 'lang']),
    ...mapGetters(['isDesktop']),
    locale() {
      return this.response[this.lang]
    },
  },
  mounted() {
    const links = this.$refs.homeTitle?.querySelectorAll('a')
    links.forEach((el) => {
      const arrow = document.createElement('img')
      arrow.setAttribute('src', 'img/svg/icon/arrow-link-color.svg')
      this.insertAfter(arrow, el)
    })
  },
  methods: {
    moveRay(e) {
      const x = e.pageX
      const y = e.pageY
      if (x && y) this.rayDeg = (90 * Math.atan2(x, y)) / Math.PI
    },
    play() {
      this.$refs.video?.play()
    },
    pause() {
      this.$refs.video?.pause()
    },
    togglePlayPause() {
      this.$refs.video.paused ? this.play() : this.pause()
    },
    insertAfter(newNode, existingNode) {
      existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling)
    },
  },
}
</script>

<style lang="scss">
.home {
  --ray-top: calc(-75rem / 2);
  --ray-height: 150rem;

  --wrapper-border-radius: 2rem 2rem 0 0;
  --wrapper-padding: 2rem 0 0;

  --home-margin-bott: 8rem;

  .video {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: url('/img/header-bg.webp') center / cover no-repeat;
    video {
      width: 100%;
      height: inherit;
      object-fit: cover;
    }
  }
  .ray {
    position: absolute;
    left: 0;
    top: calc(-75rem / 2);
    height: 150rem;
    box-shadow: 0 0 11rem 11rem $COLOR_YELLOW;
    transform-origin: 0 0;
    transition: transform 25ms linear;
    background: $COLOR_YELLOW;
    opacity: 0.6;
  }

  .wrapper {
    position: relative;
    top: var(--content-top);
    background-color: white;
    border-radius: var(--wrapper-border-radius);
    padding: var(--wrapper-padding);
  }

  .home {
    &__title {
      margin-bottom: var(--home-margin-bott);
      a {
        @include link-bottom-border;
      }
      img {
        position: relative;
        width: 4.3rem;
        margin-left: 1rem;
      }
    }
  }
  .circles,
  .grant,
  .assistance,
  .comment,
  .news,
  .supported-projects {
    margin-bottom: var(--home-margin-bott);
  }
  .grant {
    .custom-note {
      .note__content {
        max-width: 28rem;
      }
    }
  }
  .directions {
    margin-bottom: 9rem;
  }
  .report {
    margin-bottom: 7rem;
  }

  @include tablet {
    --ray-top: calc(-100rem / 2);
    --ray-height: 200rem;

    --wrapper-border-radius: 4rem 4rem 0 0;
    --wrapper-padding: 6rem 0 0;

    --home-margin-bott: 10rem;
  }
  @include large-desktop {
    --ray-top: calc(-150rem / 2);
    --ray-height: 300rem;

    --wrapper-border-radius: 8rem 8rem 0 0;
    --wrapper-padding: 5.5rem 0 0;

    --home-margin-bott: 14.4rem;

    .home {
      &__title {
        img {
          width: 7rem;
          margin-left: 2rem;
        }
      }
    }

    .circles,
    .grant,
    .comment {
      margin-bottom: 18rem;
    }

    .assistance {
      margin-bottom: 20rem;
    }

    .supported-projects {
      margin-bottom: 21rem;
    }
    .grant {
      .custom-note {
        .note__content {
          max-width: 32rem;
        }
      }
    }
  }
}
</style>
