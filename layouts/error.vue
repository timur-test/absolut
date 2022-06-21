<template>
  <section class="error">
    <ErrorComponent :error-text="errorText" :status-code="error.statusCode"/>
  </section>
</template>

<script>
import ErrorComponent from '@/modules/error/ErrorComponent.vue'

export default {
  name: 'Error',
  components: {
    ErrorComponent,
  },
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    errorText() {
      if (+this.error.statusCode >= 500) {
        return 'Ошибка 503: на сайте ведутся технические работы'
      }
      if (+this.error.statusCode < 500) {
        return 'Такой страницы не существует, <br> посмотрите вот эти:'
      }
      return 'Произошла ошибка'
    }
  },
}
</script>

<style lang="scss">
  .error {
    position: relative;
    padding: var(--main-padding);
    overflow: hidden;
  }

</style>
