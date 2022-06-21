<template>
  <section class="school-individual">
    <div class="row">
      <h2 class="text-h1 col-6 col-d-6">
        {{ title }}
      </h2>
      <p class="school-individual__subtitle text-p1 col-6 col-d-6">
        {{ text }}
      </p>
    </div>
    <div
      v-for="(item, i) in items"
      :key="item.title"
      class="school-individual__item"
    >
      <transition name="fade">
        <img
          v-show="isVisible(i)"
          :src="storageUrl + item.img"
          :alt="item.text"
        />
      </transition>
      <button @mouseenter="visibleIdx = i" @mouseleave="visibleIdx = 0">
        <inline-svg :src="storageUrl + item.icon" />
        <p class="text-p1">{{ item.text }}</p>
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SchoolIndividual',
  inject: ['storageUrl'],
  props: {
    title: {
      type: String,
      default: 'заголовок не получен',
    },
    text: {
      type: String,
      default: 'текст не получен',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visibleIdx: 0,
    }
  },
  computed: {
    ...mapGetters(['isMobile']),
  },
  methods: {
    isVisible(idx) {
      if (this.isMobile) return true
      else return idx === this.visibleIdx
    },
  },
}
</script>

<style lang="scss">
.school-individual {
  --school-individual-img-size: 16.5rem;

  .fade-enter-active,
  .fade-leave-active {
    @include transition(opacity);
    transition-duration: 600ms;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  h2.text-h1 {
    margin-bottom: 3rem;
  }
  .row {
    margin-bottom: 4rem;
  }
  &__item {
    display: flex;
    border-top: $BORDER_DEFAULT;
    padding-top: 2.5rem;
    margin-bottom: 2.5rem;
    img {
      @include square(var(--school-individual-img-size));
      border-radius: 2rem;
      margin-right: 2.5rem;
    }
    svg {
      color: $COLOR_BLACK-BLUE;
      width: 3.5rem;
      margin-bottom: 2rem;
    }
    button {
      display: flex;
      flex-direction: column;
      text-align: left;
    }
  }

  @include tablet {
    --school-individual-img-size: 32.5rem;

    position: relative;
    .row {
      margin-bottom: 6rem;
    }
    &__item {
      border-top: none;
      padding-top: 0;
      padding-left: 41rem;
      margin-bottom: 3rem;
      img {
        position: absolute;
        top: 20rem;
        left: 0;
      }
      button {
        flex-direction: row;
        &:hover {
          svg {
            color: $COLOR_BLACK-BLUE;
          }
          .text-p1 {
            color: $COLOR_BLACK-BLUE;
          }
        }
        svg {
          color: $COLOR_GREY-BLUE;
          margin-right: 4rem;
        }
        .text-p1 {
          color: $COLOR_GREY-BLUE;
          max-width: 18rem;
        }
      }
    }
  }

  @include large-desktop {
    --school-individual-img-size: 54rem;

    h2.text-h1 {
      margin-bottom: 0;
    }
    .row {
      margin-bottom: 12rem;
    }
    &__item {
      padding-left: 69.5rem;
      img {
        top: 27rem;
      }
    }
  }
}
</style>
