<template>
  <div class="container">
    <button @click.prevent="visible = !visible" class="toggle">
      Area of Interest<IconPlus v-if="!$store.getters['filters/count']" :width="10" :height="10" />
    </button>
    <nav
      class="nav"
      :style="{'height': `${$store.state.app.innerHeight}px`}"
      v-if="visible"
      >
      <h3 class="heading">{{ heading }}</h3>
      <ul class="parent">
        <li :key="index" class="primary" v-for="(item, index) in flat">
          <router-link class="anchor" :to="item.to">
            {{ item.name }}
            <IconChevronRight class="icon-right" width="6" height="10" />
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import VueScrollTo from 'vue-scrollto'

import IconChevronRight from '@/components/icons/ChevronRight'
import IconPlus from '@/components/icons/Plus'

export default {
  name: 'components-molecules-navigation',
  props: ['heading', 'menu'],
  components: { IconChevronRight, IconPlus },

  data () {
    return {
      visible: false
    }
  },

  computed: {
    flat () {
      const menu = this.menu
      const tail = menu.pop()

      for (let i = 0; i < tail.menu.length; i++) {
        menu.push(tail.menu[i])
      }

      return menu
    }
  },

  watch: {
    visible (value) {
      if (value === true) {
        VueScrollTo.scrollTo(document.getElementById('sticky-filters'), 500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .toggle {
    @include Flex ($justify: center);
    background: $WHITE;
    border: none;
    border-bottom: 1px solid $GREY;
    font-weight: 500;
    padding: grid(3) 0;
    text-align: center;
    width: 100%;

    svg {
      margin-left: grid(2);
    }
  }

  .heading {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: grid(6);
  }

  .nav {
    background: $WHITE;
    padding: grid(6) grid(6);
    height: 100%;
    overflow: auto;
  }

  .parent {
    @include Flex ($align: stretch, $direction: column);
  }

  .primary {
    &:not(:last-child) {
      margin-bottom: grid(2);
    }
  }

  .anchor {
    @include Flex;
    border-radius: grid(2);
    font-size: 17px;
    padding: grid(5);

    &:hover, &.router-link-active {
      background: $BLUELIGHT;
    }
  }

  .icon-right {
    fill: #A0AEC0;
  }
</style>
