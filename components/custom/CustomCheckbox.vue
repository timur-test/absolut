<template>
  <div class="custom-checkbox text-p2">
    <input type="checkbox" :id="'checkbox-' + name" required />
    <label :for="'checkbox-' + name" class="custom-checkbox__text">
      <template v-for="(item, i) in text">
        <span :key="$keyGen(i)">{{ item.text }}</span>
        <nuxt-link :key="$keyGen(i)" :to="item.link.href">
          {{ item.link.text }}
        </nuxt-link>
      </template>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CustomCheckbox.vue',
  props: {
    name: {
      type: String,
      default: 'default',
    },
    text: {
      type: Array,
      default: () => {},
    },
  },
}
</script>

<style lang="scss">
.custom-checkbox {
  input[type='checkbox'] {
    display: none;
    & + label {
      display: block;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.5rem;
        width: 2.3rem;
        height: 2.3rem;
        border: $BORDER_DEFAULT;
      }
    }

    &:checked + label {
      &::before {
        background: url('/img/svg/icon/agree.svg') center / 1.4rem no-repeat;
      }
    }
  }

  &__text {
    padding-left: 3.4rem;
  }

  a {
    text-decoration: underline;
    text-underline-offset: 0.5rem;
  }
}
</style>
