<template>
  <nav class="nav">
    <router-link class="anchor" :to="{ name: 'jobs' }"><IconJobs class="icon" width="32" height="35" /> Jobs</router-link>
    <router-link class="anchor" :to="{ name: 'groups' }">Groups</router-link>
    <router-link class="anchor" :to="{ name: 'campaigns' }">Campaigns</router-link>
  </nav>
</template>

<script>
import IconJobs from '@/components/icons/Jobs'

export default {
  name: 'components-molecules-navigation',
  components: { IconJobs }
}
</script>

<style lang="scss" scoped>
  .nav {
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-weight: 800;
    max-width: 200px;
    margin-left: -20px;
  }

  .anchor {
    align-items: center;
    display: flex;
    border-radius: 30px;
    color: inherit;
    justify-content: flex-start;
    padding: 13px 20px;
    text-decoration: none;

    &:hover,
    &.router-link-exact-active {
      background: #F7FAFC;
    }

    .icon {
      margin-right: 10px;
    }
  }
</style>
