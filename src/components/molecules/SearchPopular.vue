<template>
  <section class="search-results">
    <header class="header">
      <h3 class="heading">Popular</h3>
    </header>
  </section>
</template>

<script>
import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

export default {
}
</script>

<style lang="scss" scoped>
  .header {
    @include Flex;
    margin-bottom: grid(3);
  }

  .heading {
    color: $BLACK;
    font-size: 18px;
    font-weight: 800;
  }
</style>
