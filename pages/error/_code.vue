<template>
  <div></div>
</template>

<script>
export default {
  beforeMount () {
    const self = this
    class CustomError extends Error {
      constructor(message) {
        super(message);
        this.statusCode = self.$route.params.code;
      }
    }
    throw new CustomError('Error ' + self.$route.params.code)
  }
}
</script>

<style>

</style>

