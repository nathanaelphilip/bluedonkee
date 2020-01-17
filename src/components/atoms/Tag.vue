<template>
  <router-link
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
    border: 1px solid $GREY;
    border-radius: 4px;
    display: block;
    font-size: 13px;
    text-transform: lowercase;
    padding: 8.5px 15px;
  }
</style>
