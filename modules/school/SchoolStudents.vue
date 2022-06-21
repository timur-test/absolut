<template>
  <section class="school-students">
    <div class="row">
      <h2 class="text-h1 col-6 col-t-3">{{ title }}</h2>
      <div class="col-6 col-t-3">
        <ul>
          <li v-for="(item, i) in desc" :key="$keyGen(i)" class="text-p1">
            {{ item }}
          </li>
        </ul>
        <div class="school-students__items">
          <div
            v-for="(item, i) in items"
            :key="$keyGen(i)"
            class="school-students__item"
          >
            <p class="text-h1">{{ item.num }}</p>
            <p class="text-p1">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SchoolStudents',
  props: {
    title: {
      type: String,
      default: 'заголовок не получен',
    },
    desc: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
.school-students {
  --desc-items-margin-bott: 4rem;
  --desc-item-margin-bott: 1.5rem;

  h2.text-h1 {
    margin-bottom: 4rem;
  }
  ul {
    margin-bottom: var(--desc-items-margin-bott);
    li {
      --disc-position-top: 0.7rem;
      @include list-style;
      padding-left: 3.5rem;
      &:not(:last-of-type) {
        margin-bottom: var(--desc-item-margin-bott);
      }
    }
  }
  &__items {
    padding-left: 3.5rem;
  }
  &__item {
    .text-h1 {
      margin-bottom: 1rem;
    }
    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }
  }

  @include large-desktop {
    --desc-items-margin-bott: 8rem;
    --desc-item-margin-bott: 2rem;

    ul {
      margin-top: 1.6rem;
    }

    &__item {
      .text-h1 {
        margin-bottom: 2rem;
      }
      &:not(:last-of-type) {
        margin-bottom: 3rem;
      }
    }
  }
}
</style>
