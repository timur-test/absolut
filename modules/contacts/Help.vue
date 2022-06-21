<template>
  <div class="help">
    <div class="container">
      <div class="row">
        <div class="col-6 col-d-12">
          <h2 class="text-h1 title">{{ title }}</h2>
        </div>
        <div class="col-6 col-t-6 col-d-8">
          <img :src="img" :alt="title" class="help__img" />
        </div>
        <div class="col-6 col-t-6 col-d-4">
          <div class="help-right">
            <p class="description" :class="isDesktop ? 'text-h3' : 'text-p1'">
              {{ description }}
            </p>
            <a class="help-btn" :href="link.href"
              ><span class="help-btn__text">{{ link.text }}</span>
              <span class="arrow-long">
                <inline-svg
                  :src="$getDefault('img', 'DEFAULT_ICON_ARROW_LINK')"
                /> </span
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContactsHelp',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    link: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['isDesktop']),
  },
}
</script>

<style lang="scss" scoped>
.help {
  margin-top: 7.5rem;
  margin-bottom: 10rem;
  &__img {
    margin-bottom: 3rem;
    border-radius: 30px;
  }
  .title {
    margin-bottom: 3rem;
  }
  .description {
    margin-bottom: 3rem;
  }
  .help-btn {
    position: relative;
    width: 100%;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0rem 2rem;
    border: $BORDER_DEFAULT;
    transition: all 0.3s ease-in-out;
    color: $COLOR_BLACK-BLUE;
    &:hover {
      background: $COLOR_YELLOW;
      border-color: $COLOR_YELLOW;
      .help-btn__text {
        background: $COLOR_YELLOW;
      }
    }
    &__text {
      font-size: 1.6rem;
      line-height: 2rem;
      position: absolute;
      padding-right: 1rem;
      top: 1.7rem;
      left: 2rem;
      background: #fff;
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }
  }
  .arrow-long {
    @include flex-center;
    width: 60%;
    height: 100%;
    justify-content: flex-end;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0.2rem;
      width: calc(100% - 1rem);
      height: 2px;
      background-color: $COLOR_BLACK-BLUE;
    }
    svg {
      height: 1.6rem;
      color: $COLOR_BLACK-BLUE;
    }
  }
  @include tablet {
    margin-top: 8rem;
    &__img {
      margin-bottom: 5rem;
    }
    .help-btn {
      height: 6rem;
      padding: 0rem 2rem;
      max-width: 32.4rem;
    }
    .help-right {
      display: flex;
      justify-content: space-between;
    }
    .title {
      margin-bottom: 4rem;
    }
    .description {
      margin-bottom: 0;
      max-width: 24rem;
      margin-right: 12rem;
    }
  }
  @include desktop {
    .description {
      margin-bottom: 0;
      max-width: 34rem;
      margin-right: 12rem;
    }
  }
  @include large-desktop {
    margin-top: 16rem;
    margin-bottom: 20rem;
    &__img {
      margin-bottom: 0;
      border-radius: 40px;
    }
    .help-btn {
      height: 9rem;
      padding: 0rem 4rem;
      max-width: 100%;
      &__text {
        top: 2.7rem;
        left: 4rem;
        font-size: 2.6rem;
        line-height: 3rem;
      }
    }
    .help-right {
      flex-direction: column;
      align-items: center;
      height: 100%;
    }
    .title {
      margin-bottom: 6rem;
    }
    .description {
      max-width: 100%;
      margin-right: 0;
    }
  }
}
</style>
