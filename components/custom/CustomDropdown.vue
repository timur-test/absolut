<template>
  <div
    class="dropdown"
    :class="dropdownClass"
    @mouseenter="hover(true)"
    @mouseleave="hover(false)"
  >
    <button
      aria-label="dropdown"
      class="dropdown__title"
      :class="buttonClass"
      @click="toggle"
    >
      <span class="dropdown__title-text">{{ currentTitle }}</span>
      <slot v-if="customIcon" name="icon" />
      <inline-svg v-else :src="$getDefault('img', icon)" />
    </button>
    <vue-slide-toggle
      class="dropdown__items"
      :open="_isOpen"
      :duration="duration"
    >
      <slot></slot>
    </vue-slide-toggle>
  </div>
</template>

<script>
import { VueSlideToggle } from 'vue-slide-toggle'
export default {
  name: 'CustomDropdown',
  components: {
    VueSlideToggle,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    titleOpen: {
      type: String,
      default: '',
    },
    svgClass: {
      type: String,
      default: 'strokeBlackBlue',
    },
    relative: {
      type: Boolean,
      default: false,
    },
    buttonClass: {
      type: String,
      default: 'text-h1',
    },
    self: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'DEFAULT_ICON_ARROW',
    },
    customIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openSelf: false,
      currentTitle: null,
    }
  },
  computed: {
    _title() {
      if (!this.titleOpen) return this.title
      else return this.currentTitle
    },
    _isOpen() {
      if (this.self) return this.openSelf
      else return this.isOpen
    },
    duration() {
      return +this.$styleVar('transitionDuration', 'ms')
    },
    dropdownClass() {
      let result = ''

      if (this._isOpen) result += 'open '
      if (this.relative) result += 'relative '

      return result
    },
  },
  mounted() {
    this.currentTitle = this.title
    document.addEventListener(
      'click',
      this.$notElClickListener(this.$el, this.close),
    )
  },
  beforeDestroy() {
    document.removeEventListener(
      'click',
      this.$notElClickListener(this.$el, this.close),
    )
  },
  methods: {
    close() {
      if (this.self) this.openSelf = false
      if (this.titleOpen) this.currentTitle = this.title
      this.$emit('close')
    },
    open() {
      if (this.self) this.openSelf = true
      if (this.titleOpen) this.currentTitle = this.titleOpen
      this.$emit('open')
    },
    toggle() {
      this._isOpen ? this.close() : this.open()
    },
    hover(status) {
      this.$emit('hover', status)
    },
  },
}
</script>

<style lang="scss">
.dropdown {
  &__title {
    position: relative;
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

  &__items {
    transition-duration: $TRANSITION_DURATION;
  }

  &.open {
    svg {
      transform: rotate(180deg);
    }
  }

  &.relative {
    .dropdown__title {
      position: relative;
    }
    .dropdown__items {
      position: absolute;
    }
  }
}

.dropdown__plus {
  display: flex;
  flex-direction: column-reverse;

  svg {
    width: 2.5rem;
    top: calc(50% - 0.1rem);
    right: -1.25rem;
    &:last-of-type {
      transform: rotate(-90deg);
    }
  }
  .dropdown__title {
    display: block;
    margin-right: auto;
  }
  &.open {
    svg {
      transform: rotate(0deg);
      &:last-of-type {
        transform: rotate(0deg);
      }
    }
  }
}
</style>
