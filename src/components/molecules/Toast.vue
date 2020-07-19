<template>
  <Flash @close="$emit('close')" class="»bottom »full" :open="open">
    <div class="banner-grid">
      <div class="emoji">📬</div>
      <div class="content">
        <strong>We want your feedback.</strong> Please take our brief WorkBlue user survey.
      </div>
      <LinkPrimary href="https://bit.ly/2OrDxvp">Get Started</LinkPrimary>
    </div>
  </Flash>
</template>

<script>
import Flash from '@/components/molecules/Flash'
import LinkPrimary from '@/components/atoms/LinkPrimary'

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  components: { Flash, LinkPrimary }
}
</script>

<style lang="scss" scoped>
  .banner-grid {
    align-items: center;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: grid(4);
  }

  .emoji { font-size: 24px; }

  .content {
    font-size: 17px;
    font-weight: 400;

    strong { font-weight: 600; }
  }
</style>
