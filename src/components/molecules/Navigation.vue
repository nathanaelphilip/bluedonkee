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
      <li class="top">
        <LinkPrimary classes="small" :to="{name: 'postJob'}">Post Job</LinkPrimary>
      </li>
    </ul>
  </nav>
</template>

<script>
import LinkPrimary from '@/components/atoms/LinkPrimary'

export default {
  name: 'components-molecules-navigation',
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
  }

  .top {
    &:not(:last-child) {
      margin-right: grid(3);
    }
  }

  .anchor {
    @include ButtonSimple;
  }
</style>
