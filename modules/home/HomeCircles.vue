<template>
  <div ref="circles" class="circles">
    <div v-for="(circle, i) in items" :key="$keyGen(i)" class="circle">
      <span class="text-h1">{{ circle.count }}</span>
      <span class="text-p1">{{ circle.text }}</span>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
  name: 'HomeCircles',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      circlesInCenter: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollInCircles)
  },
  methods: {
    scrollInCircles: debounce(function () {
      this.getCirclesInCenter()
    }, 10),
    getCirclesInCenter() {
      const rect = this.$refs.circles?.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      if (rect && rect.top < 0) return

      this.circlesInCenter =
        rect?.top <= viewportCenter &&
        rect?.bottom >= viewportCenter - rect?.height / 2

      const circles = this.$el.querySelectorAll('.circle')

      if (this.circlesInCenter) {
        circles.forEach((el) => el.classList.add('hover'))
      } else {
        circles.forEach((el) => el.classList.remove('hover'))
      }
    },
  },
}
</script>

<style lang="scss">
.circles {
  @include flex-center;
  flex-wrap: wrap;
  justify-content: center;

  .circle {
    --circle-margin: 0.8rem;
    --circle-radius: calc(50% - calc(var(--circle-margin) * 2));

    @include square(var(--circle-radius));
    @include blur-border;
    border-radius: 50%;
    flex-direction: column;
    margin: 0 var(--circle-margin);

    &.hover {
      &:nth-child(1) {
        &::after {
          transition-duration: 300ms;
        }
      }
      &:nth-child(2) {
        &::after {
          transition-delay: 300ms;
          transition-duration: 300ms;
        }
      }
      &:nth-child(3) {
        &::after {
          transition-delay: 600ms;
          transition-duration: 300ms;
        }
      }
    }

    .text-p1 {
      word-spacing: 100vw;
      text-align: center;
    }
  }

  @include tablet {
    --circle-margin: 2rem;

    width: 100%;
    justify-content: space-between;

    .circle {
      --circle-margin: 1rem;
      --circle-radius: calc(33.33% - calc(var(--circle-margin) * 2));
    }
  }

  @include large-desktop {
    .circle {
      --circle-margin: 2rem;
      --blur: 0.6rem;
      --blur-border-width: 3.2rem;
    }
  }
}
</style>
