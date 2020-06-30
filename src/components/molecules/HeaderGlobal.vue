<template>
  <header class="header">
    <div class="container">
      <div class="back" v-if="$store.state.app.heading && back">
        <ButtonBack :to="back" v-if="back" />
      </div>
      <div class="logo" v-if="!$store.state.app.heading || !back">
        <router-link :to="{name: 'jobs'}"><Logo /></router-link>
        <Bug>Beta</Bug>
      </div>
      <mq-layout class="search-form" mq="medium+">
        <FormSearch />
      </mq-layout>
      <mq-layout mq="medium+">
        <Navigation :menu="menu" />
      </mq-layout>
      <mq-layout :mq="['xxsmall', 'xsmall', 'small']">
        <div class="alt-menu">
          <LinkPrimary classes="small" :to="{name: 'postJob'}">Post Job</LinkPrimary>
          <ButtonIcon
            class="button-search"
            @click.native.prevent="$store.dispatch('app/mobileSearchToggle', true)"
            >
            <IconSearch :height="16" :width="16" />
          </ButtonIcon>
          <Hamburger @click.native.prevent="close" />
        </div>
      </mq-layout>
    </div>
    <mq-layout v-if="$store.state.app.mobileNavOpen" :mq="['xxsmall', 'xsmall', 'small']">
      <NavigationMobile />
    </mq-layout>
  </header>
</template>

<script>
import Bug from '@/components/atoms/Bug'
import ButtonBack from '@/components/atoms/ButtonBack'
import ButtonIcon from '@/components/atoms/ButtonIcon'
import FormSearch from '@/components/forms/Search'
import Hamburger from '@/components/atoms/Hamburger'
import IconSearch from '@/components/icons/Search'
import LinkPrimary from '@/components/atoms/LinkPrimary'
import Logo from '@/components/atoms/Logo'
import Navigation from '@/components/molecules/Navigation'
import NavigationMobile from '@/components/molecules/NavigationMobile'

export default {
  components: {
    Bug,
    ButtonBack,
    ButtonIcon,
    FormSearch,
    Hamburger,
    IconSearch,
    LinkPrimary,
    Logo,
    Navigation,
    NavigationMobile
  },

  computed: {
    back () {
      if (this.$store.state.breadcrumbs.repository.length) {
        const { name, params } = this.$store.getters['breadcrumbs/current']
        return { name, params }
      }

      return false
    },

    menu () {
      return [{
        type: 'shallow',
        name: 'Jobs',
        to: { name: 'jobs' }
      }, {
        type: 'shallow',
        name: 'Groups',
        to: { name: 'groups' }
      }, {
        type: 'shallow',
        name: 'Campaigns',
        to: { name: 'campaigns' }
      }, {
        type: 'deep',
        name: 'More',
        menu: [{
          name: 'About Us',
          to: { name: 'about' }
        }, {
          name: 'Questions',
          to: { name: 'questions' }
        }, {
          name: 'Contact Us',
          to: { name: 'contact' }
        }]
      }, {
        type: 'button',
        name: 'Post Job',
        to: { name: 'postJob' }
      }]
    }
  },

  methods: {
    close () {
      if (this.$store.state.app.mobileSearchOpen) {
        this.$store.dispatch('app/mobileSearchToggle', false)
      } else {
        this.$store.dispatch('app/mobileNavToggle', !this.$store.state.app.mobileNavOpen)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    background: $WHITE;
    border-bottom: 1px solid $GREY;
    padding: grid(4) 0;
    position: sticky;
    top: 0;
    z-index: 8;
  }

  .search-form {
    margin-right: auto;
    margin-left: 40px;
  }

  .back {
    @include Flex;
  }

  .button-back {
    margin-right: grid(4);
  }

  .heading {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;

    @include mq ($until: medium) {
      font-size: 15px;
      max-width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @include mq ($until: xsmall) {
      max-width: 160px;
    }

    @include mq ($until: xxsmall) {
      max-width: 120px;
    }
  }

  .container {
    @include Flex;
    @include Container;
  }

  .logo {
    @include Flex ($justify: flex-start);

    .bug {
      margin-left: grid(1);
    }
  }

  .alt-menu {
    @include Flex ($justify: flex-end);

    > *:not(first-child) {
      margin-left: grid(2);
    }
  }
</style>
