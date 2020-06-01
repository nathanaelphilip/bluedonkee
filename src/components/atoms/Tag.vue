<template>
  <router-link
    @click.native="$event.stopImmediatePropagation()"
    class="tag"
    :to="{ name: route, params: { slug } }"
  >
     {{ name }}
  </router-link>
</template>

<script>
export default {
  name: 'components-atoms-tag',
  props: ['name', 'route', 'slug']
}
</script>

<style lang="scss" scoped>
  .tag {
    background: $WHITE;
    border: 1px solid $GREY;
    border-radius: 4px;
    display: block;
    font-size: 13px;
    text-transform: lowercase;
    transition: all .4s ease;
    padding: grid(2);

    @include mq ($until: xsmall) {
      font-size: 12px;
      padding: grid(1.5);
    }

    &:hover {
      background: $GREY;
    }
  }
</style>
