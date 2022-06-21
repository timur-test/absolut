<template>
  <a :href="href" class="doc-link" :aria-label="name">
    <div class="doc-link__icon">
      <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_FILE')" />
      <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_FILE_DOWNLOAD')" />
    </div>
    <div class="doc-link__block" :class="textClass">
      <p class="doc-link__title">{{ name }}</p>
      <p class="doc-link__text">{{ type }} - {{ size }}</p>
    </div>
  </a>
</template>

<script>
export default {
  name: 'DocLink',
  props: {
    name: {
      type: String,
      default: 'имя не получено',
    },
    type: {
      type: String,
      default: 'тип файла не получен',
    },
    size: {
      type: [String, Number],
      default: 'вес файла не получен',
    },
    href: {
      type: String,
      default: '#',
    },
    textClass: {
      type: String,
      default: 'text-p1',
    },
  },
}
</script>

<style lang="scss">
.doc-link {
  display: flex;
  &:hover {
    .doc-link__title {
      color: $COLOR_GREY-BLUE;
    }
    .doc-link__icon {
      svg {
        &:nth-child(1) {
          opacity: 0;
          visibility: hidden;
        }
        &:nth-child(2) {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
  &__block {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  &__icon {
    position: relative;
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 2rem;
    flex: none;

    @include tablet {
      margin-right: 2rem;
    }
    @include large_desktop {
      flex: none;
      margin-right: 3rem;
    }
    svg {
      @include transition(all);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &:nth-child(2) {
        rect {
          color: $COLOR_GREY-BLUE;
        }
        path {
          color: $COLOR_GREY-BLUE;
        }
      }
      &:nth-child(2) {
        opacity: 0;
        visibility: hidden;
      }
    }
  }
  &__title {
    display: block;
    transition: all 0.3s ease-in-out;
    color: $COLOR_BLACK-BLUE;
    margin-bottom: 0.5rem;
    @include desktop {
      margin-bottom: 1rem;
    }
  }
  &__text {
    display: block;
    color: $COLOR_GREY-BLUE;
  }
}
</style>
