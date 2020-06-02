<template>
  <nav class="nav" :class="[alignment]">
    <ul class="parent">
      <li :key="index" class="primary" v-for="(item, index) in menu">
        <template v-if="item.type === 'shallow'">
          <router-link class="anchor" :to="item.to">
            {{ item.name }}
          </router-link>
        </template>
        <template v-if="item.type === 'deep'">
          <a href="#" class="anchor">{{ item.name }}</a>
          <div class="child">
            <div class="submenu-wrapper" :class="{'»extended': extended}">
              <ul class="submenu">
                <li :key="`sub-${index}`" v-for="(subitem, index) in item.menu" class="secondary">
                  <router-link class="anchor" :to="subitem.to">
                    {{ subitem.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-if="item.type === 'button'">
          <LinkPrimary classes="small" :to="item.to">{{ item.name }}</LinkPrimary>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script>
import LinkPrimary from '@/components/atoms/LinkPrimary'

export default {
  name: 'components-molecules-navigation',
  props: ['alignment', 'menu', 'extended'],
  components: { LinkPrimary }
}
</script>

<style lang="scss" scoped>
  .nav {
    color: $BLUEGREY;
    font-weight: 500;
    font-size: 15px;
  }

  .parent {
    @include Flex ($justify: flex-end);

    .»center & {
      justify-content: center;
    }
  }

  .primary {
    position: relative;

    &:not(:last-child) {
      margin-right: grid(3);

      @include mq ($until: medium) {
        margin-right: grid(2);
      }
    }
  }

  .anchor {
    @include ButtonSimple;
  }

  .child {
    display: none;
    right: 0;
    padding-top: grid(12);
    position: absolute;
    top: 100%;

    .primary:hover & {
      display: block;
    }
  }

  .submenu-wrapper {
    @include Shadow;
    background: $WHITE;
    border-radius: grid(1);
    padding: grid(3) 0;
    position: relative;
    width: 200px;

    &.»extended {
      width: 300px;
    }

    &:before {
      content: ' ';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 10px 10px 10px;
      border-color: transparent transparent $WHITE transparent;
      position: absolute;
      right: grid(3);
      bottom: 100%;
    }
  }

  .submenu {
    max-height: 275px;
    overflow: auto;
    padding: 0 grid(3);
    scrollbar-width: thin;
    scrollbar-color: $GREY5 $GREY3;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: $GREY3;
      border-radius: grid(4);
    }

    &::-webkit-scrollbar-thumb {
      background: $GREY5;
      border-radius: grid(4);
    }
  }

  .secondary {
    &:not(:last-child) {
      margin-bottom: grid(1);
    }

    a {
      display: block;
      padding: grid(2);

      &:hover {
        background: $BLUE2;
        border-radius: grid(1);
        color: $WHITE;
      }
    }
  }
</style>
