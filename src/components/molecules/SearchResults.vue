<template>
  <section>
    <header class="header">
      <h3 class="heading">{{ heading }}</h3>
      <router-link
        @click.native="$event.stopImmediatePropagation(); $emit('close')"
        class="link"
        :to="{ name: 'search', params: {
          type
        }}"
        >See All</router-link>
    </header>
    <ul class="list">
      <li v-for="result in results" :key="result.id">
        <SearchResultMini :type="type" :result="result" />
      </li>
    </ul>
  </section>
</template>

<script>
import SearchResultMini from '@/components/molecules/SearchResultMini'

export default {
  props: ['heading', 'results', 'type'],
  components: { SearchResultMini }
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

  .link {
    color: $BLUEGREY;
    font-size: 15px;
  }
</style>
