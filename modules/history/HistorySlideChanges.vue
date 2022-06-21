<template>
  <div class="history-slide__changes">
    <div class="history-slide__changes-container">
      <div class="history-slide__img history-slide__img--background" ref="img-wr">
        <img ref="background" :src="images[0]" alt="" />
      </div>
      <div
        ref="foreground"
        class="history-slide__img history-slide__img--foreground"
        :style="{ width: sliderPos + '%' }"
      >
        <img
          :src="images[1]"
          alt=""
          :style="{ width: backgroundWidth + 'px' }"
        />
      </div>
       <input
        id="slider"
        v-model="sliderPos"
        class="history-slide__range"
        type="range"
        min="0"
        max="100"
        name="slider"
        />
      <button
        ref="button"
        type="button"
        class="history-slide__button"
        :style="{ left: `calc(${sliderPos}% - 2rem)` }"
        @touchmove="dragHandler"
        @dragstart="() => false"
      >
        <inline-svg src="img/svg/icon/slider-button.svg" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistorySlideChanges',
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      backgroundWidth: 0,
      sliderPos: 50,
    }
  },
  mounted() {
    if (this.$refs.foreground) {
      window.addEventListener('resize', this.setbackgroundWidth)

      setTimeout(() => {
        this.backgroundWidth = this.$refs?.background?.clientWidth
      }, 200)
    }
  },
  beforeDestroy() {
    if (this.$refs.foreground) {
      window.removeEventListener('resize', this.setbackgroundWidth)
    }
  },
  methods: {
    setbackgroundWidth() {
      this.backgroundWidth = this.$refs?.background?.clientWidth
    },
    dragHandler(e) {

      const imgContainer = this.$refs['img-wr']
      const touchPosition = e.changedTouches[0].clientX
      const progress = Math.round( (touchPosition - imgContainer.getBoundingClientRect().left)  / imgContainer.clientWidth * 100)
      console.log(progress);
      this.sliderPos = progress < 0 ? 0 :
      progress > 100 ? 100 :
      progress
    }
  },
}
</script>

<style lang="scss">
.history-slide__changes {
  position: relative;
  flex: none;
  overflow: hidden;
  margin-bottom: 2rem;

  @include large-desktop {
    margin-bottom: 0;
    margin-right: 4rem;

    .history-slide__img {
      width: 62.8rem;
    }
  }
}
.history-slide__changes-container {
  position: relative;
  overflow: hidden;
  border-radius: 3rem;
  width: 100%;

  @include large-desktop {
    border-radius: 4rem;
    height: 100%;
  }
}
.history-slide__range {
  position: absolute;
  -webkit-appearance: none;
  top: 0;
  left: 0;
  appearance: none;
  width: 100%;
  height: 100%;
  background: transparent;
  outline: none;
  margin: 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1px;
    height: 60rem;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 1px;
    height: 60rem;
    cursor: pointer;
  }
}

.history-slide__button {
  position: absolute;
  border-radius: 50%;
  left: calc(50% - 2rem);
  top: calc(50% - 2rem);
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @include large-desktop {
    pointer-events: none;
  }
}
</style>
