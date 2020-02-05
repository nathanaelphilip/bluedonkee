<template>
  <div>
    <ButtonShare @click.native.prevent="open = true" />
    <portal to="modal">
      <Modal @close="open = false" heading="Share" :open="open">
        <Copy :value="link" />
        <ul class="links">
          <li>
            <a :href="facebook" target="_blank" class="link facebook">Facebook</a>
          </li>
          <li>
            <a :href="twitter" target="_blank" class="link twitter">Twitter</a>
          </li>
          <li>
            <a :href="linkedin" target="_blank" class="link linkedin">LinkedIn</a>
          </li>
        </ul>
      </Modal>
    </portal>
  </div>
</template>

<script>
import ButtonShare from '@/components/atoms/ButtonShare'
import Copy from '@/components/molecules/Copy'
import Modal from '@/components/molecules/Modal'

export default {
  props: ['path'],
  components: { ButtonShare, Copy, Modal },

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
  .icon {
    fill: blue;
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
    background: grey;
    border-radius: 4px;
    color: $WHITE;
    display: block;
    font-size: 15px;
    font-weight: 500;
    padding: 12px 16px;

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
