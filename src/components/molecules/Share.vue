<template>
  <div class="share">
    <button @click.prevent="open = true" class="button-share">
      <IconShare width="18" height="19" class="icon" />
    </button>
    <portal to="modal">
      <Modal @close="open = false" heading="Share" :open="open">
        <Copy :value="link" />
        <ul class="links">
          <li>
            <a :href="facebook" target="_blank" class="link facebook"><IconFacebook width="20" height="20" />Facebook</a>
          </li>
          <li>
            <a :href="twitter" target="_blank" class="link twitter"><IconTwitter width="20" height="16" />Twitter</a>
          </li>
          <li>
            <a :href="linkedin" target="_blank" class="link linkedin"><IconLinkedIn width="18" height="18" />LinkedIn</a>
          </li>
        </ul>
      </Modal>
    </portal>
  </div>
</template>

<script>
import Copy from '@/components/molecules/Copy'
import Modal from '@/components/molecules/Modal'

import IconFacebook from '@/components/icons/Facebook'
import IconLinkedIn from '@/components/icons/LinkedIn'
import IconShare from '@/components/icons/Share'
import IconTwitter from '@/components/icons/Twitter'

export default {
  props: ['path'],
  components: { Copy, IconFacebook, IconLinkedIn, IconTwitter, IconShare, Modal },

  data () {
    return {
      open: false
    }
  },

  computed: {
    link () {
      return `${window.location.origin}${this.path}`
    },

    facebook () {
      return `https://www.facebook.com/sharer.php?u=${this.link}`
    },

    twitter () {
      return `https://twitter.com/share?url=${this.link}&via=WorkBlue`
    },

    linkedin () {
      return `https://www.linkedin.com/shareArticle?url=${this.link}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-share {
    @include ButtonSquareIcon;
  }

  .copy {
    margin-bottom: 12px;
  }

  .links {
    li {
      &:not(:last-child) {
        margin-bottom: 12px;
      }
    }
  }

  .link {
    @include Flex($justify: flex-start);
    background: grey;
    border-radius: 4px;
    color: $WHITE;
    font-size: 15px;
    font-weight: 500;
    padding: 12px 16px;

    > svg {fill: $WHITE; margin-right: 10px;}

    &.facebook {
      background: $FACEBOOK;
    }

    &.twitter {
      background: $TWITTER;
    }

    &.linkedin {
      background: $LINKEDIN;
    }
  }
</style>
