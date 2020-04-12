<template>
  <nav class="nav">
    <ul class="parent">
      <li class="top">
        <router-link class="anchor" :to="{ name: 'jobs' }">
          Jobs
        </router-link>
      </li>
      <li class="top">
        <router-link class="anchor" :to="{ name: 'groups' }">
          Groups
        </router-link>
      </li>
      <li class="top">
        <router-link class="anchor" :to="{ name: 'campaigns' }">
          Campaigns
        </router-link>
      </li>
      <li class="top">
        <a href="#">More</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'components-molecules-navigation'
}
</script>

<style lang="scss" scoped>
  .nav {}

  .parent {
    @include Flex ($justify: flex-end);
  }
</style>
