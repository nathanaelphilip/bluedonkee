<template>
  <nav class="nav">
    <router-link class="anchor" :to="{ name: 'jobs' }">
      <IconJobs class="icon" width="36" height="27" />Jobs
    </router-link>
    <router-link class="anchor" :to="{ name: 'groups' }">
      <IconGroups class="icon" width="36" height="36" />Groups
    </router-link>
    <router-link class="anchor" :to="{ name: 'campaigns' }">
      <IconCampaigns class="icon" width="36" height="38" />Campaigns
    </router-link>
  </nav>
</template>

<script>
import IconCampaigns from '@/components/icons/Campaigns'
import IconGroups from '@/components/icons/Groups'
import IconJobs from '@/components/icons/Jobs'

export default {
  name: 'components-molecules-navigation',
  components: { IconCampaigns, IconGroups, IconJobs }
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
    height: 60px;
    justify-content: flex-start;
    padding: 13px 20px;
    text-decoration: none;

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    &:hover,
    &.router-link-exact-active {
      background: #F7FAFC;

     ::v-deep .icon .st1 {fill: #3182ce;}
     ::v-deep .icon .st0 {fill: #90cdf4;}
    }

    .icon {
      margin-right: 16px;
    }
  }
</style>
