<template>
  <div v-swiper:customSlider="swiperOptions">
    <div class="swiper-wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper'
export default {
  name: 'CustomSlider',
  directives: {
    swiper: directive,
  },
  props: {
    swiperOptions: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.$parent.$on('slideMove', (dir) => {
      dir ? this.next() : this.prev()
    })

    this.customSlider.on('activeIndexChange', (e) => {
      this.$emit('activeIndex', e.activeIndex)
    })
  },
  methods: {
    next() {
      this.customSlider.slideNext()
    },
    prev() {
      this.customSlider.slidePrev()
    },
  },
}
</script>

<style lang="scss">
@import 'swiper/swiper-bundle.css';
</style>
