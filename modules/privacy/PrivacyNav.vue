<template>
  <nav class="privacy-nav text-p1">
    <ul v-if="isDesktop" class="privacy-nav__list-desktop">
      <li
        v-for="(item, index) in navList"
        :key="$keyGen(index)"
        class="privacy-nav__item"
      >
        <a
          :href="'#point-' + index"
          :class="{active: index === activeItemIndex}"
          class="text-p2"
          @click.prevent="scrollToAnchor(index)"
        >
          {{item}}
        </a>
      </li>
    </ul>
    <template v-else>
      <div class="privacy-nav__tablet">
        <CustomSelect :title="navList[activeItemIndex]">
          <ul class="privacy-nav__list">
            <li
              v-for="(item, index) in navList"
              :key="$keyGen(index)"
              class="privacy-nav__item"
            >
              <a :href="'#point-' + index" @click.prevent="scrollToAnchor(index)">
                {{item}}
              </a>
            </li>
          </ul>
        </CustomSelect>
      </div>
      <div class="privacy-nav__mobile">
        <button
          class="privacy-nav__current"
          @click="isMobileNavActive = true"
        >{{ navList[activeItemIndex] }}
          <inline-svg :src="$getDefault('img', 'DEFAULT_ICON_ARROW')" />
        </button>
        <PrivacyMobileNav
          :is-active="isMobileNavActive"
          :nav-list="navList"
          @click="scrollToAnchor"
          @close="isMobileNavActive = false"
        />
      </div>
    </template>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomSelect from '~/components/custom/CustomSelect.vue'
import PrivacyMobileNav from '~/modules/privacy/PrivacyMobileNav.vue'

export default {
  name: 'PrivacyNav',
  components: {
    CustomSelect,
    PrivacyMobileNav
  },
  props: {
    navList: {
      type: Array,
      default: () => ([])
    },
    activeItemIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isMobileNavActive: false
    }
  },
  computed: {
    ...mapGetters(['isDesktop'])
  },
  mounted() {
    this.isMobileNavActive = false
  },
  methods: {
    scrollToAnchor(index = this.activeItemIndex) {
      this.$emit('select-click', index)
      this.isMobileNavActive = false
    },
  }
}
</script>

<style lang="scss">

.privacy-nav {
  width: 100%;
  position: relative;

  .custom-select__title {
    @include text-overflow(100%);
    @include text-p1;
  }

  @include tablet {
    margin-top: 1.55rem;
    margin-top: 0;
  }
}
.privacy-nav__item {
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  a {
    color: $COLOR_GREY-BLUE;

    &.active {
      color: $COLOR_BLACK-BLUE;
    }

    &:hover {
      color: $COLOR_BLACK-BLUE;
    }
  }
}
.privacy-nav__list {
  @include dropdown-content;
  width: auto;
}
.privacy-nav__current {
  position: relative;
  padding-top: 1.6rem;
  padding-right: 2.5rem;
  @include text-overflow(27rem);

  svg {
    @include transition(transform);
    position: absolute;
    color: inherit;
    top: calc(50%);
    transform: translateY(50%);
    right: 0;
    width: 1.3rem;
  }
}
.privacy-nav__tablet {
  display: none;

  @include tablet {
    display: block;
  }
  .privacy-nav__item {
    a {
      @include a;
    }
  }

}

.privacy-nav__mobile {
  @include tablet {
    display: none;
  }
}


</style>
