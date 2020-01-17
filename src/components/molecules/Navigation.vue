<template>
  <nav class="nav">
    <router-link class="anchor" :to="{ name: 'jobs' }">Jobs</router-link>
    <router-link class="anchor" :to="{ name: 'groups' }">Groups</router-link>
  </nav>
</template>

<script>
export default {
  names: 'components-molecules-navigation'
}
</script>

<style lang="scss" scoped>
  .nav {
    display: flex;
    font-size: 20px;
    flex-direction: column
  }

  .anchor {
    border-radius: 30px;
    color: inherit;
    padding: 15px 20px;
    text-decoration: none;

    &.router-link-exact-active {
      background: #F7FAFC;
    }
  }
</style>
