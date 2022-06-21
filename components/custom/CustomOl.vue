<template>
  <ul class="custom-ol">
    <li
      v-for="(item, i) in items"
      :key="$keyGen(i)"
      :data-letter="$options.cyrillic[i]"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  cyrillic: [
    'а',
    'б',
    'в',
    'г',
    'д',
    'е',
    'ё',
    'ж',
    'з',
    'и',
    'й',
    'к',
    'л',
    'м',
    'н',
    'о',
    'п',
    'р',
    'с',
    'т',
    'у',
    'ф',
    'х',
    'ц',
    'ч',
    'ш',
    'щ',
    'э',
    'ю',
    'я',
  ],
  name: 'CustomOl',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
.custom-ol {
  li {
    padding-left: 2.7rem;
    position: relative;
    &:before {
      content: attr(data-letter) ')';
      position: absolute;
      left: 0;
    }
    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }
  }
}
</style>
