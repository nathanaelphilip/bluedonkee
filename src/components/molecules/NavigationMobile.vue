<template>
  <nav class="nav">
    <router-link class="anchor-large" :to="{name: 'postJob'}">
      <div>
        <h3 class="heading »alt">Post Job</h3>
        Save Democracy. <strong>Its 100% Free</strong>
      </div>
      <IconChevronRight class="icon-right" width="6" height="10" />
    </router-link>
    <div class="group">
      <h3 class="heading">
        Get Involved
      </h3>
      <router-link class="anchor" :to="{ name: 'jobs' }">
        Jobs
        <IconChevronRight class="icon-right" width="6" height="10" />
      </router-link>
      <router-link class="anchor" :to="{ name: 'groups' }">
        Groups
        <IconChevronRight class="icon-right" width="6" height="10" />
      </router-link>
      <router-link class="anchor" :to="{ name: 'campaigns' }">
        Campaigns
        <IconChevronRight class="icon-right" width="6" height="10" />
      </router-link>
    </div>
    <div class="group">
      <h3 class="heading">
        Learn More
      </h3>
      <router-link class="anchor" :to="{ name: 'about' }">
        About Us
        <IconChevronRight class="icon-right" width="6" height="10" />
      </router-link>
      <router-link class="anchor" :to="{ name: 'questions' }">
        Questions
        <IconChevronRight class="icon-right" width="6" height="10" />
      </router-link>
      <router-link class="anchor" :to="{ name: 'contact' }">
        Contact Us
        <IconChevronRight class="icon-right" width="6" height="10" />
      </router-link>
    </div>
    <a href="#" class="anchor-large">
      <h3 class="heading »alt">Follow on Twitter</h3>
      <IconChevronRight class="icon-right" width="6" height="10" />
    </a>
  </nav>
</template>

<script>
import IconChevronRight from '@/components/icons/ChevronRight'

export default {
  name: 'components-molecules-navigation',
  components: { IconChevronRight }
}
</script>

<style lang="scss" scoped>
  .nav {
    background: $WHITE;
    height: 100vh;
    height: calc(100vh - 73px);
    left: 0;
    overflow: auto;
    padding: grid(4) grid(6);
    position: absolute;
    top: 100%;
    transform: translateY(1px);
    width: 100%;
  }

  strong {
    font-weight: 800;
  }

  .heading {
    margin-bottom: grid(3);
    padding: 0 grid(5);
    font-size: 19px;
    font-weight: 700;

    @include mq ($until: xxsmall) {
      font-size: 17px;
      margin-bottom: grid(1);
      padding: 0 grid(4);
    }

    &.»alt {
      margin: 0 0 2px 0;
      padding: 0;
    }
  }

  .anchor-large {
    @include Flex;
    background: rgba($BLUE2, .1);
    border-radius: grid(2);
    padding: grid(5);

    &:not(:last-child) {
      margin-bottom: grid(6);
    }

    @include mq ($until: xxsmall) {
      margin-bottom: grid(4);
      padding: grid(4);
    }
  }

  .icon-right {
    fill: #A0AEC0;
  }

  .group {
    margin-bottom: grid(3);
  }

  .anchor {
    @include Flex;
    border-radius: grid(2);
    font-size: 17px;
    padding: grid(5);

    @include mq ($until: xxsmall) {
      padding: grid(4);
    }

    &:hover, &.router-link-active {
      background: $BLUELIGHT;
    }
  }
</style>
