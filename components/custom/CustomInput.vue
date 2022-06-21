<template>
  <div class="custom-input">
    <label class="text-h3" :for="'input' + name"> {{ name }} </label>
    <input class="text-p1" :name="'input' + name" :type="type" required />
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    name: {
      type: String,
      default: 'default',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
}
</script>

<style lang="scss">
.custom-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  label.text-h3 {
    color: $COLOR_GREY-BLUE;
    margin-bottom: 1rem;
  }

  input {
    max-height: 7rem;
    padding: 2rem 3rem;
    border: 0.2rem solid $COLOR_GREY;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type='number'] {
      -moz-appearance: textfield;
    }

    &:focus:invalid {
      border-color: red;
    }
  }
}
</style>
