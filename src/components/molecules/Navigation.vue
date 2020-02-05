<template>
  <nav class="nav">
    <router-link exact class="anchor" :to="{ name: 'jobs' }">
      <IconJobs class="icon" width="36" height="27" /><span class="text">Jobs</span>
    </router-link>
    <router-link exact class="anchor" :to="{ name: 'groups' }">
      <IconGroups class="icon" width="36" height="36" /><span class="text">Groups</span>
    </router-link>
    <router-link exact class="anchor" :to="{ name: 'campaigns' }">
      <IconCampaigns class="icon" width="36" height="38" /><span class="text">Campaigns</span>
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

    @include mq($from: small) {
      font-size: 20px;
      font-weight: 800;
      max-width: 200px;
      margin-left: -20px;
    }

    @include mq($until: small) {
      align-items: center;
    }

     @include mq($from: xsmall) {
       flex-direction: column;
     }

    @include mq($until: xsmall) {
      background: $WHITE;
      left: 0;
      bottom: 0;
      padding: 12px 0;
      position: fixed;
      justify-content: space-around;
      width: 100%;
      z-index: 10;
    }
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

    @include mq($until: small) {
      justify-content: center;
      padding: 0;
      width: 60px;
    }

    &:not(:last-child) {
      @include mq($from: xsmall) {
        margin-bottom: 12px;
      }
    }

    &:hover,
    &.router-link-exact-active {
      background: #F7FAFC;

     ::v-deep .icon .st1 {fill: #3182ce;}
     ::v-deep .icon .st0 {fill: #90cdf4;}
    }

    .icon {
      @include mq($from: small) {
        margin-right: 16px;
      }
    }

    .text {
      @include mq($until: small) {
       display: none;
      }
    }
  }
</style>
