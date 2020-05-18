<template>
  <nav class="nav">
    <ul class="parent">
      <li class="primary">
        <router-link class="anchor" :to="{ name: 'jobs' }">
          Jobs
        </router-link>
      </li>
      <li class="primary">
        <router-link class="anchor" :to="{ name: 'groups' }">
          Groups
        </router-link>
      </li>
      <li class="primary">
        <router-link class="anchor" :to="{ name: 'campaigns' }">
          Campaigns
        </router-link>
      </li>
      <li class="primary">
        <a href="#" class="anchor">More</a>
        <div class="child">
          <ul class="submenu">
            <li class="secondary">
              <router-link class="anchor" :to="{ name: 'about' }">
                About Us
              </router-link>
            </li>
            <li class="secondary">
              <router-link class="anchor" :to="{ name: 'questions' }">
                Questions
              </router-link>
            </li>
            <li class="secondary">
              <router-link class="anchor" :to="{ name: 'contact' }">
                Contact Us
              </router-link>
            </li>
          </ul>
        </div>
      </li>
      <li class="primary">
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

  .primary {
    position: relative;

    &:not(:last-child) {
      margin-right: grid(3);

      @include mq ($until: medium) {
        margin-right: grid(2);
      }
    }
  }

  .anchor {
    @include ButtonSimple;
  }

  .child {
    display: none;
    right: 0;
    padding-top: grid(12);
    position: absolute;
    top: 100%;

    .primary:hover & {
      display: block;
    }
  }

  .submenu {
    @include Shadow;
    background: $WHITE;
    padding: grid(3);
    position: relative;
    width: 200px;

    &:before {
      content: ' ';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 10px 10px 10px;
      border-color: transparent transparent $WHITE transparent;
      position: absolute;
      right: grid(3);
      bottom: 100%;
    }
  }

  .secondary {
    &:not(:last-child) {
      margin-bottom: grid(1);
    }

    a {
      display: block;
      padding: grid(2);

      &:hover {
        background: $BLUE2;
        border-radius: grid(1);
        color: $WHITE;
      }
    }
  }
</style>
