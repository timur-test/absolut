<template>
  <div class="custom-select" :class="{ open: isOpen }">
    <button
      aria-label="select"
      class="custom-select__title"
      :class="buttonClass"
      @click.prevent="toggle"
    >
      {{ title }}
      <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_ARROW')" />
    </button>

    <div class="custom-select__items">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    title: {
      type: String,
      default: 'Сделайте выбор',
    },
    buttonClass: {
      type: String,
      default: 'text-p2',
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  mounted() {
    document.addEventListener(
      'click',
      this.$notElClickListener(this.$el, this.close),
    )
    this.$parent.$on('select-click', this.close)
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    toggle() {
      this.isOpen ? this.close() : this.open()
    },
  },
}
</script>

<style lang="scss">
.custom-select {
  &__title {
    position: relative;
    text-transform: lowercase;
    padding-right: 2.1rem;
    svg {
      @include transition(transform);
      position: absolute;
      color: inherit;
      top: calc(50% - 0.3rem);
      right: 0;
      width: 1.3rem;
    }
  }

  .custom-select__items {
    @include transition(transform);
    transform-origin: top center;
    position: absolute;
    z-index: 98;
    transform: scaleY(0);
    text-transform: lowercase;
  }

  &.open {
    svg {
      transform: rotate(180deg);
    }
    .custom-select__items {
      transform: scaleY(1) translateY(1.5rem);
    }
  }
}
</style>
